import GoalRecommendationList from 'components/goal-recommendation-list/GoalRecommendationList'
import { Goals } from 'src/entity/Goals.entity'
import { isEmpty } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { PredefinedGoalsTabType } from 'src/utils/types'

interface GoalRecommendationListWrapper {
    loading: boolean
    isRelevancy: boolean
    goals: Goals[]
    activeTab: PredefinedGoalsTabType
    gotoPredefinedGoal: (goal: Goals) => void
}

export default function GoalRecommendationListWrapper({
    loading,
    isRelevancy,
    goals,
    activeTab,
    gotoPredefinedGoal,
}: GoalRecommendationListWrapper) {
    return (
        <>
            {!loading && !isEmpty(goals) && !isRelevancy && (
                <GoalRecommendationList
                    useGoalBackground={activeTab !== 'recommendation'}
                    onGoalPress={gotoPredefinedGoal}
                    style={styles.goalRecommendationList}
                    data={goals}
                    customImage={true}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    goalRecommendationList: {
        flex: 1,
    },
})
