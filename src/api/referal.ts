import API, { OfflineFallback } from '.'
import { User } from 'src/entity/User.entity'

export async function allReferalAPI(
    Authorization: string,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            '/me/referral-users',
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

export async function allReferalWithGoalsAPI(
    Authorization: string,
    of?: OfflineFallback<User[]>
): Promise<User[]> {
    try {
        const result: User[] = await API<User[]>(
            '/me/referral-users-min-one-goal',
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
