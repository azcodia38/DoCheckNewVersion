import { createContext } from 'react'
import { GoalsTabType } from 'src/utils/types'

interface DefaultContext {
    goalsTab: GoalsTabType
    setGoalsTab: (status: GoalsTabType) => void
}

const defaultContext: DefaultContext = {
    goalsTab: 'proses',
    setGoalsTab: (status) => undefined,
}

const MyGoalContext = createContext(defaultContext)

export default MyGoalContext
