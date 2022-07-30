import { useSelector } from 'react-redux'
import StoreData from 'store/types'

export default function useConnected() {
    const connected: boolean = useSelector(
        ({ connection }: StoreData) => connection.connected
    )
    return {
        connected,
    }
}
