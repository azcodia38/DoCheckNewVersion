import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { ArrowRightIcon } from '../icons/Icons'
import Space from '../../src/components/atoms/space'
import Tipografi from '../../src/components/atoms/tipografi'
import { ButtonWithArrowContainer, ProfileButtonsContainer } from './styled'

interface ButtonWithArrowProps {
    label: string
    onPress?(): void
    disable?: boolean
}

function ButtonWithArrow(props: ButtonWithArrowProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={(_) => !props.disable && props.onPress && props.onPress()}
        >
            <ButtonWithArrowContainer
                style={{
                    backgroundColor: props.disable ? '#F9F9F9' : '#EEFFF5',
                }}
            >
                <Tipografi
                    style={{ color: props.disable ? '#c4c4c4' : '#262D33' }}
                    type={'small'}
                >
                    {props.label}
                </Tipografi>
                <ArrowRightIcon disabled={props.disable} />
            </ButtonWithArrowContainer>
        </TouchableOpacity>
    )
}

interface ProfileButtonsProps {
    data: {
        group_title: string
        data: ButtonWithArrowProps[]
    }[]
}

export default function ProfileButtons(props: ProfileButtonsProps) {
    return (
        <ProfileButtonsContainer>
            {props.data.map((group_menu, i: number) => (
                <View key={i}>
                    <Tipografi type={'label-bold'}>
                        {group_menu.group_title}
                    </Tipografi>
                    <Space value={8} />
                    {group_menu.data.map(
                        (menu: ButtonWithArrowProps, j: number) => (
                            <ButtonWithArrow {...menu} key={j} />
                        )
                    )}
                    <Space value={12} />
                </View>
            ))}
        </ProfileButtonsContainer>
    )
}
