import React from 'react'

import Header from 'components/header/Header'
import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import { ThreeDotsIcon } from 'components/icons/Icons'
import { NavigationContainerRef } from '@react-navigation/native'

interface HeaderTaskProps {
    enabledActionMenu: boolean
    setShowMenu: (status: boolean) => void
    navigation: NavigationContainerRef
    backAction: () => void
}

export default function HeaderTask({
    enabledActionMenu,
    navigation,
    setShowMenu,
    backAction,
}: HeaderTaskProps) {
    return (
        <Header
            titleDetail={'Daily Task'}
            navigation={navigation}
            rightSectionView={
                enabledActionMenu && (
                    <CenterContainer>
                        <ThreeDotsIcon onPress={() => setShowMenu(true)} />
                    </CenterContainer>
                )
            }
            customBackAction={backAction}
            withBack
            greenArrow
        />
    )
}
