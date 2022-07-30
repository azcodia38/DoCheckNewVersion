import { useSelector } from 'react-redux'
import StoreData from 'store/types'

export default function useUserCredential() {
    const user = useSelector(
        ({ user_login_data }: StoreData) => user_login_data.user
    )

    return user
}
