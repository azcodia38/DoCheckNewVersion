/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import GoalCard from 'components/goalCard'
import WithPadding from 'src/components/atoms/withPadding'
import { Goals } from 'src/entity/Goals.entity'
import { isFunction } from 'lodash'

interface ListItemProps {
    goal: Goals
    onContainerCheckChange?: (goal: Goals, check: boolean) => void
    onGoalPress?: (goal: Goals) => void
    onGoalLongPress?: (goal: Goals) => void
    checkMode?: boolean
    pinned_goal_ids: string[]
    checkIDs: string[]
}

export default function ListItem({
    onContainerCheckChange,
    goal,
    checkMode,
    onGoalLongPress,
    onGoalPress,
    pinned_goal_ids,
    checkIDs,
}: ListItemProps) {
    return (
        <WithPadding style={{ height: 170, marginBottom: 5 }}>
            <GoalCard
                onContainerCheckChange={(check: boolean) =>
                    onContainerCheckChange &&
                    onContainerCheckChange(goal, check)
                }
                containerCheck={checkIDs.includes(goal.id)}
                checkMode={checkMode}
                touchStyle={{ paddingBottom: 10, paddingTop: 10 }}
                data={goal}
                onPress={() => onGoalPress && onGoalPress(goal)}
                onLongPress={() =>
                    isFunction(onGoalLongPress) && onGoalLongPress(goal)
                }
                active={false}
                pinned={pinned_goal_ids.includes(goal.id)}
            />
        </WithPadding>
    )
}
