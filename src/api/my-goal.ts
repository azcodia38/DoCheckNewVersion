import moment from 'moment'
import API, { OfflineFallback } from '.'
import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { Task } from 'src/entity/Task.entity'

export interface TaskRequest {
    title?: string
    audioUrl?: string
    audioDurationMs?: number
    notes: string
    dueDate: string | Date
    type: string
    repeatTask: number
    recommendationUrl: string
    assignees: string[]
}

export interface TaskCreateGoalRequest extends TaskRequest {
    id?: string
}

export interface CreateGoalRequest {
    id: string
    name: string
    description: string
    goalMembers: string[]
    isPublic: boolean
    tasks: TaskCreateGoalRequest[]
}

export async function myGoalsAPI(
    Authorization: string,
    q: string,
    of?: OfflineFallback<Goals[]>
): Promise<Goals[]> {
    try {
        const result: Goals[] = await API<Goals[]>(
            '/me/goals',
            'get',
            { q },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function myGroupGoalsAPI(
    Authorization: string,
    q: string,
    of?: OfflineFallback<Goals[]>
): Promise<Goals[]> {
    try {
        const result: Goals[] = await API<Goals[]>(
            '/me/group-goals',
            'get',
            { q },
            { Authorization },
            of
        )
        if (result.length > 0 && !result[0].goalMembers) {
            return []
        }
        return result
    } catch (err) {
        return []
    }
}

export async function myGroupGoalsAPI2(
    Authorization: string,
    q: string,
    of?: OfflineFallback<Goals[]>
): Promise<Goals[]> {
    try {
        const result: Goals[] = await API<Goals[]>(
            '/me/group-goals',
            'put',
            { q },
            { Authorization },
            of
        )
        if (result.length > 0 && !result[0].goalMembers) {
            return []
        }
        return result
    } catch (err) {
        return []
    }
}

export interface PaginationGoalResult {
    goals: (Goals & PromotionGoals)[]
    total: number
    totalCopy: { [key: string]: number }
}

export async function myGoalsRecommendationAPI(
    Authorization: string,
    q?: string,
    limit: number = 99999,
    offset: number = 0,
    of?: OfflineFallback<PaginationGoalResult>
): Promise<PaginationGoalResult> {
    try {
        const result: PaginationGoalResult = await API<PaginationGoalResult>(
            '/me/goals-recommendation',
            'get',
            { q, limit, offset },
            { Authorization },
            of
        )
        result.goals.forEach((g: Goals) => {
            g.totalCopy = result.totalCopy[g.id]
        })
        return result
    } catch (err) {
        throw err
    }
}

export async function allGoalsRecommendationAPI(
    Authorization: string,
    q?: string,
    limit: number = 10,
    offset: number = 0,
    of?: OfflineFallback<PaginationGoalResult>
): Promise<PaginationGoalResult> {
    try {
        const result: PaginationGoalResult = await API<PaginationGoalResult>(
            '/public-goal/all',
            'get',
            { q, limit, offset },
            { Authorization },
            of
        )
        result.goals.forEach((g: Goals) => {
            g.totalCopy = result.totalCopy[g.id]
        })
        return result
    } catch (err) {
        throw err
    }
}

export async function myGoalsFollowingAPI(
    Authorization: string,
    q: string,
    limit: number = 99999,
    offset: number = 0,
    of?: OfflineFallback<PaginationGoalResult>
): Promise<PaginationGoalResult> {
    try {
        const result: PaginationGoalResult = await API<PaginationGoalResult>(
            '/me/following-goals',
            'get',
            { q, limit, offset },
            { Authorization },
            of
        )
        result.goals.forEach((g: Goals) => {
            g.totalCopy = result.totalCopy[g.id]
        })
        return result
    } catch (err) {
        throw err
    }
}

export async function myGoalsRelevancyAPI(
    Authorization: string,
    q: string,
    limit: number = 99999,
    offset: number = 0,
    of?: OfflineFallback<PaginationGoalResult>
): Promise<PaginationGoalResult> {
    try {
        const result: PaginationGoalResult = await API<PaginationGoalResult>(
            '/me/goals-similar-profile',
            'get',
            { q, limit, offset },
            { Authorization },
            of
        )
        result.goals.forEach((g: Goals) => {
            g.totalCopy = result.totalCopy[g.id]
        })
        return result
    } catch (err) {
        throw err
    }
}

export async function myGoalDetailAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<Goals>
): Promise<Goals> {
    try {
        const result: Goals = await API<Goals>(
            `/me/goal/${id}`,
            'get',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function updateMyGoalAPI(
    Authorization: string,
    id: string,
    data: CreateGoalRequest,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        data = {
            ...data,
            tasks:
                data?.tasks.map((t: TaskCreateGoalRequest) => {
                    if (!t.dueDate) {
                        delete (t as any).dueDate
                    } else {
                        if (t.dueDate instanceof Date) {
                            t.dueDate = moment(t.dueDate).format(
                                'DD/MM/YYYY HH:mm:ss'
                            )
                        }
                    }

                    return t
                }) ?? [],
        }
        const result: boolean = await API<boolean>(
            `/me/goal/${id}`,
            'put',
            data,
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteMyGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}`,
            'delete',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function createMyGoalAPI(
    Authorization: string,
    data: CreateGoalRequest,
    of?: OfflineFallback<Goals>
): Promise<Goals> {
    try {
        data = {
            ...data,
            tasks:
                data?.tasks.map((t: TaskCreateGoalRequest) => {
                    if (!t.dueDate) {
                        delete (t as any).dueDate
                    } else {
                        if (t.dueDate instanceof Date) {
                            t.dueDate = moment(t.dueDate).format(
                                'DD/MM/YYYY HH:mm:ss'
                            )
                        }
                    }

                    return t
                }) ?? [],
        }
        const result: Goals = await API<Goals>(
            `/me/goal`,
            'post',
            data,
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function createNewTaskOnMyGoalAPI(
    Authorization: string,
    goal_id: string,
    data: TaskRequest,
    of?: OfflineFallback<Task>
): Promise<Task> {
    try {
        if (!data.dueDate) delete (data as any).dueDate

        if (data.dueDate instanceof Date)
            data.dueDate = moment(data.dueDate).format('DD/MM/YYYY HH:mm:ss')

        const result: Task = await API<Task>(
            `/me/goal/${goal_id}/task`,
            'post',
            data,
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteSomeMyGoalsAPI(
    Authorization: string,
    goalIds: string[],
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goals/delete`,
            'post',
            { goalIds },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteAllMyGoalAPI(
    Authorization: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/delete-all-goal`,
            'post',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function pinMyGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/pin`,
            'put',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function unpinMyGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/unpin`,
            'put',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function publicMyGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/public`,
            'put',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function privateMyGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/private`,
            'put',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function pinnedGoalsAPI(
    Authorization: string,
    of?: OfflineFallback<PinnedGoals[]>
): Promise<PinnedGoals[]> {
    try {
        const result: PinnedGoals[] = await API<PinnedGoals[]>(
            `/me/pinned-goal`,
            'get',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function addMemberToGoalAPI(
    Authorization: string,
    id: string,
    userId: string,
    of?: OfflineFallback<any>
): Promise<any> {
    try {
        const result: any = await API<any>(
            `/goal/${id}/invitation-member`,
            'post',
            { userId },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteMemberFromGoalAPI(
    Authorization: string,
    id: string,
    member_id: string,
    of?: OfflineFallback<any>
): Promise<any> {
    try {
        const result: any = await API<any>(
            `/goal/${id}/member/${member_id}`,
            'delete',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function copyTemplateToGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<Goals>
): Promise<Goals> {
    try {
        const result: Goals = await API<Goals>(
            `/template/${id}/copy`,
            'post',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function confirmInvitationMemberGoalAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/goal/${id}/confirm-invitation-member`,
            'post',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}
