import React from 'react'
import { StyleSheet, View } from 'react-native'
import { isEmpty } from 'lodash'

// @components
import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'

// @helpers
import { Task } from 'src/entity/Task.entity'
import { EMPTY_TASK } from 'src/utils/lang'

interface NotLoadingButEmptyProps {
    loading?: boolean
    tasks?: Task[]
}

export default function NotLoadingButEmpty({
    loading = false,
    tasks,
}: NotLoadingButEmptyProps) {
    return (
        <>
            {!loading && isEmpty(tasks) && (
                <View style={styles.wrapper}>
                    <TaskKosongView
                        title={EMPTY_TASK.DETAIL_TASK.TITLE}
                        description={EMPTY_TASK.DETAIL_TASK.DESCRIPTION}
                    />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 25,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
})
