import React from 'react'
import { View } from 'react-native'

import Tipografi from 'src/components/atoms/tipografi'

interface RegisterTitleProps {
    label?: string
    subLabel?: string
}

export default function RegisterTitle({ label, subLabel }: RegisterTitleProps) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {label && (
                <Tipografi type={'label'} style={{ color: '#444145' }}>
                    {label}
                </Tipografi>
            )}
            {subLabel && (
                <Tipografi
                    type={'smaller'}
                    style={{ color: '#444145', marginLeft: 4 }}
                >
                    ({subLabel})
                </Tipografi>
            )}
        </View>
    )
}
