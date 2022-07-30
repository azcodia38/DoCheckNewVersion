import { useSelector } from 'react-redux'

import StoreData from 'store/types'

export default function useHomepage() {
    const isLoadingCardGoal: boolean = useSelector(
        ({ myGoals }: StoreData) => myGoals.loadingCardGoal
    )
    const recomendationGoals = useSelector(
        ({ myGoals }: StoreData) => myGoals.recommendationGoals.goals
    )
    const myTask = useSelector(({ task }: StoreData) => task.tasks)
    const myGoals = useSelector(({ myGoals }: StoreData) => myGoals.goals)
    const myGroupGoals = useSelector(
        ({ myGoals }: StoreData) => myGoals.groupGoals
    )
    const pinnedGoalGroup = useSelector(
        ({ myGoals }: StoreData) => myGoals.pinnedGoal
    )
    const isHideGoal = useSelector(({ myGoals }: StoreData) => myGoals.isHide)
    const activeTask = useSelector(({ task }: StoreData) => task.dailyTask)
    const myPinnedGoals = useSelector(
        ({ myPinnedGoals }: StoreData) => myPinnedGoals.goals
    )
    const personalAllTask = useSelector(
        ({ task }: StoreData) => task.personalTask
    )
    const groupAllTask = useSelector(({ task }: StoreData) => task.groupTask)

    return {
        isLoadingCardGoal,
        activeTask,
        myTask,
        myGoals,
        myGroupGoals,
        pinnedGoalGroup,
        isHideGoal,
        myPinnedGoals,
        personalAllTask,
        groupAllTask,
        recomendationGoals,
    }
}
