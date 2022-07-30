import React, { useMemo } from 'react'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { TickOnIcon } from 'components/icons/Icons'
import WithPadding from 'src/components/atoms/withPadding'

import { isIOS } from 'src/utils'

interface GoalTitleProps {
    editMode: boolean
    onChangeText: (title: string) => void
    title?: string
}

export default function GoalTitle({
    editMode,
    title = '',
    onChangeText,
}: GoalTitleProps) {
    const isEditMode = useMemo(
        () => (editMode ? 'special-task' : 'normal'),
        [editMode]
    )

    return (
        <WithPadding>
            <FormTextInput
                editable={editMode}
                state={isEditMode}
                value={title}
                onChangeText={onChangeText}
                placeholder={'Judul Task'}
                placeholderTextColor={'#818487'}
                rightItem={
                    <TickOnIcon
                        style={{
                            marginRight: 8,
                            width: 22,
                            height: 22,
                        }}
                    />
                }
                inputStyle={{
                    marginTop: 6,
                    marginBottom: 6,
                    marginLeft: isIOS ? 8 : 4,
                }}
            />
            {/* { (!!taskEditData.audioUrl || editMode) && <FormAudioInput 
              useAudio={true}
              initialAudioState={taskEditData.audioUrl ? RecordingState.RECORDED : RecordingState.INITIAL}
              autoRecord={false}
              onDeleteAudio={() => {
                setTempRecordedAudio({});
              }}
              deleteMode={editMode}
              duration={editMode ? tempRecordedAudio.duration : taskEditData.audioDurationMs}
              value={editMode ? tempRecordedAudio.path : taskEditData.audioUrl}
              onAudioRecorded={setTempRecordedAudio} /> } */}
        </WithPadding>
    )
}
