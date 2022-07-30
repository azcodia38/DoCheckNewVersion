import React from 'react'
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native'

import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { WaitingGoalInvitationIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

import { getPlaceholderImage } from 'src/utils/const'
import { GENDER } from 'src/entity/User.entity'
import {
    container_width,
    PesertaGrupContainer,
    PesertaGrupContainer2,
    SmallerRoundBoxPeserta2,
    SmallerRoundImageContainer2,
    SmallerRoundImagePeserta2,
    smaller_container_width,
    WaitingInvitationIconContainer,
} from 'components/peserta-grup/styled'
import useMemberGroup from 'src/hook/useMemberGroup'
import UseMemberGroupTransform from 'src/hook/useMemberGroupTransform'

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
    const { ImageContainer, ImagePeserta } = useMemberGroup({
        smaller: smaller,
    })

    return (
        <TouchableNativeFeedback onPress={onPress}>
            <PesertaGrupContainer>
                {(values ?? []).slice(0, 6).map((value: string, i: number) => {
                    const member_data = (options ?? []).find(
                        (v) => v.value === value
                    )
                    const is_waiting = (waitingListID ?? []).includes(
                        member_data?.value ?? ''
                    )
                    const uri = member_data?.label ?? ''

                    return (
                        <ImageContainer key={i}>
                            {!uri && (
                                <ImagePeserta
                                    source={getPlaceholderImage(GENDER.MALE)}
                                />
                            )}
                            {!!uri && <ImagePeserta source={{ uri }} />}
                            {is_waiting && (
                                <WaitingInvitationIconContainer>
                                    <WaitingGoalInvitationIcon />
                                </WaitingInvitationIconContainer>
                            )}
                        </ImageContainer>
                    )
                })}
                {(values ?? []).length > 6 && (
                    <Tipografi
                        type={'normal-bigger'}
                        style={{
                            marginLeft:
                                ((smaller
                                    ? smaller_container_width
                                    : container_width) *
                                    3) /
                                4,
                            color: '#B5B5BA',
                        }}
                    >
                        {`+${values!.length - 6}`}
                    </Tipografi>
                )}
            </PesertaGrupContainer>
        </TouchableNativeFeedback>
    )
}

export function PesertaGrup2({ options, values }: PesertaGrupProps) {
    return (
        <PesertaGrupContainer2>
            {(values ?? []).slice(0, 3).map((value: string, i: number) => {
                const uri =
                    (options ?? []).find((v) => v.value === value)?.label ?? ''
                if (!uri) {
                    ;<SmallerRoundImageContainer2
                        key={i}
                    ></SmallerRoundImageContainer2>
                }

                return (
                    <SmallerRoundImageContainer2 key={i}>
                        {!!uri && (
                            <SmallerRoundImagePeserta2 source={{ uri }} />
                        )}
                        {!uri && (
                            <SmallerRoundImagePeserta2
                                source={getPlaceholderImage(GENDER.MALE)}
                            />
                        )}
                    </SmallerRoundImageContainer2>
                )
            })}
            {(values ?? []).length > 3 && (
                <SmallerRoundImageContainer2>
                    <SmallerRoundBoxPeserta2>
                        <Tipografi
                            type={'normal'}
                            style={{ color: '#FFF', marginRight: 0.5 }}
                        >
                            +
                        </Tipografi>
                        <Tipografi
                            type={'normal'}
                            style={{ color: '#FFF' }}
                        >{`${values!.length - 3}`}</Tipografi>
                    </SmallerRoundBoxPeserta2>
                </SmallerRoundImageContainer2>
            )}
        </PesertaGrupContainer2>
    )
}

export function PesertaGrupDetailGoal({
    onPress,
    options,
    smaller,
    values,
    waitingListID,
}: PesertaGrupProps) {
    const { ImagePeserta } = useMemberGroup({ smaller })
    const { memberGroupTransform } = UseMemberGroupTransform({
        options,
        waitingListID,
        values,
    })

    return (
        <TouchableNativeFeedback onPress={onPress}>
            <PesertaGrupContainer>
                {memberGroupTransform.map(({ isWaiting, uri }, index) => (
                    <View key={index} style={styles.imageContainer}>
                        {!!uri && <ImagePeserta source={{ uri }} />}
                        {!uri && (
                            <ImagePeserta
                                source={getPlaceholderImage(GENDER.MALE)}
                            />
                        )}
                        {isWaiting ?? (
                            <WaitingInvitationIconContainer>
                                <WaitingGoalInvitationIcon />
                            </WaitingInvitationIconContainer>
                        )}
                    </View>
                ))}
                {(values ?? []).length > 4 && (
                    <Tipografi
                        type={'normal-bigger'}
                        style={{ color: '#000', fontSize: 12, padding: 5 }}
                    >
                        {`+${values!.length - 4}`}
                    </Tipografi>
                )}
            </PesertaGrupContainer>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginRight: 2,
        borderColor: '#fff',
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
})
