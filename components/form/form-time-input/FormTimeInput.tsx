/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useState } from 'react'
import {
    StyleProp,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TouchableWithoutFeedback as TouchableDay } from 'react-native-gesture-handler'

import InputBox, { InputBoxState } from 'components/form/input-box/InputBox'
import Button from 'src/components/atoms/button'
import Tipografi from 'src/components/atoms/tipografi'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

interface FormTimeInputProps extends TextInputProps {
    label?: string
    date: Date | null | undefined
    onDateChange(date: Date): void
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    inputStyle?: StyleProp<TextStyle>
}

const CustomConfirmButton = (props: { onPress: any; isDate?: boolean }) => {
    return (
        <TouchableDay onPress={props.onPress}>
            <Button>{props.isDate ? 'Pilih Tanggal' : 'Pilih Jam'}</Button>
        </TouchableDay>
    )
}

const CustomCanceButton = (props: { onPress: any }) => {
    return (
        <TouchableDay onPress={props.onPress}>
            <Button style={{ backgroundColor: '#AAA' }}>Batal</Button>
        </TouchableDay>
    )
}

export default function FormTimeInput(props: FormTimeInputProps) {
    const [is_date_visible, setDateVisible] = useState<boolean>(false)
    return (
        <>
            <InputBox
                editable={props.editable}
                label={props.label}
                state={props.state}
                errorText={props.errorText}
                leftItem={props.leftItem}
                rightItem={props.rightItem}
            >
                <TouchableOpacity
                    accessibilityLabel={accessibilitylabels.btnDate2}
                    style={{
                        paddingTop: 12,
                        paddingBottom: 12,
                    }}
                    onPress={() =>
                        props.editable !== false && setDateVisible(true)
                    }
                >
                    <Tipografi
                        style={{
                            fontFamily:
                                (props.style as any)?.fontFamily ??
                                'OpenSans-Regular',
                            color: props.value
                                ? '#333'
                                : props.placeholderTextColor,
                            marginLeft: 4,
                            ...((props.inputStyle as any) ?? {}),
                        }}
                        type={'small'}
                    >
                        {props.value ? props.value : props.placeholder ?? ''}
                    </Tipografi>
                </TouchableOpacity>
                <DateTimePickerModal
                    accessibilityLabel={accessibilitylabels.btnDate3}
                    isVisible={is_date_visible}
                    locale="id-ID"
                    mode={'time'}
                    date={
                        props.date instanceof Date &&
                        props.date &&
                        !isNaN(props.date as any)
                            ? props.date
                            : undefined
                    }
                    customConfirmButtonIOS={CustomConfirmButton}
                    customCancelButtonIOS={CustomCanceButton}
                    style={{ zIndex: 999 }}
                    onConfirm={(date: Date) => {
                        setDateVisible(false)
                        props.onDateChange(date)
                    }}
                    onTouchStart={(e) => {}}
                    onHide={() => {
                        setDateVisible(false)
                    }}
                    onCancel={() => {
                        setDateVisible(false)
                    }}
                    display={'spinner'}
                />
            </InputBox>
        </>
    )
}
