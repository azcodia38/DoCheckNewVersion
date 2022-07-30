/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useContext } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import Images from 'src/assets'
import AppInfo from 'src/components/molecules/splashScreen/appInfo'
import AppContext from 'src/context/AppContext'

export default function SplashScreenV2() {
    const { version, descriptionApp } = useContext(AppContext)
    return (
        <View style={styles.wrapper}>
            <Image source={Images.splashScreenv2} style={styles.imageWrapper} />
            <AppInfo versionCode={version} description={descriptionApp} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageWrapper: {
        width: '50%',
        resizeMode: 'contain',
        marginRight: 20,
        flexGrow: 2,
    },
})
