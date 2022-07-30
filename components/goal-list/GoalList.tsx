import { sortBy, uniqueId } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleProp,
    ViewStyle,
    FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'

// @components
import ListItem from 'src/components/molecules/listAllGoal/listItem'

// @helpers
import { Goals } from 'src/entity/Goals.entity'
import { PinnedGoals } from 'src/entity/PinnedGoals.entity'
import StoreData from 'store/types'

interface GoalListProps {
    data: Goals[]
    onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
    scrollEnabled?: boolean
    onGoalPress?(goal: Goals): void
    onGoalLongPress?(goal: Goals): void
    style?: StyleProp<ViewStyle>
    checkIDs: string[]
    onContainerCheckChange?(goal: Goals, check: boolean): void
    checkMode?: boolean
}

export default function GoalList(props: GoalListProps) {
    const tabType = useSelector(({ myGoals }: StoreData) => myGoals.typeGoal)
    const list_pinned_goal = useSelector(
        (_: StoreData) => _.goals_data.pinned_goals
    )
    const pinned_goal_ids = list_pinned_goal.map(
        (pg: PinnedGoals) => pg.goal.id
    )

    const transformingOrderGoals = useMemo(
        () =>
            sortBy(
                props.data,
                (goalList) => !pinned_goal_ids.includes(goalList.id)
            ),
        [sortBy, props.data, pinned_goal_ids]
    )

    const renderItem = useCallback(
        ({ item, index }: { item: Goals; index: number }) => (
            <ListItem
                key={index}
                goal={item ?? uniqueId()}
                pinned_goal_ids={pinned_goal_ids}
                checkMode={props.checkMode}
                checkIDs={props.checkIDs}
                onGoalPress={props.onGoalPress}
                onGoalLongPress={props.onGoalLongPress}
                onContainerCheckChange={props.onContainerCheckChange}
            />
        ),
        [
            pinned_goal_ids,
            props.checkMode,
            props.checkIDs,
            props.onGoalPress,
            props.onContainerCheckChange,
            props.onGoalLongPress,
        ]
    )

    return (
        <FlatList
            style={props.style}
            removeClippedSubviews={true}
            onScroll={props.onScroll}
            scrollEnabled={props.scrollEnabled}
            initialNumToRender={10}
            data={transformingOrderGoals}
            renderItem={renderItem}
            keyExtractor={(c) => c.id}
            extraData={tabType}
            contentContainerStyle={{ paddingBottom: 15 }}
        />
    )
}

{
    /* <SwipeListView
                data={transformingOrderGoals}
                renderItem={renderItem}
                renderHiddenItem={(data, rowMap) => (
                    <View>
                        <Text>Left</Text>
                    </View>
                )}
                style={props.style}
                leftOpenValue={75}
                // rightOpenValue={-75}
                removeClippedSubviews={true}
                keyExtractor={(c) => c.id}
                extraData={tabType}
                contentContainerStyle={{ paddingBottom: 15 }}
                initialNumToRender={10}
                useFlatList={true}
            /> */
}
