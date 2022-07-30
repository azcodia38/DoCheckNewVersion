/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { PaginationGoalResult } from 'src/api/my-goal'
import { Method } from 'axios'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { Task } from 'src/entity/Task.entity'
import {
    DailyTaskType,
    TabSwitchHeaderType,
} from 'src/pages/inside-pages/home/types'
import {
    DetailGoalType,
    ExcludedMethodType,
} from 'src/utils/types'
import { PendingRequest } from '../api'
import { Goals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { User } from 'src/entity/User.entity'

export interface UserLoginData {
    user: User
    access_token: string
}

export interface GoalsData {
    my_goals: Goals[]
    my_group_goals: Goals[]
    pinned_goals: PinnedGoals[]
}

export interface ConnectionStatus {
    connected: boolean
}

export interface PendingRequestData {
    list: PendingRequest[]
}

export interface NotificationTask {
    id: string
    hasRing: boolean
    dueDate: string | Date
    completeBy: GoalMembers
    title: string
}

export type DailyTaskList = {
    type: DailyTaskType
    tasks: Task[]
}[]

export type DefaultTaskData = {
    tasks: Task[][]
    dailyTaskTab: DailyTaskType
    singleTask: Task | {}
    detailTask: Task
    dailyTask: DailyTaskList
    allDailyTask: DailyTaskList
    personalTask: Task[]
    groupTask: Task[]
    notificationTask: NotificationTask[]
}

export type DefaultGoalsData = {
    goals: Goals[]
    anotherUserGoals: Goals[]
    groupGoals: Goals[]
    detailGoal: DetailGoalType
    pinnedGoal: Goals[]
    pinnedGoalId: string[]
    typeGoal: TabSwitchHeaderType
    isHide: boolean
    loadingCardGoal: boolean
    filteredGoal: Goals[]
    recommendationGoals: PaginationGoalResult
}

export type DefaultUserState = {}

export type DefaultPinnedGoalsData = {
    goals: PinnedGoals[]
}

export interface OfflineModeState {
    id: string
    endpoint: string
    method: Exclude<Method, ExcludedMethodType>
    body: any
    token: string
}

export type DefaultOfflineModeState = {
    onOfflineTemporaryGoalStorage: OfflineModeState[] | any[]
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type DefaultUserTrackingReducer = {
    latestSessionId: string
    legacySessionId: string
}

export default interface StoreData {
    user_login_data: UserLoginData
    goals_data: GoalsData
    connection: ConnectionStatus
    pending_request: PendingRequestData
    task: DefaultTaskData
    myGoals: DefaultGoalsData
    myPinnedGoals: DefaultPinnedGoalsData
    offlineMode: DefaultOfflineModeState
    userTracking: DefaultUserTrackingReducer
}
