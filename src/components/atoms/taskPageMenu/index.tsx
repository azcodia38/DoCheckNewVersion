import React from 'react'
import { TouchableOpacity } from 'react-native'

import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import {
    MenuTaskDeleteIcon,
    MenuTaskEditIcon,
    MenuTaskPinIcon,
} from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'
import { TaskPageMenuContainer } from './styled'

interface TaskPageMenuProps {
    pinned?: boolean
    onPinTask?(): void
    onEditTask?(): void
    onHapusTask?(): void
}

export default function TaskPageMenu(props: TaskPageMenuProps) {
    return (
        <TaskPageMenuContainer>
            <TouchableOpacity onPress={props.onPinTask}>
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
                        {`${props.pinned ? 'Unpin' : 'Pin'} Task`}
                    </Tipografi>
                </ContainerAlignItemsCenter>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={props.onEditTask}>
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
                        Edit Task
                    </Tipografi>
                </ContainerAlignItemsCenter>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={props.onHapusTask}>
                <ContainerAlignItemsCenter
                    style={{ padding: 10, paddingLeft: 15, paddingRight: 15 }}
                >
                    <MenuTaskDeleteIcon />
                    <Tipografi type={'small'} style={{ marginLeft: 12 }}>
                        Hapus Task
                    </Tipografi>
                </ContainerAlignItemsCenter>
            </TouchableOpacity>
        </TaskPageMenuContainer>
    )
}
