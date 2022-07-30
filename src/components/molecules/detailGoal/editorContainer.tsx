/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useMemo } from 'react'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { StyleSheet } from 'react-native'

import EditorTask from 'components/editor-task/EditorTask'
import { TaskCreateGoalRequest } from 'src/api/my-goal'
import { InitialParticipantsResponseType } from 'src/utils/types'
import useDimension from 'src/hook/useDimension'
import { isIOS } from 'src/utils'

interface EditorContainerProps {
    modalizeTambahTaskRef: React.RefObject<IHandles>
    isKeyboardShow: boolean
    goalMemberMapID: string[]
    loadingCreateTask: boolean
    activeTask: TaskCreateGoalRequest
    simpanActiveTask: () => false | Promise<void>
    setTaskHandler: (task: any) => void
    getInitialParticipants: InitialParticipantsResponseType
}

export default function EditorContainer({
    modalizeTambahTaskRef,
    isKeyboardShow,
    goalMemberMapID,
    activeTask,
    loadingCreateTask,
    simpanActiveTask,
    setTaskHandler,
    getInitialParticipants,
}: EditorContainerProps) {
    const { height } = useDimension()
    const popupHeight = useMemo(() => height / 1.23, [height])
    return (
        <Modalize
            ref={modalizeTambahTaskRef}
            modalHeight={popupHeight}
            childrenStyle={{
                ...styles.childrenStyle,
                borderTopRightRadius: Boolean(isIOS) && isKeyboardShow ? 0 : 16,
                borderTopLeftRadius: Boolean(isIOS) && isKeyboardShow ? 0 : 16,
            }}
            closeOnOverlayTap={false}
            handlePosition={'outside'}
        >
            <EditorTask
                goalMemberIDs={goalMemberMapID}
                loadingSubmit={loadingCreateTask}
                task={activeTask}
                getInitialParticipants={getInitialParticipants}
                setTask={setTaskHandler}
                onSimpan={simpanActiveTask}
                height={popupHeight}
            />
        </Modalize>
    )
}

const styles = StyleSheet.create({
    modalStyleUpper: {
        shadowOpacity: 0,
        elevation: 0,
    },
    overlayStyleUpper: {
        backgroundColor: 'transparent',
    },
    overlayChildrenStyle: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    modalStyle: {
        backgroundColor: '#0000',
        shadowOpacity: 0,
        elevation: 0,
        overflow: 'hidden',
    },
    overlayStyle: { backgroundColor: '#0001', shadowOpacity: 0, elevation: 0 },
    childrenStyle: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
})
