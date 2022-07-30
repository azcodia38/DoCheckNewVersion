import axios from 'axios'
import moment from 'moment'

const PRODUCTION_ENDPOINT = 'https://api.docheck.id'
const DEVELOPMENT_ENDPOINT = 'https://dev.docheck.id/api'
const LOCALHOST_ENDPOINT = 'http://localhost:3000'
export const ENDPOINT: string = DEVELOPMENT_ENDPOINT
export const is_development_mode = ENDPOINT != PRODUCTION_ENDPOINT

export interface PaginationData<T> {
    data: T[]
    total_page: number
}

export type APIMethod = 'get' | 'put' | 'post' | 'delete'

export interface PendingRequest {
    id: string
    path: string
    method: APIMethod
    body: any
    header: any
}

export interface OfflineFallback<T> {
    connected: boolean
    actionSave?(data: T): Promise<void>
    fallback(data?: { [key: string]: any }): T
    onOfflineRequest?(
        path: string,
        method: APIMethod,
        body?: any,
        header?: any
    ): void
}

const client = axios.create()
client.interceptors.response.use((originalResponse) => {
    handleDates(originalResponse.data)
    return originalResponse
})

export default async function API<T>(
    path: string,
    method: APIMethod,
    body: any = {},
    header: any = {},
    of?: OfflineFallback<T>
): Promise<T> {
    if (of) {
        if (!of.connected) {
            if (of.onOfflineRequest) {
                of.onOfflineRequest(path, method, body, header)
            }
            return await of.fallback(body)
        }
    }

    const request_timestamp = new Date().getTime()

    // console.log(`[${request_timestamp}] ${method.toUpperCase()} ${path}`);
    // console.log(`[${request_timestamp}] ${JSON.stringify(body)}`);
    // console.log(`[${request_timestamp}] ${new URLSearchParams(header).toString()}`);

    try {
        const full_url = `${ENDPOINT}${path}${
            (method == 'get' || method == 'delete') &&
            Object.keys(body).length > 0
                ? `?${new URLSearchParams(body).toString()}`
                : ''
        }`
        const res = await client({
            url: full_url,
            method,
            data: method == 'get' || method == 'delete' ? null : body,
            headers: {
                Accept: 'application/json',
                ...(method == 'get' || method == 'delete'
                    ? {}
                    : {
                          'Access-Control-Allow-Headers': 'Content-Type',
                          'Content-Type': 'application/json',
                      }),
                ...header,
            },
        })
        if (of && of.actionSave) {
            await of.actionSave(res.data)
        }
        return res.data
    } catch (err: any) {
        throw new Error(err.response?.data ?? err.toString())
    }
}

const isoDateFormat =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/

function isIsoDateString(value: any): boolean {
    return value && typeof value === 'string' && isoDateFormat.test(value)
}

function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== 'object')
        return body

    for (const key of Object.keys(body)) {
        const value = body[key]
        if (isIsoDateString(value)) {
            body[key] = moment(value).toDate()
        } else if (typeof value === 'object') handleDates(value)
    }
}
