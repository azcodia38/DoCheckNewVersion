/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

// Vendor Module
import React, { useEffect, useMemo } from 'react'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack'

import { isEqual } from 'lodash'

// @Utils
import { persistor } from 'store'
import { theme } from 'src/utils/const'

// @hook
import useNotif from 'src/hook/useNotif'
import useSync from 'src/hook/useSync'
import useRoute from 'src/hook/useRoute'
import useTrackingUser from 'src/hook/useTrackingUser'
import useLogin from 'src/hook/useLogin'
import SplashScreenV2 from 'src/components/molecules/splashScreen/v2'

const Stack = createStackNavigator()

export default function Main() {
    const localRoute = useRoute()

    useNotif() // Notif service
    useSync() // Sync service
    useTrackingUser() // User tracking service
    const { isLoggedIn } = useLogin() // Login service

    const intialRouteName = useMemo(() => {
        if (isEqual(isLoggedIn, '1')) return 'Home'
        else if (isEqual(isLoggedIn, '0')) return 'First'
        else {
            // handling if isLogged state is not ready
            return 'Home'
        }
    }, [isLoggedIn])

    const localRouteMemo = useMemo(
        () =>
            localRoute.map(({ id, component, name, options }) => (
                <Stack.Screen
                    key={id}
                    name={name}
                    component={component}
                    options={options}
                />
            )),
        [localRoute]
    )

    return (
        <>
            <PersistGate loading={<SplashScreenV2 />} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            cardStyle: {
                                backgroundColor: theme.background,
                            },
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                        initialRouteName={intialRouteName}
                    >
                        {localRouteMemo}
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </>
    )
}
