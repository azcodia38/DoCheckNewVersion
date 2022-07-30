import React from 'react'

import Tipografi from 'src/components/atoms/tipografi'

interface TitleProps {
    title: string
    style: any
}

export default function Title({ title, style }: TitleProps) {
    return (
        <Tipografi
            numberOfLines={2}
            ellipsizeMode="tail"
            type={'label'}
            style={style}
        >
            {title}
        </Tipografi>
    )
}
