import React from 'react'
import { isEmpty } from 'lodash'

import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'
import { Goals } from 'src/entity/Goals.entity'
import { TEMPLATE_GOALS } from 'src/utils/lang'

interface GoalRecommendationListWrapper {
    loading: boolean
    isRelevancy: boolean
    goals: Goals[]
}

export default function EmptyTaskRecommendationWrapper({
    goals,
    isRelevancy,
    loading,
}: GoalRecommendationListWrapper) {
    return (
        <>
            {!loading && isEmpty(goals) && !isRelevancy && (
                <TaskKosongView
                    title={TEMPLATE_GOALS.ERROR_MESSAGE.TITLE}
                    description={TEMPLATE_GOALS.ERROR_MESSAGE.DESCRIPTION}
                    verticalPoint={60}
                />
            )}
            {isRelevancy && (
                <TaskKosongView
                    title={TEMPLATE_GOALS.ERROR_MESSAGE.TITLE}
                    description={
                        TEMPLATE_GOALS.ERROR_MESSAGE.DESCRIPTION_RELEVANCY
                    }
                    verticalPoint={60}
                />
            )}
        </>
    )
}
