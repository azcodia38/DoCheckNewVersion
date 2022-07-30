import React from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import WithPadding from 'src/components/atoms/withPadding'
import Space from 'src/components/atoms/space'
import Loading from 'components/loading/Loading'
import HeaderComponent from 'components/header/Header'

import { TickEditTaskIcon } from 'components/icons/Icons'

import { isIOS } from 'src/utils'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

interface HeaderProps {
    title: string
    haveChanges: boolean
    isLoading: boolean
    onBackAction: () => boolean
    onSubmit: () => void
    onNavigation: NavigationContainerRef
    spaceValue?: number
}

export default function Header({
    haveChanges,
    isLoading,
    onBackAction,
    onNavigation,
    onSubmit,
    title,
    spaceValue = 7,
}: HeaderProps) {
    return (
        <WithPadding>
            {!isIOS && <Space value={spaceValue} />}
            <HeaderComponent
                title={title}
                customBackAction={onBackAction}
                navigation={onNavigation}
                rightSectionView={
                    haveChanges && (
                        <Loading small loading={isLoading}>
                            <TickEditTaskIcon accessibilityLabel={accessibilitylabels.btnSimpanGoal}onPress={onSubmit} />
                        </Loading>
                    )
                }
                withBack
                greenArrow
            />
            <Space value={spaceValue} />
        </WithPadding>
    )
}
