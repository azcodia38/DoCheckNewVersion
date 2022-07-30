import React, { useMemo } from 'react'

import { Goals } from 'src/entity/Goals.entity'
import { orderBy, size } from 'lodash'

import { CreateGoalRequest, TaskCreateGoalRequest } from 'src/api/my-goal'
import ItemTask from 'components/item-task/ItemTask'
import { View } from 'react-native'

interface TaskListProps {
    goal: CreateGoalRequest
    onTaskTick: (task: TaskCreateGoalRequest, done: boolean) => void
    editTask: (task: TaskCreateGoalRequest) => void
}

export default function TaskList({
    goal,
    editTask,
    onTaskTick,
}: TaskListProps) {
    const goalSortMemo = useMemo(
        () => orderBy(goal.tasks, 'dueDate', 'asc'),
        [goal.tasks]
    )
    return (
        <>
            {size(goal.tasks) > 0 && (
                <View>
                    {goalSortMemo.map(
                        (item: TaskCreateGoalRequest, index: number) => (
                            <ItemTask
                                key={index}
                                canPress={false}
                                item={{
                                    title: item.title ?? '',
                                    notes: item.notes,
                                    dueDate: item.dueDate,
                                    audioUrl: item.audioUrl,
                                    audioDurationMs: item.audioDurationMs,
                                    type: item.type,
                                    repeatTask: item.repeatTask,
                                    recommendationUrl: item.recommendationUrl,
                                    taskAsignnes: [],
                                }}
                                onTick={(done: boolean) =>
                                    onTaskTick(item, done)
                                }
                                onPress={() => editTask(item)}
                            />
                        )
                    )}
                </View>
            )}
        </>
    )
}
