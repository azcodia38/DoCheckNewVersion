import React from 'react'
import { isEmpty } from 'lodash'

import ItemTask from 'components/item-task/ItemTask'
import WithPadding from 'src/components/atoms/withPadding'
import { Task } from 'src/entity/Task.entity'

interface TaskListProps {
    loading: boolean
    tasks: Task[]
    pinnedTaskMapID: string[]
    isLoadingID: string[]
    onTick: (done: boolean, item: Task) => void
    gotoTask: (item: Task) => void
}

export default function TaskList({
    isLoadingID,
    loading,
    onTick,
    pinnedTaskMapID,
    tasks,
    gotoTask,
}: TaskListProps) {
    return (
        <>
            {!loading && !isEmpty(tasks) && (
                <>
                    {tasks.map((item: Task, index: number) => (
                        <ItemTask
                            item={item}
                            loadingTick={isLoadingID.includes(item.id ?? '')}
                            onTick={(done) => onTick(done, item)}
                            onPress={() => gotoTask(item)}
                            pinned={pinnedTaskMapID.includes(item.id ?? '')}
                        />
                    ))}
                </>
            )}
        </>
    )
}
