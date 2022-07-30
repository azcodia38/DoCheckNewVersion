/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import axios, { Method } from 'axios'

import { ExcludedMethodType } from 'src/utils/types'
import { serviceUrl } from './serviceURL'

/**
 * Create an Axios Client with defaults
 * Reference: https://dev.to/ajmal_hasan/axios-api-call-wrapper-with-redux-saga-46mj
 */

const client = axios.create({
    baseURL: serviceUrl.baseURL,
})

const onSuccess = function (response: any) {
    // console.debug('Request Successful!', response)
    return response.data
}

const onError = function (error: any) {
    console.error('Request Failed:', error.config)

    // handling error
    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        // console.error('Status:', error.response.status)
        // console.error('Data:', error.response.data)
        // console.error('Headers:', error.response.headers)
    } else {
        // Something else happened while setting up the request
        // triggered the error
        // console.error('Error Message:', error.message)
    }

    return Promise.reject(error.response || error.message)
}

/**
 * Request Wrapper with default success/error actions
 */
export const apiCall = async (
    method: Exclude<Method, ExcludedMethodType>,
    route: string,
    body: any = null,
    token: string | undefined
) => {
    // Inject request header by Any Request
    client.interceptors.request.use(function (config) {
        if (token) config.headers.Authorization = token
        return config
    })

    try {
        const sendResponse = await client({
            method,
            url: route,
            data: body,
        })
        return await onSuccess(sendResponse)
    } catch (error: any) {
        return await onError(error)
    }
}
