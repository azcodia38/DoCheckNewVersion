import React from 'react'

import TaskPageMenu from 'src/components/atoms/taskPageMenu'
import { AbsoluteMenuContainer } from 'src/pages/inside-pages/task/styled'

interface MenuDetailProps {
    showMenu: boolean
    pinned: boolean
    pinUnpinTask: () => Promise<void>
    setShowMenu: (status: boolean) => void
    setEditMode: (value: React.SetStateAction<boolean>) => void
    setShowPopupDelete: (value: React.SetStateAction<boolean>) => void
}

export default function MenuDetail({
    setShowMenu,
    showMenu,
    pinUnpinTask,
    pinned,
    setEditMode,
    setShowPopupDelete,
}: MenuDetailProps) {
    return (
        <AbsoluteMenuContainer
            style={{
                left: showMenu ? 0 : '100%',
            }}
            onTouchEnd={() => {
                setShowMenu(false)
            }}
        >
            <TaskPageMenu
                pinned={pinned}
                onPinTask={pinUnpinTask}
                onEditTask={() => {
                    setEditMode(true)
                    setShowMenu(false)
                }}
                onHapusTask={() => {
                    setShowPopupDelete(true)
                    setShowMenu(false)
                }}
            />
        </AbsoluteMenuContainer>
    )
}
