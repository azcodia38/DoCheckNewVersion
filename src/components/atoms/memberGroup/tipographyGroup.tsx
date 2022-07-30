import React from 'react'

import Tipografi from 'src/components/atoms/tipografi'
import {
    container_width,
    smaller_container_width,
} from 'components/peserta-grup/styled'

interface TipographyGroupProps {
    values?: string[]
    smaller?: boolean
}

export default function TipographyGroup({
    smaller,
    values,
}: TipographyGroupProps) {
    return (
        <>
            {(values ?? []).length > 6 && (
                <Tipografi
                    type={'normal-bigger'}
                    style={{
                        marginLeft:
                            ((smaller
                                ? smaller_container_width
                                : container_width) *
                                3) /
                            4,
                        color: '#B5B5BA',
                    }}
                >
                    {`+${values!.length - 6}`}
                </Tipografi>
            )}
        </>
    )
}
