import React, { useCallback, useMemo } from 'react'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { LinkRekomendasiGreenIcon } from 'components/icons/Icons'
import WithPadding from 'src/components/atoms/withPadding'

import { isIOS } from 'src/utils'
import { TaskCreateGoalRequest } from 'src/api/my-goal'

interface LinkRecommendationProps {
    editMode: boolean
    errorLink: string
    taskEditData: TaskCreateGoalRequest
    setTaskEditData: (
        value: React.SetStateAction<TaskCreateGoalRequest>
    ) => void
}

export default function LinkRecommendation({
    editMode,
    errorLink,
    setTaskEditData,
    taskEditData,
}: LinkRecommendationProps) {
    const isHaveError = useMemo(
        () =>
            errorLink.length > 0
                ? 'error'
                : editMode
                ? 'special-task'
                : 'normal',
        [errorLink, editMode]
    )

    const recommendationIconElement = useMemo(
        () => (
            <LinkRekomendasiGreenIcon
                style={{
                    marginLeft: -4,
                    width: 22,
                    height: 22,
                }}
            />
        ),
        []
    )

    const onChangeHandler = useCallback(
        (_) =>
            setTaskEditData({
                ...taskEditData,
                recommendationUrl: _.toLowerCase(),
            }),
        [setTaskEditData, taskEditData]
    )

    return (
        <WithPadding>
            <FormTextInput
                editable={editMode}
                state={isHaveError}
                errorText={errorLink}
                value={taskEditData.recommendationUrl}
                autoCapitalize={'none'}
                onChangeText={onChangeHandler}
                placeholder={'Tambahkan link rekomendasi'}
                placeholderTextColor={'#818487'}
                leftItem={recommendationIconElement}
                inputStyle={{
                    marginTop: 6,
                    marginBottom: 6,
                    marginLeft: isIOS ? 8 : 4,
                }}
            />
        </WithPadding>
    )
}
