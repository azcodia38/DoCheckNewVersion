/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { View, Image } from 'react-native'

import Images from 'src/assets'

export default function SplashScreen() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={Images.doCheckLogoIcon}
                style={{ width: '50%', resizeMode: 'contain' }}
            />
        </View>
    )
}
