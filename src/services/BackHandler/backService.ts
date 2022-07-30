import { BackHandler } from 'react-native'

export default class BackService {
    addBackHandler(handleBackButton: () => boolean) {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    }

    removeBackHandler(handleBackButton: () => boolean) {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
}
