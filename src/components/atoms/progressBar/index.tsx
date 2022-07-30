import * as Progress from 'react-native-progress'
import React, { useEffect, useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { ProgressBarContainer } from './styled'

interface ProgressBarProps {
    height?: number
    progress?: number
    style?: StyleProp<ViewStyle>
    primary?: boolean
}

const DEFAULT_HEIGHT = 6

export default function ProgressBar({
    height,
    progress,
    style,
    primary = true,
}: ProgressBarProps) {
    const [width, setWidth] = useState(0)
    const [widthContainer, setWidthContainer] = useState(0)

    useEffect(() => {
        setWidth(Math.max(Math.min(progress ?? 0, 100), 0) / 100)
    }, [progress])

    return (
        <ProgressBarContainer
            style={{
                height: height ?? DEFAULT_HEIGHT,
                ...((style as any) ?? {}),
            }}
            primary={primary}
        >
            <View
                onLayout={(event) =>
                    setWidthContainer(event.nativeEvent.layout.width)
                }
            >
                <Progress.Bar
                    progress={width}
                    width={widthContainer}
                    animated={true}
                    borderWidth={0}
                    color={'#fff'}
                    useNativeDriver={true}
                    height={height ?? DEFAULT_HEIGHT}
                    animationConfig={{
                        bounciness: 15,
                    }}
                />
            </View>
        </ProgressBarContainer>
    )
}
