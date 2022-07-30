/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useContext, useMemo } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import { size } from 'lodash'
import { useSelector } from 'react-redux'

// @components
import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import {
    AbsoluteBottomView,
    GoalsPageContainer,
} from 'src/pages/inside-pages/goals/styled'
import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import { ThreeDotsIcon } from 'components/icons/Icons'
import BoxHapusData from 'src/components/atoms/boxHapusData'
import Search from './search'

// @helpers
import { isIOS } from 'src/utils'
import TabHeader from 'src/components/atoms/tabHeader'
import { BackActionType, GoalListCompose } from 'src/utils/types'
import { MY_GOAL_TAB_PROPERTY } from 'src/utils/types/componentsTypes'
import { Goals } from 'src/entity/Goals.entity'
import { useKeyboard } from 'src/hook/useKeyboard'
import ListGoal from './listGoal'
import MyGoalContext from 'src/context/myGoalContext'
import StoreData from 'store/types'

interface ListAllGoalProps {
    navigation: NavigationContainerRef
    setShowMenu: (status: boolean) => void
    backAction: BackActionType
    query: string
    showCheck: boolean
    setQuery: (query: string) => void
    listGoal: Goals[]
    onPilihSemua: () => void
    checkedIds: string[]
    setShowPopupDelete: (status: boolean) => void
}

export default function ListAllGoal({
    navigation,
    backAction,
    setShowMenu,
    query,
    setQuery,
    listGoal,
    checkedIds,
    onPilihSemua,
    setShowPopupDelete,
    showCheck,
    gotoGoal,
    loading,
    onChangeCheckGoal,
    onLongPress,
}: ListAllGoalProps & GoalListCompose) {
    const { setGoalsTab } = useContext(MyGoalContext)
    const [keyboard_height] = useKeyboard()

    const tabType = useSelector(({ myGoals }: StoreData) => myGoals.typeGoal)
    const titleHeader = useMemo(
        () => (tabType == 'saya' ? 'Goals Kamu' : 'Goals Grup'),
        [tabType]
    )

    const rightSectionView = useMemo(
        () => (
            <CenterContainer>
                <ThreeDotsIcon onPress={() => setShowMenu(true)} />
            </CenterContainer>
        ),
        [setShowMenu]
    )

    return (
        <GoalsPageContainer>
            <WithPadding>
                <Space value={7} />
                <Header
                    titleDetail={titleHeader}
                    navigation={navigation}
                    rightSectionView={rightSectionView}
                    customBackAction={backAction}
                    withBack
                    greenArrow
                />
                <Search query={query} setQuery={setQuery} />
                <Space value={15} />
                <TabHeader
                    setActive={setGoalsTab}
                    tabs={MY_GOAL_TAB_PROPERTY}
                    type="tabType"
                />
                <Space value={5} />
            </WithPadding>
            <ListGoal
                checkedIds={checkedIds}
                goalListSize={size(listGoal)}
                showCheck={showCheck}
                listGoal={listGoal}
                gotoGoal={gotoGoal}
                loading={loading}
                onChangeCheckGoal={onChangeCheckGoal}
                onLongPress={onLongPress}
            />
            <Space value={isIOS * keyboard_height} />
            <AbsoluteBottomView
                style={{ display: showCheck ? 'flex' : 'none' }}
            >
                <BoxHapusData
                    modeUnselect={size(listGoal) === size(checkedIds)}
                    onPilihSemua={onPilihSemua}
                    onHapus={() => setShowPopupDelete(true)}
                    showHapus={size(checkedIds) > 0}
                />
            </AbsoluteBottomView>
        </GoalsPageContainer>
    )
}
