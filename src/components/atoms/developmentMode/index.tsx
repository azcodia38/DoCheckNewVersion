import React from 'react'
import { Dimensions, View } from 'react-native'

import Tipografi from 'src/components/atoms/tipografi'

import { is_development_mode } from 'src/api'
import { theme } from 'src/utils/const'
import { CURRENTLY_MODE } from 'src/utils/lang'
import { AccessibilityInfo } from 'src/utils/types'

interface DevelopmentModeProps {
    withBackground?: boolean
    fontContent?: boolean
}

const { width } = Dimensions.get('window')

export default function DevelopmentMode({
    withBackground = true,
    accessibilityLabel,
    accessibilityHint,
    fontContent,
}: DevelopmentModeProps & AccessibilityInfo) {
    return (
        <>
            {is_development_mode && (
                <View
                    style={
                        withBackground
                            ? {
                                  backgroundColor: theme.main_color,
                                  borderRadius: 20,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: 5,
                                  width: 0,
                                  minWidth: width - 278,
                                  height: 25,
                              }
                            : {}
                    }
                >
                    <Tipografi
                        style={
                            withBackground
                                ? { color: '#fff' }
                                : { color: fontContent ? '#000' : '#fff' }
                        }
                        type={'smaller'}
                        accessibilityLabel={accessibilityLabel}
                        accessibilityHint={accessibilityHint}
                    >
                        {CURRENTLY_MODE}
                    </Tipografi>
                </View>
            )}
        </>
    )
}
