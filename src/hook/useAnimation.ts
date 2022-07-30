/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { useCallback, useMemo } from 'react'
import { Animated, Easing } from 'react-native'

export default function useAnimation() {
    const animatedValue = new Animated.Value(0)
    const buttonScale = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.8, 1.2],
    })

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    // When button is pressed in, animate the animatedValue
    // to 1 in 250 milliseconds.
    const onPressIn = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }, [animatedValue])

    // When button is pressed out, animate the animatedValue
    // to 0 in 100 milliseconds.
    const onPressOut = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }, [animatedValue])

    const onPressHandler = useCallback((onPress: () => void) => onPress!(), [])

    return {
        onPressHandler,
        onPressIn,
        onPressOut,
        buttonScale,
        animatedScaleStyle,
    }
}
