import React from 'react'

import { PredefinedGoalCardLoading } from 'components/loader-collections'

interface LoadingRecommendationWrapperProps {
    isRelevancy: boolean
    loading: boolean
}

export default function LoadingRecommendationWrapper({
    isRelevancy,
    loading,
}: LoadingRecommendationWrapperProps) {
    return <>{!isRelevancy && loading && <PredefinedGoalCardLoading />}</>
}
