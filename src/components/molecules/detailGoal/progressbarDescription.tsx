import React from 'react'
import { View } from 'react-native'

import { SpaceBetweenContainerCenter } from 'components/goalCard/styled'
import ProgressBar from 'src/components/atoms/progressBar'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'

interface ProgressbarDescription {
    progress: number
}

export default function ProgressbarDescription({
    progress,
}: ProgressbarDescription) {
    return (
        <>
            <View style={{ marginRight: 24 }}>
                <ProgressBar progress={progress} />
                <Space value={10} />
                <SpaceBetweenContainerCenter>
                    <Tipografi type={'label'} style={{ color: '#000' }}>
                        Progress
                    </Tipografi>
                    <Tipografi type={'label'} style={{ color: '#000' }}>
                        {`${progress}%`}
                    </Tipografi>
                </SpaceBetweenContainerCenter>
            </View>
            <Space value={15} />
            <View
                style={{
                    height: 1,
                    backgroundColor: '#DADADA',
                }}
            />
        </>
    )
}
