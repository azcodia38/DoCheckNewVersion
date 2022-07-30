/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { memo, useEffect, useMemo } from 'react'

import { ItemContainerListTask } from 'components/carousel-grup-daily-task/styled'
import { Task } from 'src/entity/Task.entity'
import { DoneNotDoneTaskList } from 'src/pages/inside-pages/home/types'
import GrupTask from 'components/grup-task/GrupTask'

import useDailyTaskList from 'src/hook/useDailyTaskList'

interface ListRenderingTaskProps {
    listTaskIDsLoading?: string[]
    items: DoneNotDoneTaskList
    checkMode?: boolean
    loading?: boolean
    checkIDs: string[]
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    onTaskLongPress?(task: Task): void
    onContainerCheckChange?(task: Task, check: boolean): void
}

const ListRenderingTask: React.FC<ListRenderingTaskProps> = ({
    items,
    onTick,
    onTaskPress,
    listTaskIDsLoading,
    checkMode,
    loading,
    checkIDs,
    onContainerCheckChange,
    onTaskLongPress,
}) => {
    const { dailyTaskTab } = useDailyTaskList()
    const isSkipped = useMemo(() => dailyTaskTab == 'terlewat', [dailyTaskTab])

    return (
        <ItemContainerListTask>
            <GrupTask
                checkMode={checkMode}
                loading={loading}
                onTaskLongPress={onTaskLongPress}
                red={isSkipped}
                style={{
                    width: '100%',
                    flex: 1,
                }}
                onTick={onTick}
                onTaskPress={onTaskPress}
                checkIDs={checkIDs}
                listTaskIDsLoading={listTaskIDsLoading}
                onContainerCheckChange={onContainerCheckChange}
                dataDone={items.done}
                dataNotDone={items.not_done}
            />
            {/* {size(items.done) + size(items.not_done) === 0 && !loading && (
                 <TaskKosongView
                     description={tranformDescription(dailyTaskTab!)}
                 />
             )} */}
        </ItemContainerListTask>
    )
}

export default ListRenderingTask
