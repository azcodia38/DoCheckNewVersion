/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { NavigationContainerRef } from '@react-navigation/core'
import Space from 'src/components/atoms/space'
import { isEmpty } from 'lodash'
import { SharedAsTemplate } from 'src/pages/inside-pages/goal/styled'
import React, { useMemo } from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import * as AccessibilityLabel from 'src/utils/accessbility/accessibilityLabel'
import * as AccessibilityHint from 'src/utils/accessbility/accessibilityHint'
import { hasNotch } from 'react-native-device-info'

import DevelopmentMode from 'src/components/atoms/developmentMode'
import Tipografi, { TipografiType } from 'src/components/atoms/tipografi'
import { HeaderContainer, MiddleSectionView, RightSectionView } from './styled'
import { AccessibilityInfo } from 'src/utils/types'
import BackButton from 'src/components/atoms/button/backButton'
import stylesheet from 'src/pages/inside-pages/goal/stylesheet'
import { isIOS } from 'src/utils'

interface HeaderProps {
    title?: string
    titleDetail?: string
    withBack?: boolean
    customBackAction?(): void
    navigation?: NavigationContainerRef
    grayArrow?: boolean
    greenArrow?: boolean
    rightSectionView?: React.ReactNode
    leftSectionView?: React.ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    withBackgroundDevelopmentMode?: boolean
    isSharedTemplate?: boolean
    withHandler?: boolean
    withMargihLeft?: boolean
    type?: TipografiType
    fontContent?: 'dark' | 'light'
}

export default function Header({
    customBackAction,
    grayArrow,
    greenArrow,
    leftSectionView,
    navigation,
    rightSectionView,
    style,
    textStyle,
    title = '',
    titleDetail = '',
    withBack,
    withHandler = true,
    withBackgroundDevelopmentMode = false,
    isSharedTemplate = false,
    withMargihLeft = false,
    type = 'title',
    fontContent = 'dark',
}: HeaderProps & AccessibilityInfo) {
    const fontStyleColor = useMemo(
        () => (fontContent == 'dark' ? '#000' : '#fff'),
        [fontContent]
    )

    return (
        <HeaderContainer
            style={{
                ...stylesheet,
                marginTop: hasNotch() && Boolean(isIOS) ? 0 : 25,
            }}
        >
            {leftSectionView}
            <BackButton
                withBack={withBack}
                navigation={navigation}
                customBackAction={customBackAction}
                grayArrow={grayArrow}
                greenArrow={greenArrow}
                accessibilityRole={'button'}
                accessibilityLabel={AccessibilityLabel.BACK_ACTION}
                accessibilityHint={AccessibilityHint.BACK_ACTION}
            />
            <MiddleSectionView withMargihLeft={withMargihLeft}>
                <DevelopmentMode
                    fontContent={fontContent == 'dark'}
                    withBackground={withBackgroundDevelopmentMode}
                    accessibilityLabel={AccessibilityLabel.DEVELOPMENT_MODE}
                    accessibilityHint={AccessibilityHint.DEVELOPMENT_MODE}
                />
                <Space value={5} />
                {!isEmpty(title) && (
                    <>
                        <Tipografi
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            type={type}
                            style={{
                                color: fontStyleColor,
                                marginBottom: 4,
                                ...((textStyle as any) ?? {}),
                            }}
                            center
                        >
                            {title}
                        </Tipografi>
                        <View
                            style={{
                                flexDirection: 'column-reverse',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isSharedTemplate && (
                                <SharedAsTemplate>
                                    <Tipografi
                                        type={'smaller'}
                                        style={{
                                            color: '#FFF',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Shared as template
                                    </Tipografi>
                                </SharedAsTemplate>
                            )}
                        </View>
                    </>
                )}

                {!isEmpty(titleDetail) && (
                    <>
                        <Tipografi
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            type={type}
                            style={{
                                color: '#262D33',
                                marginBottom: 4,
                                fontSize: 14,
                                fontWeight: '600',
                                fontFamily: 'Open Sans',
                                ...((textStyle as any) ?? {}),
                            }}
                            center
                        >
                            {titleDetail}
                        </Tipografi>
                        <View
                            style={{
                                flexDirection: 'column-reverse',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isSharedTemplate && (
                                <SharedAsTemplate>
                                    <Tipografi
                                        type={'smaller'}
                                        style={{
                                            color: '#FFF',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Shared as template
                                    </Tipografi>
                                </SharedAsTemplate>
                            )}
                        </View>
                    </>
                )}
            </MiddleSectionView>
            <RightSectionView>
                {withHandler && rightSectionView}
            </RightSectionView>
        </HeaderContainer>
    )
}
