import useAnimation from 'src/hook/useAnimation'
import React, { useMemo } from 'react'
import { StyleProp, ViewStyle, Animated } from 'react-native'

import Images from 'src/assets'
import {
    ArrowImage,
    IntroButtonBackground,
    IntroButtonContainer,
} from './styled'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

interface IntroButtonProps {
    style: StyleProp<ViewStyle>
    onPress?(): void
}

export default function IntroButton(props: IntroButtonProps) {
    const { buttonScale, onPressHandler, onPressIn, onPressOut } =
        useAnimation()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    return (
        <TouchableWithoutFeedback
            accessibilityLabel={accessibilitylabels.intro}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => onPressHandler(props.onPress!)}
        >
            <Animated.View style={[animatedScaleStyle]}>
                <IntroButtonContainer style={props.style}>
                    <IntroButtonBackground
                        source={Images.intro.introButtonBackground}
                    />
                    <ArrowImage source={Images.intro.introArrow} />
                </IntroButtonContainer>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
