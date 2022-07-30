import { CreateGoalRequest, TaskCreateGoalRequest } from '../api/my-goal'
import { Goals } from 'src/entity/Goals.entity'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/entity/User.entity'
import moment from 'moment-timezone'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'

export function createGoalLocal(data: CreateGoalRequest, owner: User): Goals {
    return {
        id: data.id,
        owner,
        name: data.name,
        description: data.description,
        category: {
            id: uuidv4().toString(),
            label: '-',
        },
        tasks: data.tasks.map((t: TaskCreateGoalRequest) => ({
            id: t.id,
            title: t.title!,
            notes: t.notes,
            dueDate: t.dueDate
                ? moment(t.dueDate, 'DD/MM/YYYY HH:mm').toDate()
                : '',
            type: t.type,
            repeatTask: t.repeatTask,
            taskAsignnes: t.assignees.map((user_id: string) => ({
                id: uuidv4().toString(),
                goalMember: {
                    id: uuidv4().toString(),
                    user_id,
                    user: {
                        id: user_id,
                    } as any,
                    isConfirmed: false,
                },
            })),
            recommendationUrl: t.recommendationUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
        goalMembers: [
            {
                id: uuidv4().toString(),
                user_id: owner.id,
                user: owner,
                isConfirmed: true,
            },
            ...data.goalMembers.map((user_id: string) => ({
                id: uuidv4().toString(),
                user_id,
                user: {
                    id: user_id,
                } as any,
                isConfirmed: false,
            })),
        ],
        pinnedTasks: [],
        image: '',
        isPublic: data.isPublic,
        totalView: '0',
        isTemplate: false,
        createdAt: moment().tz('Asia/Jakarta').toNow(),
        updatedAt: moment().tz('Asia/Jakarta').toNow(),
    }
}

export function updateGoalLocal(goal: Goals, data: CreateGoalRequest): Goals {
    return {
        ...goal,
        name: data.name,
        description: data.description,
        tasks: data.tasks.map((t: TaskCreateGoalRequest) => ({
            id: uuidv4().toString(),
            title: t.title!,
            dueDate: t.dueDate
                ? moment(t.dueDate, 'DD/MM/YYYY HH:mm').toDate()
                : '',
            type: t.type,
            repeatTask: t.repeatTask,
            taskAsignnes: t.assignees.map((user_id: string) => ({
                id: uuidv4().toString(),
                goalMember: {
                    id: uuidv4().toString(),
                    user_id,
                    user: {
                        id: user_id,
                    } as any,
                    isConfirmed: false,
                },
            })),
            recommendationUrl: t.recommendationUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
        goalMembers: data.goalMembers.map((user_id: string) => ({
            id: uuidv4().toString(),
            user_id,
            user: {
                id: user_id,
            } as any,
            isConfirmed: false,
        })),
        isPublic: data.isPublic,
        updatedAt: new Date(),
    }
}

export function updateGoalToPulicLocal(goal: Goals): Goals {
    return {
        ...goal,
        isPublic: true,
        updatedAt: new Date(),
    }
}

export function updateGoalToPrivateLocal(goal: Goals): Goals {
    return {
        ...goal,
        isPublic: false,
        updatedAt: new Date(),
    }
}

export function createPinnedGoalLocal(goal: Goals): PinnedGoals {
    return {
        id: uuidv4().toString(),
        goal,
    }
}
