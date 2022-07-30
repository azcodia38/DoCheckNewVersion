/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { delay, isEmpty } from 'lodash'
import { DeviceEventEmitter, ScrollView } from 'react-native'
import WebView from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux'

import {
    ImageBerhasilDisimpan,
    ImageBerhasilDiubah,
    ImageSimpanPerubahan,
} from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import PopupAnggotaTask from 'components/popup/anggota-task/PopupAnggotaTask'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import LoadingFull from 'components/loading/LoadingFull'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import RecommendationLink from 'src/components/molecules/tasks/recommendationLink'
import GoalTitle from 'src/components/molecules/tasks/taskForm/goalTitle'
import DueDate from 'src/components/molecules/tasks/taskForm/dueDate'
import RepeatTask from 'src/components/molecules/tasks/taskForm/repeat'
import InviteMember from 'src/components/molecules/tasks/taskForm/inviteMember'
import LinkRecommendation from 'src/components/molecules/tasks/taskForm/linkRecommendation'
import DescriptionTask from 'src/components/molecules/tasks/taskForm/descriptionTask'
import RecommendationPreview from 'src/components/molecules/tasks/taskForm/recommendationPreview'
import RemoveTask from 'src/components/molecules/tasks/taskForm/removeTask'
import MenuDetail from 'src/components/molecules/tasks/menuDetail'
import Header from 'src/components/molecules/tasks/header'

import { LISTENER_EVENT_EDIT_TASK, NavProps, repeat_task_options } from 'src/utils/const'
import { getDatefromDateOrString, getUsername, isIOS, isURLValid } from 'src/utils'
import { TaskPageContainer } from './styled'

import { useKeyboard } from 'src/hook/useKeyboard'
import useAuthorization from 'src/hook/useAuthorization'
import { useStateRef } from 'src/hook/useStateRef'

import StoreData from 'store/types'
import { addPendingRequestData } from 'store/data/pending-request'
import { GoalsActionType } from 'store/data/goals'
import { WebViewPageParams } from 'src/pages/webview/params'

import { TaskPageParams } from './params'
import { DebugAlert } from 'src/utils/alert'

import { SearchResultData } from 'src/api/mock-api'
import { myGoalDetailAPI, TaskCreateGoalRequest } from 'src/api/my-goal'
import { APIMethod } from 'src/api'
import { pinTaskAPI, taskByIDAPI, unpinTaskAPI, updateTaskAPI } from 'src/api/task'
import { searchUsersByIDsAPI } from 'src/api/user'
import { createPinnedTaskLocal, updateTaskLocal } from 'api-fallback/task'

import { Task } from 'src/entity/Task.entity'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { Goals } from 'src/entity/Goals.entity'
import { PinnedTasks } from 'src/entity/PinnedTasks.entity'
import { TaskAssignee } from 'src/entity/TaskAssignee.entity'

import { onFetchTask, onSetDeleteTaskInGoal } from 'src/store/actions'
import { onUpdateTaskAPI } from 'src/store/actions'
import useNotif from 'src/hook/useNotif'
import useConnected from 'src/hook/useConnected'
import useUserCredential from 'src/hook/useUserCredential'

// import FormAudioInput, {
//     RecordingState,
// } from '../../../components/form/form-audio-input/FormAudioInput'

interface TaskPageProps extends NavProps {}

export default function TaskPage(props: TaskPageProps) {
    const dispatch = useDispatch()

    const { deleteNotification } = useNotif()
    const [keyboard_height] = useKeyboard()
    const auth = useAuthorization(props.navigation)
    const params: TaskPageParams = props.route.params
    const { connected } = useConnected()
    const user = useUserCredential()

    const goals = useSelector(({ goals_data }: StoreData) => goals_data)
    const detailGoal = useSelector(
        ({ myGoals }: StoreData) => myGoals.detailGoal
    )
    const detailTask = useSelector(({ task }: StoreData) => task.singleTask)

    const webViewRef = useRef<WebView>(null)

    const [task, setTask] = useState<Task>(params.data)
    const [taskEditData, setTaskEditData] = useState<TaskCreateGoalRequest>({
        title: params.data.title,
        notes: params.data.notes,
        dueDate: params.data.dueDate,
        type: params.data.type,
        repeatTask: params.data.repeatTask ?? 0,
        recommendationUrl: params.data.recommendationUrl ?? '',
        audioUrl: params.data.audioUrl ?? '',
        assignees: (params.data.taskAsignnes ?? []).map(
            (ta: TaskAssignee) => ta.id
        ),
    })
    const [usersSearchResult, setUsersSearchResult] = useState<
        SearchResultData[]
    >([])

    const [continueToDelete, setContinueToDelete] = useState(false)
    const [pinned, setPinned] = useState<boolean>(params.is_pinned)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [loadingParticipants, setLoadingParticipants] =
        useState<boolean>(false)
    const [showPopupSaveSuccess, setShowPopupSaveSuccess] =
        useState<boolean>(false)
    const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false)
    const [showPopupDeleteSuccess, setShowPopupDeleteSuccess] =
        useState<boolean>(false)
    const [showPopupParticipants, setShowPopupParticipants] =
        useState<boolean>(false)
    const [memberIdsLoading, setMemberIDsLoading] = useStateRef<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const [loadingWebview, setLoadingWebview] = useState<boolean>(false)
    const [goalMemberIds, setGoalMemberIDs] = useState<string[]>([])
    const [isReloadToggle, setReloadToggle] = useState(false)
    const [errorDate, setErrorDate] = useState<string>('')
    const [errorLink, setErrorLink] = useState<string>('')

    // const [tempRecordedAudio, setTempRecordedAudio] =
    //     useState<AudioPathDuration>({})

    const colorAggregator = useMemo(
        () => (editMode ? '#000' : '#818487'),
        [editMode]
    )

    const isEmptyRecommendationLink = useMemo(
        () => isEmpty(taskEditData.recommendationUrl),
        [taskEditData.recommendationUrl]
    )

    const pinUnpinTask = useCallback(async () => {
        const invokerAPI = pinned ? unpinTaskAPI : pinTaskAPI
        setLoading(true)
        try {
            await invokerAPI(auth, params.goal_id, params.data.id ?? '', {
                connected,
                fallback() {
                    return true
                },
                onOfflineRequest(
                    path: string,
                    method: APIMethod,
                    body: any,
                    header: any
                ) {
                    dispatch(addPendingRequestData(path, method, body, header))
                },
            })
            if (pinned) {
                params.onTaskUnpinned && params.onTaskUnpinned()
            } else {
                params.onTaskPinned && params.onTaskPinned()
            }
            const _goal = await myGoalDetailAPI(auth, params.goal_id, {
                connected,
                fallback() {
                    const goal = [
                        ...goals.my_goals,
                        ...goals.my_group_goals,
                    ].find((g: Goals) => g.id === params.goal_id)!
                    return {
                        ...goal,
                        pinnedTasks: !pinned
                            ? [
                                  ...goal.pinnedTasks,
                                  createPinnedTaskLocal(goal, task),
                              ]
                            : goal.pinnedTasks.filter(
                                  (pt: PinnedTasks) => pt.task.id !== task.id
                              ),
                    }
                },
            })
            const type =
                (_goal.goalMembers ?? []).length === 1
                    ? GoalsActionType.UPDATE_MY_GOALS
                    : GoalsActionType.UPDATE_MY_GROUP_GOALS
            dispatch({
                type,
                data: _goal,
            })
            props.navigation.goBack()
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        pinned,
        unpinTaskAPI,
        pinTaskAPI,
        setLoading,
        auth,
        connected,
        addPendingRequestData,
        params,
        myGoalDetailAPI,
        goals,
        props.navigation.goBack,
    ])

    const getTaskData = useCallback(() => {
        const isDone = () => {}
        const isLoading = () => {}

        dispatch(
            onFetchTask({
                goaldId: params.goal_id,
                taskId: params.data.id!,
                token: auth,
                isConnected: connected,
                isDone,
                isLoading,
            })
        )

        setGoalMemberIDs(
            detailGoal.goalMembers.map((gm: GoalMembers) => gm.user?.id!)
        )
    }, [
        auth,
        params,
        connected,
        detailGoal,
        setGoalMemberIDs,
        detailGoal,
        onFetchTask,
    ])

    const silentUpdateTask = useCallback(async () => {
        try {
            await updateTaskAPI(
                auth,
                params.goal_id,
                params.data.id ?? '-',
                taskEditData,
                {
                    connected,
                    fallback() {
                        return true
                    },
                    onOfflineRequest(
                        path: string,
                        method: APIMethod,
                        body: any,
                        header: any
                    ) {
                        dispatch(
                            addPendingRequestData(path, method, body, header)
                        )
                    },
                }
            )
            const _ = await taskByIDAPI(
                auth,
                params.goal_id,
                params.data.id ?? '-',
                {
                    connected,
                    fallback() {
                        return updateTaskLocal(task, taskEditData)
                    },
                }
            )
            const goal = [...goals.my_goals, ...goals.my_group_goals].find(
                (g: Goals) => g.id === params.goal_id
            )!
            const updated_goal = {
                ...goal,
                tasks: goal.tasks.map((t: Task) => {
                    if (t.id !== task.id) {
                        return t
                    }

                    return _
                }),
            }
            const type =
                (goal?.goalMembers ?? []).length === 1
                    ? GoalsActionType.UPDATE_MY_GOALS
                    : GoalsActionType.UPDATE_MY_GROUP_GOALS
            dispatch({
                type,
                data: updated_goal,
            })
            setTask(_)
        } catch (err: any) {
            //
        }
    }, [
        updateTaskAPI,
        auth,
        params,
        taskEditData,
        connected,
        addPendingRequestData,
        taskByIDAPI,
        goals,
        setTask,
    ])

    const continueDeleteTask = useCallback(async () => {
        setLoading(true)

        const isDone = () => {
            deleteNotification(params.data.id!)
        }
        const isLoading = (status: boolean) => {
            setShowPopupDeleteSuccess(true)
            setTimeout(() => setShowPopupDeleteSuccess(status), 1000)
            setLoading(status)
        }

        dispatch(
            onSetDeleteTaskInGoal({
                goalId: params.goal_id,
                taskId: params.data.id!,
                token: auth,
                isConnected: connected,
                isDone: isDone,
                isLoading: isLoading,
            })
        )
    }, [
        auth,
        params.goal_id,
        params.data,
        connected,
        addPendingRequestData,
        goals,
        setShowPopupDeleteSuccess,
        deleteNotification,
    ])

    const getInitialParticipants = useCallback(async () => {
        try {
            const _ = await taskByIDAPI(
                auth,
                params.goal_id,
                params.data.id ?? '-',
                {
                    connected,
                    fallback() {
                        return params.data
                    },
                }
            )
            return _.taskAsignnes.map((ta: TaskAssignee) => ({
                id: ta.goalMember.user?.id!,
                imageurl: ta.goalMember.user?.profilePicture,
                gender: ta.goalMember.user?.gender!,
                name: ta.goalMember.user?.fullname!,
                username: getUsername(ta.goalMember.user!),
                owner: ta.goalMember.user?.id === user.id,
            }))
        } catch (err: any) {
            return []
        }
    }, [taskByIDAPI, auth, params.goal_id, params.data, connected, getUsername])

    const updateTask = useCallback(() => {
        setLoadingSubmit(true)

        const onDone = (status: boolean) => {}

        const onLoading = (status: boolean) => {
            setShowPopupSaveSuccess(true)
            setTimeout(() => {
                setShowPopupSaveSuccess(status)
                setLoadingSubmit(status)
            }, 1000)
        }

        dispatch(
            onUpdateTaskAPI({
                goalId: params.goal_id,
                taskId: params.data.id!,
                token: auth,
                isConnected: connected,
                updatedData: taskEditData,
                isLoading: onLoading,
                isDone: onDone,
            })
        )
    }, [
        setLoadingSubmit,
        taskEditData,
        auth,
        connected,
        params,
        goals,
        setShowPopupSaveSuccess,
        onUpdateTaskAPI,
    ])

    const onAddUser = useCallback(
        (userId: string) => {
            setTaskEditData({
                ...taskEditData,
                assignees: [...taskEditData.assignees, userId],
            })
        },
        [setTaskEditData, taskEditData]
    )

    const onRemoveuser = useCallback(
        async (userId: string) => {
            setTaskEditData({
                ...taskEditData,
                assignees: taskEditData.assignees.filter(
                    (user_id: string) => user_id !== userId
                ),
            })
        },
        [setTaskEditData, taskEditData]
    )

    const deleteTask = useCallback(() => {
        setContinueToDelete(true)
        setShowPopupDelete(false)
    }, [setShowPopupDelete, setContinueToDelete])

    const searchAPI = useCallback(
        async (q: string) => await searchUsersByIDsAPI(auth, goalMemberIds, q),
        [searchUsersByIDsAPI, auth, goalMemberIds]
    )

    const gotoLink = useCallback(
        (url: string) => {
            const params: WebViewPageParams = {
                title: 'Tautan Rekomendasi',
                url,
            }
            props.navigation.navigate('WebView', params)
        },
        [props.navigation.navigate]
    )

    const reloadTautanRekomendasi = useCallback(() => {
        if (!webViewRef.current) return
        setTaskEditData({ ...taskEditData, recommendationUrl: '' })
        webViewRef.current.reload()
        setReloadToggle(true)
        delay(() => setReloadToggle(false), 500)
    }, [webViewRef.current, setTaskEditData, taskEditData, isReloadToggle])

    useEffect(() => {
        if (!task) return
        DeviceEventEmitter.emit(LISTENER_EVENT_EDIT_TASK, task)
    }, [task])

    useEffect(() => {
        const diff = moment(getDatefromDateOrString(taskEditData.dueDate)).diff(
            new Date(),
            'm'
        )
        const is_before_now = diff < 0
        setErrorDate(
            is_before_now ? 'Tanggal atau jam tidak boleh sebelum saat ini' : ''
        )
    }, [taskEditData.dueDate])

    useEffect(() => {
        setErrorLink(
            editMode &&
                taskEditData.recommendationUrl &&
                !isURLValid(taskEditData.recommendationUrl)
                ? 'URL tidak valid'
                : ''
        )
    }, [taskEditData.recommendationUrl])

    useEffect(() => {
        if (!isEmpty(detailTask)) {
            const {
                dueDate,
                notes,
                taskAsignnes,
                title,
                type,
                audioDurationMs,
                audioUrl,
                recommendationUrl,
                repeatTask,
            } = detailTask as Task

            setTask(detailTask as Task)
            setTaskEditData({
                title,
                notes,
                dueDate,
                type,
                repeatTask: repeatTask ?? 0,
                recommendationUrl: recommendationUrl ?? '',
                audioUrl: audioUrl ?? '',
                audioDurationMs,
                assignees: (taskAsignnes ?? []).map(
                    (ta: TaskAssignee) => ta.goalMember.user?.id!
                ),
            })

            // setTempRecordedAudio({
            //     path: _.audioUrl,
            //     duration: _.audioDurationMs,
            // })
        }
    }, [detailTask])

    useEffect(() => {
        getTaskData()
    }, [])

    return (
        <DocheckSafeAreaView>
            <TaskPageContainer>
                <MenuDetail
                    pinUnpinTask={pinUnpinTask}
                    pinned={pinned}
                    setEditMode={setEditMode}
                    setShowMenu={setShowMenu}
                    setShowPopupDelete={setShowPopupDelete}
                    showMenu={showMenu}
                />
                <Header
                    editMode={editMode}
                    errorDate={errorDate}
                    errorLink={errorLink}
                    loadingSubmit={loadingSubmit}
                    navigation={props.navigation}
                    setEditMode={setEditMode}
                    setShowMenu={setShowMenu}
                    showMenu={showMenu}
                    title={''}
                    updateTask={updateTask}
                    taskEditTitle={taskEditData.title}
                />
                <ScrollView style={{ flex: 1 }}>
                    <GoalTitle
                        editMode={editMode}
                        onChangeText={(title) =>
                            setTaskEditData({ ...taskEditData, title })
                        }
                        title={taskEditData.title}
                    />

                    <DueDate
                        colorAggregator={colorAggregator}
                        editMode={editMode}
                        errorDate={errorDate}
                        setTaskEditData={setTaskEditData}
                        taskEditData={taskEditData}
                    />

                    <RepeatTask
                        colorAggregator={colorAggregator}
                        editMode={editMode}
                        onValueChange={(value: string) =>
                            setTaskEditData({
                                ...taskEditData,
                                repeatTask: parseInt(value),
                            })
                        }
                        repeatTaskOptions={repeat_task_options}
                        repeatTaskValue={`${taskEditData.repeatTask}`}
                    />

                    <InviteMember
                        editMode={editMode}
                        loadingParticipants={loadingParticipants}
                        onPress={() => setShowPopupParticipants(true)}
                        taskEditData={taskEditData}
                        usersSearchResult={usersSearchResult}
                    />

                    <LinkRecommendation
                        editMode={editMode}
                        errorLink={errorLink}
                        setTaskEditData={setTaskEditData}
                        taskEditData={taskEditData}
                    />

                    <DescriptionTask
                        editMode={editMode}
                        onChange={(notes) =>
                            setTaskEditData({ ...taskEditData, notes })
                        }
                        value={taskEditData.notes ?? ''}
                    />

                    <RecommendationPreview
                        onPress={reloadTautanRekomendasi}
                        toggleMenu={isReloadToggle}
                        isEmptyRecommendationLink={isEmptyRecommendationLink}
                        loadingWebview={loadingWebview}
                        onOpenLink={gotoLink}
                        recommendationUrl={taskEditData.recommendationUrl}
                    />

                    <RemoveTask
                        editMode={editMode}
                        onPress={() => setShowPopupDelete(true)}
                    />
                    <Space value={isIOS * keyboard_height} />
                </ScrollView>
            </TaskPageContainer>
            <LoadingFull loading={loading} />
            <PopupAnggotaTask
                editable={editMode}
                searchAPI={searchAPI}
                memberIDs={taskEditData.assignees ?? []}
                onMembersChange={setUsersSearchResult}
                getInitialParticipants={getInitialParticipants}
                show={editMode && showPopupParticipants}
                loadingIDs={memberIdsLoading.current}
                onCancel={() => setShowPopupParticipants(false)}
                onAddUser={onAddUser}
                onRemoveUser={onRemoveuser}
            />
            <PopupYesNo
                show={showPopupDelete}
                setShow={setShowPopupDelete}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToDelete) {
                        setLoading(true)
                        continueDeleteTask()
                    }
                }}
                title={'Hapus Task ?'}
                onNo={() => setShowPopupDelete(false)}
                onYes={deleteTask}
                cancelable
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={showPopupDeleteSuccess}
                setShow={setShowPopupDeleteSuccess}
                onCancelRequest={() => {
                    setShowPopupDeleteSuccess(false)
                }}
                onModalHide={() => {
                    props.navigation.goBack()
                }}
                image={<ImageBerhasilDiubah />}
                title={'Task Berhasil\nDihapus'}
                noButton
            />
            <PopupNormalOK
                show={showPopupSaveSuccess}
                setShow={setShowPopupSaveSuccess}
                onModalHide={() => setEditMode(false)}
                onCancelRequest={() => {
                    setShowPopupSaveSuccess(false)
                }}
                image={<ImageBerhasilDisimpan />}
                title={'Task Berhasil\nDisimpan'}
                noButton
            />
            <RecommendationLink
                setLoadingWebview={setLoadingWebview}
                setTaskEditData={setTaskEditData}
                silentUpdateTask={silentUpdateTask}
                taskEditData={taskEditData}
                webViewRef={webViewRef}
            />
        </DocheckSafeAreaView>
    )
}
