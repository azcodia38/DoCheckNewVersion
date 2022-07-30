import moment from 'moment'

import { TaskRequest } from 'src/api/my-goal'
import { omit } from 'lodash'

const taskDataSendingTransform = (task: TaskRequest) => {
    if (!task.dueDate) return omit(task, 'dueDate')

    if (task.dueDate instanceof Date)
        return {
            ...task,
            dueDate: moment(task.dueDate).format('DD/MM/YYYY HH:mm:ss'),
        }

    return task
}

export default taskDataSendingTransform
