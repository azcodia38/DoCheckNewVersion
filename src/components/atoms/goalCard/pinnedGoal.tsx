import React from 'react'

import { PinGoalContainer } from 'components/goalCard/styled'
import { PinTaskIcon } from 'components/icons/Icons'
import { View } from 'react-native'

interface PinnedGoal {
    isPinned: boolean
}

export default function PinnedGoal({ isPinned }: PinnedGoal) {
    return (
        <PinGoalContainer>
            {isPinned && (
                <View
                    style={{
                        padding: 7,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: 999,
                    }}
                >
                    <PinTaskIcon />
                </View>
            )}
        </PinGoalContainer>
    )
}
