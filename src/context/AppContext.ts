import { createContext } from 'react'

interface DefaultContext {
    version: string
    descriptionApp: string
    disableQuestionaires: boolean
}

const defaultContext: DefaultContext = {
    version: '1.5.0',
    descriptionApp: 'Social To-Do List',
    disableQuestionaires: true,
}

const AppContext = createContext(defaultContext)

export default AppContext
