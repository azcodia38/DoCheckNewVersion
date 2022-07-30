/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import * as Types from 'src/store/types'
import { PayloadResponse, UserTrackingInformationType } from 'src/utils/types'
import { Optional } from 'store/types'

/**
 * User Action Handler
 */
export const onUserTrackingSessionStart = (
    payload: PayloadResponse & Optional<UserTrackingInformationType, 'userId'>
) => ({
    type: Types.USER.SET_USER_TRACKING_SESSION_START,
    payload,
})

export const onUserTrackingSessionEnd = (
    payload: PayloadResponse & Optional<UserTrackingInformationType, 'userId'>
) => ({
    type: Types.USER.SET_USER_TRACKING_SESSION_END,
    payload,
})

export const onResetUserTracking = () => ({
    type: Types.USER.SET_CLEAN_USER_TRACKING,
})

export const initializeUserTrackingSessionStart = (sessionId: string) => ({
    type: Types.USER.SAGA_USER_TRACKING_SESSION_START,
    payload: sessionId,
})

export const initializeUserTrackingSessionEnd = (sessionId: string) => ({
    type: Types.USER.SAGA_USER_TRACKING_SESSION_END,
    payload: sessionId,
})
