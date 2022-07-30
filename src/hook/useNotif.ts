/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { useCallback, useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import moment from 'moment-timezone'

// @helpers
import GlobalContext from 'src/context/GlobalContext'
import { isDueDateExpired, notificationGetUsername } from 'src/utils'
import StoreData from 'store/types'
import { Task } from 'src/entity/Task.entity'
import { TaskCreateGoalRequest } from 'src/api/my-goal'
import { onCheckHandler, onSetNotificationTask } from 'src/store/actions'

export default function useNotif(auth?: string) {
    const dispatch = useDispatch()
    const { notifService } = useContext(GlobalContext)

    const myTask = useSelector(({ task }: StoreData) => task.tasks)
    const connected = useSelector((con: StoreData) => con.connection.connected)
    const user = useSelector((user: StoreData) => user.user_login_data.user)
    const notifTask = useSelector(
        ({ task }: StoreData) => task.notificationTask
    )

    const durationNotifBeforeShow = useMemo(() => 2 * 1000, []) // 2 seconds
    const notif = useMemo(() => notifService!, [notifService])

    const cancelNotificationTask = useCallback(
        (tasks?: Task[]) => {
            if (tasks)
                for (const { id: taskId } of tasks)
                    if (taskId) notif.cancelNotification(taskId)
        },
        [notif]
    )
    const cancelNotification = useCallback(
        (taskId: string) => notif.cancelNotification(taskId),
        [notif]
    )

    const scheduleNotif = useCallback(
        (taskId: string, dueDate: string | Date, title: string) =>
            notif.scheduleNotif(
                notificationGetUsername(user.fullname),
                taskId!,
                new Date(new Date(dueDate).getTime() + durationNotifBeforeShow),
                title,
                moment(dueDate).tz('Asia/Jakarta').format('HH:mm')
            ),
        [
            moment,
            notif.scheduleNotif,
            durationNotifBeforeShow,
            user.fullname,
            notificationGetUsername,
        ]
    )

    const updateNotificationTask = useCallback(
        (tasks?: Task[] | TaskCreateGoalRequest[]) => {
            if (tasks)
                for (const { id: taskId, dueDate, title } of tasks)
                    if (taskId && title)
                        notif.updateNotification(taskId, () =>
                            scheduleNotif(taskId!, dueDate, title!)
                        )
        },
        [scheduleNotif]
    )

    const updateNotification = useCallback((taskId: string) => {}, [])
    const deleteNotification = useCallback(
        (taskId: string) => {
            if (taskId) notif.cancelNotification(taskId)
        },
        [notif]
    )

    useEffect(() => {
        if (myTask) {
            const TASK_NOW = 0
            if (!isEmpty(myTask[TASK_NOW]))
                dispatch(onSetNotificationTask(myTask[TASK_NOW]))
        }
    }, [myTask])

    useEffect(() => {
        if (notifTask && user) {
            if (!isEmpty(notifTask)) {
                for (const singleActiveTask of notifTask) {
                    if (
                        singleActiveTask.dueDate &&
                        !singleActiveTask.completeBy &&
                        !singleActiveTask.hasRing
                    )
                        if (!isDueDateExpired(singleActiveTask.dueDate))
                            scheduleNotif(
                                singleActiveTask.id!,
                                singleActiveTask.dueDate,
                                singleActiveTask.title
                            )
                }
                notif.cleanCompleteBy(notifTask)
                notif.cleanLocalNotification()
                notif.getTask()
                // notif.cancelAll()
            }
        }
    }, [notifTask, user])

    // handling onYesNotification
    useEffect(() => {
        if (notif.havingYesAction() && auth) {
            const { goalId, taskId } = notif.yesAction('', '')
            dispatch(
                onCheckHandler({
                    token: auth,
                    goalId,
                    taskId,
                    isConnected: connected,
                    user,
                })
            )
        }
    }, [notif])

    return {
        cancelNotificationTask,
        updateNotificationTask,
        cancelNotification,
        updateNotification,
        deleteNotification,
    }
}
