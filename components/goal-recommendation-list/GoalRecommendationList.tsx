import React from 'react'
import { isFunction } from 'lodash'
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleProp,
    ViewStyle,
} from 'react-native'

import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import GoalRecommendationCard from 'components/goal-recommendation-card/GoalRecommendationCard'
import WithPadding from 'src/components/atoms/withPadding'
import GoalAdsCard from 'src/components/molecules/goalsAdsCard'

interface GoalRecommendationListProps {
    data: Goals[]
    onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
    scrollEnabled?: boolean
    onGoalPress?(goal: Goals): void
    style?: StyleProp<ViewStyle>
    useGoalBackground?: boolean
    customImage: boolean
}

export default function GoalRecommendationList(
    props: GoalRecommendationListProps
) {
    function renderItem(x: { item: Goals & PromotionGoals; index: number }) {
        return (
            <WithPadding>
                {x.item?.isPromoted && (
                    <GoalAdsCard
                        data={x.item}
                        onPress={() =>
                            isFunction(props.onGoalPress) &&
                            props.onGoalPress(x.item)
                        }
                        customImage={props.customImage}
                    />
                )}
                {!x.item?.isPromoted && (
                    <GoalRecommendationCard
                        useGoalBackground={props.useGoalBackground}
                        data={x.item}
                        onPress={() =>
                            isFunction(props.onGoalPress) &&
                            props.onGoalPress(x.item)
                        }
                        customImage={props.customImage}
                    />
                )}
            </WithPadding>
        )
    }

    return (
        <FlatList
            style={props.style}
            removeClippedSubviews={true}
            onScroll={props.onScroll}
            scrollEnabled={props.scrollEnabled}
            initialNumToRender={10}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(c) => c.id}
        />
    )
}
