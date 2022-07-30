import { first } from '@luvies/lazy/dist/aggregates'
import { size } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSyncOfflineMode } from 'src/store/actions'
import StoreData, { OfflineModeState } from 'store/types'

export default function useSync() {
    const dispatch = useDispatch()
    const offlineRequestList = useSelector(
        ({ offlineMode }: StoreData) =>
            offlineMode.onOfflineTemporaryGoalStorage
    )
    const connected = useSelector(
        ({ connection }: StoreData) => connection.connected
    )

    const [onLoading, setOnLoading] = useState(false)
    const [offlineRequestLeft, setOfflineRequestLeft] = useState(0)

    const onSyncData = useCallback(() => {
        if (!onLoading) setOnLoading(true)
        const firstOfflineRequest: OfflineModeState = first(offlineRequestList)
        // sendAPI
        if (firstOfflineRequest)
            dispatch(initializeSyncOfflineMode(firstOfflineRequest))
    }, [offlineRequestList, initializeSyncOfflineMode, setOnLoading])

    useEffect(() => {
        if (size(offlineRequestList) != 0 && connected) {
            onSyncData()
            setOfflineRequestLeft(size(offlineRequestList))
        } else setOnLoading(false)
    }, [offlineRequestList, connected])

    // useEffect(
    //     () => console.log('offlineRequestList', offlineRequestList),
    //     [offlineRequestList]
    // )

    return {
        onLoading,
        offlineRequestLeft,
    }
}
