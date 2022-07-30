import { createContext } from 'react'
import { PredefinedGoalsTabType } from 'src/utils/types'

interface DefaultContext {
    recommendationTab: PredefinedGoalsTabType
    setRecommendationTab: (status: PredefinedGoalsTabType) => void
}

const defaultContext: DefaultContext = {
    recommendationTab: 'recommendation',
    setRecommendationTab: (status) => undefined,
}

const TemplateContext = createContext(defaultContext)

export default TemplateContext
