import Space from 'src/components/atoms/space'
import React, { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import RegisterTitle from 'src/components/atoms/registerTitle'
import { theme } from 'src/utils/const'
import Tipografi from '../../../src/components/atoms/tipografi'
import {
    InputBoxContainer,
    InputContainer,
    LeftItem,
    MiddleItem,
    RightItem,
} from './styled'

export type InputBoxState =
    | 'none'
    | 'normal'
    | 'done'
    | 'error'
    | 'special-dropdown'
    | 'special-task'
    | 'special-task-done'
    | 'special-late-task'
    | 'special-late-task-done'
    | 'create-task'
    | 'undang-teman'
    | 'feedback'
    | 'border-green'

interface InputBoxProps {
    state?: InputBoxState
    errorText?: string
    label?: string
    subLabel?: string
    children?: any
    editable?: boolean
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    additionalView?: React.ReactNode
    noMarginBottom?: boolean
    style?: StyleProp<ViewStyle>
    inputContainerStyle?: StyleProp<ViewStyle>
    leftItemStyle?: StyleProp<ViewStyle>
    rightItemStyle?: StyleProp<ViewStyle>
    isTask?: boolean
    onLayoutAvailable?(
        x: number,
        y: number,
        width: number,
        height: number
    ): void
}

interface SomeBoxStyle {
    borderColor: string
    borderWidth: number
    backgroundColor: string
}

function getInputBoxStyle(state: InputBoxState): SomeBoxStyle {
    switch (state) {
        case 'none':
            return {
                borderColor: '#FFF0',
                borderWidth: 1,
                backgroundColor: '#FFF0',
            }
        case 'normal':
            return {
                borderColor: '#DADADA',
                borderWidth: 1,
                backgroundColor: '#FFF',
            }
        case 'done':
            return {
                borderColor: '#E0F8EA',
                borderWidth: 1,
                backgroundColor: '#E0F8EA',
            }
        case 'error':
            return {
                borderColor: '#ED7179',
                borderWidth: 0.5,
                backgroundColor: '#FDF1F2',
            }
        case 'special-dropdown':
            return {
                borderColor: theme.main_color,
                borderWidth: 0.5,
                backgroundColor: '#F7F7F7',
            }
        case 'special-task':
            return {
                borderColor: theme.main_color,
                borderWidth: 0.5,
                backgroundColor: '#FFF',
            }
        case 'special-task-done':
            return {
                borderColor: '#EEFFF5',
                borderWidth: 0.5,
                backgroundColor: '#EEFFF5',
            }
        case 'special-late-task':
            return {
                borderColor: '#ED7179',
                borderWidth: 0.5,
                backgroundColor: '#FFF',
            }
        case 'special-late-task-done':
            return {
                borderColor: '#FDF1F2',
                borderWidth: 0.5,
                backgroundColor: '#FDF1F2',
            }
        case 'create-task':
            return {
                borderColor: '#F9F9F9',
                borderWidth: 0.5,
                backgroundColor: '#F9F9F9',
            }
        case 'border-green':
            return {
                borderColor: theme.main_color,
                borderWidth: 1,
                backgroundColor: '#FFF',
            }
        case 'undang-teman':
            return {
                borderColor: '#FFF',
                borderWidth: 1,
                backgroundColor: '#0000',
            }
        case 'feedback':
            return {
                borderColor: '#DCE9DC',
                borderWidth: 1,
                backgroundColor: '#F6FCF6',
            }
    }
}

export default function InputBox(props: InputBoxProps) {
    const [boxState, setBoxState] = useState<SomeBoxStyle>(
        getInputBoxStyle('normal')
    )

    useEffect(() => {
        if (props.state) setBoxState(getInputBoxStyle(props.state))
        else getInputBoxStyle('normal')
    }, [props.state])

    const inputContainerStyles = useMemo(() => {
        if (props.isTask) {
            return {
                borderColor: boxState.borderColor,
                borderWidth: boxState.borderWidth,
                backgroundColor: boxState.backgroundColor,
                ...((props.inputContainerStyle as any) ?? {}),
            }
        }
        return {
            borderColor: props.editable ? boxState.borderColor : '#f2f2f2',
            borderWidth: boxState.borderWidth,
            backgroundColor: props.editable
                ? boxState.backgroundColor
                : '#f2f2f2',
            ...((props.inputContainerStyle as any) ?? {}),
        }
    }, [
        props.inputContainerStyle,
        boxState.borderColor,
        boxState.backgroundColor,
        boxState.borderWidth,
        props.editable,
        props.isTask,
    ])

    return (
        <InputBoxContainer
            style={{
                marginBottom: props.noMarginBottom ? 0 : 12,
                ...((props.style as any) ?? {}),
            }}
        >
            {props.label && (
                <>
                    <Tipografi type={'label'} style={{ color: '#444145' }}>
                        {props.label}
                    </Tipografi>
                    <Space value={10} />
                </>
            )}
            <InputContainer style={inputContainerStyles}>
                <View style={{ zIndex: 999 }}>{props.additionalView}</View>
                <LeftItem style={props.leftItemStyle}>
                    {props.leftItem}
                </LeftItem>
                <MiddleItem>{props.children}</MiddleItem>
                <RightItem style={props.rightItemStyle}>
                    {props.rightItem}
                </RightItem>
            </InputContainer>
            {props.state === 'error' && (
                <Tipografi
                    style={{
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 2,
                        color: '#F1123B',
                    }}
                    type={'smaller'}
                >
                    {props.errorText ?? ''}
                </Tipografi>
            )}
        </InputBoxContainer>
    )
}
