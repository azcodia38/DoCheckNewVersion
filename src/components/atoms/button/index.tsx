import React, { useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { ButtonContainer, ButtonView } from 'src/components/atoms/button/styled'
import Loading from 'components/loading/Loading'
import Tipografi from 'src/components/atoms/tipografi'

import { ButtonProps } from 'src/utils/types'

export default function Button(props: ButtonProps) {
    const [isPressed, setIsPressed] = useState(false)

    const buttonColors = useMemo(
        () => (props.inactive ? '#262D33' : '#FFF'),
        [props.inactive]
    )
    const shadowOpacity = useMemo(
        () => (props.inactive ? 0 : 0.3),
        [props.inactive]
    )
    const background = useMemo(
        () => (props.inactive ? '#DADADA' : isPressed ? '#5FDF91' : '#2FCC71'),
        [isPressed, props.inactive]
    )

    const shadow = useMemo(
        () =>
            props.noShadow
                ? {}
                : {
                      shadowColor: '#057936',
                      shadowOffset: {
                          width: 0,
                          height: 4,
                      },
                      shadowOpacity: shadowOpacity,
                      shadowRadius: 16.0,
                      elevation: props.inactive ? 0 : 7,
                  },
        [props.noShadow, shadowOpacity, props.inactive]
    )

    return (
        <ButtonContainer style={props.containerStyle}>
            <Loading loading={props.loading}>
                <TouchableOpacity
                    accessibilityLabel={props.accessibilityLabel}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    activeOpacity={1}
                    onPress={props.onPress}
                    disabled={props.inactive}
                >
                    <ButtonView
                        style={{
                            backgroundColor: background,
                            ...shadow,
                            ...((props.style as any) ?? {}),
                        }}
                    >
                        <Tipografi
                            type={'button'}
                            style={{
                                color: buttonColors,
                                ...((props.textStyle as any) ?? {}),
                            }}
                        >
                            {props.children}
                        </Tipografi>
                    </ButtonView>
                </TouchableOpacity>
            </Loading>
        </ButtonContainer>
    )
}
