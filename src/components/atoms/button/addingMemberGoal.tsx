/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

import useAnimation from 'src/hook/useAnimation'
import { theme } from 'src/utils/const'
import { ButtonView } from './styled'

interface AddingMemberGoalProps {
    setShowPopupMemberGoal: (status: boolean) => void
}

export default function AddingMemberGoal({
    setShowPopupMemberGoal,
}: AddingMemberGoalProps) {
    const { onPressHandler, onPressIn, onPressOut, animatedScaleStyle } =
        useAnimation()

    const onPressHandlerLocal = useCallback(
        () => setShowPopupMemberGoal(true),
        [setShowPopupMemberGoal]
    )

    return (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => onPressHandler(onPressHandlerLocal)}
        >
            <Animated.View style={[animatedScaleStyle]}>
                <ButtonView style={styles.plusButton}>
                    <Text style={{ fontSize: 22 }}>+</Text>
                </ButtonView>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    plusButton: {
        height: 50,
        width: 50,
        borderRadius: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.background,
    },
})
