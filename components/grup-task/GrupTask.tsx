import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'
import { toNumber, uniqueId } from 'lodash'
import React, { useMemo, useState } from 'react'
import { FlatList, StyleProp, View, ViewStyle } from 'react-native'
import { theme } from 'src/utils/const'
import { Task } from 'src/entity/Task.entity'
import ItemTask from '../item-task/ItemTask'
import { TaskListLoading } from '../loader-collections'
import Space from '../../src/components/atoms/space'
import Tipografi from '../../src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

interface GrupTaskProps {
    dataNotDone: Task[]
    dataDone: Task[]
    red?: boolean
    onTaskPress?(task: Task): void
    onTaskLongPress?(task: Task): void
    onTick?(task: Task, done: boolean): void
    loading?: boolean
    listTaskIDsLoading?: string[]
    style?: StyleProp<ViewStyle>

    checkIDs: string[]
    onContainerCheckChange?(task: Task, check: boolean): void
    checkMode?: boolean
}

const padding_size = theme.left_right_padding //Math.floor(theme.left_right_padding * 2 / 3);

type GrupTaskRenderType = 'item' | 'title' | 'loading' | 'empty-data'

interface CustomTaskItemProps {
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

function CustomTaskItem(props: CustomTaskItemProps) {
    if (props.type === 'loading') {
        return (
            <>
                <Space value={15} />
                <TaskListLoading />
                <Space value={4} />
            </>
        )
    }

    if (props.type === 'empty-data') {
        return (
            <>
                <Space value={100} />
                <TaskKosongView
                    description={
                        'Kamu belum buat task nih,\nYuk buat task keren pertamamu!'
                    }
                />
            </>
        )
    }

    if (props.title) {
        return (
            <WithPadding
                style={{
                    paddingLeft: padding_size,
                    paddingRight: padding_size,
                    marginTop: 12,
                    paddingBottom: 12,
                    marginLeft: props.checkMode ? 12 : 0,
                }}
            >
                <Tipografi type={'label'}>{props.title}</Tipografi>
            </WithPadding>
        )
    }

    return (
        <ItemTask
            onContainerCheckChange={props.onContainerCheckChange}
            containerCheck={props.containerCheck}
            checkMode={props.checkMode}
            loadingTick={props.loadingTick}
            onTick={(done) => props.onTick && props.onTick(props.data!, done)}
            onPress={() => props.onTaskPress && props.onTaskPress(props.data!)}
            onLongPress={() =>
                props.onTaskLongPress && props.onTaskLongPress(props.data!)
            }
            item={props.data!}
            red={props.red}
            canExpired
        />
    )
}

export default function GrupTask(props: GrupTaskProps) {
    function renderItem(x: { item: CustomTaskItemProps; index: number }) {
        return (
            <CustomTaskItem
                {...x.item}
                containerCheck={
                    x.item.type === 'item'
                        ? props.checkIDs.includes(x.item.data!.id ?? '')
                        : false
                }
                key={x.index}
                onContainerCheckChange={(check: boolean) =>
                    props.onContainerCheckChange &&
                    props.onContainerCheckChange(x.item.data!, check)
                }
                checkMode={props.checkMode}
                loadingTick={(props.listTaskIDsLoading ?? []).includes(
                    x.item.data?.id ?? ''
                )}
                onTick={props.onTick}
                onTaskPress={props.onTaskPress}
                onTaskLongPress={props.onTaskLongPress}
                red={props.red}
            />
        )
    }

    const grouped_items: CustomTaskItemProps[] = useMemo(
        () => [
            ...(!props.loading &&
            props.dataDone.length + props.dataNotDone.length === 0
                ? [
                      {
                          type: 'empty-data' as GrupTaskRenderType,
                      },
                  ]
                : []),
            ...(!props.loading && props.dataNotDone.length > 0
                ? [
                      {
                          type: 'title' as GrupTaskRenderType,
                          title: 'Proses',
                      },
                  ]
                : []),
            ...(props.loading
                ? [{ type: 'loading' as GrupTaskRenderType }]
                : props.dataNotDone.map((x) => ({
                      type: 'item' as GrupTaskRenderType,
                      data: x,
                  }))),
            ...(!props.loading && props.dataDone.length > 0
                ? [
                      {
                          type: 'title' as GrupTaskRenderType,
                          title: 'Selesai',
                      },
                  ]
                : []),
            ...(props.loading
                ? [{ type: 'loading' as GrupTaskRenderType }]
                : props.dataDone.map((x) => ({
                      type: 'item' as GrupTaskRenderType,
                      data: x,
                  }))),
            {
                type: 'title',
                title: ' ',
            },
        ],
        [props.loading, props.dataDone, props.dataNotDone]
    )

    return (
        <View style={props.style}>
            {grouped_items.map((item) =>
                renderItem({ index: toNumber(uniqueId()), item })
            )}
        </View>
    )
}
