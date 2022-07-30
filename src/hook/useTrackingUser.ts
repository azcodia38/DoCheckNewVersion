/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import useAuthorization from 'src/hook/useAuthorization'
import useConnected from 'src/hook/useConnected'
import useUserCredential from 'src/hook/useUserCredential'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeviceInfoService from 'src/services/DeviceInfo/deviceInfoService'
import UserTrackingService from 'src/services/UserTracking/userTrackingService'
import {
    onResetUserTracking,
    onUserTrackingSessionEnd,
    onUserTrackingSessionStart,
} from 'src/store/actions'
import StoreData from 'store/types'
import { isAndroid, isIOS } from 'src/utils'

const deviceInfo = new DeviceInfoService()
const userTrackingService = new UserTrackingService()

export default function useTrackingUser() {
    const dispatch = useDispatch()

    const user = useUserCredential()
    const auth = useAuthorization()
    const { connected } = useConnected()
    const sessionId = useSelector(
        ({ userTracking }: StoreData) => userTracking.latestSessionId
    )

    const onStartSession = useCallback(async () => {
        const deviceInformation = await deviceInfo.getVerboseInformation()
        dispatch(
            onUserTrackingSessionStart({
                isConnected: connected,
                token: auth,
                user,
                sessionId: deviceInformation.sessionId,
                deviceId: deviceInformation.deviceId,
                deviceType: `${deviceInformation.deviceBrand}-${deviceInformation.deviceId}-${deviceInformation.deviceCode}`,
                docheckInstalledVersion:
                    deviceInformation.docheckInstalledVersion,
            })
        )
    }, [userTrackingService, deviceInfo, user.id, auth, connected])

    const registerTrackingListener = useCallback(async () => {
        if (user.id) {
            if (!sessionId) await onStartSession()
            // handling onStartState
            userTrackingService.onStartSessionListener(
                async () => await onStartSession()
            )

            // handling inBackgroundState
            userTrackingService.onBackgroundSessionListener(async () => {
                if (isAndroid) {
                    const deviceInformation =
                        await deviceInfo.getVerboseInformation()
                    dispatch(
                        onUserTrackingSessionEnd({
                            isConnected: connected,
                            token: auth,
                            user,
                            sessionId,
                            deviceId: deviceInformation.deviceId,
                            deviceType: `${deviceInformation.deviceBrand}-${deviceInformation.deviceId}-${deviceInformation.deviceCode}`,
                            docheckInstalledVersion:
                                deviceInformation.docheckInstalledVersion,
                        })
                    )
                }
            })

            userTrackingService.onEndSessionListener(async () => {
                if (isIOS) {
                    const deviceInformation =
                        await deviceInfo.getVerboseInformation()
                    dispatch(
                        onUserTrackingSessionEnd({
                            isConnected: connected,
                            token: auth,
                            user,
                            sessionId,
                            deviceId: deviceInformation.deviceId,
                            deviceType: `${deviceInformation.deviceBrand}-${deviceInformation.deviceId}-${deviceInformation.deviceCode}`,
                            docheckInstalledVersion:
                                deviceInformation.docheckInstalledVersion,
                        })
                    )
                }
            })
        }
    }, [
        userTrackingService,
        deviceInfo,
        user.id,
        auth,
        connected,
        sessionId,
        isAndroid,
        isIOS,
    ])

    const removeUserTrackingListener = useCallback(() => {
        if (user.id) {
            userTrackingService.onRemoveStartSessionListener(() => {
                // console.log('remove active')
            })
            userTrackingService.onRemoveEndSessionListener(() => {
                // console.log('remove inactive')
            })
        }
    }, [userTrackingService, user.id])

    const asyncDispatch = useCallback(
        async () => registerTrackingListener(),
        [registerTrackingListener]
    )

    useEffect(() => {
        asyncDispatch()
        return () => removeUserTrackingListener()
    }, [user.id])

    // useEffect(() => {
    //     // clean the state
    //     dispatch(onResetUserTracking())
    // }, [])
}
