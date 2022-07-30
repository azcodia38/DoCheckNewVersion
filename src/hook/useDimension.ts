import { Dimensions } from 'react-native'

export default function useDimension() {
    return Dimensions.get('window')
}
