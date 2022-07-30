/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modalize } from 'react-native-modalize'
import { useDispatch, useSelector } from 'react-redux'
import { Lazy } from '@luvies/lazy'
import { BackHandler } from 'react-native'

// @api
import { SearchResultData } from 'src/api/mock-api'
import { createNewTaskOnMyGoalAPI, myGoalDetailAPI } from 'src/api/my-goal'

// @fallback API
import { createTaskLocal } from 'api-fallback/task'

// @entity
import { Goals } from 'src/entity/Goals.entity'
import { Task } from 'src/entity/Task.entity'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { PinnedTasks } from 'src/entity/PinnedTasks.entity'

// @utils
import { titleCaseAlternative, getBackgroundColor, getUsername } from 'src/utils'
import { DebugAlert } from 'src/utils/alert'
import { getInitialNewTask, NavProps, screen_height } from 'src/utils/const'
import { DetailGoalType, LocalSetTickHandlerType } from 'src/utils/types'

// @types
import { TaskPageParams } from 'src/pages/inside-pages/task/params'
import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { BuatGoalBaruPageParams } from 'src/pages/inside-pages/buat-goal-baru/params'
import { OtherUserProfilePageParams } from 'src/pages/inside-pages/other-profil-user/params'

// @styles
import { GoalPageContainer } from './styled'

// @redux store
import StoreData from 'store/types'
import { GoalsActionType } from 'store/data/goals'
import { addPendingRequestData } from 'store/data/pending-request'
import {
    initializeMemberGoal,
    onCheckHandler,
    onDeleteGoalHandler,
    onSetPinGoal,
    onSetTickDetailGoalHandler,
    onUncheckHandler,
    removingMemberGoal,
    setAddingTask,
} from 'src/store/actions'
import { InitialParticipantsResponseType } from 'src/utils/types'

// @hook
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'
import { useStateRef } from 'src/hook/useStateRef'
import useUtils from 'src/hook/useUtils'
import useNotif from 'src/hook/useNotif'

// @pages
import { ActiveTask } from 'src/pages/inside-pages/buat-goal-baru/BuatGoalBaruPage'

// @components
import LoadingFull from 'components/loading/LoadingFull'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import TaskList from 'src/components/molecules/detailGoal/taskList'
import EditorContainer from 'src/components/molecules/detailGoal/editorContainer'
import DescriptionBody from 'src/components/atoms/descriptionGoal/descriptionBody'
import PopupGroupDescriptionGoal from 'src/components/molecules/popupDescriptionGoal'
import MenuDetailGoal from 'src/components/molecules/detailGoal/menuDetailGoal'
import useConnected from 'src/hook/useConnected'
import useUserCredential from 'src/hook/useUserCredential'

export default function GoalPage(props: NavProps) {
    const dispatch = useDispatch()
    const params: GoalPageParams = props.route.params

    const { TouchHeadHeight, newPaddingSize, swipeableHideYPosition } =
        useUtils()
    const auth = useAuthorization(props.navigation)
    const user = useUserCredential()
    const { cancelNotificationTask } = useNotif(auth)
    const { connected } = useConnected()

    const goals = useSelector(({ goals_data }: StoreData) => goals_data)
    const detailGoal: any = useSelector(
        ({ myGoals }: StoreData) => myGoals.detailGoal
    )

    // @state
    const [continueToDelete, setContinueDelete] = useState<boolean>(false)
    const modalizeTambahTaskRef = useRef<Modalize>(null)
    const [keyboardheight] = useKeyboard()
    const [goal, setGoal] = useState<Goals>()
    const [task, setTask] = useState<Task[]>()
    const [goalInnerTitle, setGoalInnerTitle] = useState<string>('')
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showPopupMemberGoal, setShowPopupMemberGoal] =
        useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingCreateTask, setLoadingCreateTask] = useState<boolean>(false)
    const [loadingModal, setLoadingModal] = useState<boolean>(false)
    const [memberIDsLoading, setMemberIDsLoading] = useStateRef<string[]>([])
    const [members, setMembers] = useState<SearchResultData[]>([])
    const [activeTask, setActiveTask] = useState<ActiveTask>({
        mode: 'new',
        task: { ...getInitialNewTask() },
    })
    const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false)
    const [showPopupDeleteSuccess, setShowPopupDeleteSuccess] =
        useState<boolean>(false)
    const [showPopupPinSuccess, setShowPopupPinSuccess] =
        useState<boolean>(false)

    // @memoize state
    const pinnedTaskMapID = useMemo(
        () =>
            (goal?.pinnedTasks ?? []).map(
                (pinnedTask: PinnedTasks) => pinnedTask?.task?.id ?? ''
            ),
        [goal?.pinnedTasks]
    )

    const goalMemberMapID = useMemo(
        () => (goal?.goalMembers ?? []).map((gm: GoalMembers) => gm.user?.id),
        [goal?.goalMembers]
    )
    const goalMemberWaitingMapID = useMemo(
        () =>
            (goal?.goalMembers ?? [])
                .filter((gm: GoalMembers) => !gm.isConfirmed)
                .map((gm: GoalMembers) => gm.user?.id),
        [goal?.goalMembers]
    )

    const [modalHeight, setModalHeight] = useState(screen_height - 540)
    const isKeyboardShow = useMemo(() => keyboardheight > 0, [keyboardheight])
    const isPinned = useMemo(() => detailGoal?.isPinned, [detailGoal?.isPinned])
    const isOwner = useMemo(
        () => goal?.owner?.id === user.id,
        [goal?.owner?.id, user]
    )

    const copyPinned = useMemo(
        () =>
            detailGoal?.isPinned
                ? 'Goal kamu berhasil di-pin'
                : 'Goal kamu berhasil di-unpin',
        [detailGoal?.isPinned]
    )

    const createNewTask = useCallback(async () => {
        setLoadingCreateTask(true)
        const onDone = (status: boolean) => {
            setLoadingCreateTask(status)
            setActiveTask({ mode: 'new', task: { ...getInitialNewTask() } })
            modalizeTambahTaskRef.current?.close()
        }

        dispatch(
            setAddingTask({
                token: auth,
                isConnected: connected,
                isLoading: onDone,
                goalId: params.id,
                task: activeTask.task,
            })
        )
    }, [
        auth,
        params.id,
        activeTask.task,
        connected,
        createTaskLocal,
        setLoadingCreateTask,
        createNewTaskOnMyGoalAPI,
        goal,
        GoalsActionType,
        setActiveTask,
        getInitialNewTask,
        addPendingRequestData,
    ])

    const pinUnpinGoal = useCallback(async () => {
        setLoadingModal(true)

        const onLoading = (status: boolean) => {}
        const onDone = (status: boolean) => {
            setShowPopupPinSuccess(!status)
            setLoadingModal(status)
            setTimeout(() => setShowPopupPinSuccess(status), 1000)
        }

        dispatch(
            onSetPinGoal({
                goalId: params.id,
                isPinned: Boolean(isPinned),
                token: auth,
                isConnected: connected,
                isLoading: onLoading,
                isDone: onDone,
            })
        )
    }, [
        onSetPinGoal,
        setLoadingModal,
        isPinned,
        auth,
        params.id,
        connected,
        setShowPopupPinSuccess,
    ])

    const continueDeleteGoal = useCallback(() => {
        const isLoading = (status: boolean) => setLoadingModal(status)
        const isDone = (status: boolean) => {
            setShowPopupDeleteSuccess(status)
            setTimeout(() => {
                setShowPopupDeleteSuccess(!status)
                cancelNotificationTask(task)
            }, 1000)
        }
        dispatch(
            onDeleteGoalHandler({
                isConnected: connected,
                token: auth,
                goalId: params.id!,
                user,
                isLoading,
                isDone,
                query: undefined,
            })
        )
    }, [
        auth,
        params.id,
        connected,
        setShowPopupDeleteSuccess,
        setLoadingModal,
        task,
        user,
        onDeleteGoalHandler,
        cancelNotificationTask,
        props.navigation.goBack,
    ])

    const getInitialParticipants =
        useCallback<InitialParticipantsResponseType>(async () => {
            try {
                const { goalMembers, owner } = await myGoalDetailAPI(
                    auth,
                    params.id,
                    {
                        connected,
                        fallback() {
                            const g = [
                                ...goals.my_goals,
                                ...goals.my_group_goals,
                            ].find((g: Goals) => g?.id === params.id)
                            return g!
                        },
                    }
                )
                return goalMembers.map((gm: GoalMembers) => ({
                    id: gm.user?.id!,
                    imageurl: gm.user?.profilePicture!,
                    gender: gm.user?.gender!,
                    name: gm.user?.fullname!,
                    username: getUsername(gm.user!),
                    owner: gm.user?.id === owner?.id,
                }))
            } catch (err: any) {
                DebugAlert(err.toString())
                return []
            }
        }, [myGoalDetailAPI, auth, params.id, connected, goals])

    const onLoadingIcon = useCallback(
        (userId: string) =>
            setMemberIDsLoading([
                ...Lazy.from(memberIDsLoading.current)
                    .where((ids) => ids !== userId)
                    .toArray(),
                userId,
            ]),
        [setMemberIDsLoading]
    )

    const onDoneLoadingIcon = useCallback(
        (userId: string) =>
            setMemberIDsLoading(
                Lazy.from(memberIDsLoading.current)
                    .where((ids) => ids !== userId)
                    .toArray()
            ),
        [setMemberIDsLoading]
    )

    const onAddUserToMemberGoal = useCallback(
        async (userId: string) => {
            onLoadingIcon(userId)
            const onLoading = () => onDoneLoadingIcon(userId)

            const isDone = () => {}

            dispatch(
                initializeMemberGoal({
                    token: auth,
                    isConnected: connected,
                    query: {
                        goalId: params.id,
                        userId,
                    },
                    isDone,
                    isLoading: onLoading,
                })
            )
        },
        [auth, params.id, connected, onDoneLoadingIcon, onLoadingIcon]
    )

    const onRemoveUserFromMemberGoal = useCallback(
        async (userId: string) => {
            onLoadingIcon(userId)
            const onLoading = () => onDoneLoadingIcon(userId)

            dispatch(
                removingMemberGoal({
                    token: auth,
                    isConnected: connected,
                    query: {
                        goalId: params.id,
                        userId,
                    },
                    isDone: () => {},
                    isLoading: onLoading,
                })
            )
        },
        [auth, params.id, connected, onLoadingIcon, onDoneLoadingIcon]
    )

    const onLocalSetTickHandler = useCallback(
        ({ isCompletedBy, taskId }: LocalSetTickHandlerType) => {
            if (task) {
                const newTask = task.map((item) => {
                    if (item.id == taskId) {
                        if (item.completeBy?.isConfirmed)
                            item.completeBy = undefined
                        else {
                            item.completeBy = {
                                // is unchecked
                                id: isCompletedBy?.id!,
                                isConfirmed: true,
                                user_id: isCompletedBy?.user_id!,
                            }
                        }
                    }

                    return item
                })
                const newGoal = { ...goal, tasks: newTask } as Goals
                setGoal(newGoal)
                setTask(newTask)
            }
        },
        [task, setTask, setGoal, goal]
    )

    // Handling the onPress of the clicked the task
    // Its done or not done
    const onTaskTick = useCallback(
        async (task: Task, done: boolean) => {
            if (!params.readonly) {
                const isCompletedBy = (goal?.goalMembers ?? []).find(
                    (gm: GoalMembers) => gm.user?.id === user.id
                )

                if (goal) {
                    // handling the tick or check or unchecked
                    onLocalSetTickHandler({
                        taskId: task.id!,
                        isCompletedBy,
                    })

                    // handling the tick in global storage
                    dispatch(
                        onSetTickDetailGoalHandler({
                            taskId: task.id!,
                            isCompleteBy: isCompletedBy,
                            goalId: goal.id,
                        })
                    )

                    if (done)
                        // handling checked handler
                        dispatch(
                            onCheckHandler({
                                token: auth,
                                goalId: goal?.id!,
                                taskId: task.id!,
                                isConnected: connected,
                                user,
                            })
                        )
                    else
                        dispatch(
                            // handling unchecked handler
                            onUncheckHandler({
                                token: auth,
                                goalId: goal?.id!,
                                taskId: task.id!,
                                isConnected: connected,
                                user,
                            })
                        )
                }
            }
        },
        [
            onLocalSetTickHandler,
            params.readonly,
            goal,
            onCheckHandler,
            onUncheckHandler,
            auth,
            user.id,
            user,
        ]
    )

    const deleteGoal = useCallback(() => {
        setContinueDelete(true)
        setShowPopupDelete(false)
    }, [setContinueDelete, setShowPopupDelete])

    /**
     * Create Task Handler
     */
    const simpanActiveTask = useCallback(
        () => activeTask.mode === 'new' && createNewTask(),
        [activeTask.mode, createNewTask]
    )

    /**
     * Setup activeTask
     */
    const setTaskHandler = useCallback(
        (task) => setActiveTask({ ...activeTask, task }),
        [setActiveTask, activeTask]
    )

    /**
     * Redirect to the task detail
     */
    const gotoTask = useCallback(
        (task: Task) => {
            if (params.readonly) return

            const _params: TaskPageParams = {
                goal_id: params.id,
                data: task,
                is_pinned: pinnedTaskMapID.includes(task.id ?? ''),
                onTaskPinned() {
                    if (pinnedTaskMapID.includes(task.id ?? '')) return
                    // TODO: submit pin task
                },
                onTaskUnpinned() {
                    // TODO: submit unpin task
                },
            }
            props.navigation.navigate('Task', _params)
        },
        [params, pinnedTaskMapID, props.navigation.navigate]
    )

    /**
     * Redirect to editPage goal
     */
    const visitEditGoal = useCallback(() => {
        const params: BuatGoalBaruPageParams = {
            mode: 'edit',
            existing_goal: goal,
        }
        setShowMenu(false)
        props.navigation.navigate('BuatGoalBaru', params)
    }, [props.navigation.navigate, setShowMenu, goal])

    /**
     * GroupMember click profile handler
     */
    const visitAnotherUser = useCallback(
        (userId: string) =>
            props.navigation.navigate('OtherProfilUser', {
                id: userId,
            } as OtherUserProfilePageParams),
        [props.navigation.navigate]
    )

    /**
     * Creating newTask handler
     */
    const onCreateNewTaskHandler = useCallback(() => {
        setActiveTask({
            mode: 'new',
            task: { ...getInitialNewTask() },
        })
        modalizeTambahTaskRef.current?.open()
    }, [setActiveTask, modalizeTambahTaskRef.current?.open, getInitialNewTask])

    /**
    
      *
      * This is first handler that will be invoke by react
      */
    useEffect(() => {
        setGoal(detailGoal)
        setGoalInnerTitle(titleCaseAlternative(detailGoal?.name!) ?? '')
        if (detailGoal?.tasks) setTask(detailGoal?.tasks)
    }, [detailGoal])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            props.navigation.goBack()
            return true
        })
    }, [])

    return (
        <DocheckSafeAreaView
            fullStatusBar
            statusBackgroundColor={getBackgroundColor(params.id)}
        >
            <MenuDetailGoal
                isOwner={isOwner}
                onCreateNewTaskHandler={onCreateNewTaskHandler}
                pinUnpinGoal={pinUnpinGoal}
                setShowMenu={setShowMenu}
                setShowPopupDelete={setShowPopupDelete}
                setShowPopupMemberGoal={setShowPopupMemberGoal}
                showMenu={showMenu}
                visitEditGoal={visitEditGoal}
                isPinned={isPinned}
            />
            <GoalPageContainer
                style={{ backgroundColor: getBackgroundColor(params.id) }}
            >
                <DescriptionBody
                    modalHeight={modalHeight}
                    newPaddingSize={newPaddingSize}
                    goalInnerTitle={goalInnerTitle}
                    navigation={props.navigation}
                    goalMemberMapID={goalMemberMapID as string[]}
                    goalMemberWaitingMapID={goalMemberWaitingMapID as string[]}
                    isOwner={!isOwner}
                    marginBottomSpace={swipeableHideYPosition + TouchHeadHeight}
                    members={members}
                    menuHandler={() => setShowMenu(true)}
                    goal={goal as DetailGoalType}
                    task={task}
                    params={params}
                    setShowPopupMemberGoal={setShowPopupMemberGoal}
                    auth={auth}
                />
                <TaskList
                    gotoTask={gotoTask}
                    loading={loading}
                    modalHeight={modalHeight}
                    onTaskTick={onTaskTick}
                    pinnedTaskMapID={pinnedTaskMapID}
                    goal={goal}
                    task={task}
                    setModalHeight={setModalHeight}
                    onCreateNewTaskHandler={onCreateNewTaskHandler}
                />
                <EditorContainer
                    activeTask={activeTask.task}
                    getInitialParticipants={getInitialParticipants}
                    goalMemberMapID={goalMemberMapID as string[]}
                    isKeyboardShow={isKeyboardShow}
                    loadingCreateTask={loadingCreateTask}
                    modalizeTambahTaskRef={modalizeTambahTaskRef}
                    setTaskHandler={setTaskHandler}
                    simpanActiveTask={simpanActiveTask}
                />
            </GoalPageContainer>
            <LoadingFull loading={loadingModal} />
            <PopupGroupDescriptionGoal
                deleteGoalModal={{
                    showPopupDelete: showPopupDelete,
                    setShowPopupDelete,
                    continueToDelete,
                    setLoadingModal,
                    continueDeleteGoal,
                    onNo: () => setShowPopupDelete(false),
                    setDeleteGoal: deleteGoal,
                }}
                successDeleteGoalModal={{
                    setShowPopupDeleteSuccess,
                    showPopupDeleteSuccess,
                    setGoBack: props.navigation.goBack,
                }}
                successPinnedGoalModal={{
                    setShowPopupPinSuccess,
                    showPopupPinSuccess,
                    isPinnedText: copyPinned,
                }}
                userId={user.id}
                memberGoal={{
                    getInitialParticipants,
                    goalMemberMapID: goalMemberMapID as string[],
                    onAddUserToMemberGoal,
                    setShowPopupMemberGoal,
                    showPopupMemberGoal,
                    visitAnotherUser,
                    onCancel: () => setShowPopupMemberGoal(false),
                    onMemberChange: setMembers,
                    onRemoveUserToMemberGoal: onRemoveUserFromMemberGoal,
                    isEditable: !params.readonly && isOwner,
                    isMemberLoading: memberIDsLoading.current,
                }}
            />
        </DocheckSafeAreaView>
    )
}
