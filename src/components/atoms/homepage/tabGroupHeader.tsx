/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

// @components
import Space from 'src/components/atoms/space'
import TabSwitchHeader from 'components/tab-switch-header/TabSwitchHeader'

// @helpers
import { TabSwitchHeaderType } from 'src/pages/inside-pages/home/types'

interface TabGroupHeaderProps {
    active: TabSwitchHeaderType
    setActive: (active: TabSwitchHeaderType) => void
    spaceValue?: {
        top: number
        bottom: number
    }
}

export default function TabGroupHeader({
    active,
    setActive,
    spaceValue = {
        bottom: 12,
        top: 25,
    },
}: TabGroupHeaderProps) {
    return (
        <>
            <Space value={spaceValue.top} />
            <TabSwitchHeader active={active} setActive={setActive} />
            <Space value={spaceValue.bottom} />
        </>
    )
}
