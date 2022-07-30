/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'

import { Task } from 'src/entity/Task.entity'
import useDailyTaskList from 'src/hook/useDailyTaskList'

import CheckItemContainer from 'components/check-item-container/CheckItemContainer'
import TickSquare from 'src/components/atoms/checkbox/tickSquare'
import { InputBoxState } from 'components/form/input-box/InputBox'
import WithPadding from 'src/components/atoms/withPadding'

export interface ItemTaskProps {
    item: Task
    red?: boolean
    pinned?: boolean
    onTick?(done: boolean): void
    onPress?(): void
    onLongPress?(): void
    loadingTick?: boolean
    containerCheck?: boolean
    onContainerCheckChange?(check: boolean): void
    checkMode?: boolean
    canPress?: boolean
    canExpired?: boolean
}

export default function ItemTask({
    item,
    checkMode,
    containerCheck,
    loadingTick,
    onContainerCheckChange,
    onLongPress,
    onPress,
    onTick,
    pinned,
    red,
    canPress = true,
    canExpired = false,
}: ItemTaskProps) {
    const { dailyTaskTab } = useDailyTaskList()
    const [inputStatus, setInputStatus] =
        useState<InputBoxState>('special-task')

    const hasDone = useMemo(() => !isEmpty(item.completeBy), [item.completeBy])

    useEffect(() => {
        if (canExpired && dailyTaskTab == 'terlewat')
            setInputStatus(
                hasDone ? 'special-late-task-done' : 'special-late-task'
            )
        else setInputStatus(hasDone ? 'special-task-done' : 'special-task')
    }, [hasDone, dailyTaskTab])

    return (
        <WithPadding key={item.id}>
            <CheckItemContainer
                containerCheck={containerCheck}
                onContainerCheckChange={onContainerCheckChange}
                checkMode={checkMode}
            >
                <TickSquare
                    canPress={canPress}
                    hasDone={hasDone}
                    inputStatus={inputStatus}
                    loadingTick={loadingTick}
                    onLongPress={onLongPress}
                    onPress={onPress}
                    onTick={onTick}
                    pinned={pinned}
                    red={red}
                    task={item}
                />
            </CheckItemContainer>
        </WithPadding>
    )
}

export const MemoizedItemTask = React.memo(
    ItemTask,
    (prev_props: ItemTaskProps, next_props: ItemTaskProps) => {
        return (
            prev_props.item.completeBy === next_props.item.completeBy &&
            prev_props.red === next_props.red &&
            prev_props.pinned === next_props.pinned
        )
    }
)
