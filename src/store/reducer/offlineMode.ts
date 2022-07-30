import * as Type from 'src/store/types'
import { DefaultOfflineModeState, DefaultPinnedGoalsData } from 'store/types'
import { ReducerAction } from 'src/utils/types'
import { followAPI } from 'src/api/user'

const defaultState: DefaultOfflineModeState = {
    onOfflineTemporaryGoalStorage: [],
}

export default function OfflineModeReducer(
    state = defaultState,
    action: ReducerAction<any>
): DefaultOfflineModeState {
    switch (action.type) {
        case Type.OFFLINE_MODE.SET_OFFLINE_GOAL_MODE:
            return {
                ...state,
                onOfflineTemporaryGoalStorage: [
                    ...state.onOfflineTemporaryGoalStorage,
                    action.payload,
                ],
            }

        case Type.OFFLINE_MODE.SET_OFFLINE_TASK_MODE:
            return {
                ...state,
                onOfflineTemporaryGoalStorage: [
                    ...state.onOfflineTemporaryGoalStorage,
                    action.payload,
                ],
            }

            case Type.OFFLINE_MODE.SET_OFFLINE_GENERAL:
                return {
                    ...state,
                    onOfflineTemporaryGoalStorage: [
                        ...state.onOfflineTemporaryGoalStorage,
                        action.payload,
                    ],
                }

        case Type.OFFLINE_MODE.CLEAN_OFFLINE_REQUEST:
            return {
                ...state,
                onOfflineTemporaryGoalStorage:
                    state.onOfflineTemporaryGoalStorage.filter(
                        (offlineList) => offlineList.id != action.payload
                    ),
            }
        default:
            return state
    }
}
