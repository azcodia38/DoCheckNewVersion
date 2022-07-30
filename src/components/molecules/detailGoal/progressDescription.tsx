import React from 'react'

import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import { GoalCardPaperIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

interface ProgressDescriptionProps {
    progressTask: string | number
}

export default function ProgressDescription({
    progressTask,
}: ProgressDescriptionProps) {
    return (
        <ContainerAlignItemsCenter>
            <Tipografi type={'normal'} style={{ color: '#000' }}>
                {'Task      :  '}
            </Tipografi>
            <GoalCardPaperIcon />
            <Tipografi type={'small'} style={{ color: '#262D33' }}>
                {progressTask}
            </Tipografi>
        </ContainerAlignItemsCenter>
    )
}
