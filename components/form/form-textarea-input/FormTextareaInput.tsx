import React, { useState } from 'react'
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native'
import useInputStyle from 'src/hook/useInputStyle'
import { isIOS } from 'src/utils'
import InputBox, { InputBoxState } from '../input-box/InputBox'

interface FormTextareaInputProps extends TextInputProps {
    label?: string
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    noMarginBottom?: boolean
    inputStyle?: StyleProp<TextStyle>
    inputContainerStyle?: StyleProp<TextStyle>
}

interface FormTextAreaInputPropsExtends {
    onFocus?: (height: number) => void
}

export default function FormTextareaInput(
    props: FormTextareaInputProps & FormTextAreaInputPropsExtends
) {
    const [inputContainerStyle, setInputContainerStyles] = useState({
        ...(props.inputContainerStyle as {}),
    })

    const { onBlurHandler, onFocusHandler } = useInputStyle(
        inputContainerStyle,
        setInputContainerStyles,
        props.inputContainerStyle
    )

    return (
        <InputBox
            editable={props.editable}
            label={props.label}
            state={props.state}
            errorText={props.errorText}
            style={{
                paddingLeft: 0,
                ...((props.inputContainerStyle as any) ?? {}),
            }}
            leftItemStyle={{ paddingLeft: 4 }}
            rightItemStyle={{ paddingRight: 4 }}
            leftItem={props.leftItem}
            rightItem={props.rightItem}
            noMarginBottom={props.noMarginBottom}
        >
            <TextInput
                {...props}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                multiline={true}
                numberOfLines={props.numberOfLines ?? 7}
                // onFocus={props.onFocus!}
                style={{
                    zIndex: -1,
                    paddingTop: 15,
                    minHeight: isIOS ? (props.numberOfLines ?? 7) * 20 : 0,
                    paddingBottom: 15,
                    paddingLeft: 9,
                    paddingRight: 9,
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 12,
                    textAlignVertical: 'top',
                    ...((props.inputStyle as any) ?? {}),
                }}
            />
        </InputBox>
    )
}
