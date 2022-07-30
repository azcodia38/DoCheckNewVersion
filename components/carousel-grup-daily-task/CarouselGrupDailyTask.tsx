/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo } from 'react'
import { isEmpty, size, uniqueId } from 'lodash'
import BigList from 'react-native-big-list'

import { CarouselGrupDailyTaskContainer } from './styled'
import { TASK_CATEGORY } from 'src/utils/lang'

import {
    CarouselGrupDailyTaskProps,
    DailyTaskType,
    RenderingTaskItem,
} from 'src/pages/inside-pages/home/types'

import useDimension from 'src/hook/useDimension'
import ListRenderingTask from 'src/components/molecules/dailyTaskList/listRenderingTask'
import TaskKosongView from './EmptyTaskView'
import { tranformDescription } from 'src/utils/module'
import useDailyTaskList from 'src/hook/useDailyTaskList'

type RenderingItemCarouseGroupDailyTask = (
    args: RenderingTaskItem<any>
) => JSX.Element

export default function CarouselGrupDailyTask({
    checkIDs,
    listTasks,
    checkMode,
    height,
    listTaskIDsLoading,
    loading,
    onContainerCheckChange,
    onTaskLongPress,
    onTaskPress,
    onTick,
    style,
}: CarouselGrupDailyTaskProps) {
    const { dailyTaskTab } = useDailyTaskList()
    const { height: heightDimension } = useDimension()

    const mapIndexingDailyTask = useCallback<(type: DailyTaskType) => number>(
        (type: DailyTaskType) => {
            switch (type) {
                case TASK_CATEGORY.TODAY:
                    return 0
                case TASK_CATEGORY.TOMORROW:
                    return 1
                case TASK_CATEGORY.WEEK:
                    return 2
                case TASK_CATEGORY.NEXT_WEEK:
                    return 3
                case TASK_CATEGORY.SKIPPED:
                    return 4
                default:
                    return 0
            }
        },
        [TASK_CATEGORY]
    )

    const listDataRendering = useMemo(
        () => listTasks[mapIndexingDailyTask(dailyTaskTab!)],
        [listTasks, mapIndexingDailyTask, dailyTaskTab]
    )

    const heightMemo = useMemo(() => (height ? height : 80), [height])

    const itemHeight = useMemo(() => {
        if (!isEmpty(listDataRendering)) {
            const renderingSize = size(
                [
                    ...listDataRendering?.done,
                    ...listDataRendering?.not_done,
                ].flat(1)
            )
            if (renderingSize > 1) return heightMemo * renderingSize + 30
        }
        return heightDimension / 2
    }, [
        heightDimension,
        listDataRendering?.done,
        listDataRendering?.not_done,
        heightMemo,
    ])

    const renderingItem = useCallback<RenderingItemCarouseGroupDailyTask>(
        ({ item: items }) => (
            <ListRenderingTask
                onTick={onTick}
                items={items}
                onTaskPress={onTaskPress}
                listTaskIDsLoading={listTaskIDsLoading}
                loading={loading}
                checkMode={checkMode}
                onContainerCheckChange={onContainerCheckChange}
                onTaskLongPress={onTaskLongPress}
                checkIDs={checkIDs}
            />
        ),
        [
            onTick,
            onTaskPress,
            listTaskIDsLoading,
            loading,
            checkMode,
            onContainerCheckChange,
            onTaskLongPress,
            checkIDs,
        ]
    )

    return (
        <CarouselGrupDailyTaskContainer style={style}>
            {listDataRendering && (
                <BigList
                    data={[listDataRendering]}
                    renderItem={renderingItem}
                    itemHeight={itemHeight}
                    ListEmptyComponent={() => (
                        <TaskKosongView
                            description={tranformDescription(dailyTaskTab!)}
                            isEmptySearch
                        />
                    )}
                    // temporary solution
                    key={uniqueId()}
                />
            )}
        </CarouselGrupDailyTaskContainer>
    )
}
