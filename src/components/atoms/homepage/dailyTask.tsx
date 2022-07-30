/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

// @components
import DailyTaskList from 'components/daily-task/DailyTask'
import Space from 'src/components/atoms/space'

// @helper
import { Task } from 'src/entity/Task.entity'
import { DailyTaskType } from 'src/pages/inside-pages/home/types'

interface DailyTaskProps {
    title: string
    isEmpty: boolean
    isLoadingGoal: boolean
    isLoadingTask: boolean
    tasks: Task[][]
    listTaskIDsLoading: string[]
    onTaskPress: (task: Task) => void
    setActive: (active: DailyTaskType) => void
    onTick: (task: Task, done: boolean) => void
    onLainnya?: () => void
    spaceValue?: {
        top: number
        bottom: number
    }
    canExpired?: boolean
}

export default function DailyTask({
    title,
    isEmpty = false,
    isLoadingGoal,
    isLoadingTask,
    listTaskIDsLoading,
    onTaskPress,
    onTick,
    setActive,
    tasks,
    onLainnya,
    spaceValue = { bottom: 15, top: 10 },
    canExpired = false,
}: DailyTaskProps) {
    return (
        <>
            {(isEmpty || isLoadingGoal) && (
                <>
                    <Space value={spaceValue.top} />
                    <DailyTaskList
                        title={title}
                        loading={isLoadingTask}
                        data={tasks}
                        listTaskIDsLoading={listTaskIDsLoading}
                        onTaskPress={onTaskPress}
                        setActive={setActive}
                        onTick={onTick}
                        onLainnya={onLainnya}
                        canExpired={canExpired}
                    />
                    <Space value={spaceValue.bottom} />
                </>
            )}
        </>
    )
}
