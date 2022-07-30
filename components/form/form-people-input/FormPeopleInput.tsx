import React, { useState } from 'react'
import {
    StyleProp,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native'
import InputBox, { InputBoxState } from '../input-box/InputBox'
import Tipografi from '../../../src/components/atoms/tipografi'
import { ArrowDownIcon, PlusGreenIcon } from '../../icons/Icons'
import { RadioOption } from '../form-radio-input/FormRadioInput'
import PesertaGrup from '../../peserta-grup/PesertaGrup'
import { ParticipantListLoading } from '../../loader-collections'

interface FormPeopleInput<T> extends TextInputProps {
    label?: string
    options?: RadioOption<string>[]
    values?: string[]
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    style?: StyleProp<TextStyle>
    onPress?(): void
    loading?: boolean
}

export default function FormPeopleInput<T>(props: FormPeopleInput<T>) {
    const is_empty = (props.values ?? []).length === 0
    return (
        <View style={props.style}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPress}>
                <InputBox
                    editable={props.editable}
                    label={props.label}
                    state={props.state}
                    errorText={props.errorText}
                    style={{
                        marginBottom: 0,
                    }}
                    inputContainerStyle={{
                        paddingTop: 9,
                        paddingBottom: 9,
                    }}
                    leftItem={props.leftItem}
                    rightItem={
                        props.editable &&
                        (props.rightItem ?? (
                            <PlusGreenIcon onPress={props.onPress} />
                        ))
                    }
                    rightItemStyle={{ marginRight: 10 }}
                >
                    {is_empty && (
                        <Tipografi
                            type={'small'}
                            style={{
                                marginTop: 12.5,
                                marginBottom: 12.5,
                                marginLeft: 8,
                                color: '#818487',
                            }}
                        >
                            Belum ada peserta
                        </Tipografi>
                    )}
                    {!is_empty && (
                        <View style={{ paddingLeft: 20 }}>
                            {props.loading && <ParticipantListLoading />}
                            {!props.loading && (
                                <PesertaGrup
                                    options={props.options}
                                    values={props.values}
                                    smaller
                                />
                            )}
                        </View>
                    )}
                </InputBox>
            </TouchableOpacity>
        </View>
    )
}
