import React from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

import WithPadding from 'src/components/atoms/withPadding'
import {
    ThreeDotsIcon,
    TickCloseTaskIcon,
    TickEditTaskIcon,
} from 'components/icons/Icons'
import Loading from 'components/loading/Loading'
import Space from 'src/components/atoms/space'
import HeaderComponent from 'components/header/Header'

interface HeaderProps {
    editMode: boolean
    showMenu: boolean
    navigation: NavigationContainerRef
    errorLink: string
    errorDate: string
    setShowMenu: (value: React.SetStateAction<boolean>) => void
    updateTask: () => void
    loadingSubmit: boolean
    tempRecordedAudio?: boolean
    setEditMode: (value: React.SetStateAction<boolean>) => void
    taskEditTitle?: string
    title?: string
}

export default function Header({
    editMode,
    navigation,
    title,
    showMenu,
    setShowMenu,
    errorDate,
    errorLink,
    updateTask,
    loadingSubmit,
    setEditMode,
    taskEditTitle,
}: HeaderProps) {
    return (
        <WithPadding>
            <Space value={7} />
            {!editMode && (
                <HeaderComponent
                    title={title}
                    navigation={navigation}
                    rightSectionView={
                        <ThreeDotsIcon
                            onPress={() => {
                                setShowMenu(!showMenu)
                                // TODO: Disable this feature because taskAudio got cancelled
                                // if (!showMenu) {
                                //     setTempRecordedAudio({
                                //         path: taskEditData.audioUrl,
                                //         duration: taskEditData.audioDurationMs,
                                //     })
                                // }
                            }}
                        />
                    }
                    withBack
                    greenArrow
                />
            )}
            {editMode && (
                <HeaderComponent
                    title={title}
                    navigation={navigation}
                    leftSectionView={
                        <TickCloseTaskIcon onPress={() => setEditMode(false)} />
                    }
                    rightSectionView={
                        errorLink.length === 0 &&
                        errorDate.length === 0 && (
                            <Loading loading={loadingSubmit} small>
                                <TickEditTaskIcon onPress={updateTask} />
                            </Loading>
                        )
                    }
                    withBack={false}
                    withHandler={true}
                />
            )}
            <Space value={7} />
        </WithPadding>
    )
}
