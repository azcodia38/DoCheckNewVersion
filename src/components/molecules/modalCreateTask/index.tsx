import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { Modalize } from 'react-native-modalize'

// @api
import { SearchResultData } from 'src/api/mock-api'

// @components
import Button from 'src/components/atoms/button'
import EditorTask from 'components/editor-task/EditorTask'
import { PlusSquareIcon } from 'components/icons/Icons'

// @helpers
import { ModalCreateGoalProps } from 'src/utils/types'

// @pages
import { AbsoluteFloatingButtonContainer } from 'src/pages/inside-pages/buat-goal-baru/styled'
import { isEqual } from 'lodash'

export default function ModalCreateTask({
    modalizeRef,
    modalHeight,
    goal,
    closeTaskListHandler,
    gotoOtherUserProfile,
    getTaskInitialParticipants,
    addTaskHandler,
    setActiveTask,
    simpanActiveTask,
    activeTask,
    setIsOverlay,
    keyboardHeight,
    onCloseModal,
}: ModalCreateGoalProps) {
    const title = useMemo(() => ` Tambahkan Task`, [])

    return (
        <>
            <Modalize
                ref={modalizeRef}
                modalHeight={modalHeight / 1.2}
                panGestureComponentEnabled={true}
                disableScrollIfPossible={true}
                useNativeDriver={true}
                closeOnOverlayTap={true}
                onClose={onCloseModal}
                handlePosition={'outside'}
            >
                <EditorTask
                    goalMemberIDs={goal.goalMembers}
                    onUserPress={(user: SearchResultData) => {
                        closeTaskListHandler()
                        gotoOtherUserProfile(user.id)
                    }}
                    getInitialParticipants={getTaskInitialParticipants}
                    task={activeTask.task}
                    setTask={(task) => setActiveTask({ ...activeTask, task })}
                    onSimpan={simpanActiveTask}
                    height={modalHeight}
                />
            </Modalize>
            {isEqual(keyboardHeight, 0) && (
                <AbsoluteFloatingButtonContainer>
                    <Button
                        onPress={addTaskHandler}
                        style={{ alignSelf: 'center' }}
                        textStyle={{
                            fontFamily: 'OpenSans-Regular',
                        }}
                    >
                        <PlusSquareIcon />
                        <Text>{title}</Text>
                    </Button>
                </AbsoluteFloatingButtonContainer>
            )}
        </>
    )
}
