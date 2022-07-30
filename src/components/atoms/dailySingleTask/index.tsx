/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */


import React from 'react'

import CarouselTaskItem from 'src/components/atoms/carouselTaskItem'
import { RenderingTaskItem } from 'src/pages/inside-pages/home/types'

import useMappingDailyTask from 'src/hook/useMappingDailyTask'
import { Task } from 'src/entity/Task.entity'

interface DailySingleItemProps {
    tasks: RenderingTaskItem<Task[]>
    listTaskIDsLoading?: string[]
    onTaskPress?(task: Task): void
    enableScroll?: boolean
    canExpired?: boolean
    onTick?(task: Task, done: boolean): void
}

export default function DailySingleItem({
    onTick,
    tasks,
    onTaskPress,
    listTaskIDsLoading,
    enableScroll,
    canExpired,
}: DailySingleItemProps) {
    const { transformDailyTask } = useMappingDailyTask()
    return (
        <CarouselTaskItem
            transformDailyTask={transformDailyTask}
            index={tasks.index}
            onTick={onTick}
            items={tasks.item}
            onTaskPress={onTaskPress}
            listTaskIDsLoading={listTaskIDsLoading}
            enableScroll={enableScroll}
            canExpired={canExpired}
        />
    )
}
