import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import React from 'react'
import ButtonOutline from 'src/components/atoms/button/buttonOutline'

interface RemoveTaskProps {
    editMode: boolean
    onPress: () => void
}

export default function RemoveTask({ editMode, onPress }: RemoveTaskProps) {
    return (
        <WithPadding>
            {editMode && (
                <ButtonOutline borderColor={'#FF4C4C'} onPress={onPress}>
                    Hapus Task
                </ButtonOutline>
            )}
            <Space value={25} />
        </WithPadding>
    )
}
