import React, { useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { ButtonContainer, ButtonOutlineView } from 'src/components/atoms/button/styled'
import Loading from 'components/loading/Loading'
import Tipografi from 'src/components/atoms/tipografi'
import { ButtonProps } from 'src/utils/types'

interface ButtonOutlineProps extends ButtonProps {
    borderColor: string
}

export default function ButtonOutline(props: ButtonOutlineProps) {
    const [isPressed, setIsPressed] = useState<boolean>(false)

    const buttonBorderColor = useMemo(
        () => (isPressed ? `${props.borderColor}AA` : props.borderColor),
        [isPressed, props.borderColor]
    )

    return (
        <ButtonContainer>
            <Loading loading={props.loading}>
                <TouchableOpacity
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    activeOpacity={1}
                    onPress={props.onPress}
                    disabled={props.inactive}
                >
                    <ButtonOutlineView
                        style={{
                            backgroundColor: '#0000',
                            borderColor: buttonBorderColor,
                            ...((props.style as any) ?? {}),
                        }}
                    >
                        <Tipografi
                            type={'button'}
                            style={{
                                color: buttonBorderColor,
                                ...((props.textStyle as any) ?? {}),
                            }}
                        >
                            {props.children}
                        </Tipografi>
                    </ButtonOutlineView>
                </TouchableOpacity>
            </Loading>
        </ButtonContainer>
    )
}
