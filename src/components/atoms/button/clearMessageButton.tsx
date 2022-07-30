/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'

// @components
import { CloseGrayIcon } from 'components/icons/Icons'
import TouchableWithoutFeedback from '../touchableWithoutFeedback'

interface ClearMessageButtonProps {
    query: string
    onPress: (word: string) => void
}

export default function ClearMessageButton({
    onPress,
    query,
}: ClearMessageButtonProps) {
    return (
        <>
            {query.length > 0 && (
                <TouchableWithoutFeedback onPress={() => onPress('')}>
                    <View style={styles.closeIconWrapper}>
                        <CloseGrayIcon onPress={() => onPress('')} />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    closeIconWrapper: {
        padding: 12,
        marginRight: -12,
    },
})
