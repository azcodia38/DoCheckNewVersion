/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-community/clipboard'

import { DebugAlert } from 'src/utils/alert'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import { ImageBerhasilDiubah, ImageNoReferal } from 'components/icons/Icons'
import Loading from 'components/loading/Loading'
import OnlyShow from 'components/only-show/OnlyShow'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import { SearchItem } from 'components/search-result/SearchResult'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps, theme } from 'src/utils/const'
import { allReferalAPI, allReferalWithGoalsAPI } from 'src/api/referal'
import { User } from 'src/entity/User.entity'
import useAuthorization from 'src/hook/useAuthorization'
import StoreData from 'store/types'
import { getUsername, share } from 'src/utils'
import { UndangTemanPageContainer } from './styled'
import useConnected from 'src/hook/useConnected'
import Button from 'src/components/atoms/button'

interface UndangTemanPageProps extends NavProps {}

export default function UndangTemanPage(props: UndangTemanPageProps) {
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()
    const user = useSelector((_: StoreData) => _.user_login_data.user)

    const [showPopupCopied, setShowPopupDisalin] = useState<boolean>(false)
    const [listReferral, setListReferal] = useState<User[]>([])
    const [listReferralWithGoals, setListReferalWithGoals] = useState<User[]>(
        []
    )
    const [loadingReferral, setLoadingReferal] = useState<boolean>()

    const referralUrl = useMemo(
        () => `https://app.docheck.id/join/${user.referralCode}`,
        [user.referralCode]
    )

    const getReferalData = useCallback(async () => {
        setLoadingReferal(true)
        try {
            setListReferal(
                await allReferalAPI(auth, {
                    connected,
                    fallback() {
                        return []
                    },
                })
            )
            setListReferalWithGoals(
                await allReferalWithGoalsAPI(auth, {
                    connected,
                    fallback() {
                        return []
                    },
                })
            )
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoadingReferal(false)
        }
    }, [
        setLoadingReferal,
        setListReferal,
        allReferalAPI,
        auth,
        connected,
        setListReferalWithGoals,
        allReferalWithGoalsAPI,
    ])

    const shareReferal = useCallback(
        () => share(referralUrl),
        [share, referralUrl]
    )

    const showPopupSalin = useCallback(() => {
        Clipboard.setString(referralUrl)
        setShowPopupDisalin(true)
        setTimeout(() => setShowPopupDisalin(false), 1000)
    }, [referralUrl, setShowPopupDisalin, Clipboard])

    useEffect(() => {
        getReferalData()
    }, [])

    return (
        <DocheckSafeAreaView>
            <UndangTemanPageContainer>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={'Undang Teman'}
                        navigation={props.navigation}
                        style={{ marginBottom: 18 }}
                        withBack
                        greenArrow
                    />
                </WithPadding>
                <ScrollView style={{ flex: 1 }}>
                    <WithPadding
                        style={{
                            paddingLeft: theme.left_right_padding * 1.2,
                            paddingRight: theme.left_right_padding * 1.2,
                        }}
                    >
                        <Space value={30} />
                        <Tipografi
                            style={{ textAlign: 'center', color: '#444145' }}
                            type={'label'}
                        >
                            Dapatkan kuntungan dari DoCheck
                        </Tipografi>
                        <Space value={10} />
                        <Tipografi
                            style={{ textAlign: 'center', color: '#444145' }}
                            type={'small'}
                        >
                            {'untuk setiap teman yang kamu\nundang ke DoCheck'}
                        </Tipografi>
                        <Space value={30} />
                        <FormTextInput
                            state={'done'}
                            editable={false}
                            value={referralUrl}
                            inputStyle={{ color: '#77838F', letterSpacing: 1 }}
                            rightItem={
                                <View style={{ marginRight: 7 }}>
                                    <Button
                                        noShadow
                                        onPress={showPopupSalin}
                                        style={{
                                            paddingTop: 11,
                                            paddingBottom: 11,
                                            marginTop: 6,
                                            marginBottom: 6,
                                        }}
                                        textStyle={{
                                            fontSize: 12,
                                            fontFamily: 'OpenSans-Regular',
                                            letterSpacing: 1,
                                            color: '#FFF',
                                        }}
                                    >
                                        Salin
                                    </Button>
                                </View>
                            }
                        />
                        <Tipografi
                            style={{ textAlign: 'center', color: '#444145' }}
                            type={'small'}
                        >
                            Atau
                        </Tipografi>
                        <Space value={10} />
                        <Button
                            onPress={shareReferal}
                            containerStyle={{ width: 140, alignSelf: 'center' }}
                            textStyle={{
                                fontSize: 12,
                                fontFamily: 'OpenSans-Regular',
                                letterSpacing: 1,
                                color: '#FFF',
                            }}
                        >
                            Undang Teman
                        </Button>
                        <Space value={45} />
                        <Tipografi style={{ color: '#444145' }} type={'label'}>
                            Teman yang berhasil Daftar
                        </Tipografi>
                        <OnlyShow
                            if={listReferral.length === 0 && !loadingReferral}
                        >
                            <ImageNoReferal />
                        </OnlyShow>
                        <OnlyShow if={loadingReferral}>
                            <Space value={36} />
                            <Loading loading={loadingReferral} />
                            <Space value={56} />
                        </OnlyShow>
                        {listReferral.map((user: User, i: number) => (
                            <SearchItem
                                key={user.id}
                                firstItem={i === 0}
                                lastItem={i === listReferral.length - 1}
                                imageUrl={user.profilePicture}
                                name={user.fullname}
                                username={getUsername(user)}
                                gender={user.gender}
                                noPadding
                            />
                        ))}
                        <Tipografi style={{ color: '#444145' }} type={'label'}>
                            Teman yang berhasil Menggunakan
                        </Tipografi>
                        <OnlyShow
                            if={
                                listReferralWithGoals.length === 0 &&
                                !loadingReferral
                            }
                        >
                            <ImageNoReferal />
                        </OnlyShow>
                        <OnlyShow if={loadingReferral}>
                            <Space value={36} />
                            <Loading loading={loadingReferral} />
                            <Space value={56} />
                        </OnlyShow>
                        {listReferralWithGoals.map((user: User, i: number) => (
                            <SearchItem
                                key={user.id}
                                firstItem={i === 0}
                                lastItem={
                                    i === listReferralWithGoals.length - 1
                                }
                                imageUrl={user.profilePicture}
                                name={user.fullname}
                                username={getUsername(user)}
                                gender={user.gender}
                                noPadding
                            />
                        ))}
                        <Space value={45} />
                    </WithPadding>
                </ScrollView>
            </UndangTemanPageContainer>
            <PopupNormalOK
                style={{
                    paddingBottom: 32,
                    paddingTop: 32,
                }}
                animationIn={'slideInDown'}
                show={showPopupCopied}
                setShow={setShowPopupDisalin}
                onCancelRequest={() => {
                    setShowPopupDisalin(false)
                }}
                title={'Berhasil disalin'}
                image={<ImageBerhasilDiubah />}
                noButton
            />
        </DocheckSafeAreaView>
    )
}
