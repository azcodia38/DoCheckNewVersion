/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import Loading from 'components/loading/Loading'
import { KuisionerContent } from 'src/pages/inside-pages/kuisioner/styled'
import CarouselKuisioner, {
    CarouselKuisionerData,
} from 'src/components/atoms/carouselQuestionnaires'

interface ContentProps {
    loading: boolean
    activeIndex: number
    questionaireList: CarouselKuisionerData[]
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    onValuesChange: (index: number, new_values: string[]) => void
}

export default function Content({
    activeIndex,
    loading,
    onValuesChange,
    questionaireList,
    setActiveIndex,
}: ContentProps) {
    return (
        <KuisionerContent>
            <Loading loading={loading}>
                <CarouselKuisioner
                    activeIndex={activeIndex}
                    data={questionaireList}
                    setActiveIndex={setActiveIndex}
                    onValuesChange={onValuesChange}
                />
            </Loading>
        </KuisionerContent>
    )
}
