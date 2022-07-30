import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { PesertaGrupContainer } from 'components/peserta-grup/styled'
import PesertaGrupBody from 'src/components/atoms/memberGroup/pesertaGrupBody'
import TipographyGroup from 'src/components/atoms/memberGroup/tipographyGroup'

interface PesertaGrupProps {
    smaller?: boolean
    options?: RadioOption<string>[]
    values?: string[]
    onPress?(): void
    waitingListID?: string[]
    ownerId?: string
}

export default function PesertaGrup({
    onPress,
    options,
    smaller,
    values,
    waitingListID,
}: PesertaGrupProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <PesertaGrupContainer>
                {(values ?? []).slice(0, 6).map((value, index) => {
                    const memberValue = (options ?? []).find(
                        (v) => v.value === value
                    )
                    return (
                        <PesertaGrupBody
                            waitingListID={waitingListID}
                            uri={memberValue?.label}
                            key={index}
                            smaller={smaller}
                        />
                    )
                })}
                <TipographyGroup smaller={smaller} values={values} />
            </PesertaGrupContainer>
        </TouchableNativeFeedback>
    )
}
