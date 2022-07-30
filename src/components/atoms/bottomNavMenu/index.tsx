/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { isFunction } from 'lodash'
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'

import { BottomNavMenuContainer } from './styled'
import Account from 'src/components/molecules/navbarBottom/account'
import Notification from 'src/components/molecules/navbarBottom/notification'
import FindFriend from 'src/components/molecules/navbarBottom/findFriend'
import Homepage from 'src/components/molecules/navbarBottom/homepage'
import CreateGoal from 'src/components/molecules/navbarBottom/createGoal'
import { BottomNavType } from 'src/utils/types'

interface BottomNavMenuProps {
    active: BottomNavType
    setActive(active: BottomNavType): void
    onPlusPress?(): void
}

const animation = new Animated.Value(0)
const inputRange = [0, 1]
const outputRange = [1, 0.9]
const scale = animation.interpolate({ inputRange, outputRange })

export default function BottomNavMenu(props: BottomNavMenuProps) {
    const onPressInCreateInHandler = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }, [animation])

    const onPressOutCreateInHandler = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
        if (isFunction(props.onPlusPress)) props.onPlusPress()
    }, [animation, props.onPlusPress])

    return (
        <BottomNavMenuContainer>
            <View style={{ width: 12 }} />
            <Homepage
                active={props.active}
                setActive={props.setActive}
                title="beranda"
            />
            <FindFriend
                active={props.active}
                setActive={props.setActive}
                title="cari-teman"
            />
            <CreateGoal
                onPressInCreateInHandler={onPressInCreateInHandler}
                onPressOutCreateInHandler={onPressOutCreateInHandler}
                scale={scale}
            />
            <Notification
                active={props.active}
                setActive={props.setActive}
                title="notifikasi"
            />
            <Account
                active={props.active}
                setActive={props.setActive}
                title="akun"
            />
            <View style={{ width: 12 }} />
        </BottomNavMenuContainer>
    )
}
