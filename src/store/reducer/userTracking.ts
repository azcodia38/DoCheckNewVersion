import { ReducerAction } from 'src/utils/types'
import { DefaultUserTrackingReducer } from 'store/types'
import * as Types from 'src/store/types/'

const defaultState: DefaultUserTrackingReducer = {
    latestSessionId: '',
    legacySessionId: '',
}

export default function UserTrackingReducer(
    state = defaultState,
    action: ReducerAction<any>
): DefaultUserTrackingReducer {
    switch (action.type) {
        case Types.USER.SAGA_USER_TRACKING_SESSION_START:
            return {
                ...state,
                latestSessionId: action.payload as string,
                legacySessionId: '',
            }
        case Types.USER.SAGA_USER_TRACKING_SESSION_END:
            return {
                ...state,
                latestSessionId: '',
                legacySessionId: action.payload as string,
            }
        case Types.USER.SET_CLEAN_USER_TRACKING:
            return defaultState
        default:
            return state
    }
}
