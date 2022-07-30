/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import moment from 'moment-timezone'

import { CreateGoalRequest, TaskCreateGoalRequest } from 'src/api/my-goal'

const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss'

const goalDataSendingTransform = (goal: CreateGoalRequest) => ({
    ...goal,
    tasks:
        goal?.tasks.map((task: TaskCreateGoalRequest) => {
            if (!task.dueDate) {
                delete (task as any).dueDate
            } else {
                if (task.dueDate instanceof Date) {
                    const tempDate = task.dueDate
                    task.dueDate = moment(tempDate)
                        .tz('Asia/Jakarta')
                        .format(FORMAT_DATE)
                }

                if (!moment(task.dueDate, FORMAT_DATE, true).isValid()) {
                    const tempDate = task.dueDate
                    task.dueDate = moment(tempDate)
                        .tz('Asia/Jakarta')
                        .format(FORMAT_DATE)
                }
            }
            return task
        }) ?? [],
})

export default goalDataSendingTransform
