import React, { useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { theme } from 'src/utils/const'

interface LoadingProps {
    color?: string
    children?: any
    loading?: boolean
    paddingLeft?: number
    small?: boolean
    style?: any
}

export default function Loading(props: LoadingProps) {
    const styleMemo = useMemo(
        () => ({
            opacity: props.loading ? 0 : 1,
        }),
        [props.loading]
    )

    const pointerEvents = useMemo(
        () => (props.loading ? 'none' : 'auto'),
        [props.loading]
    )

    return (
        <View
            style={{
                position: 'relative',
            }}
        >
            <View style={styleMemo} pointerEvents={pointerEvents}>
                {props.children}
            </View>
            {props.loading && (
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        zIndex: 999,
                        paddingLeft: props.paddingLeft ?? 0,
                        alignSelf: 'center',
                        ...props.style,
                    }}
                >
                    <ActivityIndicator
                        size={props.small ? 'small' : 'large'}
                        color={props.color ?? theme.main_color}
                    />
                </View>
            )}
        </View>
    )
}
