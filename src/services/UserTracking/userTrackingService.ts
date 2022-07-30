import { AppState } from 'react-native'

type ActionHandler = () => void

export default class UserTrackingService {
    onStartSessionListener(actionHandler: ActionHandler) {
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active')
                if (nextAppState === 'active') actionHandler()
        })
    }

    onEndSessionListener(actionHandler: ActionHandler) {
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'inactive') actionHandler()
        })
    }

    onBackgroundSessionListener(actionHandler: ActionHandler) {
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'background') actionHandler()
        })
    }

    onRemoveStartSessionListener(actionHandler: ActionHandler) {
        AppState.removeEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') actionHandler()
        })
    }

    onRemoveEndSessionListener(actionHandler: ActionHandler) {
        AppState.removeEventListener('change', (nextAppState) => {
            if (nextAppState === 'inactive') actionHandler()
        })
    }

    onRemoveBackgroundSessionListener(actionHandler: ActionHandler) {
        AppState.removeEventListener('change', (nextAppState) => {
            if (nextAppState === 'background') actionHandler()
        })
    }
}
