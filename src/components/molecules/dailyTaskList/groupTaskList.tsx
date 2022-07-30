import ItemTask from 'components/item-task/ItemTask'
import WithPadding from 'src/components/atoms/withPadding'
import { Task } from 'src/entity/Task.entity'
import React from 'react'

type GrupTaskRenderType = 'item' | 'title' | 'loading' | 'empty-data'

interface GroupTaskListProps {
    type: GrupTaskRenderType
    title?: string
    data?: Task
    red?: boolean
    onTaskPress?(task: Task): void
    onTaskLongPress?(task: Task): void
    onTick?(task: Task, done: boolean): void
    loadingTick?: boolean
    containerCheck?: boolean
    onContainerCheckChange?(check: boolean): void
    checkMode?: boolean
}

export default function GroupTaskList({
    checkMode,
    containerCheck,
    data,
    loadingTick,
    onContainerCheckChange,
    onTaskLongPress,
    onTaskPress,
    onTick,
    red,
}: GroupTaskListProps) {
    return (
        <ItemTask
            onContainerCheckChange={onContainerCheckChange}
            containerCheck={containerCheck}
            checkMode={checkMode}
            loadingTick={loadingTick}
            onTick={(done) => onTick && onTick(data!, done)}
            onPress={() => onTaskPress && onTaskPress(data!)}
            onLongPress={() => onTaskLongPress && onTaskLongPress(data!)}
            item={data!}
            red={red}
        />
    )
}
