import { uniqueId } from 'lodash'
import React, { useCallback } from 'react'
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleProp,
    ViewStyle,
} from 'react-native'

import { Task } from 'src/entity/Task.entity'

import ItemTask from 'components/item-task/ItemTask'
import WithPadding from 'src/components/atoms/withPadding'

interface TasksProps {
    data: Task[]
    pinnedTaskIDs?: string[]
    red?: boolean
    onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
    scrollEnabled?: boolean
    onTick?(task: Task, done: boolean): void
    onTaskPress?(task: Task): void
    listTaskIDsLoading?: string[]
    style?: StyleProp<ViewStyle>
    canExpired?: boolean
}

interface TasksRenderItem {
    item: Task
    index: number
}

export default function Tasks({
    data,
    listTaskIDsLoading,
    onScroll,
    onTaskPress,
    onTick,
    pinnedTaskIDs,
    red,
    scrollEnabled,
    style,
    canExpired = false,
}: TasksProps) {
    const renderItem = useCallback<(args: TasksRenderItem) => JSX.Element>(
        ({ item, index }) => (
            <ItemTask
                item={item}
                loadingTick={(listTaskIDsLoading ?? []).includes(item.id ?? '')}
                key={index}
                onTick={(done) => (onTick ? onTick(item, done) : null)}
                onPress={() => (onTaskPress ? onTaskPress(item) : null)}
                red={canExpired && red}
                pinned={(pinnedTaskIDs ?? []).includes(item.id ?? '')}
                canExpired={canExpired}
            />
        ),
        [listTaskIDsLoading, onTick, onTaskPress, red, pinnedTaskIDs]
    )

    return (
        <FlatList
            style={style}
            removeClippedSubviews={true}
            onScroll={onScroll}
            scrollEnabled={scrollEnabled}
            initialNumToRender={20}
            data={data}
            renderItem={renderItem}
            keyExtractor={(c) => c.id ?? uniqueId()}
        />
    )
}
