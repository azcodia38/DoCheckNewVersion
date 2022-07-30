/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { CreateGoalRequest } from 'src/api/my-goal'
import { Goals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { Task } from 'src/entity/Task.entity'
import { DailyTaskType } from 'src/pages/inside-pages/home/types'

import * as Types from 'src/store/types'
import {
    ReducerAction,
    TickHandler,
    ResponseAddingTask,
    GetGoals,
    DeleteGoalGroup,
    DeleteTaskGroup,
    SyncGoal,
    GoalTaskId,
    GoalTask,
    FetchTaskAPI,
    UpdateTaskAPI,
} from 'src/utils/types'
import { store } from 'store'

/**
 *
 * @description
 *
 * Task Action
 */

export const getResponseAddingTask = (payload: ResponseAddingTask) => ({
    type: Types.Task.GET_RESPONSE_ADDING_TASK,
    payload,
})

export const getDeleteAllTask = () => ({
    type: Types.Task.GET_DELETE_ALL_TASK,
})

export const resetTask = () => ({
    type: Types.Task.DEFAULT_TASK_STATE,
})

export const initializePersonalTask = (payload: Goals[]) => ({
    type: Types.Task.SET_PERSONAL_TASK,
    payload,
})

export const initializeGroupTask = (payload: Goals[]) => ({
    type: Types.Task.SET_GROUP_TASK,
    payload,
})

export const initializeDailyTask = (payload: Task[]) => ({
    type: Types.Task.SET_DAILY_TASK,
    payload,
})

export const setTickHandlerGroup = (payload: TickHandler) => ({
    type: Types.Task.SET_TICK_HANDLER_GROUP,
    payload,
})

export const getTickHandler = (payload: TickHandler) => ({
    type: Types.Task.GET_TICK_HANDLER,
    payload,
})

export const setTickHandler = (payload: TickHandler) => ({
    type: Types.Task.SET_TICK_HANDLER,
    payload,
})

export const getTickHandlerAll = (payload: TickHandler) => ({
    type: Types.Task.GET_TICK_HANDLER_ALL,
    payload,
})

export const setTickHandlerAll = (payload: TickHandler) => ({
    type: Types.Task.SET_TICK_HANDLER_ALL,
    payload,
})

export const syncPinnedGoal = (payload: SyncGoal) => ({
    type: Types.Goal.SET_SYNC_GOAL,
    payload,
})

export const getPrivateGoal = (goalId: string) => ({
    type: Types.Goal.GET_PRIVATE_GOAL,
    payload: goalId,
})

export const getPublicGoal = (goalId: string) => ({
    type: Types.Goal.GET_PUBLIC_GOAL,
    payload: goalId,
})

export const setCopyGoal = (copyGoals: Goals) => ({
    type: Types.Goal.SET_COPY_GOAL,
    payload: copyGoals,
})

export const initializePinTask = (taskId: string) => ({
    type: Types.Goal.GET_PUBLIC_GOAL,
    payload: taskId,
})

export const initializeEditTask = (taskId: string) => ({
    type: Types.Goal.GET_PUBLIC_GOAL,
    payload: taskId,
})

export const initializeDeleteTask = (taskId: string) => ({
    type: Types.Goal.GET_PUBLIC_GOAL,
    payload: taskId,
})

// Saga action
export const initializeFindGoal = (goals: Goals) => {
    const actionBodyTransform: ReducerAction<Goals> = {
        type: Types.Goal.GET_FIND_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const initializePinnedGoalDetail = () => ({
    type: Types.Goal.ON_GET_PIN_GOAL,
    payload: store.getState().myPinnedGoals.goals,
})

export const initializeUnpinnedGoalDetail = () => ({
    type: Types.Goal.ON_GET_UNPIN_GOAL,
    payload: store.getState().myPinnedGoals.goals,
})

export const setSyncPinnedGoal = () => ({
    type: Types.Goal.SET_SYNC_PINNED_GOAL,
    payload: store.getState().myGoals.detailGoal,
})
export const setSyncUnpinnedGoal = () => ({
    type: Types.Goal.SET_SYNC_UNPINNED_GOAL,
    payload: store.getState().myGoals.detailGoal,
})

export const initializeDeleteGoalGroup = (
    goalGroupToBeDeleted: DeleteGoalGroup
) => {
    const actionBodyTransform: ReducerAction<DeleteGoalGroup> = {
        type: Types.Goal.GET_DELETED_GOAL_GROUP,
        payload: goalGroupToBeDeleted,
    }
    return actionBodyTransform
}

export const initializeDeleteAllGoalGroup = (
    goalGroupToBeDeleted: DeleteGoalGroup
) => {
    const actionBodyTransform: ReducerAction<DeleteGoalGroup> = {
        type: Types.Goal.GET_DELETED_ALL_GOAL_GROUP,
        payload: goalGroupToBeDeleted,
    }
    return actionBodyTransform
}

export const initializeDeleteSingleTask = (
    taskToBeDeleted: DeleteTaskGroup
) => {
    const actionBodyTransform: ReducerAction<DeleteTaskGroup> = {
        type: Types.Task.GET_DELETE_SINGLE_TASK,
        payload: taskToBeDeleted,
    }
    return actionBodyTransform
}

export const initializeUpdateFindGoal = (goals: Goals) => {
    const actionBodyTransform: ReducerAction<Goals> = {
        type: Types.Goal.UPDATE_FIND_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const initializeMutableUpdateGoal = (goals: Goals) => {
    const actionBodyTransform: ReducerAction<Goals> = {
        type: Types.Goal.UPDATE_MUTABLE_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const initializeUpdateGoal = (goals: Goals) => {
    const actionBodyTransform: ReducerAction<Goals> = {
        type: Types.Goal.GET_UPDATED_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const initializeSubmitGoal = (goals: CreateGoalRequest) => {
    const actionBodyTransform: ReducerAction<CreateGoalRequest> = {
        type: Types.Goal.GET_CREATED_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const initializeOfflinePinnedGoal = () => {
    const actionBodyTransform: ReducerAction<any> = {
        type: Types.Goal.GET_OFFLINE_PINNED_GOAL,
        payload: undefined,
    }
    return actionBodyTransform
}

export const initializeTaskActive = (task: Task[][]) => {
    const actionBodyTransform: ReducerAction<Task[][]> = {
        type: 'INITIALIZE_TASK',
        payload: task,
    }
    return actionBodyTransform
}

export const getGoals = (payload: GetGoals) => {
    const actionBodyTransform: ReducerAction<GetGoals> = {
        type: Types.Goal.FETCHING_USER_GOAL,
        payload,
    }
    return actionBodyTransform
}

export const getGroupGoals = (goals: Goals[]) => {
    const actionBodyTransform: ReducerAction<Goals[]> = {
        type: Types.Goal.FETCHING_USER_GROUP_GOAL,
        payload: goals,
    }
    return actionBodyTransform
}

export const getPinnedGoals = (pinnedGoals: PinnedGoals[]) => {
    const actionBodyTransform: ReducerAction<PinnedGoals[]> = {
        type: Types.Goal.FETCHING_PINNED_GOAL,
        payload: pinnedGoals,
    }
    return actionBodyTransform
}

export const onResponseCheckHandler = (goals: Goals[]) => {
    const actionBodyTransform: ReducerAction<Goals[]> = {
        type: Types.Goal.ON_RESPONSE_CHECK_HANDLER,
        payload: goals,
    }
    return actionBodyTransform
}

export const onResponseUncheckHandler = (goals: Goals[]) => {
    const actionBodyTransform: ReducerAction<Goals[]> = {
        type: Types.Goal.ON_RESPONSE_UNCHECK_HANDLER,
        payload: goals,
    }
    return actionBodyTransform
}

export const onSetUpdateTaskInGoal = (payload: GoalTaskId) => {
    const actionBodyTransform: ReducerAction<GoalTaskId> = {
        type: Types.Goal.SET_UPDATE_TASK_IN_GOAL,
        payload,
    }
    return actionBodyTransform
}

export const onSetDeleteSingleTaskInGoal = (payload: GoalTask) => {
    const actionBodyTransform: ReducerAction<GoalTask> = {
        type: Types.Goal.SET_DELETE_SINGLE_TASK_IN_GOAL,
        payload,
    }
    return actionBodyTransform
}

export const onFetchTask = (payload: FetchTaskAPI) => ({
    type: Types.Task.FETCH_SINGLE_TASK,
    payload,
})

export const setFetchTask = (payload: Task) => ({
    type: Types.Task.GET_SINGLE_TASK,
    payload,
})

export const onUpdateTaskAPI = (payload: UpdateTaskAPI) => {
    const actionBodyTransform: ReducerAction<UpdateTaskAPI> = {
        type: Types.Task.SET_UPDATE_TASK,
        payload,
    }
    return actionBodyTransform
}

export const onFetchingUpdateTaskAPI = (
    payload: Omit<UpdateTaskAPI, 'updatedData'>
) => {
    const actionBodyTransform: ReducerAction<
        Omit<UpdateTaskAPI, 'updatedData'>
    > = {
        type: Types.Task.FETCH_UPDATE_TASK,
        payload,
    }
    return actionBodyTransform
}

export const onGetUpdateTaskAPI = (payload: Task) => ({
    type: Types.Task.GET_UPDATE_TASK,
    payload,
})

export const onSetDeleteTaskInGoal = (
    payload: Omit<UpdateTaskAPI, 'updatedData'>
) => ({
    type: Types.Task.SET_DELETE_TASK_IN_GOAL,
    payload,
})

export const onSetDailyTaskList = (payload: DailyTaskType) => ({
    type: Types.Task.SET_DAILY_TASK_LIST,
    payload,
})
