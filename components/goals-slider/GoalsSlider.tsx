/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { size } from 'lodash'
import React, { useCallback, useContext, useMemo } from 'react'
import Carousel from 'react-native-snap-carousel-v4'

// @utils
import { theme } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'

// @components
import HeaderTitle from 'src/components/atoms/HeaderTitle'
import GoalCard from 'components/goalCard'
import { GoalCardLoading } from 'components/loader-collections'
import Space from 'src/components/atoms/space'

import { GoalsSliderContainer } from './styled'
import { GoalKosongView } from 'src/pages/inside-pages/home/section/beranda/some-view'
import useDimension from 'src/hook/useDimension'
import usePinned from 'src/hook/usePinned'
import GlobalContext from 'src/context/GlobalContext'

interface GoalsSliderProps {
    data: Goals[]
    loading: boolean
    onPress?(goal: Goals): void
    onLainnya?(): void
    hideLihatLainnya?: boolean
    title: string
    activeTab: string
}

const PADDING_SIZE = 7

export default function GoalsSlider(props: GoalsSliderProps) {
    const { goalSlider: ref } = useContext(GlobalContext)
    const { width: viewportWidth } = useDimension()
    const { isPinned } = usePinned()

    const itemWidth = useMemo(
        () => viewportWidth - (theme.left_right_padding + PADDING_SIZE + 1) * 2,
        [viewportWidth, theme, PADDING_SIZE]
    )

    const renderingItems = useCallback(
        ({ item }: { item: Goals }) => (
            <GoalCard
                onPress={() => props.onPress!(item)}
                data={item}
                active
                pinned={isPinned(item.id)}
            />
        ),
        [isPinned, props.onPress]
    )

    return (
        <GoalsSliderContainer>
            <HeaderTitle
                title={props.title}
                isHide={props.hideLihatLainnya!}
                onPress={props.onLainnya}
            />

            <Space value={0} />
            {!props.loading && !(size(props.data) >= 1) && <GoalKosongView />}
            {props.loading && (
                <>
                    <Space value={10} />
                    <GoalCardLoading />
                </>
            )}
            {!props.loading && (
                <Carousel
                    ref={ref}
                    data={props.data}
                    renderItem={renderingItems}
                    sliderWidth={viewportWidth}
                    itemWidth={itemWidth}
                    layout={'tinder'}
                    useScrollView={false}
                    // enableMomentum={true}
                    // decelerationRate={0.9}
                    shouldOptimizeUpdates={true}
                    keyExtractor={(goal) => goal.id}
                    // removeClippedSubviews={false}
                    vertical={false}
                />
            )}
        </GoalsSliderContainer>
    )
}
