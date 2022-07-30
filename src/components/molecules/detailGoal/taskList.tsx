/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useMemo, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { uniqueId } from 'lodash'
import { Modalize } from 'react-native-modalize'

import ItemTask from 'components/item-task/ItemTask'
import { TaskListLoading } from 'components/loader-collections'
import NotLoadingButEmpty from 'src/components/atoms/descriptionGoal/notLoadingButEmpty'

import { Task } from 'src/entity/Task.entity'
import { Goals } from 'src/entity/Goals.entity'
import TouchHeadTask from 'src/components/atoms/touchHeadTask'
import useDimension from 'src/hook/useDimension'
import { isIOS } from 'src/utils'
import { hasNotch } from 'react-native-device-info'
import Button from 'src/components/atoms/button'
import { theme } from 'src/utils/const'
import Tipografi from 'src/components/atoms/tipografi'
import useAnimation from 'src/hook/useAnimation'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

interface TaskListProps {
    modalHeight: number
    onTaskTick: (task: Task, done: boolean) => Promise<void>
    gotoTask: (task: Task) => void
    loading: boolean
    pinnedTaskMapID: string[]
    task?: Task[]
    goal?: Goals
    setModalHeight: (status: any) => void
    onCreateNewTaskHandler: () => void
}

export default function TaskList({
    gotoTask,
    loading,
    modalHeight,
    onTaskTick,
    pinnedTaskMapID,
    goal,
    task = [],
    onCreateNewTaskHandler,
}: TaskListProps) {
    const ref = useRef<Modalize>()

    const { height } = useDimension()
    const { buttonScale, onPressIn, onPressOut } = useAnimation()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    const onOpencreateTask = useCallback(() => {
        onCreateNewTaskHandler()
        ref.current?.open()
    }, [ref, onCreateNewTaskHandler])

    const optionalProps = useMemo(
        () => ({
            [isIOS ? 'modalHeight' : '']: hasNotch() ? height / 1.2 : height,
        }),
        [isIOS, hasNotch, height]
    )
    return (
        <Modalize
            ref={ref}
            alwaysOpen={modalHeight}
            handlePosition={'outside'}
            childrenStyle={styles.overlayChildrenStyle}
            HeaderComponent={<TouchHeadTask />}
            panGestureComponentEnabled={true}
            disableScrollIfPossible={true}
            useNativeDriver={true}
            closeOnOverlayTap={true}
            flatListProps={{
                data: task ?? [],
                keyExtractor: (t) => t.id ?? uniqueId(),
                renderItem: ({ item, index }) => (
                    <ItemTask
                        key={index}
                        item={item}
                        onTick={(done) => onTaskTick(item, done)}
                        onPress={() => gotoTask(item)}
                        pinned={pinnedTaskMapID.includes(item.id ?? '')}
                    />
                ),
                ListEmptyComponent: () => (
                    <>
                        {loading && <TaskListLoading />}
                        <NotLoadingButEmpty tasks={goal?.tasks} />
                    </>
                ),
            }}
            FloatingComponent={
                Boolean(isIOS) ? (
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            right: 8,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={onOpencreateTask}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                        >
                            <Animated.View style={[animatedScaleStyle]}>
                                <View
                                    style={{
                                        backgroundColor: theme.main_color,
                                        borderRadius: 999,
                                        width: 65,
                                        height: 65,
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Tipografi
                                        type="big-title"
                                        style={{ color: '#fff' }}
                                    >
                                        +
                                    </Tipografi>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Button>
                ) : null
            }
            {...optionalProps}
        />
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
})
