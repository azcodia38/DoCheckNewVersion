import React from 'react'
import { size, uniqueId } from 'lodash'

import { WaitingGoalInvitationIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'
import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import {
    container_width,
    PesertaGrupContainer,
    smaller_container_width,
    WaitingInvitationIconContainer,
} from 'components/peserta-grup/styled'

import { getPlaceholderImage } from 'src/utils/const'
import { GENDER } from 'src/entity/User.entity'
import useMemberGroup from 'src/hook/useMemberGroup'
import UseMemberGroupTransform from 'src/hook/useMemberGroupTransform'

interface MemberListProps {
    smaller?: boolean
    options?: RadioOption<string>[]
    values?: string[]
    waitingListID?: string[]
}

export default function MemberList({
    options,
    smaller,
    values,
    waitingListID,
}: MemberListProps) {
    const { ImageContainer, ImagePeserta } = useMemberGroup({
        smaller,
        isVerySmall: true,
    })

    const { memberGroupTransform } = UseMemberGroupTransform({
        options,
        waitingListID,
        values,
    })

    return (
        <PesertaGrupContainer>
            {memberGroupTransform.map(({ isWaiting, uri }, index) => (
                <ImageContainer key={index}>
                    {!!uri && <ImagePeserta source={{ uri }} key={index} />}
                    {!uri && (
                        <ImagePeserta
                            source={getPlaceholderImage(GENDER.MALE)}
                            key={index}
                        />
                    )}
                    {isWaiting ?? (
                        <WaitingInvitationIconContainer>
                            <WaitingGoalInvitationIcon />
                        </WaitingInvitationIconContainer>
                    )}
                </ImageContainer>
            ))}
            {size(values) > 4 && (
                <Tipografi
                    type={'small'}
                    style={{
                        marginLeft:
                            ((smaller
                                ? smaller_container_width
                                : container_width) *
                                3) /
                            6,
                        color: '#000',
                    }}
                >
                    {`+${values!.length - 4}`}
                </Tipografi>
            )}
        </PesertaGrupContainer>
    )
}
