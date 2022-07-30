/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'
import { AccessibilityInfo } from 'src/utils/types'
import {
    BigTitleText,
    ButtonText,
    LabelBoldText,
    LabelRegularText,
    LabelText,
    MediumText,
    NormalBiggerText,
    NormalText,
    SmallerText,
    SmallSemiBoldText,
    SmallText,
    TitleMediumText,
    TitleText,
} from './styled'

export type TipografiType =
    | 'big-title'
    | 'title'
    | 'title-medium'
    | 'normal'
    | 'normal-bigger'
    | 'small'
    | 'small-semibold'
    | 'smaller'
    | 'button'
    | 'label'
    | 'label-bold'
    | 'label-regular'
    | 'medium'

export interface TipografiProps extends TextProps {
    children: string | React.ReactNode
    type?: TipografiType
    style?: StyleProp<TextStyle>
    center?: boolean
    accessibilitylabel?: string
}

export default function Tipografi(props: TipografiProps & AccessibilityInfo) {
    switch (props.type) {
        case 'big-title':
            return (
                <BigTitleText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </BigTitleText>
            )
        case 'title':
            return (
                <TitleText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </TitleText>
            )
        case 'title-medium':
            return (
                <TitleMediumText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </TitleMediumText>
            )
        case 'medium':
            return (
                <MediumText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </MediumText>
            )
        case 'label':
            return (
                <LabelText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </LabelText>
            )
        case 'label-regular':
            return (
                <LabelRegularText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </LabelRegularText>
            )
        case 'label-bold':
            return (
                <LabelBoldText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </LabelBoldText>
            )
        case 'normal':
            return (
                <NormalText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </NormalText>
            )
        case 'normal-bigger':
            return (
                <NormalBiggerText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </NormalBiggerText>
            )
        case 'button':
            return (
                <ButtonText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </ButtonText>
            )
        case 'small':
            return (
                <SmallText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </SmallText>
            )
        case 'small-semibold':
            return (
                <SmallSemiBoldText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </SmallSemiBoldText>
            )
        case 'smaller':
            return (
                <SmallerText
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </SmallerText>
            )
        default:
            return (
                <Text
                    accessibilitylabel={props.accessibilitylabel}
                    {...props}
                    style={{
                        textAlign: props.center ? 'center' : 'left',
                        ...((props.style as any) ?? {}),
                    }}
                    accessibilityRole={'text'}
                    accessibilityLabel={props.accessibilityLabel}
                    accessibilityHint={props.accessibilityHint}
                >
                    {props.children}
                </Text>
            )
    }
}
