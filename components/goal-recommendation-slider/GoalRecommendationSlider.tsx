/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useMemo, useRef } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'
import { isEmpty, uniqueId } from 'lodash'

import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import { GoalRecommendationLoading } from 'components/loader-collections'
import Space from 'src/components/atoms/space'
import GoalsRecommendation from 'src/components/atoms/recommendationGoals'
import HeaderTitle from 'src/components/atoms/HeaderTitle'

import { theme } from 'src/utils/const'
import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'
import { EMPTY_TASK } from 'src/utils/lang'
import useConnected from 'src/hook/useConnected'
import { GoalRecommendationSliderContainer } from './styled'

const { width: viewportWidth } = Dimensions.get('window')

interface GoalRecommendationSliderProps {
    data: (Goals & PromotionGoals)[]
    loading: boolean
    onPress?(goal: Goals): void
    onLainnya?(): void
    title: string
    hideLihatLainnya?: boolean
}

const widthAfterPadding = viewportWidth - theme.left_right_padding * 2
const widthPercentage = 0.65
const widthAfterPadding_and_percentage =
    widthAfterPadding * widthPercentage
const removeWithAfterPaddingAndPercentage =
    widthAfterPadding * (1 - widthPercentage)
const halfRemoveWithAfterPaddingAndPercentage =
    removeWithAfterPaddingAndPercentage / 2

export default function GoalRecommendationSlider(
    props: GoalRecommendationSliderProps
) {
    const ref = useRef(null)
    const connected = useConnected()

    const filterRecommendation = useMemo(
        () => props.data.filter((goal) => !goal?.isPromoted),
        [props.data]
    )

    const renderItem = useCallback(
        (items) => (
            <GoalsRecommendation
                style={style.goalsRecommendation}
                items={items}
                onPress={props.onPress}
            />
        ),
        []
    )

    return (
        <GoalRecommendationSliderContainer>
            <HeaderTitle
                title={props.title}
                isHide={props.hideLihatLainnya!}
                onPress={props.onLainnya}
            />
            <Space value={12} />
            {props.loading && <GoalRecommendationLoading />}
            {((!props.loading && isEmpty(props.data)) || !connected) && (
                <TaskKosongView
                    withHeight={false}
                    title={EMPTY_TASK.OFFLINE.TITLE}
                    description={EMPTY_TASK.OFFLINE.DESCRIPTION}
                    isOffline={true}
                />
            )}
            {!props.loading && !isEmpty(props.data) && connected && (
                <Carousel
                    ref={ref}
                    data={filterRecommendation}
                    keyExtractor={(g) => g.id ?? uniqueId()}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    renderItem={renderItem}
                    firstItem={0}
                    sliderWidth={viewportWidth}
                    itemWidth={widthAfterPadding_and_percentage}
                    layout={'default'}
                    style={{
                        flex: 1,
                    }}
                    useScrollView={false}
                    shouldOptimizeUpdates={true}
                    vertical={false}
                />
            )}
        </GoalRecommendationSliderContainer>
    )
}

const style = StyleSheet.create({
    goalsRecommendation: {
        marginLeft: -halfRemoveWithAfterPaddingAndPercentage,
        marginRight: halfRemoveWithAfterPaddingAndPercentage + 10,
    },
})
