/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'
import Carousel from 'react-native-snap-carousel-v4'

// @entity
import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import { Task } from 'src/entity/Task.entity'

// @hooks
import useAuthorization from 'src/hook/useAuthorization'
import useConnected from 'src/hook/useConnected'
import useDailyTaskList from 'src/hook/useDailyTaskList'

import useUserCredential from 'src/hook/useUserCredential'
import useHomepage from 'src/hook/useHomepage'

// @helpers
import {
    DailyTaskType,
    TabSwitchHeaderType,
} from 'src/pages/inside-pages/home/types'
import { TITLE_GOAL } from 'src/utils/lang'
import {
    getTickHandler,
    initializeDailyTask,
    initializeGoal,
    initializeGroupGoals,
    initializeGroupTask,
    initializePersonalTask,
    initializePinnedGoals,
    initializePinnedGroupGoal,
    initializePinnedPersonalGoal,
    initializeTaskActive,
    onCheckHandler,
    onSetDailyTaskList,
    onUncheckHandler,
    setDetailGoal,
    setLoadingCardGoal,
    setTabGoal,
    setRecommendationGoals as setRecommendationGoalActions,
} from 'src/store/actions'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { User } from 'src/entity/User.entity'
import { Nullable } from 'src/utils/types'
import { NavProps } from 'src/utils/const'

// @another
import { GroupTaskData } from 'src/pages/inside-pages/daily-task/interface'
import { ACTIVE_TAB, ROUTE_PAGE } from 'src/utils/types/componentsTypes'
import { GoalsPageParams } from 'src/pages/inside-pages/goals/params'
import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { TaskPageParams } from 'src/pages/inside-pages/task/params'

type SetDailyTaskTab = (status: DailyTaskType) => {
    type: string
    payload: DailyTaskType
}

export interface WithMainHomepageHOCProps extends NavProps {
    activeTab: TabSwitchHeaderType
    refreshControl: JSX.Element
    user: User
    goalTitleMemo: string
    onGotoGoalDetailPage: ({ id }: Goals) => void
    isLoadingCardGoal: boolean
    pinnedGoalGroup: Goals[]
    isHideGoal: boolean
    isEmptyGoals: boolean
    isLoadingGoal: boolean
    isLoadingTask: boolean
    myTask: Task[][]
    setDailyTaskTab: SetDailyTaskTab
    isLoadingRecommendation: boolean
    recomendationGoals: Goals[]
    setActiveTab: (status: any) => void
    changeTabHandler: (activeTab: TabSwitchHeaderType) => void
    onReadMore: () => void
    onTaskPressHandler: (task: Task) => void
    onTaskTick: (task: Task, done: boolean) => Promise<void>
    onReadMoreDailyTask: () => void
    onPressRecommendationGoals: (goal: Goals & PromotionGoals) => void
    onPressReadMoreRecommendation: () => void
    setForwardRef: (ref: Nullable<Carousel<any>>) => void
}

export default function WithMainHomepage<
    T extends WithMainHomepageHOCProps = WithMainHomepageHOCProps
>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentMainWithHomepage = (props: WithMainHomepageHOCProps) => {
        const dispatch = useDispatch()

        const { connected } = useConnected()
        const auth = useAuthorization(props.navigation)
        const { setDailyTaskTab } = useDailyTaskList()
        const user = useUserCredential()
        const {
            activeTask,
            groupAllTask,
            isHideGoal,
            isLoadingCardGoal,
            myGoals,
            myGroupGoals,
            myPinnedGoals,
            myTask,
            personalAllTask,
            pinnedGoalGroup,
            recomendationGoals,
        } = useHomepage()

        const [activeTab, setActiveTab] = useState<TabSwitchHeaderType>(
            ACTIVE_TAB.FIRST_TAB
        )
        const [isLoadingGoal, setLoadingGoal] = useState<boolean>(false)
        const [isLoadingRecommendation, setLoadingRecommendation] =
            useState<boolean>(false)
        const [isLoadingTask] = useState<boolean>(false)
        const [forwardRef, setForwardRef] = useState<Carousel<any>>()

        const isEmptyGoals = useMemo(
            () =>
                activeTab == 'saya'
                    ? !isEmpty(myGoals)
                    : !isEmpty(myGroupGoals),
            [activeTab, myGoals, myGroupGoals]
        )

        const goalTitleMemo = useMemo<string>(
            () =>
                activeTab == ACTIVE_TAB.FIRST_TAB
                    ? TITLE_GOAL.MY_GOAL
                    : TITLE_GOAL.GROUP_GOAL,
            [activeTab, ACTIVE_TAB, TITLE_GOAL]
        )

        const getDataGoalRecommendation = useCallback(async () => {
            setLoadingRecommendation(true)
            const isDone = (status: boolean) => {
                setLoadingRecommendation(false)
            }
            const isLoading = (status: boolean) => {
                setLoadingRecommendation(false)
            }

            dispatch(
                setRecommendationGoalActions({
                    token: auth,
                    isConnected: connected,
                    isDone,
                    isLoading,
                    query: {
                        limit: 10,
                        offset: 0,
                    },
                })
            )
        }, [
            setRecommendationGoalActions,
            setLoadingRecommendation,
            connected,
            auth,
        ])

        const onActiveTabChangeHandler = useCallback(() => {
            if (activeTab === ACTIVE_TAB.FIRST_TAB) {
                dispatch(
                    initializeGoal({
                        token: auth,
                        isLoading: setLoadingGoal,
                        isConnected: connected,
                    })
                )
                dispatch(
                    initializePinnedGoals({
                        token: auth,
                        isConnected: connected,
                    })
                )
            }

            if (activeTab === ACTIVE_TAB.SECOND_TAB) {
                dispatch(
                    initializeGroupGoals({
                        token: auth,
                        isLoading: setLoadingGoal,
                        isConnected: connected,
                    })
                )
            }
        }, [
            activeTab,
            ACTIVE_TAB.FIRST_TAB,
            initializeGroupGoals,
            setLoadingGoal,
            initializeGoal,
            initializePinnedGoals,
            auth,
            setLoadingGoal,
        ])

        const onReadMore = useCallback(() => {
            props.navigation.navigate(ROUTE_PAGE.GOALS, {
                jenis: activeTab,
            } as GoalsPageParams)
        }, [activeTab])

        const onGotoGoalDetailPage = useCallback(
            ({ id }: Goals) => {
                dispatch(setDetailGoal({ goalId: id }))
                props.navigation.navigate(ROUTE_PAGE.GOAL, {
                    id,
                } as GoalPageParams)
            },
            [setDetailGoal]
        )

        const onTaskPressHandler = useCallback(
            (task: Task) => {
                const activeTabGoals =
                    activeTab == 'saya' ? myGoals : myGroupGoals
                const goal = activeTabGoals.find((x) =>
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
            [myGoals, myGroupGoals, activeTab]
        )

        const onReadMoreDailyTask = useCallback(
            () => props.navigation.navigate(ROUTE_PAGE.DAILY_TASK),
            []
        )

        const onPressRecommendationGoals = useCallback(
            (goal: Goals & PromotionGoals) =>
                goal.isPromoted
                    ? props.navigation.navigate(ROUTE_PAGE.ADS_GOAL, {
                          goal,
                      })
                    : props.navigation.navigate(ROUTE_PAGE.PREDEFINED_GOAL, {
                          goal,
                      }),
            []
        )

        const onPressReadMoreRecommendation = useCallback(
            () => props.navigation.navigate(ROUTE_PAGE.PREDEFINED_GOALS),
            []
        )

        const onTaskTick = useCallback(
            async (task: Task, done: boolean) => {
                let goal: Goals | undefined

                if (activeTab == ACTIVE_TAB.FIRST_TAB)
                    goal = myGoals.find((myGoal) =>
                        myGoal.tasks.some(
                            (myGoalTask) => myGoalTask.id == task.id
                        )
                    )

                if (activeTab == ACTIVE_TAB.SECOND_TAB)
                    goal = myGroupGoals.find((myGoal) =>
                        myGoal.tasks.some(
                            (myGoalTask) => myGoalTask.id == task.id
                        )
                    )

                const isCompleteBy = (goal?.goalMembers ?? []).find(
                    (gm: GoalMembers) => gm.user?.id === user.id
                )

                if (goal) {
                    // handling the tick or check or unchecked
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
            [auth, activeTab, pinnedGoalGroup, connected, user]
        )

        /**
         * Initial configuration of APP
         */
        const initialApp = useCallback(() => {
            setLoadingGoal(true)
            dispatch(setLoadingCardGoal())
            dispatch(
                initializeGoal({
                    token: auth,
                    isLoading: setLoadingGoal,
                    isConnected: connected,
                })
            )
            dispatch(
                initializePinnedGoals({ token: auth, isConnected: connected })
            )
            dispatch(
                initializeGroupGoals({
                    token: auth,
                    isLoading: setLoadingGoal,
                    isConnected: connected,
                })
            )
            getDataGoalRecommendation()
        }, [
            auth,
            setLoadingGoal,
            connected,
            initializeGoal,
            initializePinnedGoals,
            initializeGroupGoals,
            getDataGoalRecommendation,
            setLoadingCardGoal,
        ])

        const onRefresh = useCallback(() => {
            onActiveTabChangeHandler()
            getDataGoalRecommendation()
            initialApp()
        }, [onActiveTabChangeHandler, getDataGoalRecommendation, initialApp])

        const refreshControl = useMemo(
            () => <RefreshControl refreshing={false} onRefresh={onRefresh} />,
            [onRefresh]
        )

        const changeTabHandler = useCallback(
            (activeTab: TabSwitchHeaderType) => {
                setActiveTab(activeTab)
                setDailyTaskTab('hari-ini')
            },
            [setActiveTab, activeTab]
        )

        const backToFirstGoalSlide = useCallback(
            () => forwardRef?.snapToItem(0),
            [forwardRef]
        )

        useEffect(() => {
            // if (activeTab) setDailyTaskTab('hari-ini')
            if (activeTab == ACTIVE_TAB.FIRST_TAB)
                dispatch(initializeDailyTask(personalAllTask))
            if (activeTab == ACTIVE_TAB.SECOND_TAB)
                dispatch(initializeDailyTask(groupAllTask))
        }, [activeTab, personalAllTask, groupAllTask])

        // dispatch this if myGoals is ready
        useEffect(() => {
            if (!isEmpty(myGoals)) dispatch(initializePersonalTask(myGoals))
        }, [myGoals])

        // dispatch this if myGroupGoals is ready
        useEffect(() => {
            if (!isEmpty(myGroupGoals))
                dispatch(initializeGroupTask(myGroupGoals))
        }, [myGroupGoals])

        /**
         * Group Task With Active Case
         */
        useEffect(() => {
            const groupingTask = activeTask.map(
                (curr: GroupTaskData) => curr.tasks
            )
            dispatch(initializeTaskActive(groupingTask))
        }, [activeTask])

        /**
         * Grouping the pin and unpinned goal
         */
        useEffect(() => {
            if (activeTab == ACTIVE_TAB.SECOND_TAB && myGroupGoals)
                dispatch(
                    initializePinnedGroupGoal({
                        pinnedGoals: myPinnedGoals,
                        goals: myGroupGoals,
                    })
                )

            if (activeTab == ACTIVE_TAB.FIRST_TAB && myGoals)
                dispatch(
                    initializePinnedPersonalGoal({
                        pinnedGoals: myPinnedGoals,
                        goals: myGoals,
                    })
                )

            dispatch(setTabGoal(activeTab))
            backToFirstGoalSlide()
        }, [
            myGoals,
            myGroupGoals,
            activeTab,
            myPinnedGoals,
            setTabGoal,
            backToFirstGoalSlide,
        ])

        /**
         * @ComponentDidMount handler
         */
        useEffect(() => {
            if (auth) {
                const splitToken = auth.split(' ') // simple tokenValidator
                if (splitToken[splitToken.length - 1]) initialApp()
            }
        }, [auth])

        useEffect(() => {
            dispatch(onSetDailyTaskList('hari-ini'))
        }, [])

        // props comes afterwards so the can override the default ones.
        return (
            <WrappedComponent
                {...{
                    activeTab,
                    changeTabHandler,
                    goalTitleMemo,
                    isEmptyGoals,
                    isHideGoal,
                    isLoadingCardGoal,
                    isLoadingGoal,
                    isLoadingRecommendation,
                    isLoadingTask,
                    myTask,
                    onGotoGoalDetailPage,
                    onPressReadMoreRecommendation,
                    onPressRecommendationGoals,
                    onReadMore,
                    onReadMoreDailyTask,
                    onTaskPressHandler,
                    onTaskTick,
                    pinnedGoalGroup,
                    recomendationGoals,
                    refreshControl,
                    setActiveTab,
                    setDailyTaskTab,
                    user,
                    setForwardRef,
                }}
                {...(props as T)}
            />
        )
    }

    ComponentMainWithHomepage.displayName = `withMainHomePage(${displayName})`

    return ComponentMainWithHomepage
}
