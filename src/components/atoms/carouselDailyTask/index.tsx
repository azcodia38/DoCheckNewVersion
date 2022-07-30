/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'
import { isEmpty, size } from 'lodash'

// @helpers
import { DailyTaskType, RenderingTaskItem } from 'src/pages/inside-pages/home/types'
import { Task } from 'src/entity/Task.entity'
import { CarouselDailyTaskContainer } from './styled'
import useDailyTaskList from 'src/hook/useDailyTaskList'
import useMappingDailyTask from 'src/hook/useMappingDailyTask'
import DailySingleItem from 'src/components/atoms/dailySingleTask'

const { width: viewportWidth } = Dimensions.get('window')

interface CarouselDailyTaskProps {
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    onActiveTabChange?(tab: DailyTaskType): void
    withDynamicHeight: boolean
    listListTasks: Task[][]
    onSnap: boolean
    listTaskIDsLoading?: string[]
    enableScroll?: boolean
    style?: StyleProp<ViewStyle>
    canExpired?: boolean
}

export default function CarouselDailyTask(props: CarouselDailyTaskProps) {
    const { dailyTaskTab } = useDailyTaskList()
    const { mapIndexingDailyTask, transformDailyTask } = useMappingDailyTask()

    const ref = useRef<Carousel<any>>(null)

    const renderingItem = useCallback(
        (tasks: RenderingTaskItem<Task[]>) => (
            <DailySingleItem
                tasks={tasks}
                onTick={props.onTick}
                onTaskPress={props.onTaskPress}
                listTaskIDsLoading={props.listTaskIDsLoading}
                enableScroll={props.enableScroll}
                canExpired={props.canExpired}
            />
        ),
        [
            props.onTick,
            props.onTaskPress,
            props.listTaskIDsLoading,
            props.enableScroll,
            transformDailyTask,
        ]
    )

    const onSnapItemHandler = useCallback(
        (index: number) => {
            const tabIndexType = transformDailyTask(index)
            if (props.onActiveTabChange) props.onActiveTabChange(tabIndexType)
        },
        [props.onActiveTabChange, transformDailyTask]
    )

    const heightContainerDailyTask = useMemo(
        () =>
            `${
                props.withDynamicHeight
                    ? isEmpty(
                          props.listListTasks[
                              mapIndexingDailyTask(dailyTaskTab!)
                          ]
                      )
                        ? 342
                        : size(
                              props.listListTasks[
                                  mapIndexingDailyTask(dailyTaskTab!)
                              ]
                          ) * 85
                    : 342
            }px`,
        [
            props.listListTasks,
            mapIndexingDailyTask,
            dailyTaskTab,
            size,
            isEmpty,
            props.withDynamicHeight,
        ]
    )

    // if user change the dailyTask tab, the list is currently followed what user changed
    useEffect(() => {
        ref.current?.snapToItem(mapIndexingDailyTask(dailyTaskTab), false)
    }, [dailyTaskTab])

    return (
        <CarouselDailyTaskContainer
            height={heightContainerDailyTask}
            style={props.style}
        >
            <Carousel<Task[]>
                ref={ref}
                data={props.listListTasks}
                inactiveSlideScale={1}
                renderItem={renderingItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                onSnapToItem={onSnapItemHandler}
                loop={true}
                useScrollView={false}
                vertical={false}
                shouldOptimizeUpdates={true}
            />
        </CarouselDailyTaskContainer>
    )
}
