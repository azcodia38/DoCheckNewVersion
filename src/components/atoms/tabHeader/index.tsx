/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useContext, useMemo } from 'react'
import { View, ScrollView } from 'react-native'

import { theme } from 'src/utils/const'
import InlineCenterComponents from 'src/components/atoms/inlineCenter'
import { TabHeaderProps } from 'src/utils/types'
import MyGoalContext from 'src/context/myGoalContext'
import TemplateContext from 'src/context/TemplateContext'
import useDailyTaskList from 'src/hook/useDailyTaskList'

export default function TabHeader({
    setActive,
    tabs,
    type = 'dailyTaskTab',
}: Omit<TabHeaderProps, 'active'> & {
    type?: 'tabType' | 'dailyTaskTab' | 'templateType'
}) {
    const { dailyTaskTab } = useDailyTaskList()
    const { goalsTab } = useContext(MyGoalContext)
    const { recommendationTab } = useContext(TemplateContext)

    const isActive = useMemo(() => {
        if (type == 'dailyTaskTab') return dailyTaskTab!
        if (type == 'tabType') return goalsTab!
        if (type == 'templateType') return recommendationTab!
        return 'empty'
    }, [type, dailyTaskTab, goalsTab, recommendationTab])

    const isSmallWidth = useMemo(() => tabs.length <= 4, [tabs])

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ width: '90%', marginLeft: '5%' }}
        >
            <View style={{ width: theme.left_right_padding }} />
            <InlineCenterComponents
                tabs={tabs}
                active={isActive}
                setActive={setActive}
                isSmallWidth={isSmallWidth}
            />
            <View style={{ width: theme.left_right_padding * 2 }} />
        </ScrollView>
    )
}
