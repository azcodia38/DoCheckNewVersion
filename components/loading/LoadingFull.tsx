import React from 'react'
import { Modal } from 'react-native'

import Loading from 'components/loading/Loading'
import { LoadingFullContainer } from 'components/loading/styled'

interface LoadingFullProps {
    loading?: boolean
}

export default function LoadingFull(props: LoadingFullProps) {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={props.loading}
            style={{ zIndex: 1100 }}
            onRequestClose={() => {}}
        >
            <LoadingFullContainer>
                <Loading loading />
            </LoadingFullContainer>
        </Modal>
    )
}
