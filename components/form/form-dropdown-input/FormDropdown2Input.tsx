import React, { useEffect, useState } from 'react'
import {
    StyleProp,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
    TouchableOpacity as TouchableOpacityIOS,
    ScrollView,
    Dimensions,
} from 'react-native'
import InputBox, { InputBoxState } from '../input-box/InputBox'
import Tipografi from '../../../src/components/atoms/tipografi'
import { ArrowDownIcon } from '../../icons/Icons'
import { RadioOption } from '../form-radio-input/FormRadioInput'
import { OptionItemContainer, OptionsContainer } from './styled'
import { isIOS } from 'src/utils'
import {
    TouchableOpacity as TouchableOpacityAndroid,
    TouchableNativeFeedback,
} from 'react-native-gesture-handler'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
const { height: viewportHeight } = Dimensions.get('window')

interface FormDropdown2InputProps extends TextInputProps {
    label?: string
    labelOptions?: string
    options?: RadioOption<string>[]
    value: string
    onValueChange(value: string): void
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    style?: StyleProp<TextStyle>
    inputStyle?: StyleProp<TextStyle>
    optionStyle?: StyleProp<ViewStyle>
    optionContainerStyle?: StyleProp<ViewStyle>
    useRelativeOptions?: boolean
}

const TouchableOpacity = isIOS ? TouchableOpacityIOS : TouchableOpacityAndroid

export default function FormDropdown2Input<T>(props: FormDropdown2InputProps) {
    const [options_visible, setOptionsVisible] = useState<boolean>(false)
    const realative_options_style: StyleProp<ViewStyle> =
        props.useRelativeOptions
            ? {
                  position: 'relative',
                  top: undefined,
                  left: undefined,
              }
            : {}

    useEffect(() => {
        //
    }, [options_visible])

    return (
        <View
            style={{
                position: 'relative',
                zIndex: isIOS ? 999 : undefined,
                ...((props.style as any) ?? {}),
            }}
        >
            <TouchableOpacity
                accessibilityLabel={accessibilitylabels.reminderDaily}
                activeOpacity={0.9}
                onPress={() => {
                    props.editable !== false &&
                        setOptionsVisible(!options_visible)
                }}
            >
                <InputBox
                    editable={props.editable}
                    label={props.label}
                    state={props.state}
                    errorText={props.errorText}
                    style={{
                        marginBottom: 0.5,
                    }}
                    inputContainerStyle={{
                        borderBottomLeftRadius: options_visible ? 0 : 7,
                        borderBottomRightRadius: options_visible ? 0 : 7,
                    }}
                    leftItem={props.leftItem}
                    rightItem={
                        props.editable &&
                        (props.rightItem ?? (
                            <ArrowDownIcon
                                onPress={() => setOptionsVisible(true)}
                            />
                        ))
                    }
                    rightItemStyle={{ marginRight: 10 }}
                >
                    <Tipografi
                        style={{
                            color: props.value
                                ? '#000'
                                : props.placeholderTextColor,
                            marginLeft: 4,
                            paddingTop: 12,
                            paddingBottom: 12,
                            ...((props.inputStyle as any) ?? {}),
                        }}
                        type={'small'}
                    >
                        {props.value
                            ? (props.options ?? []).find(
                                  (x) => x.value === props.value
                              )?.label ?? '-'
                            : props.placeholder ?? ''}
                    </Tipografi>
                </InputBox>
            </TouchableOpacity>
            {options_visible && (
                <OptionsContainer
                    style={{
                        ...realative_options_style,
                        ...((props.optionContainerStyle as any) ?? {}),
                    }}
                >
                    <ScrollView style={{ maxHeight: viewportHeight * 0.35 }}>
                        {(props.options ?? []).map(
                            (option: RadioOption<string>, i: number) => (
                                <TouchableNativeFeedback
                                    accessibilityLabel={
                                        accessibilitylabels.reminderDaily2
                                    }
                                    key={i}
                                    onPress={() => {
                                        setOptionsVisible(false)
                                        props.onValueChange
                                            ? props.onValueChange(option.value)
                                            : null
                                    }}
                                >
                                    <OptionItemContainer
                                        style={props.optionStyle}
                                    >
                                        <Tipografi
                                            type={'small'}
                                            style={{ color: '#262D33' }}
                                        >
                                            {option.label}
                                        </Tipografi>
                                    </OptionItemContainer>
                                </TouchableNativeFeedback>
                            )
                        )}
                    </ScrollView>
                </OptionsContainer>
            )}
        </View>
    )
}
