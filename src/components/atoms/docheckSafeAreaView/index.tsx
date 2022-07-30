/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useMemo } from 'react'
import { ColorValue, SafeAreaView, ViewProps } from 'react-native'
import { hasNotch } from 'react-native-device-info'

import StatusBar from 'src/components/atoms/statusBar'
import { isIOS } from 'src/utils'

import { theme } from 'src/utils/const'

interface DocheckSafeAreaViewProps extends ViewProps {
    withPanel?: boolean
    fullStatusBar?: boolean
    statusBackgroundColor?: ColorValue | string
    barStyle?: 'default' | 'light-content' | 'dark-content'
}

export default function DocheckSafeAreaView(props: DocheckSafeAreaViewProps) {
    const hasPanel = useMemo(() => props.withPanel ?? false, [props.withPanel])

    const safeAreaViewProps = useMemo(() => {
        if (Boolean(isIOS) && props.fullStatusBar)
            return { backgroundColor: props.statusBackgroundColor }
        return new Object()
    }, [props.fullStatusBar, props.statusBackgroundColor])

    return (
        <>
            <SafeAreaView style={{ flex: 0, ...safeAreaViewProps }} />
            <StatusBar
                isShow={Boolean(isIOS) && hasNotch()}
                barStyle={props.barStyle ?? 'dark-content'}
            />
            <SafeAreaView
                {...props}
                style={{
                    flex: 1,
                    backgroundColor: hasPanel
                        ? theme.smoothGreen
                        : theme.background,
                }}
            >
                {props.children}
            </SafeAreaView>
        </>
    )
}
