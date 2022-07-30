import React, { useCallback, useMemo } from 'react'

import { SearchResultData } from 'src/api/mock-api'
import { TaskCreateGoalRequest } from 'src/api/my-goal'
import FormPeopleInput from 'components/form/form-people-input/FormPeopleInput'
import { AddUserIcon } from 'components/icons/Icons'
import WithPadding from 'src/components/atoms/withPadding'

interface InviteMemberProps {
    editMode: boolean
    onPress: () => void
    taskEditData: TaskCreateGoalRequest
    usersSearchResult: SearchResultData[]
    loadingParticipants: boolean
}

export default function InviteMember({
    editMode,
    onPress,
    taskEditData,
    usersSearchResult,
    loadingParticipants,
}: InviteMemberProps) {
    const isEditMode = useMemo(
        () => (editMode ? 'special-task' : 'normal'),
        [editMode]
    )

    const usersSearchResultMemo: any = useCallback(
        () =>
            usersSearchResult.map((u: SearchResultData) => ({
                label: u.imageurl ?? '',
                value: u.id,
            })),
        [usersSearchResult]
    )

    return (
        <WithPadding>
            <FormPeopleInput
                editable={editMode}
                onPress={onPress}
                state={isEditMode}
                values={taskEditData.assignees ?? []}
                options={usersSearchResultMemo}
                loading={loadingParticipants}
                style={{ marginBottom: 12 }}
                leftItem={
                    <AddUserIcon
                        style={{
                            marginLeft: -1,
                            width: 20,
                            height: 20,
                        }}
                    />
                }
            />
        </WithPadding>
    )
}
