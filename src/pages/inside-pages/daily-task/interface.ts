import { Task } from '../../../entity/Task.entity'
import { DailyTaskType } from '../home/types'

export interface GroupTaskData {
    type: DailyTaskType
    tasks: Task[]
}
