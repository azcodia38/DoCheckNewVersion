import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

// @component
import ModalCreateTask from 'src/components/molecules/modalCreateTask'

// @helpers
import { ModalCreateGoalProps } from 'src/utils/types'
import { isAndroid, isIOS } from 'src/utils'

export default function CreateTask({
    activeTask,
    addTaskHandler,
    closeTaskListHandler,
    getTaskInitialParticipants,
    goal,
    gotoOtherUserProfile,
    heightTaskList,
    isKeyboard,
    keyboardHeight,
    modalHeight,
    modalizeRef,
    setActiveTask,
    setIsOverlay,
    simpanActiveTask,
    onCloseModal,
}: ModalCreateGoalProps) {
    return (
        <>
            {Boolean(isIOS) && (
                <KeyboardAvoidingView
                    style={styles.keyboardView}
                    behavior="padding"
                >
                    <ModalCreateTask
                        modalizeRef={modalizeRef}
                        heightTaskList={heightTaskList}
                        isKeyboard={isKeyboard}
                        modalHeight={modalHeight}
                        goal={goal}
                        keyboardHeight={keyboardHeight}
                        activeTask={activeTask}
                        setIsOverlay={setIsOverlay}
                        closeTaskListHandler={closeTaskListHandler}
                        gotoOtherUserProfile={gotoOtherUserProfile}
                        getTaskInitialParticipants={getTaskInitialParticipants}
                        addTaskHandler={addTaskHandler}
                        setActiveTask={setActiveTask}
                        simpanActiveTask={simpanActiveTask}
                        onCloseModal={onCloseModal}
                    />
                </KeyboardAvoidingView>
            )}
            {Boolean(isAndroid) && (
                <ModalCreateTask
                    modalizeRef={modalizeRef}
                    heightTaskList={heightTaskList}
                    isKeyboard={isKeyboard}
                    modalHeight={modalHeight}
                    goal={goal}
                    keyboardHeight={keyboardHeight}
                    activeTask={activeTask}
                    setIsOverlay={setIsOverlay}
                    closeTaskListHandler={closeTaskListHandler}
                    gotoOtherUserProfile={gotoOtherUserProfile}
                    getTaskInitialParticipants={getTaskInitialParticipants}
                    addTaskHandler={addTaskHandler}
                    setActiveTask={setActiveTask}
                    simpanActiveTask={simpanActiveTask}
                    onCloseModal={onCloseModal}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    keyboardView: { zIndex: 10 },
})
