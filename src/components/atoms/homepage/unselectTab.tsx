import React, { useMemo } from 'react'

// @components
import { TabSwitchItem } from 'components/tab-switch-header/styled'
import Tipografi from 'src/components/atoms/tipografi'

// @helpers
import { EMPTY_SPACES } from 'src/utils/types/componentsTypes'

interface UnselectTabProps {
    index: number
}

export default function UnselectTab({ index }: UnselectTabProps) {
    const styleTabSwitch = useMemo(() => ({ opacity: index === 1 ? 0 : 1 }), [index])
    return (
        <TabSwitchItem style={styleTabSwitch}>
            <Tipografi type={'normal-bigger'} style={{ color: 'white' }} center>
                {EMPTY_SPACES}
            </Tipografi>
        </TabSwitchItem>
    )
}
