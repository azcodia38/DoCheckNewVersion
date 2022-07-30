/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { call, fork, put, takeLatest } from 'redux-saga/effects'
import { apiCall } from 'src/api/axiosApiCallWrapper'
import { serviceUrl } from 'src/api/serviceURL'

import * as Types from 'src/store/types'
import * as Actions from 'src/store/actions'
import { PayloadResponse } from 'src/utils/types'

interface SagaResponse {
    type: string
    payload: PayloadResponse
}

function* getPinnedGoals({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'GET',
                serviceUrl.pinnedGoals,
                undefined,
                payload.token
            ) //Get request

            yield put(Actions.getPinnedGoals(result))
        } catch (error) {
            // console.log(error)
        }
    } else {
        // handling offline
        yield put(Actions.initializeOfflinePinnedGoal())
    }

    if (payload.isLoading) payload.isLoading(false)
}

export default function* defaultSaga() {
    yield takeLatest(Types.Goal.GET_PINNED_GOAL, getPinnedGoals)
}
