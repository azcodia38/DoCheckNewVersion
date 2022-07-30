/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { Task } from 'src/entity/Task.entity'
import { StyleProp, ViewStyle } from 'react-native'
import { NavProps } from 'src/utils/const'

export interface HomePageProps extends NavProps {}
export interface BerandaSectionProps extends NavProps {}
export interface TabSwitchHeaderProps {
    active: TabSwitchHeaderType | string
    setActive(active: TabSwitchHeaderType): void
}

export type TabSwitchHeaderType = 'saya' | 'grup'

export type DailyTaskType =
    | 'terlewat'
    | 'hari-ini'
    | 'besok'
    | 'minggu-ini'
    | 'minggu-depan'

export interface TaskKosongViewProps {
    deskripsi: string
}

export type TransformDailyTaskType = (index: number) => DailyTaskType
export interface DoneNotDoneTaskList {
    done: Task[]
    not_done: Task[]
}

export interface CarouselGrupDailyTaskProps {
    activeTab: DailyTaskType
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    onActiveTabChange?(tab: DailyTaskType): void
    listTaskIDsLoading?: string[]
    listTasks: DoneNotDoneTaskList[]
    style?: StyleProp<ViewStyle>

    onTaskPress?(task: Task): void
    onTaskLongPress?(task: Task): void
    onTick?(task: Task, done: boolean): void
    loading?: boolean
    height?: number
    checkIDs: string[]
    onContainerCheckChange?(task: Task, check: boolean): void
    checkMode?: boolean
}

export type RenderingTaskItem<T> = { item: T; index: number }
