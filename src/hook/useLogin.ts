/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { useCallback, useEffect, useState } from 'react'
import Snackbar from 'react-native-snackbar'
import { useDispatch } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { theme } from 'src/utils/const'
import useConnected from 'src/hook/useConnected'
import { EMPTY_TASK } from 'src/utils/lang'
import { setConnectionStatus } from 'store/data/connection'
import { fetchWithTimeout } from 'src/utils'

type CheckInternetType = (timeout?: number) => void

const RESOURCE_URL = 'https://clients1.google.com/generate_204'

export default function useLogin() {
    const dispatch = useDispatch()

    const { connected } = useConnected()

    const [isLoggedIn, setIsLoggedIn] = useState<string>()

    const intialize = useCallback(async () => {
        GoogleSignin.configure()
        const isLogin = await AsyncStorage.getItem('is_logged_in')
        if (isLogin) setIsLoggedIn(isLogin)
        else {
            setIsLoggedIn('0')
            // TODO error handling
        }
    }, [AsyncStorage, setIsLoggedIn, GoogleSignin])

    const checkInternet = useCallback<CheckInternetType>(
        async (timeout = 3000) => {
            setInterval(async () => {
                try {
                    await fetchWithTimeout(
                        RESOURCE_URL,
                        Object.assign({ timeout })
                    )
                    dispatch(setConnectionStatus(true))
                } catch (error) {
                    dispatch(setConnectionStatus(false))
                }
            }, timeout)
        },
        [fetchWithTimeout, setConnectionStatus, RESOURCE_URL]
    )

    useEffect(() => {
        if (!connected)
            // adding toast here
            Snackbar.show({
                text: EMPTY_TASK.OFFLINE.TITLE,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: theme.redColor,
            })
        // checkInternet()
    }, [connected])

    useEffect(() => {
        intialize()
    }, [])

    return {
        isLoggedIn,
    }
}
