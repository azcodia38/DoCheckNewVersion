import React, { useCallback } from 'react'
import { isFunction } from 'lodash'

import Button from 'src/components/atoms/button'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import ContainerPopup from 'components/popup/container/ContainerPopup'

import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import { PopupYesNoContainer } from './styled'

interface PopupYesNoProps {
    show?: boolean
    setShow?(show: boolean): void
    image: React.ReactNode
    title: string
    text?: string
    cancelable?: boolean
    onCancelRequest?(): void
    onYes?(): void
    onNo?(): void
    labelYes?: string
    labelNo?: string
    onModalHide?(): void
    accessibilityLabelNo?: string
    accessibilityLabelYes?: string
}

export default function PopupYesNo(props: PopupYesNoProps) {
    const onCancel = useCallback(() => {
        if (!props.cancelable) {
            isFunction(props.onCancelRequest) && props.onCancelRequest()
            return
        }

        if (isFunction(props.setShow)) {
            props.setShow(false)
        }
    }, [props.cancelable, props.onCancelRequest, props.setShow])
    // function onCancel() {
    //     if (!props.cancelable) {
    //         props.onCancelRequest && props.onCancelRequest()
    //         return
    //     }

    //     if (props.setShow) {
    //         props.setShow(false)
    //     }
    // }

    return (
        <ContainerPopup
            onModalHide={props.onModalHide}
            width={'78%'}
            show={props.show}
            onCancel={onCancel}
        >
            <PopupYesNoContainer>
                {props.image}
                <Space value={10} />
                <Tipografi type={'title'} center>
                    {props.title}
                </Tipografi>
                {props.text && <Space value={10} />}
                <Tipografi center type={'small'} style={{ color: '#818487' }}>
                    {props.text ?? ''}
                </Tipografi>
                <Space value={15} />
                <ContainerAlignItemsCenter>
                    <Button
                        accessibilityLabel={props.accessibilityLabelNo}
                        onPress={props.onNo}
                        style={{
                            backgroundColor: '#0000',
                        }}
                        textStyle={{
                            color: '#DADADA',
                        }}
                        containerStyle={{
                            alignSelf: 'center',
                            flex: 1,
                            marginRight: 4,
                            marginLeft: 18,
                        }}
                        noShadow
                    >
                        {props.labelNo ?? 'Batal'}
                    </Button>
                    <Button
                        accessibilityLabel={props.accessibilityLabelYes}
                        onPress={props.onYes}
                        containerStyle={{
                            alignSelf: 'center',
                            flex: 1,
                            marginLeft: 4,
                            marginRight: 18,
                        }}
                        noShadow
                    >
                        {props.labelYes ?? 'Hapus'}
                    </Button>
                </ContainerAlignItemsCenter>
                <Space value={25} />
            </PopupYesNoContainer>
        </ContainerPopup>
    )
}
