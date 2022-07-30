/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { InlineCenter } from 'src/pages/inside-pages/home/section/beranda/styled'
import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import Tipografi from 'src/components/atoms/tipografi'
import { CircleTabIndicator } from 'src/components/atoms/tabHeader/styled'

// @utils
import { TabHeaderProps } from 'src/utils/types'
import { theme } from 'src/utils/const'
import { TASK_CATEGORY } from 'src/utils/lang'
import useDailyTaskList from 'src/hook/useDailyTaskList'
import TouchableWithoutFeedback from '../touchableWithoutFeedback'

interface InlineCenterComponentsProps {
    isSmallWidth?: boolean
}

export default function InlineCenterComponents({
    active,
    setActive,
    tabs,
    isSmallWidth = false,
}: InlineCenterComponentsProps & TabHeaderProps) {
    const { dailyTaskTab } = useDailyTaskList()

    const tipografiStyles = useMemo(
        () => (isSmallWidth ? styles.withIsSmall : styles.withoutIsSmall),
        [isSmallWidth]
    )

    const isSkipped = useMemo(
        () => dailyTaskTab == TASK_CATEGORY.SKIPPED,
        [dailyTaskTab, TASK_CATEGORY]
    )

    const titleStyle = useCallback(
        (value: string) => {
            let color = '#7E8396'
            if (active === value) {
                if (isSkipped == true) color = theme.redColor
                if (!isSkipped) color = theme.main_color
            }
            return {
                color,
                ...tipografiStyles,
            }
        },
        [tipografiStyles, theme, isSkipped, active]
    )

    const circleBackground = useMemo(
        () => (isSkipped ? theme.redColor : theme.main_color),
        [isSkipped]
    )

    const isCircleEnabled = useCallback(
        (value: string) => ({
            opacity: active === value ? 1 : 0,
        }),
        [active]
    )

    return (
        <InlineCenter
            style={{
                justifyContent: 'space-around',
                [isSmallWidth ? 'minWidth' : '']: '100%',
            }}
        >
            {tabs.map((option: RadioOption<string>, i: number) => (
                <TouchableWithoutFeedback
                    key={i}
                    onPress={() => setActive(option.value)}
                >
                    <CenterContainer>
                        <Tipografi
                            type={'small'}
                            style={titleStyle(option.value)}
                        >
                            {option.label}
                        </Tipografi>
                        <CircleTabIndicator
                            style={{
                                ...isCircleEnabled(option.value),
                                backgroundColor: circleBackground,
                            }}
                        />
                    </CenterContainer>
                </TouchableWithoutFeedback>
            ))}
        </InlineCenter>
    )
}

const styles = StyleSheet.create({
    withIsSmall: {},
    withoutIsSmall: {
        paddingLeft: 8,
        paddingRight: 8,
    },
})
