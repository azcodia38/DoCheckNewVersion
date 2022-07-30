import { GoalMembers } from './GoalMembers.entity'
import { PinnedTasks } from './PinnedTasks.entity'
import { TaskAssignee } from './TaskAssignee.entity'

export interface Task {
    id?: string
    title: string
    notes: string
    dueDate: Date | string
    type: string
    pinnedTask?: PinnedTasks
    repeatTask?: number
    taskAsignnes: TaskAssignee[]
    recommendationUrl?: string
    completeBy?: GoalMembers
    createdAt?: Date | string
    updatedAt?: Date | string
    audioUrl?: string
    audioDurationMs?: number
}
