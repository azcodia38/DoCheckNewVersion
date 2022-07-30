import * as Type from 'src/store/types'
import { DefaultPinnedGoalsData } from 'store/types'
import { DetailGoalType, ReducerAction } from 'src/utils/types'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import { omit } from 'lodash'
import { Goals } from 'src/entity/Goals.entity'
import { Lazy } from '@luvies/lazy'

const defaultState: DefaultPinnedGoalsData = {
    goals: [],
}

export default function PinnedGoalsReducer(
    state = defaultState,
    action: ReducerAction<any>
): DefaultPinnedGoalsData {
    switch (action.type) {
        case Type.Goal.FETCHING_PINNED_GOAL:
            return {
                ...state,
                goals: action.payload,
            }

        case Type.Goal.GET_PINNED_GOAL:
            return state

        case Type.Goal.SET_SYNC_PINNED_GOAL: {
            const localPayload = action.payload as DetailGoalType
            return {
                ...state,
                goals: [
                    ...state.goals,
                    {
                        id: action.payload.id,
                        goal: omit<Goals>(localPayload, [
                            'owner',
                            'isPinned',
                            'goalMembers',
                            'category',
                        ]) as Goals,
                    },
                ],
            }
        }

        case Type.Goal.SET_SYNC_UNPINNED_GOAL: {
            const localPayload = action.payload as DetailGoalType
            return {
                ...state,
                goals: Lazy.from(state.goals)
                    .where((goal) => goal.id != localPayload.id)
                    .toArray(),
            }
        }
        
        case Type.Goal.SET_PINNED_GOAL:
            const setPinnedGoal = action.payload as PinnedGoals[]
            return {
                ...state,
                goals: setPinnedGoal,
            }

        case Type.Goal.DEFAULT_PINNED_GOAL_STATE:
            return defaultState
        default:
            return state
    }
}
