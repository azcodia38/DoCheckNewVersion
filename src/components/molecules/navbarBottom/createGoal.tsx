/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { Animated } from 'react-native'

import {
    CenterContainer,
    IconPlusBackground,
    MiddleIconPlus,
} from 'src/components/atoms/bottomNavMenu/styled'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PlusIcon } from 'components/icons/Icons'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

interface CreateGoalProps {
    onPressInCreateInHandler: () => void
    onPressOutCreateInHandler: () => void
    scale: number | Animated.Value | Animated.AnimatedInterpolation
}

export default function CreateGoal({
    onPressInCreateInHandler,
    onPressOutCreateInHandler,
    scale,
}: CreateGoalProps) {
    return (
        <MiddleIconPlus>
            <Animated.View style={[{ transform: [{ scale }] }]}>
                <TouchableOpacity
                    accessibilityLabel={accessibilitylabels.makeGoal}
                    activeOpacity={1}
                    onPressIn={onPressInCreateInHandler}
                    onPressOut={onPressOutCreateInHandler}
                >
                    <CenterContainer>
                        <IconPlusBackground>
                            <PlusIcon />
                        </IconPlusBackground>
                    </CenterContainer>
                </TouchableOpacity>
            </Animated.View>
        </MiddleIconPlus>
    )
}
