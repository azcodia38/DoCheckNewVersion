import { omit, orderBy, sortBy } from 'lodash'
import { Lazy } from '@luvies/lazy'
import { v4 as uuid } from 'uuid'

import { Task } from 'src/entity/Task.entity'
import { DeleteTaskGroup, ReducerAction, TickHandler } from 'src/utils/types'
import { DefaultTaskData } from 'store/types'

import * as Types from 'src/store/types/'
import { TASK_CATEGORY } from 'src/utils/lang'
import {
    isBeforeNow,
    isBetweenNowAndToday,
    isNextWeek,
    isThisWeek,
    isTomorrow,
} from 'src/utils'
import { Goals } from 'src/entity/Goals.entity'
import { MAX_TASK_SECTION_LENGTH } from 'src/utils/types/componentsTypes'

const defaultState: DefaultTaskData = {
    tasks: [],
    dailyTaskTab: 'hari-ini',
    singleTask: {},
    detailTask: {} as Task,
    personalTask: [],
    groupTask: [],
    dailyTask: [],
    allDailyTask: [],
    notificationTask: [],
}

const orderingTask = (
    tasks: Task[],
    orderingMethod: 'asc' | 'desc' = 'desc',
    criteria: string = 'completeBy'
) => orderBy(sortBy(tasks, 'dueDate'), criteria, orderingMethod)

const limitTask = (tasks: Task[], limit: number = MAX_TASK_SECTION_LENGTH) =>
    tasks?.slice(0, limit)

const skippedTaskOrdering = (tasks: Task[]) => orderBy(tasks, 'dueDate', 'desc')

export default function TaskReducer(
    state = defaultState,
    action: ReducerAction<any>
): DefaultTaskData {
    switch (action.type) {
        case 'INITIALIZE_TASK':
            return {
                ...state,
                tasks: action.payload as Task[][],
            }

        case Types.Task.SET_PERSONAL_TASK:
            const payloadPersonalTask = action.payload as Goals[]
            return {
                ...state,
                personalTask: payloadPersonalTask.reduce(
                    (acc: Task[], goal: Goals) => [...acc, ...goal?.tasks],
                    []
                ),
            }

        case Types.Task.DEFAULT_TASK_STATE:
            return defaultState

        case Types.Task.SET_GROUP_TASK:
            const payloadGroupTask = action.payload as Goals[]
            return {
                ...state,
                groupTask: payloadGroupTask.reduce(
                    (acc: Task[], goal: Goals) => [...acc, ...goal?.tasks],
                    []
                ),
            }

        case Types.Task.GET_DELETE_SINGLE_TASK:
            const deleteSingleTask = action.payload as DeleteTaskGroup

            return {
                ...state,
                dailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => ({
                        ...dailyTask,
                        tasks: Lazy.from(dailyTask.tasks)
                            .where(
                                (task) =>
                                    !deleteSingleTask.taskGroupId.every(
                                        (taskIdHasBeenDeleted) =>
                                            taskIdHasBeenDeleted == task.id
                                    )
                            )
                            .toArray(),
                    }))
                    .toArray(),
                allDailyTask: Lazy.from(state.allDailyTask)
                    .select((dailyTask) => ({
                        ...dailyTask,
                        tasks: Lazy.from(dailyTask.tasks)
                            .where(
                                (task) =>
                                    !deleteSingleTask.taskGroupId.every(
                                        (taskIdHasBeenDeleted) =>
                                            taskIdHasBeenDeleted == task.id
                                    )
                            )
                            .toArray(),
                    }))
                    .toArray(),
            }

        case Types.Task.SET_NOTIFICATION_TASK:
            const payloadGetNotificationTask = action.payload as Task[]
            return {
                ...state,
                notificationTask: Lazy.from(payloadGetNotificationTask)
                    .select(({ id, completeBy, title, dueDate }) => ({
                        id: id!,
                        completeBy: completeBy!,
                        dueDate,
                        title,
                        hasRing: false,
                    }))
                    .toArray(),
            }

        case Types.Task.SET_TICK_HANDLER_ALL: {
            const payloadTickHandler = action.payload as TickHandler
            return {
                ...state,
                allDailyTask: Lazy.from(state.allDailyTask)
                    .select((dailyTask) => ({
                        ...dailyTask,
                        tasks: Lazy.from(dailyTask.tasks)
                            .select((task) => {
                                if (task.id == payloadTickHandler.taskId)
                                    if (task.completeBy?.isConfirmed)
                                        return {
                                            ...task,
                                            completeBy: undefined,
                                        }
                                    else
                                        return {
                                            ...task,
                                            completeBy: {
                                                id: payloadTickHandler
                                                    .isCompleteBy?.id!,
                                                isConfirmed: true,
                                                user_id:
                                                    payloadTickHandler
                                                        .isCompleteBy?.user_id!,
                                            },
                                        }
                                return task
                            })
                            .toArray(),
                    }))
                    .toArray()
                    .flat(),
            }
        }

        case Types.Task.GET_DELETE_ALL_TASK:
            return {
                ...state,
                dailyTask: defaultState.dailyTask,
                allDailyTask: defaultState.allDailyTask,
            }

        case Types.Goal.SET_CHECK_HANDLER_LOCAL: {
            return {
                ...state,
                dailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => {
                        return {
                            ...dailyTask,
                            tasks: Lazy.from(dailyTask.tasks)
                                .select((task) => {
                                    if (
                                        task.id == (action.payload.id as string)
                                    )
                                        return {
                                            ...task,
                                            completeBy:
                                                action.payload.completeBy,
                                        }
                                    return task
                                })
                                .toArray(),
                        }
                    })
                    .toArray(),
                allDailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => {
                        return {
                            ...dailyTask,
                            tasks: Lazy.from(dailyTask.tasks)
                                .select((task) => {
                                    if (
                                        task.id == (action.payload.id as string)
                                    )
                                        return {
                                            ...task,
                                            completeBy: {
                                                id: uuid(),
                                                user_id: action.payload.user.id,
                                                isConfirmed: true,
                                            },
                                        }
                                    return task
                                })
                                .toArray(),
                        }
                    })
                    .toArray(),
            }
        }

        case Types.Goal.SET_UNCHECK_HANDLER_LOCAL: {
            return {
                ...state,
                dailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => {
                        return {
                            ...dailyTask,
                            tasks: Lazy.from(dailyTask.tasks)
                                .select((task) => {
                                    if (
                                        task.id == (action.payload.id as string)
                                    )
                                        return omit(task, 'completedBy')
                                    return task
                                })
                                .toArray(),
                        }
                    })
                    .toArray(),
                allDailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => {
                        return {
                            ...dailyTask,
                            tasks: Lazy.from(dailyTask.tasks)
                                .select((task) => {
                                    if (
                                        task.id == (action.payload.id as string)
                                    )
                                        return {
                                            ...task,
                                            completeBy:
                                                action.payload.completeBy,
                                        }
                                    return task
                                })
                                .toArray(),
                        }
                    })
                    .toArray(),
            }
        }

        case Types.Task.SET_TICK_HANDLER: {
            const payloadTickHandler = action.payload as TickHandler

            return {
                ...state,
                dailyTask: Lazy.from(state.dailyTask)
                    .select((dailyTask) => ({
                        ...dailyTask,
                        tasks: dailyTask.tasks.map((task) => {
                            if (task.id == payloadTickHandler.taskId)
                                if (task.completeBy?.isConfirmed)
                                    return {
                                        ...task,
                                        completeBy: undefined,
                                    }
                                else
                                    return {
                                        ...task,
                                        completeBy: {
                                            id: payloadTickHandler.isCompleteBy
                                                ?.id!,
                                            isConfirmed: true,
                                            user_id:
                                                payloadTickHandler.isCompleteBy
                                                    ?.user_id!,
                                        },
                                    }
                            return task
                        }),
                    }))
                    .toArray()
                    .flat(),
                allDailyTask: Lazy.from(state.allDailyTask)
                    .select((dailyTask) => ({
                        ...dailyTask,
                        tasks: Lazy.from(dailyTask.tasks)
                            .select((task) => {
                                if (task.id == payloadTickHandler.taskId)
                                    if (task.completeBy?.isConfirmed)
                                        return {
                                            ...task,
                                            completeBy: undefined,
                                        }
                                    else
                                        return {
                                            ...task,
                                            completeBy: {
                                                id: payloadTickHandler
                                                    .isCompleteBy?.id!,
                                                isConfirmed: true,
                                                user_id:
                                                    payloadTickHandler
                                                        .isCompleteBy?.user_id!,
                                            },
                                        }
                                return task
                            })
                            .toArray(),
                    }))
                    .toArray()
                    .flat(),
            }
        }

        case Types.Task.GET_SINGLE_TASK:
            const payloadResultSingleTask: Task = action.payload
            return {
                ...state,
                singleTask: payloadResultSingleTask,
            }

        case Types.Task.GET_UPDATE_TASK:
            return {
                ...state,
                detailTask: action.payload,
            }

        case Types.Task.SET_DAILY_TASK_LIST:
            return {
                ...state,
                dailyTaskTab: action.payload,
            }

        case Types.Task.SET_DAILY_TASK:
            const taskList = (action.payload as Task[]) ?? []
            return {
                ...state,
                dailyTask: [
                    {
                        type: TASK_CATEGORY.TODAY,
                        tasks: orderingTask(
                            limitTask(
                                Lazy.from(taskList)
                                    .where((task) =>
                                        isBetweenNowAndToday(
                                            task.dueDate as Date
                                        )
                                    )
                                    .toArray()
                            )
                        ),
                    },

                    {
                        type: TASK_CATEGORY.TOMORROW,
                        tasks: orderingTask(
                            Lazy.from(taskList)
                                .where((task) =>
                                    isTomorrow(task.dueDate as Date)
                                )
                                .toArray()
                        ),
                    },
                    {
                        type: TASK_CATEGORY.WEEK,
                        tasks: orderingTask(
                            limitTask(
                                Lazy.from(taskList)
                                    .where((task) =>
                                        isThisWeek(task.dueDate as Date)
                                    )
                                    .toArray()
                            )
                        ),
                    },
                    {
                        type: TASK_CATEGORY.NEXT_WEEK,
                        tasks: orderingTask(
                            limitTask(
                                Lazy.from(taskList)
                                    .where((task) =>
                                        isNextWeek(task.dueDate as Date)
                                    )
                                    .toArray()
                            )
                        ),
                    },
                    {
                        type: TASK_CATEGORY.SKIPPED,
                        tasks: limitTask(
                            skippedTaskOrdering(
                                orderingTask(
                                    Lazy.from(taskList)
                                        .where((task) =>
                                            isBeforeNow(task.dueDate as Date)
                                        )
                                        .toArray()
                                )
                            )
                        ),
                    },
                ],
                allDailyTask: [
                    {
                        type: TASK_CATEGORY.TODAY,
                        tasks: orderingTask(
                            Lazy.from(taskList)
                                .where((task) =>
                                    isBetweenNowAndToday(task.dueDate as Date)
                                )
                                .toArray()
                        ),
                    },

                    {
                        type: TASK_CATEGORY.TOMORROW,
                        tasks: orderingTask(
                            Lazy.from(taskList)
                                .where((task) =>
                                    isTomorrow(task.dueDate as Date)
                                )
                                .toArray()
                        ),
                    },
                    {
                        type: TASK_CATEGORY.WEEK,
                        tasks: orderingTask(
                            Lazy.from(taskList)
                                .where((task) =>
                                    isThisWeek(task.dueDate as Date)
                                )
                                .toArray()
                        ),
                    },
                    {
                        type: TASK_CATEGORY.NEXT_WEEK,
                        tasks: orderingTask(
                            Lazy.from(taskList)
                                .where((task) =>
                                    isNextWeek(task.dueDate as Date)
                                )
                                .toArray()
                        ),
                    },
                    {
                        type: TASK_CATEGORY.SKIPPED,
                        tasks: skippedTaskOrdering(
                            orderingTask(
                                Lazy.from(taskList)
                                    .where((task) =>
                                        isBeforeNow(task.dueDate as Date)
                                    )
                                    .toArray()
                            )
                        ),
                    },
                ],
            }

        default:
            return state
    }
}
