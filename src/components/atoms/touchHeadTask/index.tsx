/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { StyleSheet } from 'react-native'

// @components
import Space from 'src/components/atoms/space'
import Tipografi, { TipografiType } from 'src/components/atoms/tipografi'

// @hook
import useUtils from 'src/hook/useUtils'

// @styled
import { TouchHeadContainer, TouchStick } from 'src/pages/inside-pages/goal/styled'

interface TouchHeadTaskProps {
    title?: string
    fontType?: TipografiType
    spaceValue?: number
}

export default function TouchHeadTask({
    title = 'Task',
    fontType = 'title-medium',
    spaceValue = 20,
}: TouchHeadTaskProps) {
    const { TouchHeadHeight } = useUtils()
    return (
        <TouchHeadContainer style={{ height: TouchHeadHeight }}>
            {/* <TouchStick /> */}
            <Space value={spaceValue} />
            <Tipografi type={fontType} style={styles.tipografi}>
                {title}
            </Tipografi>
        </TouchHeadContainer>
    )
}

const styles = StyleSheet.create({
    tipografi: {
        alignSelf: 'flex-start',
        color: '#000',
        paddingLeft: 4,
        paddingRight: 4,
    },
})
