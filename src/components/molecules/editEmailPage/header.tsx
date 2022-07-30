/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useMemo } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'

interface HeaderEmailProps {
    isFinished: boolean
    navigation: NavigationContainerRef
}

export default function HeaderEmail({
    isFinished,
    navigation,
}: HeaderEmailProps) {
    const title = useMemo(
        () => (isFinished ? 'Verifikasi Email' : 'Email'),
        [isFinished]
    )
    return (
        <WithPadding>
            <Space value={7} />
            <Header
                title={title}
                navigation={navigation}
                style={{ marginBottom: 0 }}
                withBack
                greenArrow
            />
        </WithPadding>
    )
}
