/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, GestureResponderEvent, View } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'

// @components
import UnselectTab from 'src/components/atoms/homepage/unselectTab'
import TitleInHeader from './TitleInHeader'

// @helpers
import {
    TabSwitchHeaderBackground,
    TabSwitchHeaderContainer,
    TabSwitchHeaderNoPointer,
} from './styled'
import {
    TabSwitchHeaderProps,
    TabSwitchHeaderType,
} from 'src/pages/inside-pages/home/types'
import { ACTIVE_TAB } from 'src/utils/types/componentsTypes'
import { uniqueId } from 'lodash'

const { width: viewportWidth } = Dimensions.get('window')

type GroupPropertiesType = {
    id: number | string
    title: string
    active: boolean
}[]

export default function TabSwitchHeader(props: TabSwitchHeaderProps) {
    const ref = useRef<Carousel<any>>(null)

    const [groupProperties, setGroupProperties] = useState<GroupPropertiesType>(
        [
            {
                id: 0,
                title: ACTIVE_TAB.FIRST_TAB,
                active: true,
            },
            {
                id: 1,
                title: ACTIVE_TAB.SECOND_TAB,
                active: false,
            },
        ]
    )

    const activeTabHandler = useCallback(
        (isActive: TabSwitchHeaderType) =>
            ref.current?.snapToItem(
                isActive === ACTIVE_TAB.FIRST_TAB ? Number(true) : Number(false)
            ),
        [ref.current]
    )

    const onTouchEndHandler = useCallback(
        ({ nativeEvent: { pageX } }: GestureResponderEvent) => {
            const isLeft = pageX < viewportWidth / 2
            const newActive: TabSwitchHeaderType = (
                isLeft ? ACTIVE_TAB.FIRST_TAB : ACTIVE_TAB.SECOND_TAB
            ) as TabSwitchHeaderType
            if (props.active === newActive) return true
            props.setActive(newActive)
        },
        [props.setActive, props.active]
    )

    useEffect(() => {
        if (props.active && ref.current) {
            activeTabHandler(props.active as TabSwitchHeaderType)
        }
    }, [props.active, ref.current])

    useEffect(() => {
        setGroupProperties(
            groupProperties.map((groupProperty) => {
                if (groupProperty.title == props.active)
                    groupProperty.active = true
                else groupProperty.active = false
                return groupProperty
            })
        )
    }, [props.active])

    return (
        <TabSwitchHeaderContainer
            onTouchMove={onTouchEndHandler}
            onTouchEnd={onTouchEndHandler}
        >
            <TabSwitchHeaderBackground />

            <View>
                <UnselectTab index={Number(uniqueId())} />
            </View>
            <TabSwitchHeaderNoPointer pointerEvents={'none'}>
                {groupProperties.map(({ active, id, title }) => (
                    <TitleInHeader key={id} isActive={active} title={title} />
                ))}
            </TabSwitchHeaderNoPointer>
        </TabSwitchHeaderContainer>
    )
}
