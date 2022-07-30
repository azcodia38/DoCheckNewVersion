import React from 'react'
import { TouchableOpacity } from 'react-native'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'
import { ContainerAlignItemsCenter } from '../goalCard/styled'
import {
    MenuGoalTambahTaskIcon,
    MenuGoalTambahTemanIcon,
    MenuTaskDeleteIcon,
    MenuTaskEditIcon,
    MenuTaskPinIcon,
} from '../icons/Icons'
import OnlyShow from '../only-show/OnlyShow'
import Tipografi from '../../src/components/atoms/tipografi'
import { GoalPageMenuContainer } from './styled'

interface GoalPageMenuProps {
    pinned?: boolean
    isOwner?: boolean
    onPinGoal?(): void
    onTambahTask?(): void
    onEditGoal?(): void
    onJadikanTempalate?(): void
    onTambahTeman?(): void
    onHapusGoal?(): void
}

export default function GoalPageMenu(props: GoalPageMenuProps) {
    return (
        <GoalPageMenuContainer>
            <TouchableOpacity onPress={props.onPinGoal}>
                <ContainerAlignItemsCenter
                    style={{
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderStyle: 'solid',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#F0F0F0',
                    }}
                >
                    <MenuTaskPinIcon />
                    <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                        {props.pinned ? 'Unpin Goals' : 'Pin Goals'}
                    </Tipografi>
                </ContainerAlignItemsCenter>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onTambahTask}>
                <ContainerAlignItemsCenter
                    style={{
                        padding: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderStyle: 'solid',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#F0F0F0',
                    }}
                >
                    <MenuGoalTambahTaskIcon />
                    <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                        Tambah Task
                    </Tipografi>
                </ContainerAlignItemsCenter>
            </TouchableOpacity>
            <OnlyShow if={props.isOwner}>
                <TouchableWithoutFeedback onPress={props.onEditGoal}>
                    <ContainerAlignItemsCenter
                        style={{
                            padding: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderStyle: 'solid',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#F0F0F0',
                        }}
                    >
                        <MenuTaskEditIcon />
                        <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                            Edit Goals
                        </Tipografi>
                    </ContainerAlignItemsCenter>
                </TouchableWithoutFeedback>
            </OnlyShow>
            {/* <TouchableOpacity onPress={props.onJadikanTempalate}>
        <ContainerAlignItemsCenter style={{ padding: 10, paddingLeft: 15, paddingRight: 15, borderStyle: 'solid', borderBottomWidth: .5, borderBottomColor: '#F0F0F0' }}>
          <MenuGoalJadikanTempalateIcon />
          <Tipografi type={'small'} style={{ marginLeft: 12 }}>
            Jadikan Tempalte
          </Tipografi>
        </ContainerAlignItemsCenter>
      </TouchableOpacity> */}
            <OnlyShow if={props.isOwner}>
                <TouchableOpacity onPress={props.onTambahTeman}>
                    <ContainerAlignItemsCenter
                        style={{
                            padding: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderStyle: 'solid',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#F0F0F0',
                        }}
                    >
                        <MenuGoalTambahTemanIcon />
                        <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                            Tambah teman
                        </Tipografi>
                    </ContainerAlignItemsCenter>
                </TouchableOpacity>
            </OnlyShow>
            <OnlyShow if={props.isOwner}>
                <TouchableOpacity onPress={props.onHapusGoal}>
                    <ContainerAlignItemsCenter
                        style={{
                            padding: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                        }}
                    >
                        <MenuTaskDeleteIcon />
                        <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                            Hapus Goals
                        </Tipografi>
                    </ContainerAlignItemsCenter>
                </TouchableOpacity>
            </OnlyShow>
        </GoalPageMenuContainer>
    )
}
