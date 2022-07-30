/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { ScrollView } from 'react-native'

import FormBubbleInput from 'components/form/form-bubble-input/FormBubbleInput'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import {
    CarouseItemInputContainer,
    CarouselItemContainer,
} from 'src/components/atoms/carouselQuestionnaires/styled'
import { CarouselKuisionerData } from 'src/components/atoms/carouselQuestionnaires'
import FormDropdown2Input from 'components/form/form-dropdown-input/FormDropdown2Input'

interface CarouselQuestionnairesSingleItemProps {
    item: CarouselKuisionerData
    index: number
    onValuesChange: (index: number, values: string[]) => void
}

export default function CarouselQuestionnairesSingleItem(
    props: CarouselQuestionnairesSingleItemProps
) {
    return (
        <WithPadding>
            <CarouselItemContainer>
                <Tipografi type={'small'} style={{ color: '#666666' }}>
                    {props.item.description}
                </Tipografi>
                <Space value={24} />
                <Tipografi
                    type={'label'}
                    style={{ color: '#000', fontSize: 17 }}
                >
                    {props.item.title}
                </Tipografi>
                <Space value={18} />
                <CarouseItemInputContainer>
                    <ScrollView>
                        {props.item.type === 'dropdown' && (
                            <FormDropdown2Input
                                labelOptions={`Pilih ${props.item.topic}`}
                                state={'special-dropdown'}
                                placeholder={'Pilih'}
                                value={
                                    props.item.values.length > 0
                                        ? props.item.values[0]
                                        : ''
                                }
                                options={props.item.options}
                                optionStyle={{
                                    paddingLeft: 18,
                                }}
                                useRelativeOptions
                                editable={true}
                                onValueChange={(newval: string) =>
                                    props.onValuesChange(props.index, [newval])
                                }
                            />
                        )}
                        {props.item.type === 'bubble' && (
                            <FormBubbleInput
                                labelOptions={`Pilih ${props.item.topic}`}
                                state={'special-dropdown'}
                                values={props.item.values}
                                options={props.item.options}
                                onValuesChange={(newval: string[]) =>
                                    props.onValuesChange(props.index, newval)
                                }
                            />
                        )}
                    </ScrollView>
                </CarouseItemInputContainer>
            </CarouselItemContainer>
        </WithPadding>
    )
}
