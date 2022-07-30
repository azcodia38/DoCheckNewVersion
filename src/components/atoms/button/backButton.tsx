import React, { useCallback } from 'react'
import { HeaderBackArrowImage, LeftSectionView } from 'components/header/styled'
import { Animated, TouchableOpacity } from 'react-native'
import { isFunction } from 'lodash'
import Images from 'src/assets'
import { NavigationContainerRef } from '@react-navigation/native'
import { AccessibilityInfo } from 'src/utils/types'

interface HeaderProps {
    withBack?: boolean
    customBackAction?(): void
    navigation?: NavigationContainerRef
    grayArrow?: boolean
    greenArrow?: boolean
    leftSectionView?: React.ReactNode
    customBackAction?(): void
}

const animation = new Animated.Value(0)
const inputRange = [0, 1]
const outputRange = [1.2, 0.7]
const scale = animation.interpolate({ inputRange, outputRange })

export default function BackButton({
    withBack,
    leftSectionView,
    greenArrow,
    grayArrow,
    navigation,
    customBackAction,
}: HeaderProps & AccessibilityInfo) {
    const onBackHandlerIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }, [animation])

    const backActionHandler = useCallback(() => {
        // handle the index we get
        if (navigation?.canGoBack()) navigation.goBack()
        else navigation?.goBack()
    }, [navigation])

    const onBackHandlerOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
        backActionHandler()

        // isFunction(customBackAction) ? customBackAction() : backActionHandler()
    }, [customBackAction, navigation?.goBack, animation, backActionHandler])

    return (
        <>
            {withBack && !leftSectionView && (
                <LeftSectionView>
                    <Animated.View style={[{ transform: [{ scale }] }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={onBackHandlerIn}
                            onPressOut={onBackHandlerOut}
                        >
                            <>
                                {!grayArrow && !greenArrow && (
                                    <HeaderBackArrowImage
                                        source={Images.headerBackArrowImage}
                                    />
                                )}
                                {grayArrow && (
                                    <HeaderBackArrowImage
                                        source={Images.arrowleftGray}
                                    />
                                )}
                                {greenArrow && (
                                    <HeaderBackArrowImage
                                        source={Images.arrowLeftGreen}
                                    />
                                )}
                            </>
                        </TouchableOpacity>
                    </Animated.View>
                </LeftSectionView>
            )}
        </>
    )
}
