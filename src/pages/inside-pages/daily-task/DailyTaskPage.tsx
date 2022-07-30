/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, size, toLower } from 'lodash'

// @components
import BoxHapusData from 'src/components/atoms/boxHapusData'
import CarouselGrupDailyTask from 'components/carousel-grup-daily-task/CarouselGrupDailyTask'
import DailyTaskPageMenu from 'components/daily-task-page-menu/DailyTaskPageMenu'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

import LoadingFull from 'components/loading/LoadingFull'
import Space from 'src/components/atoms/space'
import TabHeader from 'src/components/atoms/tabHeader'
import WithPadding from 'src/components/atoms/withPadding'
import PopupDescriptionTask from 'src/components/molecules/popupDescriptionTask'
import SearchTask from 'src/components/molecules/dailyTaskList/searchTask'
import HeaderTask from 'src/components/molecules/dailyTaskList/headerTask'

// @utils
import { NavProps } from 'src/utils/const'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { Goals } from 'src/entity/Goals.entity'
import { Task } from 'src/entity/Task.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'
import { useStateRef } from 'src/hook/useStateRef'
import useConnected from 'src/hook/useConnected'
import StoreData from 'store/types'
import { isIOS, TypingTimeout } from 'src/utils'
import BackService from 'src/services/BackHandler/backService'
import { DAILY_TASK_PROPERTY } from 'src/utils/types/componentsTypes'
import {
    getTickHandler,
    onCheckHandler,
    onDeleteAllTask,
    onDeleteSingleTask,
    onUncheckHandler,
    setTickHandler,
} from 'src/store/actions'
import {
    findTaskBelongsGoal,
    groupTaskByDone,
    groupTaskByUndone,
    setupTaskDailyTask,
} from 'src/utils/module/goal'

import { AbsoluteBottomView } from 'src/pages/inside-pages/goals/styled'
import { TaskPageParams } from 'src/pages/inside-pages/task/params'
import { AbsoluteMenuContainer } from 'src/pages/inside-pages/task/styled'
import { GroupTaskData } from './interface'
import { DailyTaskPageContainer } from './styled'

import { TaskListType } from 'src/utils/types'
import useDailyTaskList from 'src/hook/useDailyTaskList'
import useUserCredential from 'src/hook/useUserCredential'

interface DailyTaskPageProps extends NavProps {}

const backService = new BackService()

export default function DailyTaskPage(props: DailyTaskPageProps) {
    const dispatch = useDispatch()

    const { connected } = useConnected()
    const { dailyTaskTab, setDailyTaskTab } = useDailyTaskList()
    const [keyboard_height] = useKeyboard()
    const auth = useAuthorization(props.navigation)
    const user = useUserCredential()

    const goals = useSelector(({ myGoals }: StoreData) => myGoals.goals)
    const myGroupGoals = useSelector(
        ({ myGoals }: StoreData) => myGoals.groupGoals
    )
    const dailyTask = useSelector(({ task }: StoreData) => task.allDailyTask)

    const [continueToDelete, setContinueDelete] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState<TypingTimeout>({
        is_typing: false,
        timeout: null,
    })
    // const [dailyTaskTab, setDailyTaskTab] = useState<DailyTaskType>('terlewat')
    const [query, setQuery] = useState<string>('')
    const [filterQuery, setFilterQuery] = useState<string>('')
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCheck, setShowCheck] = useState<boolean>(false)
    const [checkedIds, setCheckedIDs] = useState<string[]>([])
    const [groupTaskHasDone, setGroupTaskDataDone] = useState<GroupTaskData[]>(
        []
    )
    const [groupTaskHasBeenDone, setGroupTaskDataNotDone] = useState<
        GroupTaskData[]
    >([])
    const [taskIdsLoading, setTaskIDsLoading] = useStateRef<string[]>([])
    const [loadingTask, setLoadingTask] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
    const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false)
    const [showPopupDeleteAll, setShowPopupDeleteSemua] =
        useState<boolean>(false)
    const [isSuccessPopupDelete, setShowPopupDeleteSuccess] =
        useState<boolean>(false)
    const [isSuccessPopupDeleteAll, setShowPopupDeleteSemuaSuccess] =
        useState<boolean>(false)
    const [enabledActionMenu, setEnabledActionMenu] = useState(false)
    const [listTaskMemo, setListTaskMemo] = useState<TaskListType>([])

    const activeListDoneTask = useMemo(
        () =>
            groupTaskHasDone.find(
                (gt: GroupTaskData) => gt.type === dailyTaskTab
            )?.tasks ?? [],
        [groupTaskHasDone, dailyTaskTab]
    )

    const activeListNotDoneTask = useMemo(
        () =>
            groupTaskHasBeenDone.find(
                (gt: GroupTaskData) => gt.type === dailyTaskTab
            )?.tasks ?? [],
        [dailyTaskTab, groupTaskHasBeenDone]
    )

    const groupAllGoals = useMemo(
        () => [...goals, ...myGroupGoals],
        [goals, myGroupGoals]
    )

    const modeUnselect = useMemo(
        () =>
            activeListDoneTask.length + activeListNotDoneTask.length ===
            checkedIds.length,
        [activeListDoneTask, activeListNotDoneTask, checkedIds]
    )

    const onTaskTick = useCallback<(task: Task, done: boolean) => void>(
        (task, done) => {
            const goal = findTaskBelongsGoal(groupAllGoals, task.id!)

            const isCompleteBy = (goal?.goalMembers ?? []).find(
                (gm: GoalMembers) => gm.user?.id === user.id
            )

            if (goal) {
                dispatch(
                    getTickHandler({
                        taskId: task.id!,
                        isCompleteBy,
                        goalId: goal.id,
                    })
                )

                // onUpdateGroupGoal(task.id!, pinnedGoalGroup)
                if (done)
                    // handling checked handler
                    dispatch(
                        onCheckHandler({
                            token: auth,
                            goalId: goal.id,
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
                            goalId: goal.id,
                            taskId: task.id!,
                            isConnected: connected,
                            user,
                        })
                    )
            }
        },
        [
            auth,
            setTickHandler,
            onUncheckHandler,
            onCheckHandler,
            groupAllGoals,
            connected,
            findTaskBelongsGoal,
            user,
        ]
    )

    const continueDeleteAllTask = useCallback(() => {
        setLoadingDelete(true)
        const onDone = (status: boolean) => {
            setShowPopupDeleteSuccess(!status)
            setTimeout(() => {
                setContinueDelete(status)
                setShowCheck(status)
                setLoadingDelete(status)
                setShowPopupDeleteSuccess(status)
            }, 1000)
        }
        dispatch(
            onDeleteAllTask({
                token: auth,
                isConnected: connected,
                isLoading: onDone,
            })
        )
    }, [
        onDeleteAllTask,
        setLoadingDelete,
        setShowPopupDeleteSuccess,
        setContinueDelete,
        auth,
        connected,
        setShowCheck,
        setContinueDelete,
    ])

    const continueDeleteTasks = useCallback(() => {
        setLoadingDelete(true)

        const onDone = (status: boolean) => {
            setShowPopupDeleteSuccess(true)
            setTimeout(() => {
                setShowPopupDeleteSuccess(status)
                setContinueDelete(status)
                setShowCheck(status)
                setLoadingDelete(status)
            }, 1000)
        }

        dispatch(
            onDeleteSingleTask({
                body: {
                    taskIds: checkedIds,
                },
                token: auth,
                isConnected: connected,
                isLoading: onDone,
            })
        )
    }, [
        setLoadingDelete,
        goals,
        myGroupGoals,
        setShowPopupDeleteSuccess,
        setShowCheck,
        checkedIds,
        auth,
        onDeleteSingleTask,
        setContinueDelete,
    ])

    const deleteAllTask = useCallback(() => {
        setContinueDelete(true)
        setShowPopupDeleteSemua(false)
    }, [setContinueDelete, setShowPopupDeleteSemua])

    const onQueryChange = useCallback<(query: string) => void>(
        (query) => {
            if (typingTimeout.is_typing) clearTimeout(typingTimeout.timeout)

            setTypingTimeout({
                ...typingTimeout,
                is_typing: true,
            })

            setTimeout(() => {
                setTypingTimeout({
                    ...typingTimeout,
                    is_typing: false,
                })
                setFilterQuery(query.toLowerCase())
            }, 300)
        },
        [
            typingTimeout.is_typing,
            clearTimeout,
            setFilterQuery,
            setTypingTimeout,
        ]
    )
    

    const onChangeCheckTask = useCallback<(task: Task, check: boolean) => void>(
        (task, check) => {
            if (check) {
                if (checkedIds.includes(task.id ?? '')) return
                setCheckedIDs([...checkedIds, task.id ?? ''])
            } else
                setCheckedIDs(
                    checkedIds.filter((task_id: string) => task_id !== task.id)
                )
        },
        [checkedIds, setCheckedIDs]
    )

    const deleteTasks = useCallback(() => {
        setShowPopupDelete(false)
        setContinueDelete(true)
    }, [setContinueDelete, setShowPopupDelete])

    const gotoTask = useCallback<(taks: Task) => void>(
        (task) => {
            const goal = groupAllGoals.find((x: Goals) =>
                x.tasks.map((y) => y.id ?? '-').includes(task.id ?? '')
            )
            const params: TaskPageParams = {
                data: task,
                goal_id: goal?.id ?? '',
                is_pinned: false,
                onTaskPinned() {},
                onTaskUnpinned() {},
            }
            props.navigation.navigate('Task', params)
        },
        [groupAllGoals, props.navigation.navigate]
    )
  

    const onPilihSemua = useCallback(() => {
        if (
            size(activeListDoneTask) + size(activeListNotDoneTask) ===
            size(checkedIds)
        )
            setCheckedIDs(new Array())
        else
            setCheckedIDs(
                [...activeListDoneTask, ...activeListNotDoneTask].map(
                    (x) => x.id ?? ''
                )
            )
    }, [activeListDoneTask, checkedIds, activeListNotDoneTask, setCheckedIDs])

    const onLongPress = useCallback<(task: Task) => void>(
        (task) => {
            setShowCheck(true)
            setCheckedIDs([task.id ?? ''])
        },
        [setShowCheck, setCheckedIDs]
    )

    const backAction = useCallback(() => {
        if (showCheck) {
            setShowCheck(false)
            setCheckedIDs([])
            return true
        }
        props.navigation.goBack()
        return true
    }, [showCheck, setShowCheck, setCheckedIDs, props.navigation.goBack])


    const handleBackButton = () => {
        props.navigation.goBack();
        return true;
      }

    useEffect(() => {
        if (!isEmpty(dailyTask)) {
            setLoadingTask(true)
            let groupTest!: Task[]
            if (!filterQuery)
                groupTest = dailyTask.map((item) => item.tasks).flat()
            else {
                groupTest = dailyTask
                    .map((item) =>
                        item.tasks.filter(
                            (task) => !toLower(task.title).indexOf(filterQuery)
                        )
                    )
                    .flat()
            }

            setGroupTaskDataDone(groupTaskByDone(groupTest))
            setGroupTaskDataNotDone(groupTaskByUndone(groupTest))
        }
     
        setLoadingTask(false)
    }, [dailyTask, filterQuery])


    BackHandler.addEventListener('hardwareBackPress', handleBackButton)

    useEffect(() => {
        if (!showCheck) backService.removeBackHandler(backAction)
        else backService.addBackHandler(backAction)
        // backService.addBackHandler(backAction)
    }, [showCheck])

    useEffect(() => {
        setListTaskMemo(
            setupTaskDailyTask(
                new Array(size(DAILY_TASK_PROPERTY)).fill(0),
                groupTaskHasDone,
                groupTaskHasBeenDone
            )
        )
    }, [groupTaskHasDone, groupTaskHasBeenDone])

    useEffect(() => {
        onQueryChange(query)
    }, [query])

    useEffect(() => setEnabledActionMenu(!(size(checkedIds) > 0)), [checkedIds])

    return (
        <DocheckSafeAreaView>
            <AbsoluteMenuContainer
                style={{ left: showMenu ? 0 : '100%' }}
                onTouchEnd={() => {
                    setShowMenu(false)
                }}
            >
                <DailyTaskPageMenu
                    enableMenu={enabledActionMenu}
                    onPilih={() => setShowCheck(true)}
                    onHapusSemua={() => setShowPopupDeleteSemua(true)}
                />
            </AbsoluteMenuContainer>
            <DailyTaskPageContainer>
                <View>
                    <WithPadding>
                        <Space value={7} />
                        <HeaderTask
                            backAction={backAction}
                            enabledActionMenu={enabledActionMenu}
                            navigation={props.navigation}
                            setShowMenu={setShowMenu}
                        />
                        <Space value={7} />
                        <SearchTask query={query} setQuery={setQuery} />
                        <Space value={17} />
                    </WithPadding>
                    <TabHeader
                        setActive={setDailyTaskTab}
                        tabs={DAILY_TASK_PROPERTY}
                    />
                    <Space value={10} />
                </View>
                <CarouselGrupDailyTask
                    checkMode={showCheck}
                    loading={loadingTask}
                    onTaskLongPress={onLongPress}
                    style={{
                        width: '100%',
                        flex: 1,
                    }}
                    onTick={onTaskTick}
                    onTaskPress={gotoTask}
                    checkIDs={checkedIds}
                    listTaskIDsLoading={taskIdsLoading.current}
                    onContainerCheckChange={onChangeCheckTask}
                    activeTab={dailyTaskTab!}
                    onActiveTabChange={setDailyTaskTab}
                    listTasks={listTaskMemo}
                    height={100}
                />
                <Space value={isIOS * keyboard_height} />
                <AbsoluteBottomView
                    style={{ display: showCheck ? 'flex' : 'none' }}
                >
                        <BoxHapusData
                            showCheck={backAction}
                            navigation={props.navigation}
                            onPilihSemua={onPilihSemua}
                            modeUnselect={modeUnselect}
                            onHapus={() => setShowPopupDelete(true)}
                            showHapus={checkedIds.length > 0}
                        />
                </AbsoluteBottomView>
            </DailyTaskPageContainer>
            <LoadingFull loading={loadingDelete} />
            <PopupDescriptionTask
                deleteTask={{
                    showPopupDelete,
                    continueDeleteTasks,
                    continueToDelete,
                    deleteTasks,
                    setLoadingDelete,
                    setShowPopupDelete,
                }}
                deleteAllTask={{
                    continueDeleteAllTask,
                    deleteAllTask,
                    setShowPopupDeleteSemua,
                    showPopupDeleteAll,
                }}
                successDelete={{
                    isSuccessPopupDelete,
                    setCheckedIDs,
                    setShowCheck,
                    setShowPopupDeleteSuccess,
                }}
                successDeleteTask={{
                    goBack: props.navigation.goBack,
                    isSuccessPopupDeleteAll,
                    setShowPopupDeleteSemuaSuccess,
                }}
            />
        </DocheckSafeAreaView>
    )
}
