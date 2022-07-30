import {
    DailyTaskType,
    TransformDailyTaskType,
} from 'src/pages/inside-pages/home/types'
import { useCallback } from 'react'
import { TASK_CATEGORY } from 'src/utils/lang'

export default function useMappingDailyTask() {
    const transformDailyTask = useCallback<TransformDailyTaskType>(
        (index: number) => {
            switch (index) {
                case 0:
                    return TASK_CATEGORY.TODAY
                case 1:
                    return TASK_CATEGORY.TOMORROW
                case 2:
                    return TASK_CATEGORY.WEEK
                case 3:
                    return TASK_CATEGORY.NEXT_WEEK
                case 4:
                    return TASK_CATEGORY.SKIPPED
                default:
                    return TASK_CATEGORY.TODAY
            }
        },
        [TASK_CATEGORY]
    )

    const mapIndexingDailyTask = useCallback<(type: DailyTaskType) => number>(
        (type: DailyTaskType) => {
            switch (type) {
                case TASK_CATEGORY.TODAY:
                    return 0
                case TASK_CATEGORY.TOMORROW:
                    return 1
                case TASK_CATEGORY.WEEK:
                    return 2
                case TASK_CATEGORY.NEXT_WEEK:
                    return 3
                case TASK_CATEGORY.SKIPPED:
                    return 4
                default:
                    return 0
            }
        },
        [TASK_CATEGORY]
    )

    return {
        mapIndexingDailyTask,
        transformDailyTask,
    }
}
