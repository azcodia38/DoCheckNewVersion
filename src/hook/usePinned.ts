import { isEmpty } from 'lodash'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import StoreData from 'store/types'

export default function usePinned() {
    const myPinnedGoals = useSelector(
        ({ myPinnedGoals }: StoreData) => myPinnedGoals.goals
    )

    const isPinned = useCallback(
        (goalId: string) =>
            !isEmpty(
                myPinnedGoals.filter(
                    (pinnedGoals) => pinnedGoals.goal.id == goalId
                )
            ),
        [myPinnedGoals]
    )

    return { isPinned }
}
