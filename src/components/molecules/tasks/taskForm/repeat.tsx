import React, { useMemo } from 'react'

import FormDropdown2Input from 'components/form/form-dropdown-input/FormDropdown2Input'
import { Repeat2Icon } from 'components/icons/Icons'
import WithPadding from 'src/components/atoms/withPadding'

import { isIOS } from 'src/utils'
import { RepeatTaskOptions } from 'src/utils/types'

interface RepeatTask {
    editMode: boolean
    colorAggregator: string
    repeatTaskOptions: RepeatTaskOptions[]
    repeatTaskValue: string
    onValueChange: (task: string) => void
}

export default function RepeatTask({
    colorAggregator,
    editMode,
    repeatTaskOptions,
    repeatTaskValue,
    onValueChange,
}: RepeatTask) {
    const isEditMode = useMemo(
        () => (editMode ? 'special-task' : 'normal'),
        [editMode]
    )

    return (
        <WithPadding style={{ zIndex: isIOS ? 999 : undefined }}>
            <FormDropdown2Input
                editable={editMode}
                state={isEditMode}
                leftItem={
                    <Repeat2Icon
                        style={{
                            marginLeft: -4,
                            width: 22,
                            height: 22,
                        }}
                    />
                }
                inputStyle={{
                    marginTop: 7,
                    marginBottom: 7,
                    marginLeft: 8,
                    color: colorAggregator,
                }}
                style={{ marginBottom: 12 }}
                placeholder={'Ulang Task'}
                placeholderTextColor={'#818487'}
                options={repeatTaskOptions}
                value={repeatTaskValue}
                onValueChange={onValueChange}
            />
        </WithPadding>
    )
}
