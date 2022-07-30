import React from 'react'
import { View } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'

import HeaderComponent from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import IntroDotIndicator from 'components/intro-dot-indicator/IntroDotIndicator'
import { theme } from 'src/utils/const'

interface HeaderProps {
    backAction: () => boolean
    navigation: NavigationContainerRef
    title: string
    activeIndex: number
    totalDots: number
}

export default function Header({
    activeIndex,
    backAction,
    navigation,
    title,
    totalDots,
}: HeaderProps) {
    return (
        <View>
            <WithPadding>
                <HeaderComponent
                    customBackAction={backAction}
                    navigation={navigation}
                    title={title}
                    withBack
                    greenArrow
                />
                <Space value={15} />
                <IntroDotIndicator
                    activeColor={theme.main_color}
                    inactiveColor={'#EFF0F0'}
                    style={{ justifyContent: 'flex-start' }}
                    dotSize={12}
                    gapSize={5}
                    totalDots={totalDots}
                    activeDot={activeIndex}
                    fillDotsMode
                />
                <Space value={20} />
            </WithPadding>
        </View>
    )
}
