import React from 'react'

import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import { GoalCardPaperIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

interface ProgressDescriptionProps {
    title: string
}

export default function ProgressDescription({
    title,
}: ProgressDescriptionProps) {
    return (
        <ContainerAlignItemsCenter>
            <GoalCardPaperIcon />
            <Tipografi type={'small'}>{title}</Tipografi>
        </ContainerAlignItemsCenter>
    )
}
