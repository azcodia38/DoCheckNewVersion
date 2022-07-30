/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'

// @components

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import LoadingSync from 'components/loading/LoadingSync'

import { BottomSection, HomepageContainer, MainSection } from './styled'

// @helpers
import { isIOS } from 'src/utils'
import { HOMEBAR_KEY_TYPE } from 'src/utils/types/componentsTypes'
import WithHomepageHOC, { WithHomepageHOCProps } from 'src/hoc/withHomepageHOC'

const { width: viewportWidth } = Dimensions.get('window')

export default WithHomepageHOC(function HomePage({
    bottomInset,
    createGoalComponent,
    renderItem,
    setForwardRef,
}: WithHomepageHOCProps) {
    const ref = useRef<Carousel<any>>(null)

    useEffect(() => setForwardRef(ref?.current), [ref?.current])

    return (
        <>
            <DocheckSafeAreaView withPanel={true}>
                <HomepageContainer>
                    <MainSection>
                        <Carousel
                            ref={ref}
                            data={HOMEBAR_KEY_TYPE}
                            inactiveSlideOpacity={0.8}
                            inactiveSlideScale={1}
                            renderItem={renderItem}
                            sliderWidth={viewportWidth}
                            scrollEnabled={false}
                            itemWidth={viewportWidth}
                            keyExtractor={(m) => m}
                            layout={'default'}
                            style={{
                                flex: 1,
                            }}
                            vertical={false}
                        />
                    </MainSection>
                    <BottomSection
                        style={{
                            marginBottom: isIOS ? -bottomInset || -15 : 0,
                        }}
                    >
                        {createGoalComponent}
                    </BottomSection>
                </HomepageContainer>
            </DocheckSafeAreaView>
            <LoadingSync />
        </>
    )
})
