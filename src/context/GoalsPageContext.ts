import { createContext } from 'react'

import { GoalsPageParams } from 'src/pages/inside-pages/goals/params'
import { TypingTimeout } from 'src/utils'

interface DefaultContext {
    continueToDelete: boolean
    typingTimeout: TypingTimeout
    params: GoalsPageParams
    auth: string
}

const defaultContext: DefaultContext = {
    continueToDelete: false,
    typingTimeout: {
        is_typing: false,
        timeout: undefined,
    },
    params: {
        jenis: 'saya',
    },
    auth: '',
}

const GoalsPageContext = createContext(defaultContext)

export default GoalsPageContext
