/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { isEqual } from 'lodash'

// @component
import { GoalCardLoading } from 'components/loader-collections'
import Space from 'src/components/atoms/space'
import GoalList from 'components/goal-list/GoalList'
import { GoalKosongView } from 'src/pages/inside-pages/home/section/beranda/some-view'
import { LoadingContainer } from 'src/pages/inside-pages/goals/styled'

// @helpers
import { Goals } from 'src/entity/Goals.entity'
import { GoalListCompose } from 'src/utils/types'

interface ListGoalProp {
    showCheck: boolean
    goalListSize: number
    listGoal: Goals[]
    checkedIds: string[]
}

export default function ListGoal({
    goalListSize,
    showCheck,
    loading,
    listGoal,
    onLongPress,
    checkedIds,
    gotoGoal,
    onChangeCheckGoal,
}: ListGoalProp & GoalListCompose) {
    return (
        <>
            {loading && (
                <LoadingContainer>
                    <Space value={10} />
                    <GoalCardLoading />
                    <Space value={16} />
                </LoadingContainer>
            )}
            {!loading && isEqual(goalListSize, 0) && <GoalKosongView />}
            {!loading && !isEqual(goalListSize, 0) && (
                <GoalList
                    checkMode={showCheck}
                    checkIDs={checkedIds}
                    onContainerCheckChange={onChangeCheckGoal}
                    onGoalPress={gotoGoal}
                    onGoalLongPress={onLongPress}
                    style={{
                        flex: 1,
                    }}
                    data={listGoal}
                />
            )}
        </>
    )
}
