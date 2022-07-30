import API from '.'
import { GENDER } from '../entity/User.entity'
import { UserLoginData } from '../../store/types'

export type LoginThirdPartyType = 'facebook' | 'google' | 'apple'

export async function loginByEmailAPI(
    email: string,
    password: string
): Promise<UserLoginData> {
    try {
        const login_result: UserLoginData = await API<UserLoginData>(
            '/login',
            'post',
            { email, password }
        )
        return login_result
    } catch (err) {
        throw err
    }
}

export async function loginByTokenAPI(
    third_party_id: LoginThirdPartyType,
    access_token: string,
    name?: string
): Promise<UserLoginData> {
    try {
        const login_result: UserLoginData = await API<UserLoginData>(
            '/login/third-party',
            'post',
            { third_party_id, access_token, name }
        )
        return login_result
    } catch (err) {
        throw err
    }
}

export interface RegisterRequest {
    fullname: string
    username: string
    password: string
    rePassword: string
    email: string
    gender: GENDER
    birthDate: string
    referralCode: string
}

export async function registerAPI(data: RegisterRequest) {
    try {
        await API<any>('/register', 'post', data)
    } catch (err) {
        throw err
    }
}

export async function checkPasswordAPI(
    Authorization: string,
    password: string
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/me/check-password`,
            'put',
            { password },
            { Authorization }
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function resetPasswordAPI(email: string): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/request-reset-password`,
            'post',
            { email },
            {}
        )
        return result
    } catch (err) {
        throw err
    }
}
