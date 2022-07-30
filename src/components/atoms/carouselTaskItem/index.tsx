/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'

// @components
import { ItemContainerListTask } from 'components/carousel-grup-daily-task/styled'
import Tasks from 'src/components/atoms/tasks'
import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'

// @pages
import { TransformDailyTaskType } from 'src/pages/inside-pages/home/types'

// @utils
import { Task } from 'src/entity/Task.entity'
import { tranformDescription } from 'src/utils/module'
import { TASK_CATEGORY } from 'src/utils/lang'
import useDailyTaskList from 'src/hook/useDailyTaskList'

interface CarouseTaskItemProps {
    transformDailyTask: TransformDailyTaskType
    index: number
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    listTaskIDsLoading?: string[]
    enableScroll?: boolean
    items: Task[]
    canExpired?: boolean
}

const CarouselTaskItem: React.FC<CarouseTaskItemProps> = ({
    items,
    enableScroll,
    onTick,
    onTaskPress,
    listTaskIDsLoading,
    canExpired = false,
}) => {
    const { dailyTaskTab } = useDailyTaskList()
    const [isSkipped, setSkipped] = useState(false)

    /**
     * Check if task is empty
     */
    const isEmptyTask = useMemo(() => isEmpty(items), [items])

    /**
     * Check if it task is skipped category
     */
    useEffect(() => {
        setSkipped(dailyTaskTab! == TASK_CATEGORY.SKIPPED)
    }, [dailyTaskTab])

    return (
        <ItemContainerListTask>
            {!isEmptyTask && (
                <Tasks
                    onTick={onTick}
                    data={items}
                    listTaskIDsLoading={listTaskIDsLoading}
                    onTaskPress={onTaskPress}
                    red={isSkipped}
                    style={{
                        height: '100%',
                    }}
                    scrollEnabled={enableScroll}
                    canExpired={canExpired}
                />
            )}
            {isEmptyTask && (
                <TaskKosongView
                    description={tranformDescription(dailyTaskTab!)}
                />
            )}
        </ItemContainerListTask>
    )
}

export default CarouselTaskItem
