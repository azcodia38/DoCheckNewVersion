/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useState } from 'react'

// @components
import { DailyTaskType } from 'src/pages/inside-pages/home/types'
import HeaderTitle from 'src/components/atoms/HeaderTitle'
import { DAILY_TASK_PROPERTY } from 'src/utils/types/componentsTypes'
import { Task } from 'src/entity/Task.entity'
import CarouselDailyTask from 'src/components/atoms/carouselDailyTask'
import { TaskListLoading } from 'components/loader-collections'
import Space from 'src/components/atoms/space'
import TabHeader from 'src/components/atoms/tabHeader'

import { DailyTaskContainer } from './styled'

interface DailyTaskProps {
    data: Task[][]
    setActive(active: DailyTaskType): void
    title: string
    loading: boolean
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    listTaskIDsLoading?: string[]
    onLainnya?(): void
    canExpired?: boolean
}

const DailyTask: React.FC<DailyTaskProps> = ({
    data,
    loading,
    title,
    setActive,
    listTaskIDsLoading,
    onLainnya,
    onTaskPress,
    onTick,
    canExpired = false,
}) => {
    const [disableSnap, setDisableSnap] = useState<boolean>(false)

    const headerActiveHandler = useCallback(
        (active: DailyTaskType) => {
            setActive(active)
            setDisableSnap(false)
        },
        [setActive]
    )
    const dailyTaskActiveHandler = useCallback(
        (active: DailyTaskType) => {
            setActive(active)
            setDisableSnap(true)
        },
        [setActive]
    )

    return (
        <DailyTaskContainer>
            <HeaderTitle title={title} isHide={false} onPress={onLainnya} />
            <Space value={10} />
            <TabHeader
                setActive={headerActiveHandler}
                tabs={DAILY_TASK_PROPERTY}
            />
            <Space value={10} />
            {loading && <TaskListLoading />}
            {!loading && (
                <CarouselDailyTask
                    onSnap={disableSnap}
                    onActiveTabChange={dailyTaskActiveHandler}
                    onTick={onTick}
                    listListTasks={data}
                    listTaskIDsLoading={listTaskIDsLoading}
                    onTaskPress={onTaskPress}
                    enableScroll={false}
                    canExpired={canExpired}
                    withDynamicHeight={true}
                />
            )}
        </DailyTaskContainer>
    )
}

export default DailyTask
