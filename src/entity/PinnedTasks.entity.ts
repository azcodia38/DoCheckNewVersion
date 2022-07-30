import { Goals } from './Goals.entity'
import { Task } from './Task.entity'

export interface PinnedTasks {
    id: string
    goal: Goals
    task: Task
    createdAt?: Date | string
    updatedAt?: Date | string
}
