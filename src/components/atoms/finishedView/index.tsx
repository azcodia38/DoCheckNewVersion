/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { StyleSheet } from 'react-native'

import { ImageBerhasilDiubah } from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import { FinishedViewContainer } from 'src/pages/inside-pages/akun/edit-email/styled'
import Button from 'src/components/atoms/button'

interface FinishedView {
    navigationHandler: () => void
    title: string
}

export default function FinishedView({
    navigationHandler,
    title,
}: FinishedView) {
    return (
        <FinishedViewContainer>
            <ImageBerhasilDiubah style={styles.image} />
            <Space value={25} />
            <Tipografi style={styles.tipografi} type={'normal'}>
                {title}
            </Tipografi>
            <Space value={30} />
            <Button onPress={navigationHandler}>OK</Button>
        </FinishedViewContainer>
    )
}

const styles = StyleSheet.create({
    tipografi: { width: '80%', textAlign: 'center', color: '#262D33' },
    image: { width: '65%' },
})
