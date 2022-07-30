import { Lazy } from '@luvies/lazy'
import { Task } from 'src/entity/Task.entity'
import moment from 'moment'
import {
    FindTaskBelongGoalType,
    GroupTaskDoneType,
    InsertTaskdailyTask,
    SetupTaskDailyTaskType,
} from 'src/utils/types'
import {
    isBeforeNow,
    isBetweenNowAndToday,
    isNextWeek,
    isThisWeek,
    isTomorrow,
} from 'src/utils'

export const findTaskBelongsGoal: FindTaskBelongGoalType = (goal, taskId) =>
    goal.find(
        (item) => item.tasks.map((y) => y.id ?? '-').includes(taskId ?? '')
        // item.tasks.every(({ id }) => id == taskId)
    )

export const insertTaskdailyTask: InsertTaskdailyTask = (
    taskList,
    taskId,
    completeBy
) =>
    Lazy.from(taskList)
        .select((task) => {
            const doneTaskIndex = task.done.find((item) => item.id == taskId)
            const notDoneTaskIndex = task.not_done.find(
                (item) => item.id == taskId
            )

            if (doneTaskIndex) {
                return {
                    ...task,
                    done: Lazy.from(task.done)
                        .select((item) => {
                            if (item.id == taskId)
                                if (item.completeBy?.isConfirmed)
                                    item.completeBy = undefined
                                else
                                    item.completeBy = {
                                        id: completeBy?.id!,
                                        isConfirmed: true,
                                        user_id: completeBy?.user_id!,
                                    }
                            return item
                        })
                        .toArray(),
                }
            }

            if (notDoneTaskIndex) {
                return {
                    ...task,
                    not_done: Lazy.from(task.not_done)
                        .select((item) => {
                            if (item.id == taskId)
                                if (item.completeBy?.isConfirmed)
                                    item.completeBy = undefined
                                else
                                    item.completeBy = {
                                        id: completeBy?.id!,
                                        isConfirmed: true,
                                        user_id: completeBy?.user_id!,
                                    }
                            return item
                        })
                        .toArray(),
                }
            }

            return task
        })
        .toArray()

export const setupTaskDailyTask: SetupTaskDailyTaskType = (
    categoryList,
    groupTaskHasDone,
    groupTaskHasBeenDone
) => {
    return Lazy.from(categoryList)
        .select((_, index) => ({
            done: groupTaskHasDone[index]?.tasks ?? [],
            not_done: groupTaskHasBeenDone[index]?.tasks ?? [],
        }))
        .toArray()
}

export const groupTaskByDone: GroupTaskDoneType = (allTask) => {
    return [
        {
            type: 'hari-ini',
            tasks: Lazy.from(allTask)
                .where(
                    (task) =>
                        (isBetweenNowAndToday(task.dueDate as Date) &&
                            task.completeBy) as boolean
                )
                .toArray(),
        },
        {
            type: 'besok',
            tasks: Lazy.from(allTask)
                .where(
                    (task) =>
                        (isTomorrow(task.dueDate as Date) &&
                            task.completeBy) as boolean
                )
                .toArray(),
        },
        {
            type: 'minggu-ini',
            tasks: Lazy.from(allTask)
                .where(
                    (task) =>
                        (isThisWeek(task.dueDate as Date) &&
                            task.completeBy) as boolean
                )
                .toArray(),
        },
        {
            type: 'minggu-depan',
            tasks: Lazy.from(allTask)
                .where(
                    (task) =>
                        (isNextWeek(task.dueDate as Date) &&
                            task.completeBy) as boolean
                )
                .toArray(),
        },
        {
            type: 'terlewat',
            tasks: Lazy.from(allTask)
                .where(
                    (task) =>
                        (isBeforeNow(task.dueDate as Date) &&
                            task.completeBy) as boolean
                )
                .toArray(),
        },
    ]
}

export const groupTaskByUndone: GroupTaskDoneType = (allTask) => [
    {
        type: 'hari-ini',
        tasks: Lazy.from(allTask)
            .where(
                (task) =>
                    (isBetweenNowAndToday(task.dueDate as Date) &&
                        !task.completeBy) as boolean
            )
            .toArray(),
    },
    {
        type: 'besok',
        tasks: Lazy.from(allTask)
            .where(
                (task) =>
                    (isTomorrow(task.dueDate as Date) &&
                        !task.completeBy) as boolean
            )
            .toArray(),
    },
    {
        type: 'minggu-ini',
        tasks: Lazy.from(allTask)
            .where(
                (task) =>
                    (isThisWeek(task.dueDate as Date) &&
                        !task.completeBy) as boolean
            )
            .toArray(),
    },
    {
        type: 'minggu-depan',
        tasks: Lazy.from(allTask)
            .where(
                (task) =>
                    (isNextWeek(task.dueDate as Date) &&
                        !task.completeBy) as boolean
            )
            .toArray(),
    },
    {
        type: 'terlewat',
        tasks: Lazy.from(allTask)
            .where(
                (task) =>
                    (isBeforeNow(task.dueDate as Date) &&
                        !task.completeBy) as boolean
            )
            .toArray(),
    },
]

export const transformUpdateTaskDateTime = (
    dueDate: string | Date,
    transform?: boolean
) => {
    if (dueDate && transform) return moment(dueDate).format('DD/MM/YYYY HH:mm:ss')
    return dueDate instanceof Date
        ? moment(dueDate).format('DD/MM/YYYY HH:mm:ss')
        : dueDate
}
