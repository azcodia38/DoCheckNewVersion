import { TaskCreateGoalRequest, TaskRequest } from "../api/my-goal";
import { v4 as uuidv4 } from 'uuid';
import { Task } from "src/entity/Task.entity";
import moment from "moment-timezone";
import { Goals } from "src/entity/Goals.entity";
import { PinnedTasks } from "src/entity/PinnedTasks.entity";
import { getDatefromDateOrString } from "src/utils";

export function createTaskLocal(data: TaskRequest): Task {
  return {
    id: uuidv4().toString(),
    title: data.title ?? '',
    audioUrl: data.audioUrl,
    audioDurationMs: data.audioDurationMs,
    notes: data.notes,
    dueDate: data.dueDate ? moment(data.dueDate, 'DD/MM/YYYY HH:mm').toDate() : '',
    type: data.type,
    repeatTask: data.repeatTask,
    taskAsignnes: data.assignees.map((user_id: string) => ({
      id: uuidv4().toString(),
      goalMember: {
        id: uuidv4().toString(),
        user_id,
        user: {
          id: user_id
        } as any,
        isConfirmed: false
      }
    })),
    recommendationUrl: data.recommendationUrl,
    createdAt: moment().tz("Asia/Jakarta").toNow(),
    updatedAt: moment().tz("Asia/Jakarta").toNow()
  }
}

export function updateTaskLocal(task: Task, data: TaskCreateGoalRequest): Task {
  return {
    ...task,
    title: data.title ?? task.title,
    notes: data.notes ?? task.notes,
    dueDate: data.dueDate ? moment(getDatefromDateOrString(data.dueDate)).toDate() : task.dueDate,
    type: data.type ?? task.type,
    repeatTask: data.repeatTask ?? task.repeatTask,
    audioUrl: data.audioUrl,
    audioDurationMs: data.audioDurationMs,
    taskAsignnes: data.assignees.map((user_id: string) => ({
      id: uuidv4().toString(),
      goalMember: {
        id: uuidv4().toString(),
        user_id,
        user: {
          id: user_id
        } as any,
        isConfirmed: false
      }
    })),
    recommendationUrl: data.recommendationUrl ?? task.recommendationUrl,
    updatedAt: moment().tz("Asia/Jakarta").toNow()
  }
}

export function createPinnedTaskLocal(goal: Goals, task: Task): PinnedTasks {
  return {
    id: uuidv4().toString(),
    goal,
    task,
    createdAt: moment().tz("Asia/Jakarta").toNow(),
    updatedAt: moment().tz("Asia/Jakarta").toNow()
  }
}
