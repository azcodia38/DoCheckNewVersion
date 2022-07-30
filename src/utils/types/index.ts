/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { IHandles } from 'react-native-modalize/lib/options'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { SearchResultData } from 'src/api/mock-api'
import { CreateGoalRequest, TaskCreateGoalRequest } from 'src/api/my-goal'
import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { GoalMembers } from 'src/entity/GoalMembers.entity'
import { Goals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { Task } from 'src/entity/Task.entity'
import { User } from 'src/entity/User.entity'
import { ActiveTask } from 'src/pages/inside-pages/buat-goal-baru/BuatGoalBaruPage'
import { GroupTaskData } from 'src/pages/inside-pages/daily-task/interface'
import { TabSwitchHeaderType } from 'src/pages/inside-pages/home/types'
import { NavProps } from '../const'

export interface TabHeaderProps {
    tabs: RadioOption<string>[]
    active: string
    setActive(active: string): void
}

export type LimitOffset = { q?: string; limit?: number; offset?: number }
export type InitialParticipantsResponseType = () => Promise<SearchResultData[]>
export type Merge<A, B> = {
    [K in keyof (A | B)]: K extends keyof B ? B[K] : A[K]
}

export type BottomNavType = 'beranda' | 'cari-teman' | 'notifikasi' | 'akun'

type MergeOptional<T> = {
    [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never
}[keyof T]

type MergeProperties<L, R, K extends keyof L & keyof R> = {
    [P in K]: L[P] | Exclude<R[P], undefined>
}

type MergeUnique<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type SpreadMerging<L, R> = MergeUnique<
    Pick<L, Exclude<keyof L, keyof R>> &
        Pick<R, Exclude<keyof R, MergeOptional<R>>> &
        Pick<R, Exclude<MergeOptional<R>, keyof L>> &
        MergeProperties<L, R, MergeOptional<R> & keyof L>
>

export type Spread<A extends readonly [...any]> = A extends [
    infer L,
    ...infer R
]
    ? SpreadMerging<L, Spread<R>>
    : unknown

export interface PredefinedGoalsPageProps extends NavProps {}
export interface ModalCreateGoalProps {
    modalizeRef: React.RefObject<IHandles>
    heightTaskList: number
    isKeyboard: boolean
    modalHeight: number
    goal: CreateGoalRequest
    keyboardHeight: number
    activeTask: ActiveTask
    setIsOverlay: (status: boolean) => void
    closeTaskListHandler: () => void
    gotoOtherUserProfile: (userId: string) => void
    getTaskInitialParticipants: InitialParticipantsResponseType
    addTaskHandler: () => void
    setActiveTask: React.Dispatch<React.SetStateAction<ActiveTask>>
    simpanActiveTask: (updatedTask: TaskCreateGoalRequest) => void
    heightHandler?: (height: number) => void
    accessibilityLabel?: string
    onCloseModal?: () => void
}

export type PredefinedGoalsTabType =
    | 'recommendation'
    | 'following'
    | 'relevancy'
    | 'all'

export type TickHandler = {
    taskId: string
    isCompleteBy: GoalMembers | undefined
    goalId: string
}

export type Nullable<T> = T | null

export type DailyTaskPropertyType = {
    label: string
    value: string
}

export interface SyncGoal {
    goalId: string
    taskId: string
    isCompleteBy: GoalMembers | undefined
}

export type SearchHandlerType = (q: string) => Promise<User[]>

export type ExcludedMethodType =
    | 'get'
    | 'delete'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'put'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'

export interface ReducerAction<T> {
    type: string
    payload: T
}

export interface PayloadResponse<T = string> {
    token: string
    isLoading?: (status: boolean) => void
    isDone?: (status: boolean, query?: string) => void
    isConnected?: boolean
    user?: User
    query?: T
}

export interface CheckedHandler {
    goalId: string
    taskId: string
}

export type MergeReponseCheckedHandler = Spread<
    [PayloadResponse, CheckedHandler]
>

export type SubmitGoalDetailAPI = Spread<
    [
        PayloadResponse,
        {
            goal: CreateGoalRequest
            goalId?: string
            setGoalIDTemp?: (goalID: string) => void
            existingGoal?: Goals
        } & PickOne<GoalAPI>
    ]
>

export type AnotherUserGoalAPI = Spread<
    [
        PayloadResponse,
        {
            userId: string
        }
    ]
>

export interface PinnedGroupGoal {
    pinnedGoals: PinnedGoals[]
    goals: Goals[]
}

export type PickOne<T> = {
    [P in keyof T]: Record<P, T[P]> &
        Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

export type GoalAPI = Spread<
    [
        PayloadResponse,
        {
            goalId: string
        }
    ]
> & { mutableGoal?: boolean }
export type FetchTaskAPI = Spread<
    [PayloadResponse, { goaldId: string; taskId: string }]
>

export type UpdateTaskAPI = Spread<
    [
        PayloadResponse,
        {
            goalId: string
            taskId: string
            updatedData: TaskCreateGoalRequest
        }
    ]
>

export interface GoalTaskId {
    goalId: string
    task: Task
}

export interface GoalTask {
    goalId: string
    taskId: string
}

export type GoalGroupAPI = Spread<
    [
        PayloadResponse,
        {
            body?: {
                goalIds: string[]
            }
            tabType?: TabSwitchHeaderType
        }
    ]
>

export interface AddingTask {
    task: TaskCreateGoalRequest
    goalId: string
}

export type AddingTaskAPI = Spread<[PayloadResponse, AddingTask]>
export interface ResponseAddingTask {
    goalId: string
    newTask: Task
}

export interface GetGoals {
    goals: Goals[]
    isLoading?: (status: boolean) => void
}

export interface SetGoalLocal {
    goals: Goals
    pinnedGoals: PinnedGoals[]
}

export interface SetTaskLocal {
    task: Task
}

export type DetailGoalType = Spread<[Goals, { isPinned: boolean | undefined }]>
export type GoToGoalType = (goals: Goals) => void
export type GoalsTabType = 'proses' | 'selesai'
export type BackActionType = () => boolean
export type OnChangeCheckGoalType = (goal: Goals, check: boolean) => void

export interface GoalListCompose {
    loading: boolean
    onLongPress: GoToGoalType
    gotoGoal: GoToGoalType
    onChangeCheckGoal: OnChangeCheckGoalType
}

export interface FilterProcessGoal {
    type: TabSwitchHeaderType
    activeTab: GoalsTabType
}

export interface DeleteGoalGroup {
    goalList?: string[]
    tabType: TabSwitchHeaderType
}

export type TaskListType = {
    done: Task[]
    not_done: Task[]
}[]

export interface DeleteTaskGroup {
    taskGroupId: string[]
}

export type FindTaskBelongGoalType = (
    goal: Goals[],
    taskId: string
) => Goals | undefined

export type InsertTaskdailyTask = (
    taskList: TaskListType,
    taskId: string,
    completeBy: GoalMembers
) => TaskListType
export type SetupTaskDailyTaskType = (
    categoryList: any[],
    groupTaskHasBeenDone: GroupTaskData[],
    groupTaskHasDone: GroupTaskData[]
) => TaskListType

export type GroupTaskDoneType = (goals: Task[]) => GroupTaskData[]

export type LocalSetTickHandlerType = {
    taskId: string
    isCompletedBy: GoalMembers | undefined
}

export type DeleteSingleTask = Spread<
    [
        PayloadResponse,
        {
            body: {
                taskIds: string[]
            }
        }
    ]
>

export type PinGoalType = Spread<
    [
        PayloadResponse,
        {
            goalId: string
            isPinned: boolean
        }
    ]
>

export interface ButtonProps {
    children?: any
    inactive?: boolean
    onPress?(): void
    containerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    noShadow?: boolean
    loading?: boolean
    accessibilityLabel?: string
}

export interface NavbarBottomProps {
    setActive: (status: BottomNavType) => void
    active: BottomNavType
    title: BottomNavType
    onPosition?: any
    onNotPosition?: any
}

export interface ButtonWithArrowProps {
    label: string
    onPress?(): void
    disable?: boolean
}

export interface UserTrackingInformationType {
    sessionId: string
    userId: string
    deviceId: string
    deviceType: string
    docheckInstalledVersion: string
}

export type MergeReponseUserTrackingHandler = Spread<
    [PayloadResponse, UserTrackingInformationType]
>

export interface SagaResponse<T = PayloadResponse> {
    type: string
    payload: T
}

export interface MemberGoalType {
    goalId: string
    userId: string
}

export interface AccessibilityInfo {
    accessible?: boolean
    accessibilityLabel?: string
    accessibilityHint?: string
    accessibilityRole?:
        | 'adjustable'
        | 'alert'
        | 'button'
        | 'checkbox'
        | 'combobox'
        | 'header'
        | 'image'
        | 'imageButton'
        | 'keyboardKey'
        | 'link'
        | 'menu'
        | 'menubar'
        | 'menuitem'
        | 'none'
        | 'progressbar'
        | 'radio'
        | 'radiogroup'
        | 'scrollbar'
        | 'search'
        | 'spinbutton'
        | 'summary'
        | 'switch'
        | 'tab'
        | 'tablist'
        | 'text'
        | 'timer'
        | 'togglebutton'
        | 'toolbar'
    accessibilityState?:
        | 'disabled'
        | 'selected'
        | 'checked'
        | 'busy'
        | 'expanded'
}

export interface RepeatTaskOptions {
    label: string
    value: string
}
