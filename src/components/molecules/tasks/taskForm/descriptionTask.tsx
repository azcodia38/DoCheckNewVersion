import React from 'react'

import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import WithPadding from 'src/components/atoms/withPadding'

interface DescriptionTaskProps {
    editMode: boolean
    value: string
    onChange: (status: string) => void
}

export default function DescriptionTask({
    editMode,
    onChange,
    value,
}: DescriptionTaskProps) {
    return (
        <WithPadding>
            <FormTextareaInput
                editable={editMode}
                value={value}
                onChangeText={onChange}
                placeholder={'Catatan'}
                placeholderTextColor={'#818487'}
                state={editMode ? 'special-task' : 'normal'}
                inputStyle={{
                    marginLeft: 8,
                    zIndex: -1,
                }}
            />
        </WithPadding>
    )
}
