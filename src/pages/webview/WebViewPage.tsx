/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

// @utils
import { NavProps } from 'src/utils/const'

// @pages
import { WebViewPageParams } from 'src/pages/webview/params'
import { WebViewPageContainer } from 'src/pages/webview/styled'

// @components
import WithOfflineState from 'src/components/atoms/withOffline'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'

// @hook
import useDimension from 'src/hook/useDimension'

export default function WebViewPage(props: NavProps) {
    const { width: viewportWidth, height: viewportHeight } = useDimension()

    const params: WebViewPageParams = props.route.params

    const style = useMemo(
        () => styles(viewportHeight, viewportWidth),
        [styles, viewportHeight]
    )

    return (
        <DocheckSafeAreaView>
            <WithOfflineState>
                <WebViewPageContainer>
                    <WithPadding style={{ height: 90 }}>
                        <Space value={7} />
                        <Header
                            title={params.title}
                            navigation={props.navigation}
                            style={{ marginBottom: 18 }}
                            textStyle={{ fontSize: 15 }}
                            withBack
                            greenArrow
                        />
                    </WithPadding>
                    <View style={style.webViewContainer}>
                        <WebView
                            source={{ uri: params.url }}
                            style={style.webViewMain}
                        />
                    </View>
                </WebViewPageContainer>
            </WithOfflineState>
        </DocheckSafeAreaView>
    )
}

const styles = (viewportHeight: number, viewportWidth: number) =>
    StyleSheet.create({
        webViewContainer: {
            height: viewportHeight - 90,
            width: '100%',
            backgroundColor: '#F3F3F3',
        },
        webViewMain: {
            height: viewportHeight - 90,
            width: viewportWidth,
        },
    })
