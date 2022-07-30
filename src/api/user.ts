import API, { OfflineFallback } from '.'
import { Goals } from 'src/entity/Goals.entity'
import { User } from 'src/entity/User.entity'

export async function searchUsersAPI(
    Authorization: string,
    q: string,
    offset: number = 0,
    limit: number = 10,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            '/users',
            'get',
            { q, offset, limit },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function searchUsersByIDsAPI(
    Authorization: string,
    list_ids: string[],
    q: string,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            '/users',
            'post',
            { list_ids, q },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function userByIDAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<User>
): Promise<User> {
    try {
        const result: User = await API<User>(
            `/user/${id}`,
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

export async function totalFollowerUserAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/user/${id}/total-follower`,
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

export async function totalFollowingUserAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/user/${id}/total-following`,
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

export async function totalGoalUserAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/user/${id}/total-goal`,
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

export async function followingStatusUserAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        await API<any>(
            `/user/${id}/following-status`,
            'get',
            {},
            { Authorization },
            of
        )
        return true
    } catch (err) {
        return false
    }
}

export async function userGoalsAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<Goals[]>
): Promise<Goals[]> {
    try {
        const result: Goals[] = await API<Goals[]>(
            `/user/${id}/goals`,
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

export async function userGoalAPI(
    Authorization: string,
    id: string,
    goal_id: string,
    of?: OfflineFallback<Goals>
): Promise<Goals> {
    try {
        const result: Goals = await API<Goals>(
            `/user/${id}/goal/${goal_id}`,
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

export async function followAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/user/${id}/follow`,
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

export async function unfollowAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/user/${id}/unfollow`,
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

export async function confirmFollowerAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/user/${id}/confirm-follower`,
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

export async function followingsAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            `/user/${id}/followings`,
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

export async function followersAPI(
    Authorization: string,
    id: string,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            `/user/${id}/followers`,
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
