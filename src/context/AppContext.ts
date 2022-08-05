import { createContext } from 'react'

interface DefaultContext {
    version: string
    descriptionApp: string
    disableQuestionaires: boolean
}

const defaultContext: DefaultContext = {
    // version: '1.5.0',
    version: '1.5.1 New Version RN 0.69.3 (DEVELOPE)',
    descriptionApp: 'Social To-Do List',
    disableQuestionaires: true,
}

const AppContext = createContext(defaultContext)

export default AppContext
