import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'

import Tipografi from 'src/components/atoms/tipografi'
import { BoxHapusDataContainer } from 'src/components/atoms/boxHapusData/styled'
import { theme } from 'src/utils/const'

// interface BoxHapusDataProps extends NavProps {}

interface BoxHapusDataProps {
    onPilihSemua?(): void
    onHapus?(): void
    modeUnselect?: boolean
    showHapus?: boolean
    showBatal?: boolean
    navigation?: NavigationContainerRef
    showCheck?: () => void
}

export default function BoxHapusData(props: BoxHapusDataProps) {
    return (
        <BoxHapusDataContainer>
            <TouchableOpacity>
                <Tipografi
                    type={'label'}
                    style={{ color: theme.main_color }}
                    onPress={props.onPilihSemua}
                >
                    {props.modeUnselect
                        ? props.showHapus && 'Batal'
                        : 'Pilih Semua'}
                </Tipografi>
            </TouchableOpacity>
            {props.modeUnselect && !props.showHapus && (
                <TouchableOpacity onPress={props.showCheck}>
                    <Tipografi
                        type={'label'}
                        style={{ color: theme.main_color }}
                    >
                        {'Belum ada Task'}
                    </Tipografi>
                </TouchableOpacity>
            )}
            {props.showHapus && (
                <TouchableOpacity>
                    <Tipografi
                        type={'label'}
                        style={{ color: '#888888' }}
                        onPress={props.onHapus}
                    >
                        Hapus
                    </Tipografi>
                </TouchableOpacity>
            )}
        </BoxHapusDataContainer>
    )
}
