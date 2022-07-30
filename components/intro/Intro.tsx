import React, { useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'

import IntroButton from 'components/intro-button/IntroButton'
import IntroDotIndicator from 'components/intro-dot-indicator/IntroDotIndicator'
import Tipografi from 'src/components/atoms/tipografi'
import {
    BackButton,
    BackSkipButtonContainer,
    IntroContainer,
    IntroContainerNavActions,
    IntroItem,
    IntroItemImage,
    IntroNavigation,
    IntroNavigationImageBackground,
    SkipButton,
} from './styled'
import Images from 'src/assets'

import { accessibilitylabels } from 'src/utils/types/componentsTypes'

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window')
const intro_navigation_height = viewportWidth * 0.467

interface CarouselData {
    image_uri: NodeRequire
    title: string
    description: string
}

const CAROUSEL_DATA: CarouselData[] = [
    {
        image_uri: require('src/assets/images/intro-1.png'),
        title: 'Atur Aktivitas\nHidup Berkualitas',
        description:
            'Capai tujuan hidup kamu dengan\nchecklist aktivitas sesuai kebutuhan dan\nkeinginan.',
    },
    {
        image_uri: require('src/assets/images/intro-2.png'),
        title: 'Temukan Apa yang\nKamu Suka',
        description:
            'Kamu suka ini, kamu suka itu.\nApapun yang kamu suka, kami berikan\nrekomendasi aktivitas untuk kamu nikmati.',
    },
    {
        image_uri: require('src/assets/images/intro-3.png'),
        title: 'Makin Dekat\nMakin Erat',
        description:
            'Saling terhubung dengan teman,\nkeluarga, rekan kerja, serta orang yang\nkamu sayangi.',
    },
]

interface IntroProps {
    finishAction(): void
}

export default function Intro(props: IntroProps) {
    const ref = useRef(null)
    const [active_index, setActiveIndex] = useState<number>(0)

    function nextCarousel() {
        if (active_index === 2) {
            props.finishAction()
            return
        }

        setActiveIndex(active_index + 1)
        ;(ref.current as any).snapToNext()
    }

    function prevCarousel() {
        if (active_index === 0) {
            return
        }

        setActiveIndex(active_index - 1)
        ;(ref.current as any).snapToPrev()
    }

    function renderItem(x: { item: CarouselData }) {
        const item = x.item
        return (
            <IntroItem>
                <IntroItemImage source={item.image_uri as any} />
                <View>
                    <Tipografi
                        style={{ textAlign: 'center', color: '#000000' }}
                        type={'big-title'}
                    >
                        {item.title}
                    </Tipografi>
                    <Tipografi
                        style={{
                            textAlign: 'center',
                            color: '#9597A4',
                            marginTop: 12,
                        }}
                        type={'small'}
                    >
                        {item.description}
                    </Tipografi>
                </View>
            </IntroItem>
        )
    }

    return (
        <IntroContainer>
            <Carousel
                ref={ref}
                data={CAROUSEL_DATA}
                inactiveSlideScale={1}
                renderItem={renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                onSnapToItem={setActiveIndex}
                style={{
                    flex: 1,
                }}
                vertical={false}
            />
            <IntroNavigation
                style={{
                    height: intro_navigation_height,
                }}
            >
                <IntroNavigationImageBackground
                    source={Images.intro.introBottomBackground}
                />
                <IntroButton onPress={nextCarousel} style={{ marginTop: 8 }} />
                <IntroContainerNavActions>
                    <BackSkipButtonContainer>
                        {active_index > 0 && (
                            <TouchableOpacity
                                onPress={prevCarousel}
                                accessibilityLabel={
                                    accessibilitylabels.backIntro
                                }
                            >
                                <BackButton>BACK</BackButton>
                            </TouchableOpacity>
                        )}
                    </BackSkipButtonContainer>
                    <IntroDotIndicator
                        totalDots={3}
                        activeDot={active_index}
                        style={{ flex: 1 }}
                    />
                    <BackSkipButtonContainer>
                        <TouchableOpacity
                            onPress={props.finishAction}
                            accessibilityLabel={accessibilitylabels.skipIntro}
                        >
                            <SkipButton>
                                {active_index === 2 ? 'MASUK' : 'SKIP'}
                            </SkipButton>
                        </TouchableOpacity>
                    </BackSkipButtonContainer>
                </IntroContainerNavActions>
            </IntroNavigation>
        </IntroContainer>
    )
}
