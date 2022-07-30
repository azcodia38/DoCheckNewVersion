/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback } from 'react'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import Intro from 'components/intro/Intro'
import { NavProps } from 'src/utils/const'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { isIOS } from 'src/utils'

// Page Props
export interface FirstPageProps extends NavProps {}

// Default Function
export default function FirstPage(props: FirstPageProps) {
    const bottomInset = useSafeAreaInsets()
    const gotoLogin = useCallback(
        () => props.navigation.navigate('Login'),
        [props.navigation]
    )

    return (
        <DocheckSafeAreaView>
            <View style={{ marginBottom: isIOS ? -bottomInset.bottom : 0 }}>
                <Intro finishAction={gotoLogin} />
            </View>
        </DocheckSafeAreaView>
    )
}
