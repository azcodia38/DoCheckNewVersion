/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useMemo } from 'react'
import { Animated } from 'react-native'

import Tipografi from 'src/components/atoms/tipografi'
import {
    FormRadioInputContainer,
    FormRadioOptionsContainer,
    RadioItemContainer,
    RadioOnBorder,
    RadioOnCenterCircle,
} from './styled'
import UseAnimation from 'src/hook/useAnimation'
import RegisterTitle from 'src/components/atoms/registerTitle'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

export interface RadioOption<T> {
    label: string
    value: T
    accessibilityLabel?: string
}

interface FormRadioInputProps<T> {
    label?: string
    subLabel?: string
    options?: RadioOption<T>[]
    value: T
    onValueChange(value: T): void
    accessibilityLabel?: string
}

function RadioOn() {
    return (
        <RadioOnBorder>
            <RadioOnCenterCircle />
        </RadioOnBorder>
    )
}

function RadioOff() {
    return <RadioOnBorder style={{ borderColor: '#DBDBDB' }}></RadioOnBorder>
}

interface RadioItemProps {
    label?: string
    on?: boolean
    onPress?(): void
    accessibilityLabel?: string
}

function RadioItem(props: RadioItemProps) {
    const { buttonScale, onPressHandler, onPressIn, onPressOut } =
        UseAnimation()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    return (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => onPressHandler(props.onPress!)}
        >
            <RadioItemContainer>
                <Animated.View style={[animatedScaleStyle]}>
                    {props.on && <RadioOn />}
                    {!props.on && <RadioOff />}
                </Animated.View>

                <Tipografi
                    type={'small'}
                    style={{
                        color: props.on ? '#262D33' : '#818487',
                        marginLeft: 8,
                    }}
                >
                    {props.label ?? ''}
                </Tipografi>
            </RadioItemContainer>
        </TouchableWithoutFeedback>
    )
}

export default function FormRadioInput<T>(props: FormRadioInputProps<T>) {
    return (
        <FormRadioInputContainer>
            <RegisterTitle label={props.label} subLabel={props.subLabel} />
            <FormRadioOptionsContainer>
                {(props.options ?? []).map(
                    (option: RadioOption<T>, i: number) => (
                        <RadioItem
                            accessibilityLabel={option.accessibilityLabel}
                            key={i}
                            on={option.value === props.value}
                            onPress={() => props.onValueChange(option.value)}
                            label={option.label}
                        />
                    )
                )}
            </FormRadioOptionsContainer>
        </FormRadioInputContainer>
    )
}
