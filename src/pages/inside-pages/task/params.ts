import { Task } from "../../../entity/Task.entity";

export interface TaskPageParams {
  goal_id: string
  data: Task
  is_pinned: boolean
  readonly?: boolean
  onTaskPinned?(): void
  onTaskUnpinned?(): void
}
