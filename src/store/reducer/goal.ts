/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { isEmpty, omit, orderBy, size, sortBy } from 'lodash'
import { Lazy } from '@luvies/lazy'
import { v4 as uuid } from 'uuid'

import * as Type from 'src/store/types'
import { Goals } from 'src/entity/Goals.entity'
import { DefaultGoalsData } from 'store/types'
import {
    DeleteGoalGroup,
    DetailGoalType,
    FilterProcessGoal,
    GetGoals,
    GoalAPI,
    GoalTask,
    GoalTaskId,
    PickOne,
    PinnedGroupGoal,
    ReducerAction,
    ResponseAddingTask,
    SetGoalLocal,
    SyncGoal,
    TickHandler,
} from 'src/utils/types'
import { ACCOUNT_STATUS, ACCOUNT_TYPE, GENDER } from 'src/entity/User.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { Task } from 'src/entity/Task.entity'
import { TabSwitchHeaderType } from 'src/pages/inside-pages/home/types'
import { PaginationGoalResult } from 'src/api/my-goal'

const defaultState: DefaultGoalsData = {
    goals: [],
    typeGoal: 'saya',
    groupGoals: [],
    detailGoal: {
        id: '',
        owner: {
            id: '',
            fullname: '',
            username: '',
            profilePicture: '',
            description: '',
            phoneNumber: '',
            email: '',
            gender: GENDER.UNKNOWN,
            birthPlace: '',
            birthDate: '',
            city: '',
            hobby: '',
            password: '',
            fcmToken: '',
            accountType: ACCOUNT_TYPE.REGULAR,
            thirdpartyAccountId: '',
            confirmationDate: new Date(),
            emailConfirmationCode: '',
            resetPwdVerificationCode: '',
            status: ACCOUNT_STATUS.PENDING,
            lastLogin: new Date(),
            referralCode: '',
            refereeFrom: '',
            passwordAttemptsCount: 0,
            lastPasswordAttemptsTry: new Date(),
        },
        name: '',
        description: '',
        category: { id: '', label: '' },
        tasks: [],
        goalMembers: [],
        pinnedTasks: [],
        image: '',
        isPublic: false,
        totalView: '',
        isTemplate: false,
        isPinned: false,
    },
    anotherUserGoals: [],
    pinnedGoal: [],
    isHide: false,
    loadingCardGoal: false,
    filteredGoal: [],
    pinnedGoalId: [],
    recommendationGoals: {
        goals: [],
        total: 0,
        totalCopy: {},
    },
}

function goalsHandler(pinnedGoals: PinnedGoals[] = [], goals: Goals[] = []) {
    const MAX_PINNED_GOALS: number = 6
    const BOUNT_LIMIT_GOAL: number = 2

    const includePinnedGoals = Lazy.from(goals)
        .where((goal) =>
            pinnedGoals.some(({ goal: pinnedGoal }) => pinnedGoal.id == goal.id)
        )
        .toArray()

    const excludePinnedGoals = Lazy.from(goals)
        .where((goal) =>
            pinnedGoals.every(
                ({ goal: pinnedGoal }) => pinnedGoal.id != goal.id
            )
        )
        .toArray()

    return {
        pinnedGoal: [
            ...includePinnedGoals,
            ...orderBy(excludePinnedGoals, 'updatedAt', 'desc').splice(0, 5),
        ].slice(0, MAX_PINNED_GOALS),
        pinnedGoalId: includePinnedGoals.map((item) => item.id),
        isHide: !(size(goals) >= BOUNT_LIMIT_GOAL),
        loadingCardGoal: false,
    }
}

function sortedGoal(goals: Goals[]): Goals[] {
    return Lazy.from(goals)
        .select((goal) => {
            if (goal.tasks) goal.tasks = sortBy(goal.tasks, 'dueDate')
            return goal
        })
        .toArray()
}

function clearGoals(goals: Goals[]): Goals[] {
    return Lazy.from(goals)
        .select((goal) => ({
            ...goal,
            tasks: [],
        }))
        .toArray()
}

function taskTransform(tasks: Task[], payloadTask: GoalTaskId) {
    return Lazy.from(tasks)
        .select((task) => {
            if (task.id == payloadTask.task.id) return payloadTask.task
            return task
        })
        .toArray()
}

function goalsTransform(goals: Goals[], payloadTask: GoalTaskId) {
    return Lazy.from(goals)
        .select((goal) => {
            if (goal.id == payloadTask.goalId) {
                return {
                    ...goal,
                    tasks: taskTransform(goal.tasks, payloadTask),
                }
            }
            return goal
        })
        .toArray()
}

function taskTransformDelete(tasks: Task[], payloadTask: GoalTask) {
    return Lazy.from(tasks)
        .where((task) => task.id != payloadTask.taskId)
        .toArray()
}

function goalsTransformDelete(goals: Goals[], payloadTask: GoalTask) {
    return Lazy.from(goals)
        .select((goal) => {
            if (goal.id == payloadTask.goalId) {
                return {
                    ...goal,
                    tasks: taskTransformDelete(goal.tasks, payloadTask),
                }
            }
            return goal
        })
        .toArray()
}

function personalAndGroupGoalsSync(
    typeGoal: TabSwitchHeaderType,
    goals: Goals[],
    groupGoals: Goals[],
    deleteGoalId: string
) {
    return {
        goals:
            typeGoal == 'saya'
                ? Lazy.from(goals)
                      .where((goal) => goal.id != deleteGoalId)
                      .toArray()
                : goals,
        groupGoals:
            typeGoal == 'grup'
                ? Lazy.from(groupGoals)
                      .where((goal) => goal.id != deleteGoalId)
                      .toArray()
                : groupGoals,
        loadingCardGoal: false,
    }
}

export default function GoalsReducer(
    state = defaultState,
    action: ReducerAction<Goals[] | any>
): DefaultGoalsData {
    switch (action.type) {
        case Type.Goal.FETCHING_USER_GOAL:
            const fethingUserGoalPayload: GetGoals = action.payload

            return {
                ...state,
                goals: fethingUserGoalPayload.goals,
                loadingCardGoal: false,
            }

        case Type.Goal.GET_ANOTHER_USER_GOAL:
            return {
                ...state,
                anotherUserGoals: action.payload as Goals[],
            }

        case Type.Goal.SET_DETAIL_GOAL_ANOTHER_USER:
            const setDetailGoalUser =
                state.anotherUserGoals.find(
                    ({ id }) => id == action.payload.goalId
                ) ?? defaultState.detailGoal

            return {
                ...state,
                detailGoal: {
                    ...setDetailGoalUser,
                    isPinned: false,
                },
            }

        case Type.Goal.SET_COPY_GOAL: {
            const payload = action.payload
            const newGoalTransform = {
                ...payload,
                goalMembers: [
                    {
                        id: uuid(),
                        user: payload?.owner!,
                        isConfirmed: true,
                        updatedAt: payload?.updatedAt! as Date,
                        createdAt: payload?.createdAt! as Date,
                        user_id: payload?.owner.id!,
                    },
                ],
            } as Goals
            const newGoal = sortedGoal([...state.goals, newGoalTransform])
            return {
                ...state,
                goals: newGoal,
                detailGoal: {
                    ...newGoalTransform,
                    isPinned: false,
                } as DetailGoalType,
                loadingCardGoal: false,
            }
        }

        case Type.Goal.SET_LOADING_CARD_GOAL:
            return {
                ...state,
                loadingCardGoal: true,
            }

        case Type.Goal.FETCHING_USER_GROUP_GOAL:
            return {
                ...state,
                groupGoals: action.payload,
                loadingCardGoal: false,
            }

        case Type.Goal.SET_UPDATE_TASK_IN_GOAL: {
            const payload = action.payload as GoalTaskId
            return {
                ...state,
                goals: goalsTransform(state.goals, payload),
                groupGoals: goalsTransform(state.groupGoals, payload),
                detailGoal: {
                    ...state.detailGoal,
                    tasks: taskTransform(state.detailGoal.tasks, payload),
                },
                loadingCardGoal: false,
            }
        }

        case Type.Goal.SET_DELETE_SINGLE_TASK_IN_GOAL: {
            const payload = action.payload as GoalTask
            return {
                ...state,
                goals: goalsTransformDelete(state.goals, payload),
                groupGoals: goalsTransformDelete(state.groupGoals, payload),
                detailGoal: {
                    ...state.detailGoal,
                    tasks: taskTransformDelete(state.detailGoal.tasks, payload),
                },
                loadingCardGoal: false,
            }
        }

        case Type.Goal.SET_GOAL_LOCAL: {
            const localPayload = action.payload as SetGoalLocal
            const localGoal = [...state.goals, localPayload.goals]
            const { isHide, pinnedGoal, loadingCardGoal, pinnedGoalId } =
                goalsHandler(localPayload.pinnedGoals, localGoal)

            return {
                ...state,
                goals: localGoal,
                detailGoal: { ...localPayload.goals, isPinned: false },
                groupGoals: localGoal,
                isHide,
                pinnedGoal,
                loadingCardGoal,
                pinnedGoalId,
            }
        }

        case Type.Goal.ON_SET_TICK_DETAIL_GOAL: {
            const payloadOnSetTick = action.payload as TickHandler
            const lazyMap = (goals: Goals[]) =>
                Lazy.from(goals)
                    .select((goal) => {
                        if (goal.id == payloadOnSetTick.goalId) {
                            goal.tasks = goal.tasks.map((task) => task)
                        }
                        return goal
                    })
                    .toArray()

            return {
                ...state,
                goals: lazyMap(state.goals),
                groupGoals: lazyMap(state.groupGoals),
                loadingCardGoal: false,
            }
        }

        case Type.Goal.ON_SET_TYPE_TAB_GOAL:
            return {
                ...state,
                typeGoal: action.payload,
            }

        case Type.Goal.GET_RECOMMENDATION_GOAL: {
            const payload = action.payload as PaginationGoalResult
            return {
                ...state,
                loadingCardGoal: false,
                recommendationGoals: {
                    ...payload,
                    goals: payload.goals.map((goal: Goals) => {
                        goal.totalCopy = payload.totalCopy[goal.id]
                        return goal
                    }),
                },
            }
        }

        case Type.Goal.ON_GET_PIN_GOAL: {
            const detailGoal = state.detailGoal
            const newPinnedGoal: PinnedGoals = {
                id: detailGoal.id,
                goal: omit<Goals>(detailGoal, [
                    'owner',
                    'isPinned',
                    'goalMembers',
                    'category',
                ]) as Goals,
            }
            const localPayload = action.payload as PinnedGoals[]
            const { isHide, pinnedGoal, loadingCardGoal, pinnedGoalId } =
                goalsHandler([...localPayload, newPinnedGoal], state.goals)

            return {
                ...state,
                detailGoal: {
                    ...detailGoal,
                    isPinned: true,
                },
                isHide,
                pinnedGoal,
                loadingCardGoal,
                pinnedGoalId,
            }
        }

        case Type.Goal.ON_GET_UNPIN_GOAL: {
            const localPayload = action.payload as PinnedGoals[]
            const { isHide, pinnedGoal, loadingCardGoal, pinnedGoalId } =
                goalsHandler(
                    Lazy.from(localPayload)
                        .where(
                            (pinnedGoal) => pinnedGoal.id != state.detailGoal.id
                        )
                        .toArray(),
                    state.goals
                )

            return {
                ...state,
                detailGoal: {
                    ...state.detailGoal,
                    isPinned: false,
                },
                isHide,
                pinnedGoal,
                loadingCardGoal,
                pinnedGoalId,
            }
        }

        case Type.Goal.GET_DELETED_GOAL_GROUP:
            const onDeletedPayload = action.payload as DeleteGoalGroup
            let goalDeletedTransform: Goals[] = []
            let goalGroupDeletedTransform: Goals[] = []
            let newFilteredGoalGroup: Goals[] = []

            const onFilterHandler = (goal: Goals) =>
                onDeletedPayload.goalList!.every((id) => goal.id != id)

            if (onDeletedPayload.goalList) {
                onDeletedPayload.tabType == 'saya'
                    ? (goalDeletedTransform = Lazy.from(state.goals)
                          .where(onFilterHandler)
                          .toArray())
                    : (goalGroupDeletedTransform = Lazy.from(state.groupGoals)
                          .where(onFilterHandler)
                          .toArray())

                newFilteredGoalGroup = Lazy.from(state.filteredGoal)
                    .where((goal) =>
                        onDeletedPayload.goalList!.every((id) => goal.id != id)
                    )
                    .toArray()
            }

            return {
                ...state,
                goals: goalDeletedTransform,
                groupGoals: goalGroupDeletedTransform,
                filteredGoal: newFilteredGoalGroup,
                loadingCardGoal: false,
            }

        case Type.Goal.GET_DELETED_ALL_GOAL_GROUP: {
            const onDeletedAllPayload = action.payload as DeleteGoalGroup
            let newGoal: Goals[] = state.goals
            let newGoalGroup: Goals[] = state.groupGoals

            if (onDeletedAllPayload.tabType == 'saya') newGoal = []
            if (onDeletedAllPayload.tabType == 'grup') newGoalGroup = []

            return {
                ...state,
                goals: newGoal,
                groupGoals: newGoalGroup,
                filteredGoal: [],
                loadingCardGoal: false,
            }
        }

        case Type.Goal.ON_FILTER_PROCESS_GOAL: {
            const payload = action.payload as FilterProcessGoal
            let goals!: Goals[]
            if (payload.type == 'saya') goals = state.goals
            if (payload.type == 'grup') goals = state.groupGoals
            if (payload.type != 'saya' && payload.type != 'grup')
                goals = state.goals

            const filteredGoal = orderBy(
                goals.filter((g: Goals) => {
                    const tasks = g.tasks ?? []
                    const complete_task = tasks.reduce(
                        (acc: number, task: Task) =>
                            acc + (task.completeBy ? 1 : 0),
                        0
                    )
                    const progress = Math.floor(
                        complete_task / Math.max(tasks.length, 1)
                    )

                    return (
                        (payload.activeTab === 'selesai' && progress === 1) ||
                        (payload.activeTab === 'proses' && progress === 0)
                    )
                }),
                'createdAt',
                'desc'
            )
            return {
                ...state,
                filteredGoal,
            }
        }

        case Type.Goal.GET_FIND_GOAL: {
            const payload: Goals & { isPinned: boolean } = action.payload
            let goals = state.goals
            let groupGoals = state.groupGoals

            if (size(payload.goalMembers) > 1)
                if (groupGoals.find((goal) => goal.id == payload.id))
                    groupGoals = groupGoals.map((goal) => {
                        if (goal.id == payload.id) return payload
                        return goal
                    })
                else groupGoals = [...groupGoals, payload]
            else {
                if (goals.find((goal) => goal.id == payload.id))
                    goals = goals.map((goal) => {
                        if (goal.id == payload.id) return payload
                        return goal
                    })
                else goals = [...goals, payload]
            }

            return {
                ...state,
                goals,
                groupGoals,
                detailGoal: payload,
            }
        }

        case Type.Goal.UPDATE_FIND_GOAL: {
            const payloadUpdateGoals = action.payload as DetailGoalType
            return {
                ...state,
                goals: Lazy.from(state.goals)
                    .select((goal) => {
                        if (goal.id == payloadUpdateGoals.id)
                            goal = payloadUpdateGoals
                        return goal
                    })
                    .toArray(),
                detailGoal: payloadUpdateGoals,
                loadingCardGoal: false,
            }
        }

        case Type.Goal.UPDATE_MUTABLE_GOAL: {
            const payloadUpdateGoals = action.payload as DetailGoalType

            const mappingGoals = (goals: Goals[]) =>
                Lazy.from(goals)
                    .select((goal) => {
                        if (goal.id == payloadUpdateGoals.id)
                            goal = payloadUpdateGoals
                        return goal
                    })
                    .toArray()

            const combineGoal = [state.goals, state.groupGoals].flat()

            return {
                ...state,
                goals: Lazy.from(mappingGoals(combineGoal))
                    .where((goal) => size(goal.goalMembers) < 2)
                    .toArray(),
                groupGoals: Lazy.from(mappingGoals(combineGoal))
                    .where((goal) => size(goal.goalMembers) > 1)
                    .toArray(),
                detailGoal: payloadUpdateGoals,
                loadingCardGoal: false,
            }
        }

        case Type.Goal.ON_DETAIL_GOAL: {
            let newDetailGoal: DetailGoalType | undefined
            const payloadTransform = action.payload as { goalId: string }

            newDetailGoal = state.goals.find(
                (goal) => goal.id == payloadTransform.goalId
            ) as DetailGoalType

            if (isEmpty(newDetailGoal)) {
                newDetailGoal = state.groupGoals.find(
                    (goal) => goal.id == payloadTransform.goalId
                ) as DetailGoalType
            }

            const foundPinnedGoal = state.pinnedGoalId.some(
                (goalId) => newDetailGoal?.id == goalId
            )

            if (foundPinnedGoal)
                newDetailGoal = {
                    ...newDetailGoal,
                    isPinned: true,
                }

            return {
                ...state,
                detailGoal: {
                    ...newDetailGoal!,
                    tasks: newDetailGoal.tasks,
                },
            }
        }

        case Type.Goal.SET_DELETE_ALL_TASK: {
            return {
                ...state,
                goals: clearGoals(state.goals),
                filteredGoal: clearGoals(state.filteredGoal),
                groupGoals: clearGoals(state.groupGoals),
                pinnedGoal: clearGoals(state.pinnedGoal),
                loadingCardGoal: false,
            }
        }

        case Type.Goal.GET_DELETED_GOAL: {
            const deleteGoal = action.payload as PickOne<GoalAPI>
            const { goals, groupGoals } = personalAndGroupGoalsSync(
                state.typeGoal,
                state.goals,
                state.groupGoals,
                deleteGoal?.goalId!
            )

            return {
                ...state,
                goals,
                groupGoals,
                detailGoal: defaultState.detailGoal,
            }
        }

        case Type.Task.GET_RESPONSE_ADDING_TASK:
            const getResponseAddingTaskPayload =
                action.payload as ResponseAddingTask
            const onSelectHandler = (goal: Goals) => {
                if (goal.id == getResponseAddingTaskPayload.goalId) {
                    goal.tasks = [
                        ...goal.tasks,
                        getResponseAddingTaskPayload.newTask,
                    ]
                }
                return goal
            }

            const newDetailGoalAddingTask: DetailGoalType = {
                ...state.detailGoal,
                tasks: sortBy(
                    [
                        ...state.detailGoal.tasks,
                        getResponseAddingTaskPayload.newTask,
                    ],
                    'dueDate'
                ),
            }

            return {
                ...state,
                goals: Lazy.from(state.goals).select(onSelectHandler).toArray(),
                groupGoals: Lazy.from(state.groupGoals)
                    .select(onSelectHandler)
                    .toArray(),
                detailGoal: newDetailGoalAddingTask,
                loadingCardGoal: false,
            }

        case Type.Goal.DEFAULT_GOAL_STATE:
            return defaultState

        case Type.Goal.GET_PINNED_GOAL_PERSONAL: {
            const payloadPinnedGoal = action.payload as PinnedGroupGoal
            const { isHide, pinnedGoal, loadingCardGoal, pinnedGoalId } =
                goalsHandler(
                    payloadPinnedGoal.pinnedGoals,
                    payloadPinnedGoal.goals
                )

            return {
                ...state,
                pinnedGoal,
                isHide,
                loadingCardGoal,
                pinnedGoalId,
            }
        }

        case Type.Goal.ON_PINNED_GOAL_DETAIL:
            const findPinnedDetailGoal = state.pinnedGoal.find(
                (pinnedGoal) => pinnedGoal.id == (action.payload as string)
            )
            let newDetailGoal = state.detailGoal

            if (findPinnedDetailGoal) {
                newDetailGoal = {
                    ...newDetailGoal,
                    isPublic: true,
                }
            }

            return {
                ...state,
                detailGoal: newDetailGoal,
            }

        case Type.Goal.GET_PRIVATE_GOAL: {
            let newDetailGoalPrivate = state.detailGoal
            const payload = action.payload as string
            if (newDetailGoalPrivate.id == payload)
                newDetailGoalPrivate = {
                    ...newDetailGoalPrivate,
                    isPublic: false,
                }

            const newGoals = Lazy.from(state.goals)
                .select((goal) => {
                    if (goal.id == payload) goal.isPublic = false
                    return goal
                })
                .toArray()

            return {
                ...state,
                detailGoal: newDetailGoalPrivate,
                goals: newGoals,
                loadingCardGoal: false,
            }
        }

        case Type.Goal.GET_PUBLIC_GOAL: {
            let newDetailGoalPublic = state.detailGoal
            const payload = action.payload as string
            if (newDetailGoalPublic.id == payload)
                newDetailGoalPublic = {
                    ...newDetailGoalPublic,
                    isPublic: true,
                }

            const newGoals = Lazy.from(state.goals)
                .select((goal) => {
                    if (goal.id == payload) goal.isPublic = true
                    return goal
                })
                .toArray()

            return {
                ...state,
                detailGoal: newDetailGoalPublic,
                goals: newGoals,
                loadingCardGoal: false,
            }
        }

        case Type.Goal.SET_SYNC_GOAL: {
            const setSyncGoal: SyncGoal = action.payload
            const goalTransform = (goalsGroup: Goals[]) =>
                Lazy.from(goalsGroup)
                    .select((goals) => {
                        if (goals.id == setSyncGoal.goalId) {
                            return {
                                ...goals,
                                tasks: Lazy.from(goals.tasks)
                                    .select((task) => {
                                        if (task.id == setSyncGoal.taskId) {
                                            return {
                                                ...task,
                                                completeBy: task.completeBy
                                                    ? undefined
                                                    : setSyncGoal.isCompleteBy,
                                            }
                                        }

                                        return task
                                    })
                                    .toArray(),
                            }
                        }
                        return goals
                    })
                    .toArray()

            return {
                ...state,
                goals: goalTransform(state.goals),
                groupGoals: goalTransform(state.groupGoals),
                pinnedGoal: Lazy.from(state.pinnedGoal)
                    .select((pinnedGoal) => {
                        if (pinnedGoal.id == setSyncGoal.goalId) {
                            return {
                                ...pinnedGoal,
                                tasks: Lazy.from(pinnedGoal.tasks)
                                    .select((task) => {
                                        if (task.id == setSyncGoal.taskId) {
                                            return {
                                                ...task,
                                                completeBy: task.completeBy
                                                    ? undefined
                                                    : setSyncGoal.isCompleteBy,
                                            }
                                        }
                                        return task
                                    })
                                    .toArray(),
                            }
                        }

                        return pinnedGoal
                    })
                    .toArray(),
                loadingCardGoal: false,
            }
        }

        case Type.Goal.GET_PINNED_GOAL_GROUP: {
            const payloadPinnedGoalGroup = action.payload as PinnedGroupGoal
            const { isHide, pinnedGoal, pinnedGoalId } = goalsHandler(
                payloadPinnedGoalGroup.pinnedGoals,
                payloadPinnedGoalGroup.goals
            )
            return {
                ...state,
                pinnedGoal,
                pinnedGoalId,
                isHide,
            }
        }

        default:
            return state
    }
}
