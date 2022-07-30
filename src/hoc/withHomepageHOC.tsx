/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Carousel from 'react-native-snap-carousel-v4'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import messaging, { firebase } from '@react-native-firebase/messaging'

// @components
import BottomNavMenu from 'src/components/atoms/bottomNavMenu'

import { useKeyboard } from 'src/hook/useKeyboard'
import AkunSection from 'src/pages/inside-pages/home/section/akun/AkunSection'
import BerandaSection from 'src/pages/inside-pages/home/section/beranda/BerandaSection'
import CariTemanSection from 'src/pages/inside-pages/home/section/cari-teman/CariTemanSection'
import NotifikasiSection from 'src/pages/inside-pages/home/section/notifikasi/NotifikasiSection'

// @helpers
import { HomePageParams } from 'src/pages/inside-pages/home/params'
import { NavProps } from 'src/utils/const'
import { BottomNavType, Nullable } from 'src/utils/types'

export interface WithHomepageHOCProps extends NavProps {
    renderItem: ({ item }: { item: BottomNavType }) => JSX.Element
    createGoalComponent: JSX.Element | undefined
    bottomInset: EdgeInsets
    setForwardRef: (ref: Nullable<Carousel<any>>) => void
}

export default function WithHomepageHOC<
    T extends WithHomepageHOCProps = WithHomepageHOCProps
>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithHomepage = (props: WithHomepageHOCProps) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const params: HomePageParams = props.route.params

        const bottomInset = useSafeAreaInsets()
        const [keyboard_height] = useKeyboard()

        const [forwardRef, setForwardRef] = useState<Carousel<any>>()
        const [active_menu, setActiveMenu] = useState<BottomNavType>('beranda')

        const renderItem = useCallback(
            ({ item }: { item: BottomNavType }) => {
                switch (item) {
                    case 'beranda':
                        return <BerandaSection navigation={props.navigation} />
                    case 'cari-teman':
                        return (
                            <CariTemanSection
                                isTabActive={active_menu === 'cari-teman'}
                                navigation={props.navigation}
                            />
                        )
                    case 'notifikasi':
                        return (
                            <NotifikasiSection navigation={props.navigation} />
                        )
                    case 'akun':
                        return <AkunSection navigation={props.navigation} />
                }
            },
            [props.navigation, active_menu]
        )

        const moveTo = useCallback(
            (menu: BottomNavType) => {
                const menuCurrent = forwardRef
                switch (menu) {
                    case 'beranda':
                        menuCurrent?.snapToItem(0)
                        break
                    case 'cari-teman':
                        menuCurrent?.snapToItem(1)
                        break
                    case 'notifikasi':
                        menuCurrent?.snapToItem(2)
                        break
                    case 'akun':
                        menuCurrent?.snapToItem(3)
                        break
                }
                setActiveMenu(menu)
            },
            [forwardRef]
        )

        const onCreateGoal = useCallback(() => {
            props.navigation.navigate('BuatGoalBaru', {
                mode: 'new',
            })
        }, [props.navigation])

        const createGoalComponent = useMemo(() => {
            if (keyboard_height === 0) {
                return (
                    <BottomNavMenu
                        active={active_menu}
                        setActive={moveTo}
                        onPlusPress={onCreateGoal}
                    />
                )
            }
        }, [keyboard_height, active_menu, moveTo, onCreateGoal])

        /**
         * Handling the notification
         */
        useEffect(() => {
            /**
             * Handling this when the application us opened from a quit state
             */
            const onNotificationOpenedAppHandler =
                messaging().onNotificationOpenedApp((remoteMessage) => {
                    // console.log('onNotificationOpenedApp', remoteMessage)
                })

            /**
             * Handling this when ...
             */
            const onMessageComingHandler = messaging().onMessage(
                async (remoteMessage) => {
                    // await onDisplayNotification(remoteMessage)
                }
            )

            /**
             * Handling this when the application is running, But in the background
             */
            messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                    firebase.messaging.NotificationAndroidPriority.PRIORITY_HIGH
                    // console.log('getInitialNotificaton', remoteMessage)
                })

            /**
             * Handling the unsubscribe channel
             */
            return function unsubscribeAll() {
                onMessageComingHandler()
                onNotificationOpenedAppHandler()
            }
        }, [])

        useEffect(() => {
            if (params && params.initial_tab) moveTo(params.initial_tab)
        }, [])

        // props comes afterwards so the can override the default ones.
        return (
            <WrappedComponent
                {...{
                    renderItem,
                    createGoalComponent,
                    bottomInset,
                    setForwardRef,
                }}
                {...(props as T)}
            />
        )
    }

    ComponentWithHomepage.displayName = `withHomepage(${displayName})`

    return ComponentWithHomepage
}
