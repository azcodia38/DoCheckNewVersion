import { NavigationContainerRef } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserLoginData } from 'store/data/user'
import StoreData from 'store/types'

export default function useAuthorization(navigation?: NavigationContainerRef) {
    const access_token = useSelector(
        (state: StoreData) => state.user_login_data.access_token
    )
    const dispatch = useDispatch()

    if (!access_token) {
        dispatch(removeUserLoginData())
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'First',
                    },
                ],
            })
        }
    }

    return `Bearer ${access_token}`
}
