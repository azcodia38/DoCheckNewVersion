import moment from 'moment'
import API, { OfflineFallback } from '.'
import { Task } from 'src/entity/Task.entity'
import { TaskCreateGoalRequest } from './my-goal'

export async function taskByIDAPI(
    Authorization: string,
    goal_id: string,
    task_id: string,
    of?: OfflineFallback<Task>
): Promise<Task> {
    try {
        const result: Task = await API<Task>(
            `/me/goal/${goal_id}/task/${task_id}`,
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

export async function updateTaskAPI(
    Authorization: string,
    goal_id: string,
    task_id: string,
    data: TaskCreateGoalRequest,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    data.dueDate =
        data.dueDate instanceof Date
            ? moment(data.dueDate).format('DD/MM/YYYY HH:mm:ss')
            : data.dueDate
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${goal_id}/task/${task_id}`,
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

export async function deleteTaskAPI(
    Authorization: string,
    id: string,
    taskId: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/task/${taskId}`,
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

export async function checkTaskAPI(
    Authorization: string,
    goal_id: string,
    task_id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${goal_id}/task/${task_id}/check`,
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

export async function uncheckTaskAPI(
    Authorization: string,
    goal_id: string,
    task_id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${goal_id}/task/${task_id}/uncheck`,
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

export async function addUserToTaskAPI(
    Authorization: string,
    id: string,
    task_id: string,
    userId: string,
    of?: OfflineFallback<any>
): Promise<any> {
    try {
        const result: any = await API<any>(
            `/goal/${id}/task/${task_id}/invites`,
            'post',
            { user_ids: [userId] },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteUserFromTaskAPI(
    Authorization: string,
    id: string,
    task_id: string,
    userId: string,
    of?: OfflineFallback<any>
): Promise<any> {
    try {
        // const result: any = await API<any>(`/goal/${id}/member/${member_id}`, 'delete', {}, { Authorization }, of);
        // return result;
        throw new Error(`Not implemented yet.`)
    } catch (err) {
        throw err
    }
}

export async function pinTaskAPI(
    Authorization: string,
    id: string,
    taskId: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/task/${taskId}/pin`,
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

export async function unpinTaskAPI(
    Authorization: string,
    id: string,
    taskId: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/goal/${id}/task/${taskId}/unpin`,
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

export async function deleteSomeTasksAPI(
    Authorization: string,
    taskIds: string[],
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/delete-tasks`,
            'post',
            { taskIds },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function deleteAllTaskAPI(
    Authorization: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/delete-all-tasks`,
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
