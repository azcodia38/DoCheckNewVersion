import React from 'react'

import GoalPageMenu from 'components/goal-page-menu/GoalPageMenu'
import { AbsoluteMenuContainer } from 'src/pages/inside-pages/task/styled'

type MenuDetailGoalType = (value: React.SetStateAction<boolean>) => void

interface MenuDetailGoalProps {
    showMenu: boolean
    isOwner: boolean
    setShowMenu: MenuDetailGoalType
    visitEditGoal: () => void
    pinUnpinGoal: () => Promise<void>
    onCreateNewTaskHandler: () => void
    setShowPopupDelete: MenuDetailGoalType
    setShowPopupMemberGoal: MenuDetailGoalType
    isPinned?: boolean
}

export default function MenuDetailGoal({
    setShowMenu,
    showMenu,
    onCreateNewTaskHandler,
    pinUnpinGoal,
    visitEditGoal,
    isPinned,
    isOwner,
    setShowPopupDelete,
    setShowPopupMemberGoal,
}: MenuDetailGoalProps) {
    return (
        <AbsoluteMenuContainer
            style={{ left: showMenu ? 0 : '100%' }}
            onTouchEnd={() => {
                setShowMenu(false)
            }}
        >
            <GoalPageMenu
                pinned={isPinned}
                isOwner={isOwner}
                onEditGoal={visitEditGoal}
                onPinGoal={pinUnpinGoal}
                onTambahTask={onCreateNewTaskHandler}
                onTambahTeman={() => setShowPopupMemberGoal(true)}
                onHapusGoal={() => {
                    setShowMenu(false)
                    setShowPopupDelete(true)
                }}
            />
        </AbsoluteMenuContainer>
    )
}
