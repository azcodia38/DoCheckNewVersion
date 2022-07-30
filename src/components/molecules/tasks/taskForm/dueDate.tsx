import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import moment from 'moment'

import WithPadding from 'src/components/atoms/withPadding'
import FormDateInput from 'components/form/form-date-input/FormDateInput'
import { CalendarTaskIcon } from 'components/icons/Icons'
import FormTimeInput from 'components/form/form-time-input/FormTimeInput'

import { getDatefromDateOrString } from 'src/utils'
import { TaskCreateGoalRequest } from 'src/api/my-goal'

interface DueDateProps {
    editMode: boolean
    errorDate: string
    colorAggregator: string
    taskEditData: TaskCreateGoalRequest
    setTaskEditData: (
        value: React.SetStateAction<TaskCreateGoalRequest>
    ) => void
}

export default function DueDate({
    colorAggregator,
    editMode,
    errorDate,
    taskEditData,
    setTaskEditData,
}: DueDateProps) {
    const calendarValueMemo = useMemo(
        () =>
            taskEditData.dueDate
                ? moment(getDatefromDateOrString(taskEditData.dueDate)).format(
                      'DD/MMMM/YYYY'
                  )
                : '',
        [taskEditData.dueDate, getDatefromDateOrString]
    )

    const timeValueMemo = useMemo(
        () =>
            taskEditData.dueDate
                ? moment(getDatefromDateOrString(taskEditData.dueDate)).format(
                      'HH:mm'
                  )
                : '',
        [taskEditData.dueDate, getDatefromDateOrString]
    )

    const isEditMode = useMemo(
        () =>
            editMode
                ? errorDate.length > 0
                    ? 'error'
                    : 'special-task'
                : 'normal',
        [editMode, errorDate]
    )

    const onDateChangeHandler = useCallback(
        (dueDate) =>
            setTaskEditData({
                ...taskEditData,
                dueDate,
            }),
        [setTaskEditData, taskEditData]
    )

    const onTimeChangeHandler = useCallback(
        (dueDate) =>
            editMode &&
            setTaskEditData({
                ...taskEditData,
                dueDate: moment(
                    `${moment(
                        getDatefromDateOrString(taskEditData.dueDate) ??
                            new Date()
                    ).format('DD/MM/YYYY')} ${moment(dueDate).format('HH:mm')}`,
                    'DD/MM/YYYY HH:mm'
                ).toDate(),
            }),
        [setTaskEditData, taskEditData, getDatefromDateOrString, editMode]
    )

    return (
        <WithPadding>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <View style={{ width: '67%' }}>
                    <FormDateInput
                        editable={editMode}
                        placeholder={'Due Date'}
                        placeholderTextColor={'#818487'}
                        state={
                            editMode
                                ? errorDate.length > 0
                                    ? 'error'
                                    : 'special-task'
                                : 'normal'
                        }
                        errorText={
                            editMode && errorDate.length > 0 ? errorDate : ''
                        }
                        leftItem={
                            <CalendarTaskIcon
                                style={{
                                    marginLeft: -4,
                                    width: 22,
                                    height: 22,
                                }}
                            />
                        }
                        inputStyle={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 8,
                            color: colorAggregator,
                        }}
                        value={calendarValueMemo}
                        date={getDatefromDateOrString(taskEditData.dueDate)}
                        onDateChange={onDateChangeHandler}
                        haveMinimum={true}
                    />
                </View>
                <View style={{ width: '30%', marginLeft: '3%' }}>
                    <FormTimeInput
                        editable={editMode}
                        placeholder={'Time'}
                        placeholderTextColor={'#818487'}
                        state={isEditMode}
                        inputStyle={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 8,
                            color: colorAggregator,
                        }}
                        value={timeValueMemo}
                        date={getDatefromDateOrString(taskEditData.dueDate)}
                        onDateChange={onTimeChangeHandler}
                    />
                </View>
            </View>
        </WithPadding>
    )
}
