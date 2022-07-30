import moment from 'moment'
import { PermissionsAndroid, Platform, Share } from 'react-native'
import {
    first,
    isArray,
    size,
    startCase,
    toLower,
    toString,
    trim,
    uniqueId,
    upperFirst,
} from 'lodash'
import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { DebugAlert } from './alert'
import { GOAL_COLOR_LIST } from './const'
import { ACCOUNT_TYPE, User } from 'src/entity/User.entity'
import { DEFAULT_USERNAME, EMPTY_SPACES } from 'src/utils/types/componentsTypes'

export function isEmailValid(email: string) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export function titleCase(words: string) {
    if (words) return startCase(toLower(words))
    return DEFAULT_USERNAME
}

export function titleCaseAlternative(words: string) {
    if (words)
        return words
            .split(EMPTY_SPACES)
            .map((word) => upperFirst(word))
            .join(EMPTY_SPACES)
    return words
}

export function isURLValid(url: string) {
    return url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
}

export const isIOS: number = Platform.OS === 'ios' ? 1 : 0
export const isAndroid: number = Platform.OS === 'android' ? 1 : 0

export function randomID(length: number): string {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

export interface Point {
    x: number
    y: number
    w?: number
    h?: number
}

export interface TypingTimeout {
    is_typing: boolean
    timeout: any
}

export function delay(millis: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}

export function getDatefromDateOrString(date: string | Date): Date {
    const first_check =
        date instanceof Date
            ? (date as Date)
            : moment(date as string, 'DD/MM/YYYY HH:mm').toDate()
    if (moment(first_check).isValid()) {
        return first_check
    }

    const _iso = moment(date)
    if (_iso.isValid()) {
        return _iso.toDate()
    }

    return new Date()
}

export function getBackgroundColor(uuid: string) {
    let index = 0
    const color_list_len = GOAL_COLOR_LIST.length
    for (const c of uuid.slice(11)) {
        index = (index + c.charCodeAt(0)) % color_list_len
    }

    return GOAL_COLOR_LIST[index]
}

export interface TotalData {
    goal: number
    follower: number
    following: number
}

export function getUsername(user: User): string {
    if (user.username) {
        return `@${user.username}`
    }
    if (!user.accountType) {
        return ''
    }
    return user.accountType === ACCOUNT_TYPE.REGULAR
        ? `@${user.username}`
        : `Login with ${user.accountType}`
}

export function getUsername2(
    username: string,
    account_type: ACCOUNT_TYPE
): string {
    if (username) {
        return `@${username}`
    }

    return account_type === ACCOUNT_TYPE.REGULAR
        ? `@${username}`
        : `Login with ${account_type}`
}

export async function share(message: string) {
    try {
        const result = await Share.share({ message })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        DebugAlert(error.message)
    }
}

export async function pickImage(
    use_camera?: boolean
): Promise<ImagePickerResponse> {
    return new Promise<ImagePickerResponse>((resolve, reject) => {
        const callback = (res: ImagePickerResponse) => {
            if (res.didCancel) {
                reject(`Canceled`)
                return
            }
            if (res.errorCode || res.errorMessage) {
                reject(res.errorMessage)
                return
            }
            if (!res.uri) {
                reject(`URI null`)
                return
            }
            resolve(res)
        }
        if (use_camera) {
            launchCamera(
                {
                    mediaType: 'photo',
                    cameraType: 'front',
                },
                callback
            )
        } else {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                },
                callback
            )
        }
    })
}

export async function fetchWithTimeout(resource: any, options: any) {
    const { timeout = 8000 } = options

    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
    })
    clearTimeout(id)

    return response
}

export function limitChar(_: string, limit: number): string {
    return !limit || !_
        ? ''
        : `${_.slice(0, limit)}${_.length > limit ? '...' : ''}`
}

export function getFirstAndMiddleName(
    username: string,
    length: number = 2
): string {
    if (username) {
        const splitName: string[] = username.split(' ')
        if (!isArray(splitName) && size(splitName) >= 2) return username
        return splitName.slice(0, length).join(' ')
    }
    return username
}

export interface LinkPreviewData {
    url: string
    title: string
    siteName: string
    description: string
    images: string
    mediaType: string
    contentType: string
}

export function isValidDate(d: Date) {
    return d instanceof Date && !isNaN(d as any)
}

export async function checkAudioPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
        try {
            const grants = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])

            // console.log('write external stroage', grants)

            if (
                grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
            ) {
                // console.log('Permissions granted')
                return true
            } else {
                throw new Error('All required permissions not granted')
            }
        } catch (err) {
            console.warn(err)
            throw err
        }
    }
    return true
}

export function isBeforeNow(date: Date): boolean {
    return moment(date).diff(new Date(), 'm') < 0
}

export function isBetweenNowAndToday(date: Date): boolean {
    return moment(date).isBetween(new Date(), moment().endOf('day'), 'm', '[]')
}

export function isTomorrow(date: Date): boolean {
    return moment(date).isBetween(
        moment().startOf('day').add(1, 'd'),
        moment().endOf('day').add(1, 'd'),
        'm',
        '[]'
    )
}

export function isThisWeek(date: Date): boolean {
    return moment(date).isBetween(
        moment().startOf('day').add(2, 'd'),
        moment().endOf('day').add(7, 'd'),
        'm',
        '[]'
    )
}

export function isNextWeek(date: Date): boolean {
    return moment(date).isBetween(
        moment().startOf('day').add(8, 'd'),
        moment().endOf('day').add(14, 'd'),
        'm',
        '[]'
    )
}

export function getRandomWithRange(n: number = 20) {
    return 5 + Math.floor(Math.random() * n)
}

export function formatMinuteSeconds(seconds: number): string {
    const rem_s = Math.floor(seconds % 60)
    const res_m = Math.floor(seconds / 60)
    const s = `${rem_s > 9 ? '' : 0}${rem_s}`
    const m = `${res_m > 9 ? '' : 0}${res_m}`

    return `${m}:${s}`
}

export function notificationGetUsername(username: string | undefined): string {
    if (!username) return 'DoCheckers'
    const getFirstUsername = username.split(' ')
    if (isArray(getFirstUsername)) return first(getFirstUsername)!
    return username
}

export function isDueDateExpired(dueDate: string | Date | undefined) {
    const dueDateTransform = moment(dueDate)
    const now = moment(new Date())

    if (dueDateTransform.diff(now) <= 0) return true
    else return false
}

export function filterIDtoNumber(uuid: string): string | number {
    if (uuid) return toString(uuid.match(/\d/g)?.join('')).substring(0, 5)
    return uniqueId()
}

export function removeStripLine(title: string) {
    return title.replace(/\s/g, ' ')
}

export const clearAsyncStorage = async () => {
    AsyncStorage.clear()
}

export interface AudioPathDuration {
    path?: string
    duration?: number
}

export const ageUnderTerm = (birthDate: string) =>
    Math.abs(moment(birthDate, 'DD/MM/YYYY').diff(new Date(), 'years', true)) <
    15
        ? `Umur belum memenuhi persyaratan`
        : ''
