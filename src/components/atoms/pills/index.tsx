import { toUpper } from 'lodash'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import Tipografi from 'src/components/atoms/tipografi'

interface PillsProps {
    title: string
    size?: 'small' | 'medium' | 'large'
    style?: StyleProp<ViewStyle>
}

export default function Pills({
    size = 'small',
    title,
    style: stylesProp,
}: PillsProps) {
    return (
        <View style={[{ ...styles.pillsWrapper }, stylesProp]}>
            <Tipografi style={styles.fontStyle} type="small-semibold">
                {toUpper(title)}
            </Tipografi>
        </View>
    )
}

const styles = StyleSheet.create({
    pillsWrapper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 21,
        backgroundColor: '#FFD700',
        borderRadius: 7,
    },
    fontStyle: {
        color: '#262D33',
        position: 'relative',
        marginTop: 1,
    },
})
