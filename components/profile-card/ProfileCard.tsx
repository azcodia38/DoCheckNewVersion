import moment from 'moment'
import React from 'react'
import { Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { theme } from 'src/utils/const'
import { GENDER } from 'src/entity/User.entity'
import {
    OtherUserJobIcon,
    OtherUserPinIcon,
    OtherUserProfileIcon,
    PencilEditIcon,
    SmallHeartIcon,
    SmallPinIcon,
    SmallProfileIcon,
} from '../icons/Icons'
import Loading from '../loading/Loading'
import Space from '../../src/components/atoms/space'
import Tipografi from '../../src/components/atoms/tipografi'
import {
    CenterContainer,
    ImageProfile,
    LabelValueProfile,
    LabelValueProfileFlex1,
    LabelValueProfileFlex2,
    LabelValueProfileFlex3,
    PengikutMengikutiGoal,
    ProfileCardContainer,
    UmurLokasiPekerjaan,
} from './styled'
import { getPlaceholderImage } from 'src/utils/const'
import { limitChar, removeStripLine } from 'src/utils'
import DevelopmentMode from 'src/components/atoms/developmentMode'
import { isEmpty } from 'lodash'

interface ProfileCardProps {
    imageUrl: string
    nama: string
    username: string
    deskripsi: string
    lastSync: Date
    umur: number | string | null
    lokasi: string
    pekerjaan: string
    totalPengikut: number
    totalMengikuti: number
    totalGoal: number
    noEdit?: boolean
    gender: GENDER
    onEditProfile?(): void
    loadingTotal?: boolean
    onProfilePicturePress?(): void
    onPengikutPress?(): void
    onMengikutiPress?(): void
    onGoalPress?(): void
}

export default function ProfileCard(props: ProfileCardProps) {
    return (
        <ProfileCardContainer>
            <TouchableNativeFeedback onPress={props.onProfilePicturePress}>
                <ImageProfile
                    source={
                        props.imageUrl
                            ? { uri: props.imageUrl }
                            : getPlaceholderImage(props.gender)
                    }
                />
            </TouchableNativeFeedback>
            <Space value={10} />
            <CenterContainer style={{ height: 38 }}>
                <Tipografi type={'title'} style={{ marginRight: 4 }}>
                    {limitChar(props.nama, 18)}
                </Tipografi>
                {!props.noEdit && (
                    <PencilEditIcon onPress={props.onEditProfile} />
                )}
            </CenterContainer>
            <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                {props.username}
            </Tipografi>
            {!!props.deskripsi && (
                <>
                    <Space value={4} />
                    <Tipografi
                        type={'smaller'}
                        style={{ color: '#262D33' }}
                        center
                    >
                        {limitChar(removeStripLine(props.deskripsi), 150)}
                    </Tipografi>
                </>
            )}
            {!props.noEdit && (
                <>
                    <Space value={18} />
                    <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                        {`Last Sync at ${moment(props.lastSync).format(
                            'HH:mm'
                        )}`}
                    </Tipografi>
                </>
            )}
            <Space value={10} />
            <UmurLokasiPekerjaan>
                <CenterContainer>
                    <SmallProfileIcon style={{ marginRight: 4 }} />
                    <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                        {props.umur && !isNaN(props.umur as any)
                            ? `${props.umur} tahun`
                            : 'Belum diatur'}
                    </Tipografi>
                </CenterContainer>
                <Text style={{ color: '#CCC' }}>|</Text>
                <CenterContainer>
                    <SmallPinIcon style={{ marginRight: 4 }} />
                    <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                        {isEmpty(props.lokasi)
                            ? 'Belum diatur'
                            : limitChar(props.lokasi ?? '', 8)}
                    </Tipografi>
                </CenterContainer>
                <Text style={{ color: '#CCC' }}>|</Text>
                <CenterContainer>
                    <SmallHeartIcon style={{ marginRight: 4 }} />
                    <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                        {isEmpty(props.pekerjaan)
                            ? 'Belum diatur'
                            : limitChar(props.pekerjaan ?? '', 8)}
                    </Tipografi>
                </CenterContainer>
            </UmurLokasiPekerjaan>
            <Space value={15} />
            <PengikutMengikutiGoal>
                <LabelValueProfileFlex1>
                    <TouchableOpacity onPress={props.onPengikutPress}>
                        <LabelValueProfile>
                            <Loading small loading={props.loadingTotal}>
                                <Tipografi
                                    type={'title'}
                                    style={{ color: theme.main_color }}
                                >
                                    {`${props.totalPengikut}`}
                                </Tipografi>
                            </Loading>
                            <Tipografi
                                type={'medium'}
                                style={{ marginTop: -4 }}
                            >
                                Pengikut
                            </Tipografi>
                        </LabelValueProfile>
                    </TouchableOpacity>
                </LabelValueProfileFlex1>
                <LabelValueProfileFlex2>
                    <TouchableOpacity onPress={props.onMengikutiPress}>
                        <LabelValueProfile>
                            <Loading small loading={props.loadingTotal}>
                                <Tipografi
                                    type={'title'}
                                    style={{ color: theme.main_color }}
                                >
                                    {`${props.totalMengikuti}`}
                                </Tipografi>
                            </Loading>
                            <Tipografi
                                type={'medium'}
                                style={{ marginTop: -4 }}
                            >
                                Mengikuti
                            </Tipografi>
                        </LabelValueProfile>
                    </TouchableOpacity>
                </LabelValueProfileFlex2>
                <LabelValueProfileFlex3>
                    <TouchableOpacity onPress={props.onGoalPress}>
                        <LabelValueProfile>
                            <Loading small loading={props.loadingTotal}>
                                <Tipografi
                                    type={'title'}
                                    style={{ color: theme.main_color }}
                                >
                                    {`${props.totalGoal}`}
                                </Tipografi>
                            </Loading>
                            <Tipografi
                                type={'medium'}
                                style={{ marginTop: -4 }}
                            >
                                Goal
                            </Tipografi>
                        </LabelValueProfile>
                    </TouchableOpacity>
                </LabelValueProfileFlex3>
            </PengikutMengikutiGoal>
        </ProfileCardContainer>
    )
}
