import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
import { RNModalAnimationType } from 'src/utils/const'
import { ContainerPopupContainer } from './styled'

interface ContainerPopupProps {
    show?: boolean
    width?: string | number
    children?: any
    onCancel?(): void
    onModalHide?(): void
    animationIn?: RNModalAnimationType
    animationOut?: RNModalAnimationType
}

export default function ContainerPopup(props: ContainerPopupProps) {
    return (
        <Modal
            animationIn={props.animationIn}
            animationOut={props.animationOut}
            onBackdropPress={() => {
                props.onCancel && props.onCancel()
            }}
            onModalHide={props.onModalHide}
            onRequestClose={() => {
                props.onCancel && props.onCancel()
            }}
            style={{
                width: props.width,
                margin: 0,
                alignSelf: 'center',
            }}
            customBackdrop={
                <TouchableWithoutFeedback
                    accessibilityLabel={accessibilitylabels.onCancel}
                    style={{ width: 'auto' }}
                    onPress={() => {
                        props.onCancel && props.onCancel()
                    }}
                >
                    <ContainerPopupContainer />
                </TouchableWithoutFeedback>
            }
            isVisible={props.show ?? false}
        >
            <View>{props.children}</View>
        </Modal>
    )
}
