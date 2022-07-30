import API, { OfflineFallback } from '.'
import { GENDER, User } from '../entity/User.entity'

export interface UpdateUserRequet {
    fullname?: string
    username?: string
    profilePicture?: string
    description?: string
    phoneNumber?: string
    email?: string
    gender?: GENDER
    birthPlace?: string
    birthDate?: string
    city?: string
    hobby?: string
    fcmToken?: string
}

export async function myProfileAPI(
    Authorization: string,
    of?: OfflineFallback<User>
): Promise<User> {
    try {
        const result: User = await API<User>(
            `/me/profile`,
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

export async function totalFollowerAPI(
    Authorization: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/me/total-follower`,
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

export async function totalFollowingAPI(
    Authorization: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/me/total-following`,
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

export async function totalGoalAPI(
    Authorization: string,
    of?: OfflineFallback<number>
): Promise<number> {
    try {
        const result: number = await API<number>(
            `/me/total-goal`,
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

export async function updateProfileAPI(
    Authorization: string,
    data: UpdateUserRequet,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        if (!data.birthDate) {
            delete data.birthDate
        }
        const result: boolean = await API<boolean>(
            `/me/profile`,
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

export async function updateFCMTokenAPI(
    Authorization: string,
    fcmToken: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/profile`,
            'put',
            { fcmToken },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function changePasswordAPI(
    Authorization: string,
    password: string,
    rePassword: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/profile/password`,
            'put',
            { password, rePassword },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function changeEmailAPI(
    Authorization: string,
    email: string,
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/profile/email`,
            'put',
            { email },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}
