/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty, size } from 'lodash'

import { updateGoalLocal } from 'api-fallback/my-goal'
import { SearchResultData } from 'src/api/mock-api'
import { CreateGoalRequest, TaskCreateGoalRequest } from 'src/api/my-goal'
import { searchUsersAPI } from 'src/api/user'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import { PlusOIcon } from 'components/icons/Icons'
import { ParticipantList2Loading } from 'components/loader-collections'
import { PesertaGrup2 } from 'components/peserta-grup/PesertaGrup'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

import { getInitialNewTask, NavProps, screen_height } from 'src/utils/const'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { Task } from 'src/entity/Task.entity'
import { TaskAssignee } from 'src/entity/TaskAssignee.entity'
import { EMPTY_TASK } from 'src/utils/lang'
import { getUsername, isIOS } from 'src/utils'
import {
    onSubmitGoalHandler,
    onUpdateGoalHandler,
    setDetailGoal,
} from 'src/store/actions'
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'

import { GoalPageParams } from '../goal/params'
import { OtherUserProfilePageParams } from '../other-profil-user/params'
import { BuatGoalBaruPageParams } from './params'
import {
    BuatGoalBaruPageContainer,
    PesertaGrupContainer,
    TasksContainer,
} from './styled'
import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'
import Header from 'src/components/atoms/createNewGoal/header'
import CreateTask from 'src/components/atoms/createNewGoal/createTask'
import PopupGroupCreateNewGoal from 'src/components/atoms/createNewGoal/popupGroupCreateNewGoal'
import Overlay from 'src/components/atoms/createNewGoal/overlay'
import { SubmitGoalDetailAPI } from 'src/utils/types'
import useNotif from 'src/hook/useNotif'
import useConnected from 'src/hook/useConnected'
import BackService from 'src/services/BackHandler/backService'
import useUserCredential from 'src/hook/useUserCredential'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
import StatusToggle from 'src/components/atoms/statusToggle'
import useDimension from 'src/hook/useDimension'
import TaskList from 'src/components/atoms/createNewGoal/taskList'

interface BuatGoalBaruPageProps extends NavProps {}

export interface ActiveTask {
    mode: 'edit' | 'new'
    task: TaskCreateGoalRequest
}

type GetInitialParticipantsType = () => Promise<SearchResultData[]>
type GetTaskInitialParticipantsType = () => Promise<SearchResultData[]>

const backService = new BackService()

export default function BuatGoalBaruPage(props: BuatGoalBaruPageProps) {
    const auth = useAuthorization(props.navigation)
    const dispatch = useDispatch()

    // @hook
    const [keyboard_height] = useKeyboard()
    const { updateNotificationTask } = useNotif(auth)
    const { connected } = useConnected()
    const user = useUserCredential()
    const { height } = useDimension()

    const params: BuatGoalBaruPageParams = props.route.params

    const modalizeRef = useRef<Modalize>(null)

    // @state
    const [show_popup_member_goal, setShowPopupMemberGoal] =
        useState<boolean>(false)
    const [hasTappedBack, setHasTappedBack] = useState<boolean>(false)
    const [isOverlay, setIsOverlay] = useState(false)
    const [show_popup_batal, setShowPopupBatal] = useState<boolean>(false)
    const [show_success_popup, setShowSuccessPopup] = useState<boolean>(false)
    const [participants, setParticipants] = useState<SearchResultData[]>([])
    const [loading_participants, setLoadingParticipants] =
        useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [goalIDTemp, setGoalIDTemp] = useState<string>('')

    const [goal, setGoal] = useState<CreateGoalRequest>({
        id: '',
        name: '',
        description: '',
        goalMembers: [],
        isPublic: false,
        tasks: [],
    })
    const [activeTask, setActiveTask] = useState<ActiveTask>({
        mode: 'new',
        task: { ...getInitialNewTask() },
    })
    const [heightTaskList, setHeightTaskList] = useState(screen_height - 200)

    // @memo
    const isEditMode = useMemo(
        () =>
            params &&
            params?.mode === 'edit' &&
            params?.existing_goal &&
            (params?.existing_goal !== undefined ||
                params?.existing_goal !== null),
        [params, params.mode, params.existing_goal]
    )
    const isKeyboard = useMemo(() => keyboard_height > 0, [keyboard_height])
    const popupHeight = useMemo(() => height, [])
    const haveChanges = useMemo(() => goal.name.trim().length > 0, [goal])
    const headerTitle = useMemo(
        () => (isEditMode ? 'Edit Goal' : 'Buat Goal Baru'),
        [isEditMode]
    )

    const onCreateGoal = useCallback(
        (payload: SubmitGoalDetailAPI) => {
            dispatch(onSubmitGoalHandler(payload))
        },
        [onSubmitGoalHandler]
    )

    const onUpdateGoal = useCallback(
        (payload: SubmitGoalDetailAPI) =>
            dispatch(onUpdateGoalHandler(payload)),
        [onSubmitGoalHandler]
    )

    const gotoNewCreatedGoal = useCallback(
        (goalId?: string) => {
            const id = goalId ?? goalIDTemp
            const params: GoalPageParams = {
                id,
            }
            props.navigation.goBack()
            props.navigation.navigate('Goal', params)
        },
        [props.navigation.reset, goalIDTemp, setDetailGoal]
    )

    const submit = useCallback(async () => {
        setLoading(true)
        const onDone = (_: boolean, goalId?: string) => {
            setGoalIDTemp(goalId!)
            gotoNewCreatedGoal(goalId)
        }
        const onLoading = (status: boolean) => {
            setShowSuccessPopup(true)
            setTimeout(() => {
                setLoading(status)
                setShowSuccessPopup(status)
            }, 1000)
        }
        if (isEditMode) {
            const editedGoalID = params?.existing_goal?.id ?? ''
            updateNotificationTask(goal.tasks)
            onUpdateGoal({
                token: auth,
                goal,
                goalId: editedGoalID,
                isLoading: onLoading,
                isConnected: connected,
                user,
                existingGoal: params?.existing_goal,
                isDone: onDone,
                query: '',
            })
        } else
            onCreateGoal({
                token: auth,
                goal,
                isLoading: onLoading,
                isConnected: connected,
                user,
                isDone: onDone,
                query: '',
            })
    }, [
        onCreateGoal,
        setLoading,
        isEditMode,
        onUpdateGoal,
        params?.existing_goal?.id,
        auth,
        goal,
        connected,
        setGoalIDTemp,
        updateGoalLocal,
        params.existing_goal,
        setShowSuccessPopup,
        gotoNewCreatedGoal,
    ])

    const getInitialParticipants =
        useCallback<GetInitialParticipantsType>(async () => {
            if (!isEditMode) return []

            return (params.existing_goal?.goalMembers ?? []).map(
                (gm: GoalMembers) => ({
                    id: gm.user?.id!,
                    imageurl: gm.user?.profilePicture!,
                    gender: gm.user?.gender!,
                    name: gm.user?.fullname!,
                    username: getUsername(gm.user!),
                    owner: gm.user?.id === params.existing_goal?.owner.id,
                })
            )
        }, [
            isEditMode,
            params.existing_goal?.goalMembers,
            getUsername,
            params.existing_goal?.owner.id,
        ])

    const getTaskInitialParticipants =
        useCallback<GetTaskInitialParticipantsType>(async () => {
            if (!isEditMode) return participants

            return (
                (params.existing_goal?.tasks ?? [])
                    .find((t: Task) => t.id === activeTask.task.id)
                    ?.taskAsignnes.map((ta: TaskAssignee) => ({
                        id: ta.goalMember.user?.id!,
                        imageurl: ta.goalMember.user?.profilePicture!,
                        gender: ta.goalMember.user?.gender!,
                        name: ta.goalMember.user?.fullname!,
                        username: getUsername(ta.goalMember.user!),
                        owner:
                            ta.goalMember.user?.id ===
                            params.existing_goal?.owner.id,
                    })) ?? []
            )
        }, [
            isEditMode,
            params.existing_goal?.goalMembers,
            participants,
            getUsername,
            params.existing_goal?.owner.id,
        ])

    // const heightHandler = useCallback(
    //     (height: number) => {
    //         setHeightTaskList(height)
    //     },
    //     [setHeightTaskList]
    // )

    const simpanActiveTask = useCallback(
        (updated_task: TaskCreateGoalRequest) => {
            if (activeTask.mode === 'new') {
                setGoal({
                    ...goal,
                    tasks: [...goal.tasks, updated_task],
                })
                setActiveTask({ mode: 'new', task: { ...getInitialNewTask() } })
            }
            if (activeTask.mode === 'edit') {
                setGoal({
                    ...goal,
                    tasks: goal.tasks.map((t: TaskCreateGoalRequest) => {
                        if (t.id !== updated_task.id) return t
                        return updated_task
                    }),
                })
            }

            closeTaskListHandler()
        },
        [activeTask.mode, setGoal, goal, setActiveTask, getInitialNewTask]
    )

    const onTaskTick = useCallback(
        (task: TaskCreateGoalRequest, done: boolean) =>
            setGoal({
                ...goal,
                tasks: goal.tasks.map((t: TaskCreateGoalRequest) => {
                    if (task.id !== t.id) return t

                    return {
                        ...t,
                        done, // TODO: fix this, use goal member for complete_by
                    }
                }),
            }),
        [goal, goal.tasks]
    )

    const onAddUserToMemberGoal = useCallback(
        (userId: string) => {
            if ((goal.goalMembers ?? []).includes(userId)) return
            setGoal({
                ...goal,
                goalMembers: [...(goal.goalMembers ?? []), userId],
            })
        },
        [goal.goalMembers, setGoal, goal]
    )

    const onRemoveUserFromMemberGoal = useCallback(
        (userId: string) =>
            setGoal({
                ...goal,
                goalMembers: (goal.goalMembers ?? []).filter(
                    (x) => x !== userId
                ),
            }),
        [setGoal, goal, goal.goalMembers]
    )

    const gotoOtherUserProfile = useCallback(
        (user_id: string) => {
            const params: OtherUserProfilePageParams = {
                id: user_id,
            }
            props.navigation.navigate('OtherProfilUser', params)
        },
        [props.navigation.navigate]
    )

    const searchAPI = useCallback(
        async (q: string) => await searchUsersAPI(auth, q, 0, 10),
        [searchUsersAPI, auth]
    )

    const backAction = useCallback(() => {
        if (!haveChanges) {
            props.navigation.goBack()
            return true
        }
        setShowPopupBatal(true)
        return true
    }, [haveChanges, props.navigation.goBack, setShowPopupBatal])

    const closeTaskListHandler = useCallback(() => {
        modalizeRef.current?.close()
        setIsOverlay(false)
        // setHeightTaskList(600)
    }, [
        modalizeRef.current?.close,
        setIsOverlay,
        setHeightTaskList,
        setActiveTask,
        getInitialNewTask,
    ])

    const openTaskListHandler = useCallback(() => {
        modalizeRef.current?.open()
        setIsOverlay(true)
    }, [modalizeRef.current?.open, setIsOverlay])

    const addTaskHandler = useCallback(
        () => openTaskListHandler(),
        [openTaskListHandler]
    )

    const editTask = useCallback(
        (task: TaskCreateGoalRequest) => {
            setActiveTask({ mode: 'edit', task })
            openTaskListHandler()
        },
        [setActiveTask, openTaskListHandler]
    )

    useEffect(() => {
        if (isEmpty(goal.id)) {
            setGoal({
                id: isEditMode
                    ? params.existing_goal?.id ?? ''
                    : uuidv4().toString(),
                name: isEditMode ? params.existing_goal?.name ?? '' : '',
                description: isEditMode
                    ? params.existing_goal?.description ?? ''
                    : '',
                goalMembers: isEditMode
                    ? (params.existing_goal?.goalMembers ?? []).map(
                          (gm: GoalMembers) => gm.user?.id ?? ''
                      ) ?? []
                    : [],
                isPublic: isEditMode
                    ? params.existing_goal?.isPublic ?? false
                    : false,
                tasks: isEditMode
                    ? params.existing_goal?.tasks.map((task: Task) => ({
                          id: task.id,
                          title: task.title ?? '',
                          notes: task.notes ?? '',
                          dueDate: task.dueDate ?? '',
                          type: task.type ?? '',
                          repeatTask: task.repeatTask ?? 0,
                          recommendationUrl: task.recommendationUrl ?? '',
                          audioUrl: task.audioUrl ?? '',
                          assignees: (task.taskAsignnes ?? []).map(
                              (ta: TaskAssignee) =>
                                  ta.goalMember?.user?.id ?? ''
                          ),
                      })) ?? []
                    : [],
            })
        }
    }, [isEditMode, params.existing_goal, goal, uuidv4])

    const onCloseModal = useCallback(() => {
        setIsOverlay(false)
        if (activeTask.mode == 'edit')
            setActiveTask({ mode: 'new', task: { ...getInitialNewTask() } })
    }, [setIsOverlay, setActiveTask, getInitialNewTask, activeTask.mode])

    useEffect(() => {
        setGoal({
            ...goal,
            goalMembers: participants.map(
                (resultData: SearchResultData) => resultData.id
            ),
        })
    }, [participants])

    useEffect(() => {
        backService.addBackHandler(backAction)
        return () => backService.removeBackHandler(backAction)
    }, [haveChanges])

    return (
        <DocheckSafeAreaView>
            <BuatGoalBaruPageContainer>
                <Overlay
                    isOverlay={isOverlay}
                    closeTaskListHandler={closeTaskListHandler}
                />
                <Header
                    title={headerTitle}
                    isLoading={loading}
                    haveChanges={haveChanges}
                    onBackAction={backAction}
                    onNavigation={props.navigation}
                    onSubmit={submit}
                    spaceValue={0}
                />

                <ScrollView>
                    <StatusToggle
                        onValueChange={(isPublic: boolean) =>
                            setGoal({ ...goal, isPublic })
                        }
                        isPublic={goal.isPublic}
                        isEditMode={isEditMode}
                    />
                    <WithPadding>
                        <Space value={8} />
                        <FormTextInput
                            accessibilityLabel={
                                accessibilitylabels.textJudulGoal
                            }
                            label={'Judul'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            onChangeText={(name) => setGoal({ ...goal, name })}
                            value={goal.name}
                            placeholder={'Tuliskan judul goalmu disini'}
                        />
                        <FormTextareaInput
                            accessibilityLabel={
                                accessibilitylabels.textDescGoal
                            }
                            label={'Deskripsi'}
                            numberOfLines={5}
                            inputStyle={{
                                minHeight: isIOS ? 100 : 0,
                            }}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            onChangeText={(description) =>
                                setGoal({ ...goal, description })
                            }
                            value={goal.description}
                            placeholder={'Tuliskan deskripsi goalmu disini'}
                        />
                    </WithPadding>
                    <WithPadding>
                        <Space value={15} />
                        <Tipografi
                            type={'label'}
                            style={{
                                color: '#1E2022',
                                letterSpacing: 1,
                            }}
                        >
                            Peserta grup
                        </Tipografi>
                        <Space value={8} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setShowPopupMemberGoal(true)
                            }}
                        >
                            <PesertaGrupContainer
                                style={{
                                    shadowColor: '#555',
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.08,
                                    shadowRadius: 12,
                                    elevation: 4,
                                }}
                            >
                                {(goal.goalMembers ?? []).length === 0 && (
                                    <>
                                        <Tipografi
                                            type={'label-regular'}
                                            style={{
                                                color: '#77838F',
                                                letterSpacing: 1.2,
                                            }}
                                        >
                                            Tambahkan Anggota
                                        </Tipografi>
                                        <PlusOIcon />
                                    </>
                                )}
                                {(goal.goalMembers ?? []).length > 0 && (
                                    <>
                                        <Tipografi
                                            type={'label-regular'}
                                            style={{
                                                color: '#77838F',
                                                letterSpacing: 1.2,
                                            }}
                                        >
                                            {`${
                                                (goal.goalMembers ?? []).length
                                            } Anggota`}
                                        </Tipografi>
                                        {loading_participants && (
                                            <View style={{ width: 150 }}>
                                                <ParticipantList2Loading />
                                            </View>
                                        )}
                                        {!loading_participants && (
                                            <PesertaGrup2
                                                options={participants.map(
                                                    (u: SearchResultData) => ({
                                                        label: u.imageurl ?? '',
                                                        value: u.id,
                                                    })
                                                )}
                                                values={goal.goalMembers ?? []}
                                            />
                                        )}
                                    </>
                                )}
                            </PesertaGrupContainer>
                        </TouchableOpacity>
                        <Space value={15} />
                        <Tipografi
                            type={'label'}
                            style={{
                                color: '#444145',
                            }}
                        >
                            Task
                        </Tipografi>
                        <Space value={10} />
                    </WithPadding>
                    <TasksContainer>
                        {size(goal.tasks) === 0 && (
                            <TaskKosongView
                                withHeight={false}
                                description={EMPTY_TASK.TASK_NOT_BEEN_CREATED}
                            />
                        )}
                        <TaskList
                            editTask={editTask}
                            onTaskTick={onTaskTick}
                            goal={goal}
                        />
                        <Space value={90} />
                    </TasksContainer>
                </ScrollView>
                <CreateTask
                    accessibilityLabel={accessibilitylabels.onCreateNewTask}
                    modalizeRef={modalizeRef}
                    heightTaskList={heightTaskList}
                    isKeyboard={isKeyboard}
                    modalHeight={popupHeight}
                    goal={goal}
                    keyboardHeight={keyboard_height}
                    activeTask={activeTask}
                    setIsOverlay={setIsOverlay}
                    closeTaskListHandler={closeTaskListHandler}
                    gotoOtherUserProfile={gotoOtherUserProfile}
                    getTaskInitialParticipants={getTaskInitialParticipants}
                    addTaskHandler={addTaskHandler}
                    setActiveTask={setActiveTask}
                    simpanActiveTask={simpanActiveTask}
                    onCloseModal={onCloseModal}
                />
            </BuatGoalBaruPageContainer>
            <PopupGroupCreateNewGoal
                isEditMode={isEditMode}
                hasTappedBack={hasTappedBack}
                onGoBack={props.navigation.goBack}
                onNewCreateGoalPage={gotoNewCreatedGoal}
                setShowPopupMemberGoal={setShowPopupMemberGoal}
                setHasTappedBack={setHasTappedBack}
                onPopupYesNo={{
                    isShowupCancel: show_popup_batal,
                    setShowupCancel: setShowPopupBatal,
                }}
                onPopupNormalOK={{
                    isShowupSuccess: show_success_popup,
                    setShowSuccessPopup,
                }}
                onPopupAnggota={{
                    onGetInitialParticipants: getInitialParticipants,
                    goalMembers: goal.goalMembers,
                    isShowupMemberGoal: show_popup_member_goal,
                    setParticipants,
                    onAddUserToMemberGoal,
                    onSearchAPI: searchAPI,
                    onRemoveUserFromMemberGoal,
                    onGoUserProfile: gotoOtherUserProfile,
                }}
            />
        </DocheckSafeAreaView>
    )
}
