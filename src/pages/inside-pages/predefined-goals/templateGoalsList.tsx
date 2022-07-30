import React from 'react'
import { isFunction } from 'lodash'

import GoalRecommendationCard from 'components/goal-recommendation-card/GoalRecommendationCard'
import GoalAdsCard from 'src/components/molecules/goalsAdsCard'
import WithPadding from 'src/components/atoms/withPadding'
import { Goals, PromotionGoals } from 'src/entity/Goals.entity'

type GoalsCombine = Goals & PromotionGoals

interface TemplateGoalsListProps {
    data: GoalsCombine
    customImage: boolean
    onGoalPress?: (goal: Goals) => void
    isPromoted?: boolean
    isGoalBackground?: boolean
}

export default function TemplateGoalsList({
    data,
    onGoalPress,
    customImage,
    isPromoted = false,
    isGoalBackground,
}: TemplateGoalsListProps) {
    return (
        <WithPadding>
            {isPromoted && (
                <GoalAdsCard
                    data={data}
                    onPress={() => isFunction(onGoalPress) && onGoalPress(data)}
                    customImage={customImage}
                />
            )}
            {!isPromoted && (
                <GoalRecommendationCard
                    useGoalBackground={isGoalBackground}
                    data={data}
                    onPress={() => isFunction(onGoalPress) && onGoalPress(data)}
                    customImage={customImage}
                />
            )}
        </WithPadding>
    )
}
