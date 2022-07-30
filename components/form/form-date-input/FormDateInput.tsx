import React, { useMemo, useState } from 'react'
import {
    StyleProp,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
} from 'react-native'
import DateTimePickerModal, {
    ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import InputBox, { InputBoxState } from 'components/form/input-box/InputBox'
import Button from 'src/components/atoms/button'
import Tipografi from 'src/components/atoms/tipografi'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

interface FormDateInputProps extends TextInputProps {
    label?: string
    subLabel?: string
    date: Date | null | undefined
    onDateChange(date: Date): void
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    inputStyle?: StyleProp<TextStyle>
    haveMinimum?: boolean
}

const CustomConfirmButton = (props: { onPress: any }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Button>Pilih Tanggal</Button>
        </TouchableWithoutFeedback>
    )
}

const CustomCanceButton = (props: { onPress: any }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Button style={{ backgroundColor: '#AAA' }}>Batal</Button>
        </TouchableWithoutFeedback>
    )
}

export default function FormDateInput(props: FormDateInputProps) {
    const [is_date_visible, setDateVisible] = useState<boolean>(false)

    const optionalProps = useMemo<ReactNativeModalDateTimePickerProps | Object>(
        () => (props.haveMinimum ? { minimumDate: new Date() } : {}),
        [props.haveMinimum]
    )

    return (
        <>
            <InputBox
                editable={props.editable}
                label={props.label}
                subLabel={props.subLabel}
                state={props.state}
                errorText={props.errorText}
                leftItem={props.leftItem}
                rightItem={props.rightItem}
            >
                <TouchableOpacity
                    accessibilityLabel={accessibilitylabels.tLahir}
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
                    accessibilityLabel={accessibilitylabels.tLahir2}
                    locale="id-ID"
                    isVisible={is_date_visible}
                    mode={'date'}
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
                    onTouchStart={(e) => {}}
                    onConfirm={(date: Date) => {
                        setDateVisible(false)
                        props.onDateChange(date)
                    }}
                    onHide={() => {
                        setDateVisible(false)
                    }}
                    onCancel={() => {
                        setDateVisible(false)
                    }}
                    display={'spinner'}
                    {...optionalProps}
                />
            </InputBox>
        </>
    )
}
