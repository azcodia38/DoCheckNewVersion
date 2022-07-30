import React, { useMemo } from 'react'

import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { WaitingGoalInvitationIcon } from 'components/icons/Icons'
import { getPlaceholderImage } from 'src/utils/const'
import { GENDER } from 'src/entity/User.entity'
import { WaitingInvitationIconContainer } from 'components/peserta-grup/styled'
import useMemberGroup from 'src/hook/useMemberGroup'

interface PesertaGrupBodyProps {
    waitingListID?: string[]
    uri?: string
    memberValue?: RadioOption<string>
    smaller?: boolean
}

export default function PesertaGrupBody({
    uri,
    waitingListID = [],
    memberValue,
    smaller,
}: PesertaGrupBodyProps) {
    const { ImageContainer, ImagePeserta } = useMemberGroup({ smaller })

    const isWaiting = useMemo(
        () => waitingListID.includes(memberValue?.value ?? ''),
        [waitingListID, memberValue]
    )

    return (
        <ImageContainer>
            {!uri && <ImagePeserta source={getPlaceholderImage(GENDER.MALE)} />}
            {!!uri && <ImagePeserta source={{ uri }} />}
            {isWaiting && (
                <WaitingInvitationIconContainer>
                    <WaitingGoalInvitationIcon />
                </WaitingInvitationIconContainer>
            )}
        </ImageContainer>
    )
}
