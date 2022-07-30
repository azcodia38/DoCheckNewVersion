import React from 'react'
import { StyleSheet, View } from 'react-native'

import Tipografi from 'src/components/atoms/tipografi'

interface AppInfoProps {
    description: string
    title?: string
    versionCode?: string
}

export default function AppInfo({
    title = 'DoCheck',
    description,
    versionCode = '1.0.0',
}: AppInfoProps) {
    return (
        <View style={styles.appInfoWrapper}>
            <View>
                <Tipografi
                    style={styles.tipografiTitle}
                    type={'label-bold'}
                    center
                >
                    {title}
                </Tipografi>
                <Tipografi
                    style={styles.tipografiDescription}
                    type={'small'}
                    center
                >
                    {description}
                </Tipografi>
            </View>
            <Tipografi style={styles.tipografiVersion} type={'small'} center>
                DoCheck v {versionCode}
            </Tipografi>
        </View>
    )
}

const styles = StyleSheet.create({
    appInfoWrapper: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        maxHeight: 150,
    },
    tipografiTitle: {
        color: '#979797',
    },
    tipografiDescription: {
        color: '#979797',
    },
    tipografiVersion: {
        color: '#979797',
    },
})
