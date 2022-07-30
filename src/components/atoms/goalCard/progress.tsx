import React from 'react'
import { View } from 'react-native'

import {
    NewSpaceBetweenContainer,
    SpaceBetweenContainerCenter,
} from 'components/goalCard/styled'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import ProgressBar from 'src/components/atoms/progressBar'

interface ProgresBarProps {
    progress: number
    withTitle: boolean
    spaceNumber?: number
}

export default function ProgressBarCard({
    progress,
    withTitle,
    spaceNumber = 0,
}: ProgresBarProps) {
    return (
        <View>
            <SpaceBetweenContainerCenter>
                {withTitle && <Tipografi type={'label'}>Progress</Tipografi>}
            </SpaceBetweenContainerCenter>
            <Space value={spaceNumber} />
            <NewSpaceBetweenContainer>
                <ProgressBar progress={progress} height={12} primary={false} />
                <Tipografi type={'label'}>{`${progress}%`}</Tipografi>
            </NewSpaceBetweenContainer>
        </View>
    )
}
