/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import moment from 'moment'
import { View } from 'react-native'

// @components
import Button from 'src/components/atoms/button'
import FormDateInput from 'components/form/form-date-input/FormDateInput'
import FormDropdown2Input from 'components/form/form-dropdown-input/FormDropdown2Input'
import FormPeopleInput from 'components/form/form-people-input/FormPeopleInput'
import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import FormTimeInput from 'components/form/form-time-input/FormTimeInput'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import {
    AddUserGrayIcon,
    ArrowDownGrayIcon,
    CalendarCreateTaskIcon,
    LinkRekomendasiIcon,
    PlusGrayIcon,
    Repeat3Icon,
} from 'components/icons/Icons'
import PopupAnggotaTask from 'components/popup/anggota-task/PopupAnggotaTask'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'

// @tools
import { getDatefromDateOrString } from 'src/utils'
import {
    repeat_task_options,
    screen_height as screenHeight,
} from 'src/utils/const'

// @api
import { SearchResultData } from 'src/api/mock-api'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
import WithEditorTask, { WithEditorTaskHOC } from 'src/hoc/withEditorTaskHOC'

export default WithEditorTask(function EditorTask({
    errorDate,
    errorLink,
    getInitialParticipants,
    height,
    loading,
    loadingParticipants,
    onAddUserToActiveTask,
    onRemoveUserFromActiveTask,
    participants,
    saveAndSubmitAudio,
    searchAPI,
    setParticipants,
    setShowPopupParticipants,
    setTask,
    task,
    tmpRecordedAudio,
    onUserPress,
    showPopupNotification,
}: WithEditorTaskHOC) {
    return (
        <>
            <WithPadding
                style={{
                    height: height,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Space value={36} />
                <FormTextareaInput
                    accessibilityLabel={accessibilitylabels.judulTask}
                    state={'create-task'}
                    numberOfLines={undefined}
                    inputStyle={{
                        height: 60,
                        minHeight: 60,
                    }}
                    style={{ fontFamily: 'OpenSans-Regular' }}
                    placeholderTextColor={'#818487'}
                    onChangeText={(_) => setTask({ ...task, title: _ })}
                    value={task.title}
                    placeholder={'Ketik task disini'}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <View style={{ width: '67%' }}>
                        <FormDateInput
                            haveMinimum={true}
                            state={
                                errorDate.length > 0 ? 'error' : 'create-task'
                            }
                            onDateChange={(_) =>
                                setTask({ ...task, dueDate: _ })
                            }
                            date={getDatefromDateOrString(task.dueDate)}
                            inputStyle={{
                                paddingTop: 6,
                                paddingBottom: 6,
                            }}
                            errorText={errorDate}
                            value={
                                task.dueDate
                                    ? moment(task.dueDate).format(
                                          'DD/MMMM/YYYY'
                                      )
                                    : ''
                            }
                            placeholder={'Tenggat waktu'}
                            placeholderTextColor={'#818487'}
                            leftItem={
                                <CalendarCreateTaskIcon
                                    style={{ marginLeft: 2, marginRight: 4 }}
                                />
                            }
                        />
                    </View>
                    <View style={{ width: '30%', marginLeft: '3%' }}>
                        <FormTimeInput
                            state={
                                errorDate.length > 0 ? 'error' : 'create-task'
                            }
                            onDateChange={(_) => {
                                setTask({
                                    ...task,
                                    dueDate: moment(
                                        `${moment(
                                            task.dueDate
                                                ? getDatefromDateOrString(
                                                      task.dueDate
                                                  )
                                                : new Date()
                                        ).format('DD/MM/YYYY')} ${moment(
                                            _
                                        ).format('HH:mm')}`,
                                        'DD/MM/YYYY HH:mm'
                                    ).toDate(),
                                })
                            }}
                            date={getDatefromDateOrString(task.dueDate)}
                            inputStyle={{
                                paddingTop: 6,
                                paddingBottom: 6,
                            }}
                            value={
                                task.dueDate
                                    ? moment(task.dueDate).format('HH:mm')
                                    : ''
                            }
                            placeholder={'Jam'}
                            placeholderTextColor={'#818487'}
                        />
                    </View>
                </View>
                <FormDropdown2Input
                    editable={true}
                    state={'create-task'}
                    leftItem={
                        <Repeat3Icon
                            style={{ marginLeft: 2, marginRight: 4 }}
                        />
                    }
                    rightItem={
                        <ArrowDownGrayIcon style={{ marginRight: 15 }} />
                    }
                    inputStyle={{
                        marginTop: 6,
                        marginBottom: 6,
                    }}
                    style={{ marginBottom: 12 }}
                    placeholder={'Ulang Task'}
                    placeholderTextColor={'#818487'}
                    options={repeat_task_options}
                    optionContainerStyle={{
                        borderLeftColor: '#CCC',
                        borderRightColor: '#CCC',
                        borderBottomColor: '#CCC',
                    }}
                    optionStyle={{
                        backgroundColor: '#F9F9F9',
                    }}
                    value={`${task.repeatTask ?? ''}`}
                    onValueChange={(_) =>
                        setTask({
                            ...task,
                            repeatTask: parseInt(_),
                        })
                    }
                />
                <FormPeopleInput
                    accessibilityLabel={accessibilitylabels.formPeopleInput}
                    editable={true}
                    onPress={() => setShowPopupParticipants(true)}
                    state={'create-task'}
                    values={task.assignees ?? []}
                    options={participants.map((u: SearchResultData) => ({
                        label: u.imageurl ?? '',
                        value: u.id,
                    }))}
                    loading={loadingParticipants}
                    style={{ marginBottom: 12 }}
                    leftItem={
                        <AddUserGrayIcon
                            style={{ marginLeft: 2, marginRight: 4 }}
                        />
                    }
                    rightItem={<PlusGrayIcon />}
                />
                <FormTextInput
                    accessibilityLabel={accessibilitylabels.formPeopleInput}
                    state={errorLink.length > 0 ? 'error' : 'create-task'}
                    numberOfLines={undefined}
                    inputStyle={{
                        height: 60,
                        minHeight: 60,
                    }}
                    errorText={errorLink}
                    autoCapitalize={'none'}
                    style={{ fontFamily: 'OpenSans-Regular' }}
                    placeholderTextColor={'#818487'}
                    leftItem={
                        <LinkRekomendasiIcon
                            style={{ marginLeft: 2, marginRight: 4 }}
                        />
                    }
                    onChangeText={(_) =>
                        setTask({
                            ...task,
                            recommendationUrl: _.toLowerCase(),
                        })
                    }
                    value={task.recommendationUrl}
                    placeholder={'Tambahkan link rekomendasi'}
                />
                <FormTextareaInput
                    accessibilityLabel={accessibilitylabels.linkTask}
                    editable={true}
                    placeholder={'Catatan'}
                    placeholderTextColor={'#818487'}
                    state={'create-task'}
                    numberOfLines={undefined}
                    value={task.notes ?? ''}
                    onChangeText={(_) => setTask({ ...task, notes: _ })}
                    inputStyle={{
                        marginLeft: 8,
                        zIndex: -1,
                        height: '100%',
                    }}
                    inputContainerStyle={{
                        flex: 0,
                        height: 150,
                    }}
                />
                <Space value={10} />
                <View
                    style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}
                >
                    <Button
                        accessibilityLabel={accessibilitylabels.btnSimpanTask}
                        loading={loading}
                        onPress={saveAndSubmitAudio}
                        inactive={
                            (task.title?.length === 0 &&
                                (tmpRecordedAudio.path ?? '').length === 0) ||
                            errorDate.length > 0 ||
                            errorLink.length > 0
                        }
                    >
                        Simpan
                    </Button>
                </View>
                <Space value={35} />
            </WithPadding>
            <PopupAnggotaTask
                searchAPI={searchAPI}
                editable={true}
                onUserPress={onUserPress}
                memberIDs={task.assignees ?? []}
                onMembersChange={setParticipants}
                getInitialParticipants={getInitialParticipants}
                show={showPopupNotification}
                onCancel={() => setShowPopupParticipants(false)}
                onAddUser={onAddUserToActiveTask}
                onRemoveUser={onRemoveUserFromActiveTask}
            />
        </>
    )
})
