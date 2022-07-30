/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel-v4'

import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import CarouselQuestionnairesSingleItem from 'src/components/atoms/carouselQuestionnairesSingleItem'

import { CarouselKuisionerContainer } from './styled'
import useDimension from 'src/hook/useDimension'

export interface CarouselKuisionerData {
    description: string
    title: string
    topic: string
    type: 'dropdown' | 'bubble'
    options: RadioOption<string>[]
    key: string
    values: string[]
}

interface CarouselKuisionerProps {
    data: CarouselKuisionerData[]
    activeIndex: number
    setActiveIndex(index: number): void
    onValuesChange(index: number, values: string[]): void
}

export default function CarouselKuisioner(props: CarouselKuisionerProps) {
    const { width: viewportWidth } = useDimension()

    const [localActiveIndex, setLocalActiveIndex] = useState<number>(
        props.activeIndex
    )
    const ref = useRef(null)

    useEffect(() => {
        if (localActiveIndex === props.activeIndex) {
            return
        }
        setLocalActiveIndex(props.activeIndex)
        ;(ref.current as any).snapToItem(props.activeIndex)
    }, [props.activeIndex])

    useEffect(() => {
        props.setActiveIndex(localActiveIndex)
    }, [localActiveIndex])

    return (
        <CarouselKuisionerContainer>
            <Carousel
                ref={ref}
                data={props.data}
                inactiveSlideScale={1}
                renderItem={(propsCarousel) => (
                    <CarouselQuestionnairesSingleItem
                        {...propsCarousel}
                        onValuesChange={props.onValuesChange}
                    />
                )}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                onSnapToItem={setLocalActiveIndex}
                style={{
                    flex: 1,
                }}
                vertical={false}
            />
        </CarouselKuisionerContainer>
    )
}
