/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { forwardRef, useMemo, useState } from 'react'
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native'
import useInputStyle from 'src/hook/useInputStyle'
import InputBox, { InputBoxState } from '../input-box/InputBox'

interface FormTextInputProps extends TextInputProps {
    label?: string
    subLabel?: string
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    noMarginBottom?: boolean
    inputStyle?: StyleProp<TextStyle>
    inputContainerStyle?: StyleProp<TextStyle>
    editable?: boolean
    sizeWrapper?: 'small' | 'normal'
}

const FormTextInput = forwardRef(
    (
        props: FormTextInputProps,
        ref: React.LegacyRef<TextInput> | undefined
    ) => {
        const [inputContainerStyle, setInputContainerStyles] = useState({
            ...(props.inputContainerStyle as {}),
        })

        const { onBlurHandler, onFocusHandler } = useInputStyle(
            inputContainerStyle,
            setInputContainerStyles,
            props.inputContainerStyle
        )

        const smallSizeMemo = useMemo(() => {
            if (props.sizeWrapper == 'small')
                return {
                    paddingTop: 8,
                    paddingBottom: 8,
                    fontSize: 11.5,
                }

            return {
                paddingTop: 12,
                paddingBottom: 12,
                fontSize: 12,
            }
        }, [props.sizeWrapper])

        return (
            <InputBox
                editable={props.editable}
                label={props.label}
                subLabel={props.subLabel}
                state={props.state}
                errorText={props.errorText}
                leftItem={props.leftItem}
                rightItem={props.rightItem}
                noMarginBottom={props.noMarginBottom}
                inputContainerStyle={inputContainerStyle}
            >
                <TextInput
                    {...props}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    ref={ref}
                    style={{
                        fontFamily: 'OpenSans-Regular',
                        ...smallSizeMemo,
                        ...((props.inputStyle as any) ?? {}),
                    }}
                    placeholderTextColor={'grey'}
                />
            </InputBox>
        )
    }
)

export default FormTextInput
