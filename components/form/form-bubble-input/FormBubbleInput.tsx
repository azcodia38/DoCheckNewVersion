import React from 'react'
import { TextInputProps } from 'react-native'
import InputBox, { InputBoxState } from '../input-box/InputBox'
import Tipografi from '../../../src/components/atoms/tipografi'
import { RadioOption } from '../form-radio-input/FormRadioInput'
import { BubbleInputContainer, BubbleRadio } from './styled'
import { theme } from 'src/utils/const'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

interface FormBubbleInputProps extends TextInputProps {
    label?: string
    labelOptions?: string
    options?: RadioOption<string>[]
    values: string[]
    onValuesChange(values: string[]): void
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
}

interface BubbleProps extends RadioOption<string> {
    active?: boolean
    onPress?(): void
}

function Bubble(props: BubbleProps) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <BubbleRadio
                style={{
                    borderColor: props.active ? theme.main_color : '#F7F7F7',
                    backgroundColor: props.active ? '#E0F8EA' : '#F7F7F7',
                }}
            >
                <Tipografi type={'normal'}>{props.label}</Tipografi>
            </BubbleRadio>
        </TouchableWithoutFeedback>
    )
}

export default function FormBubbleInput(props: FormBubbleInputProps) {
    function onBubblePress(item: RadioOption<string>) {
        if (props.values.includes(item.value)) {
            props.onValuesChange &&
                props.onValuesChange(
                    props.values.filter((value) => value !== item.value)
                )
            return
        }

        props.onValuesChange &&
            props.onValuesChange([...props.values, item.value])
    }

    return (
        <BubbleInputContainer>
            {(props.options ?? []).map(
                (item: RadioOption<string>, i: number) => (
                    <Bubble
                        {...item}
                        key={i}
                        active={props.values.includes(item.value)}
                        onPress={() => onBubblePress(item)}
                    />
                )
            )}
        </BubbleInputContainer>
    )
}
