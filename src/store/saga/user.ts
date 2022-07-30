import { call, put, takeLeading } from 'redux-saga/effects'
import { store } from 'store'

import * as Types from 'src/store/types'
import { apiCall } from 'src/api/axiosApiCallWrapper'
import { serviceUrl } from 'src/api/serviceURL'
import {
    MergeReponseUserTrackingHandler,
    SagaResponse,
    UserTrackingInformationType,
} from 'src/utils/types'
import * as Actions from 'src/store/actions'

function* setUserTrackingSessionStart({
    payload,
}: SagaResponse<MergeReponseUserTrackingHandler>): any {
    if (payload?.isConnected) {
        try {
            const bodyData: UserTrackingInformationType = {
                deviceId: payload.deviceId,
                deviceType: payload.deviceType,
                docheckInstalledVersion: payload.docheckInstalledVersion,
                sessionId: payload.sessionId,
                userId: store.getState().user_login_data.user.id,
            }
            yield call(
                apiCall,
                'POST',
                serviceUrl.trackingSessionStart,
                bodyData,
                payload.token
            )

            yield put(
                Actions.initializeUserTrackingSessionStart(bodyData.sessionId)
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }
}

function* setUserTrackingSessionEnd({
    payload,
}: SagaResponse<MergeReponseUserTrackingHandler>): any {
    if (payload?.isConnected) {
        try {
            const bodyData: UserTrackingInformationType = {
                deviceId: payload.deviceId,
                deviceType: payload.deviceType,
                docheckInstalledVersion: payload.docheckInstalledVersion,
                sessionId: store.getState().userTracking.latestSessionId,
                userId: store.getState().user_login_data.user.id,
            }
            yield call(
                apiCall,
                'POST',
                serviceUrl.trackingSesssionEnd,
                bodyData,
                payload.token
            )

            yield put(
                Actions.initializeUserTrackingSessionEnd(bodyData.sessionId)
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }
}

export default function* goalSaga() {
    yield takeLeading(
        Types.USER.SET_USER_TRACKING_SESSION_START,
        setUserTrackingSessionStart
    )
    yield takeLeading(
        Types.USER.SET_USER_TRACKING_SESSION_END,
        setUserTrackingSessionEnd
    )
}
