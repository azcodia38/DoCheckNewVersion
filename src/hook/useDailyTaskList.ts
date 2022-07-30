import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DailyTaskType } from 'src/pages/inside-pages/home/types'
import { onSetDailyTaskList } from 'src/store/actions'
import StoreData from 'store/types'

export default function useDailyTaskList() {
    const dispatch = useDispatch()

    const dailyTaskTab = useSelector(
        ({ task: { dailyTaskTab } }: StoreData) => dailyTaskTab
    )

    const setDailyTaskTab = useCallback(
        (status: DailyTaskType) => dispatch(onSetDailyTaskList(status)),
        [onSetDailyTaskList]
    )

    return { dailyTaskTab, setDailyTaskTab }
}
