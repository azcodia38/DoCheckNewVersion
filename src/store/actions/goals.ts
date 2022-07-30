/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { Goals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { Task } from 'src/entity/Task.entity'
import { v4 as uuidv4 } from 'uuid'

import * as Types from 'src/store/types'
import {
    PayloadResponse,
    CheckedHandler,
    Spread,
    TickHandler,
    SubmitGoalDetailAPI,
    GoalAPI,
    PinnedGroupGoal,
    PickOne,
    AddingTaskAPI,
    SetGoalLocal,
    FilterProcessGoal,
    GoalGroupAPI,
    DeleteSingleTask,
    PinGoalType,
    SetTaskLocal,
    AnotherUserGoalAPI,
    MemberGoalType,
    LimitOffset,
} from 'src/utils/types'
import { NotificationTask, OfflineModeState, Optional } from 'store/types'
import { store } from 'store'
import { TabSwitchHeaderType } from 'src/pages/inside-pages/home/types'
import { User } from 'src/entity/User.entity'
import { PaginationGoalResult } from 'src/api/my-goal'

/**
 *
 * @description
 *
 * Goal Action
 */

export const initializeGoal = (payload: PayloadResponse) => ({
    type: Types.Goal.GET_USER_GOAL,
    payload,
})

export const initializeMemberGoal = (
    payload: PayloadResponse<MemberGoalType>
) => ({
    type: Types.Goal.SET_ADDING_MEMBER_IN_GOAL,
    payload,
})

export const removingMemberGoal = (
    payload: PayloadResponse<MemberGoalType>
) => ({
    type: Types.Goal.SET_REMOVING_MEMBER_IN_GOAL,
    payload,
})

export const initializePinnedGoals = (payload: PayloadResponse) => ({
    type: Types.Goal.GET_PINNED_GOAL,
    payload,
})

export const initializeGroupGoals = (payload: PayloadResponse) => ({
    type: Types.Goal.GET_USER_GROUP_GOAL,
    payload,
})

export const initializeRecommendationGoals = (
    payload: PaginationGoalResult
) => ({
    type: Types.Goal.GET_RECOMMENDATION_GOAL,
    payload,
})

export const setRecommendationGoals = (
    payload: PayloadResponse<LimitOffset>
) => ({
    type: Types.Goal.SET_RECOMMENDATION_GOAL,
    payload,
})

export const setLoadingCardGoal = () => ({
    type: Types.Goal.SET_LOADING_CARD_GOAL,
})

export const setTabGoal = (activeTab: TabSwitchHeaderType) => ({
    type: Types.Goal.ON_SET_TYPE_TAB_GOAL,
    payload: activeTab,
})

export const initializeGoalLocal = (goals: Goals) => {
    const payload: SetGoalLocal = {
        goals,
        pinnedGoals: store.getState().myPinnedGoals.goals,
    }
    return {
        type: Types.Goal.SET_GOAL_LOCAL,
        payload,
    }
}

export const initializeTaskLocal = (task: Task) => {
    const payload: SetTaskLocal = {
        task,
    }
    return {
        type: Types.Task.SET_TASK_LOCAL,
        payload,
    }
}

export const setDetailGoal = (payload: { goalId: string }) => ({
    type: Types.Goal.ON_DETAIL_GOAL,
    payload,
})

export const initializePinnedPersonalGoal = (payload: PinnedGroupGoal) => ({
    type: Types.Goal.GET_PINNED_GOAL_PERSONAL,
    payload,
})

export const initializePinnedGroupGoal = (payload: PinnedGroupGoal) => ({
    type: Types.Goal.GET_PINNED_GOAL_GROUP,
    payload,
})

export const initializePinnedGoal = (pinnedGoal: PinnedGoals[]) => ({
    type: Types.Goal.SET_PINNED_GOAL,
    payload: pinnedGoal,
})

export const initializePublicGoal = (payload: GoalAPI) => ({
    type: Types.Goal.SET_PUBLIC_GOAL,
    payload,
})

export const initializeOnFilterProcessGoal = (payload: FilterProcessGoal) => ({
    type: Types.Goal.ON_FILTER_PROCESS_GOAL,
    payload,
})

export const initializePrivateGoal = (payload: GoalAPI) => ({
    type: Types.Goal.SET_PRIVATE_GOAL,
    payload,
})

export const onPinnedGoalDetail = (goalId: string) => ({
    type: Types.Goal.ON_PINNED_GOAL_DETAIL,
    payload: goalId,
})

export const onSetTickDetailGoalHandler = (payload: TickHandler) => ({
    type: Types.Goal.ON_SET_TICK_DETAIL_GOAL,
    payload,
})

export const onSetNotificationTask = (payload: Task[]) => ({
    type: Types.Task.SET_NOTIFICATION_TASK,
    payload,
})

export const onSetNotificationTaskRing = (payload: NotificationTask) => ({
    type: Types.Task.SET_NOTIFICATON_TASK_RING,
    payload,
})

export const initializeOfflineModeGoal = (
    payload: Optional<OfflineModeState, 'id'>
) => ({
    type: Types.OFFLINE_MODE.SET_OFFLINE_GOAL_MODE,
    payload: {
        id: uuidv4().toString(),
        ...payload,
    },
})

export const initializeOfflineModeGeneral = (
    payload: Optional<OfflineModeState, 'id'>
) => ({
    type: Types.OFFLINE_MODE.SET_OFFLINE_GENERAL,
    payload,
})

export const initializeOfflineModeTask = (
    payload: Optional<OfflineModeState, 'id'>
) => ({
    type: Types.OFFLINE_MODE.SET_OFFLINE_TASK_MODE,
    payload,
})

export const initializeDetailTask = (taskId: string) => ({
    type: Types.Task.GET_DETAIL_TASK,
    payload: taskId,
})

export const initializeCleanOfflineRequest = (requestId: string) => ({
    type: Types.OFFLINE_MODE.CLEAN_OFFLINE_REQUEST,
    payload: requestId,
})

export const initializeSyncOfflineMode = (payload: OfflineModeState) => ({
    type: Types.OFFLINE_MODE.SYNC_OFFLINE_MODE,
    payload,
})

export const onDeleteGoalHandler = (
    payload: Spread<[PayloadResponse, GoalAPI]>
) => ({
    type: Types.Goal.ON_DELETE_GOAL,
    payload,
})

export const onCheckHandler = (
    payload: Spread<[PayloadResponse, CheckedHandler]>
) => ({
    type: Types.Goal.ON_CHECK_HANDLER,
    payload,
})

export const onUncheckHandler = (
    payload: Spread<[PayloadResponse, CheckedHandler]>
) => ({
    type: Types.Goal.ON_UNCHECK_HANDLER,
    payload,
})

export const setUncheckHandlerLocal = (taskId: string) => ({
    type: Types.Goal.SET_UNCHECK_HANDLER_LOCAL,
    payload: taskId,
})

export const setCheckHandlerLocal = (taskId: string, user: User) => ({
    type: Types.Goal.SET_CHECK_HANDLER_LOCAL,
    payload: { taskId, user },
})

export const onUpdateGoalHandler = (payload: SubmitGoalDetailAPI) => ({
    type: Types.Goal.ON_UPDATE_GOAL_HANDLER,
    payload,
})

export const onSubmitGoalHandler = (payload: SubmitGoalDetailAPI) => ({
    type: Types.Goal.ON_CREATE_GOAL_HANDLER,
    payload,
})

export const findGoal = (payload: GoalAPI) => ({
    type: Types.Goal.ON_FIND_GOAL,
    payload,
})

export const findUpdateGoal = (payload: GoalAPI) => ({
    type: Types.Goal.GET_UPDATED_GOAL,
    payload,
})

export const deleteGoal = (payload: PickOne<GoalAPI>) => ({
    type: Types.Goal.GET_DELETED_GOAL,
    payload,
})

export const deleteGoalGroup = (payload: GoalGroupAPI) => ({
    type: Types.Goal.ON_DELETED_GOAL_GROUP,
    payload,
})

export const resetGoal = () => ({
    type: Types.Goal.DEFAULT_GOAL_STATE,
})

export const resetPinnedGoal = () => ({
    type: Types.Goal.DEFAULT_PINNED_GOAL_STATE,
})

export const setAddingTask = (payload: AddingTaskAPI) => ({
    type: Types.Task.SET_ADDING_TASK,
    payload,
})

export const onDeleteAllGroup = (payload: GoalGroupAPI) => ({
    type: Types.Goal.ON_DELETED_ALL_GOAL_GROUP,
    payload,
})

export const onDeleteSingleTaskInGoal = (payload: DeleteSingleTask) => ({
    type: Types.Goal.SET_DELETE_SINGLE_TASK,
    payload,
})

export const onDeleteAllTaskInGoal = () => ({
    type: Types.Goal.SET_DELETE_ALL_TASK,
})

export const onDeleteSingleTask = (payload: DeleteSingleTask) => ({
    type: Types.Task.SET_DELETE_SINGLE_TASK,
    payload,
})

export const onDeleteAllTask = (payload: PayloadResponse) => ({
    type: Types.Task.SET_DELETE_ALL_TASK,
    payload,
})

export const onSetPinGoal = (payload: PinGoalType) => ({
    type: Types.Goal.ON_SET_PIN_GOAL,
    payload,
})

export const onSetAnotherUserGoal = (payload: AnotherUserGoalAPI) => ({
    type: Types.Goal.FETCHING_ANOTHER_USER_GOAL,
    payload,
})

export const onGetAnotherUserGoal = (payload: Goals[]) => ({
    type: Types.Goal.GET_ANOTHER_USER_GOAL,
    payload,
})

export const onSetDetailAnotherUserGoal = (payload: { goalId: string }) => ({
    type: Types.Goal.SET_DETAIL_GOAL_ANOTHER_USER,
    payload,
})

export const onSetCountPromotionCTA = (
    payload: PayloadResponse<{ goalId: string }>
) => ({
    type: Types.Goal.SET_COUNT_PROMOTION_CTA,
    payload,
})
