import React from 'react'
import { Modal } from 'react-native'

import useSync from 'src/hook/useSync'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import Loading from 'components/loading/Loading'
import { LoadingSyncContainer } from 'components/loading/styled'

const imperative = true

export default function LoadingSync() {
    const { onLoading, offlineRequestLeft } = useSync()

    return (
        <>
            {imperative && (
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={onLoading}
                    style={{ zIndex: 1100 }}
                    onRequestClose={() => {}}
                >
                    <LoadingSyncContainer>
                        <Loading loading={onLoading} />
                        <Space value={30} />
                        <Tipografi
                            type={'label-bold'}
                            style={{ color: '#FFF' }}
                        >
                            {`Sinkronisasi ${offlineRequestLeft} Goals`}
                        </Tipografi>
                        <Space value={5} />
                    </LoadingSyncContainer>
                </Modal>
            )}
        </>
    )
}
