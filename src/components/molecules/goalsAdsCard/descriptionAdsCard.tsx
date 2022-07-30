import React from 'react'
import { View } from 'react-native'

import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'

interface DescriptionAdsCardProps {
    hasBackground: boolean
    name: string
    description: string
}

export default function DescriptionAdsCard({
    description,
    hasBackground,
    name,
}: DescriptionAdsCardProps) {
    return (
        <View style={{ marginLeft: 35, flexShrink: 1 }}>
            <Tipografi
                numberOfLines={2}
                type={'medium'}
                style={{
                    color: hasBackground ? 'white' : '#000',
                    fontSize: 17,
                    lineHeight: 22,
                }}
            >
                {name}
            </Tipografi>
            <Space value={8} />
            <Tipografi
                numberOfLines={2}
                type={'small'}
                style={{
                    color: hasBackground ? '#EEE' : '#979797',
                }}
            >
                {description}
            </Tipografi>
        </View>
    )
}
