import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { screen_height, screen_width } from 'src/utils/const'

interface OverlayProps {
    isOverlay: boolean
    closeTaskListHandler: () => void
}

export default function Overlay({
    isOverlay,
    closeTaskListHandler,
}: OverlayProps) {
    return (
        <>
            {isOverlay && (
                <TouchableOpacity
                    style={isOverlay ? styles.isOverlay : {}}
                    onPress={() => isOverlay && closeTaskListHandler()}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    isOverlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: screen_width,
        height: screen_height,
        zIndex: 2,
    },
})
