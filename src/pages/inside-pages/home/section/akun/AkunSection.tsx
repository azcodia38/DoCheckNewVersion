/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { DeviceEventEmitter, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { DebugAlert } from 'src/utils/alert'

// @components
import { ImageKeluar } from 'components/icons/Icons'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'
import ProfileButtons from 'components/profile-buttons/ProfileButtons'
import ProfileCard from 'components/profile-card/ProfileCard'
import ScrollView from 'src/components/atoms/scrollView'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import LoadingFull from 'components/loading/LoadingFull'
import DevelopmentMode from 'src/components/atoms/developmentMode'
import Version from 'src/components/atoms/version'
import LogoutButton from 'src/components/atoms/button/logoutButton'

// @hook
import useAuthorization from 'src/hook/useAuthorization'
import { NavProps } from 'src/utils/const'
import { resetGoal, resetPinnedGoal, resetTask } from 'src/store/actions'
import { removeUserLoginData, setUserLoginData } from 'store/data/user'
import StoreData from 'store/types'

// @pages
import { WebViewPageParams } from 'src/pages/webview/params'
import { ValidasiPasswordPageParams } from 'src/pages/inside-pages/akun/validasi-password/params'
import { UserListPageParams } from 'src/pages/inside-pages/user-list/params'

import {
    clearAsyncStorage,
    getFirstAndMiddleName,
    getUsername,
    limitChar,
    titleCase,
    TotalData,
} from 'src/utils'
import { ACCOUNT_TYPE, User } from 'src/entity/User.entity'

// @hook
import {
    myProfileAPI,
    totalFollowerAPI,
    totalFollowingAPI,
    totalGoalAPI,
    updateFCMTokenAPI,
} from 'src/api/profile'
import { followersAPI, followingsAPI } from 'src/api/user'
import useConnected from 'src/hook/useConnected'
import AppContext from 'src/context/AppContext'

interface AkunSectionProps extends NavProps {}

function AkunSection(props: AkunSectionProps) {
    const dispatch = useDispatch()
    const { connected } = useConnected()
    const auth = useAuthorization(props.navigation)

    const userLoginData = useSelector(
        ({ user_login_data }: StoreData) => user_login_data
    )
    const user = useSelector((store: StoreData) => store.user_login_data.user)

    const { disableQuestionaires } = useContext(AppContext)

    const [showPopupLogout, setShowPopupLogout] = useState<boolean>(false)
    const [loadingTotal, setLoadingTotal] = useState<boolean>(false)
    const [loadingLogout, setLoadingLogout] = useState<boolean>(false)
    const [total_data, setTotalData] = useState<TotalData>({
        goal: 0,
        follower: 0,
        following: 0,
    })
    const [followers, setFollowers] = useState<User[]>([])
    const [followings, setFollowings] = useState<User[]>([])

    const userProfileBirthdate = useMemo(
        () =>
            user.birthDate
                ? moment(new Date()).diff(user.birthDate, 'years').toFixed(0)
                : null,
        [user.birthDate]
    )

    const getTotals = useCallback(async () => {
        setLoadingTotal(true)
        try {
            const _ = await myProfileAPI(auth, {
                connected,
                fallback() {
                    return user
                },
            })
            setFollowers(
                await followersAPI(auth, user.id, {
                    connected,
                    fallback() {
                        return []
                    },
                })
            )
            setFollowings(
                await followingsAPI(auth, user.id, {
                    connected,
                    fallback() {
                        return []
                    },
                })
            )
            setTotalData({
                goal: await totalGoalAPI(auth, {
                    connected,
                    fallback() {
                        return total_data.goal
                    },
                }),
                following: await totalFollowingAPI(auth, {
                    connected,
                    fallback() {
                        return total_data.following
                    },
                }),
                follower: await totalFollowerAPI(auth, {
                    connected,
                    fallback() {
                        return total_data.follower
                    },
                }),
            })
            dispatch(
                setUserLoginData({
                    user: _,
                    access_token: userLoginData.access_token,
                })
            )
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoadingTotal(false)
        }
    }, [
        setLoadingTotal,
        myProfileAPI,
        connected,
        auth,
        user,
        setFollowers,
        followersAPI,
        setFollowings,
        setTotalData,
        totalGoalAPI,
        totalFollowingAPI,
        totalFollowerAPI,
        setUserLoginData,
        userLoginData,
        setLoadingTotal,
    ])

    const resettingState = useCallback(() => {
        dispatch(removeUserLoginData())
        dispatch(resetGoal())
        dispatch(resetPinnedGoal())
        dispatch(resetTask())
        AsyncStorage.setItem('is_logged_in', '0')
    }, [
        resetGoal,
        resetPinnedGoal,
        resetTask,
        removeUserLoginData,
        AsyncStorage,
    ])

    const logoutHandler = useCallback(async () => {
        setLoadingLogout(true)
        try {
            await updateFCMTokenAPI(auth, '', {
                connected,
                fallback() {
                    return true
                },
            })
        } catch (err: any) {
            //
        } finally {
            resettingState()
            await clearAsyncStorage() // removing the asyncStorage
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'First',
                    },
                ],
            })
            setLoadingLogout(false)
        }
    }, [
        setLoadingLogout,
        updateFCMTokenAPI,
        connected,
        resettingState,
        setLoadingLogout,
        clearAsyncStorage,
    ])

    const gotoEditProfile = useCallback(
        () => props.navigation.navigate('EditProfile'),
        [props.navigation]
    )

    const gotoDaftarPengikut = useCallback(() => {
        const params: UserListPageParams = {
            users: followers,
            title: 'Pengikut',
        }
        props.navigation.navigate('UserList', params)
    }, [followers, props.navigation])

    const gotoDaftarMengikuti = useCallback(() => {
        const params: UserListPageParams = {
            users: followings,
            title: 'Mengikuti',
        }
        props.navigation.navigate('UserList', params)
    }, [followings, props.navigation])

    const listenerSuccessValidatePasswordForEmailChange = useCallback(() => {
        DeviceEventEmitter.removeListener(
            'email-change',
            listenerSuccessValidatePasswordForEmailChange
        )
        props.navigation.navigate('EditEmail')
    }, [DeviceEventEmitter, props.navigation])

    const listenerSuccessValidatePasswordForPasswordChange = useCallback(() => {
        DeviceEventEmitter.removeListener(
            'password-change',
            listenerSuccessValidatePasswordForPasswordChange
        )
        props.navigation.navigate('EditPassword')
    }, [DeviceEventEmitter, props.navigation])

    const onRefresh = useCallback(() => getTotals(), [getTotals])

    const profileButtonMenu = useMemo(
        () => [
            {
                group_title: 'Pengaturan',
                data: [
                    // {
                    //     label: 'Ubah Rekomendasi',
                    //     onPress() {
                    //         const params: KuisionerPageParams = {
                    //             mode: 'edit',
                    //         }
                    //         props.navigation.navigate('Kuisioner', params)
                    //     },
                    // },
                    {
                        label: 'Ubah Email',
                        onPress() {
                            DeviceEventEmitter.addListener(
                                'email-change',
                                listenerSuccessValidatePasswordForEmailChange
                            )
                            const params: ValidasiPasswordPageParams = {
                                emit_key: 'email-change',
                                title: 'Ubah Email',
                            }
                            props.navigation.navigate(
                                'EditEmail',
                                params
                            )
                        },
                        disable: user.accountType !== ACCOUNT_TYPE.REGULAR,
                    },
                    {
                        label: 'Ubah Kata Sandi',
                        onPress() {
                            DeviceEventEmitter.addListener(
                                'password-change',
                                listenerSuccessValidatePasswordForPasswordChange
                            )
                            const params: ValidasiPasswordPageParams = {
                                emit_key: 'password-change',
                            }
                            props.navigation.navigate(
                                'ValidasiPassword',
                                params
                            )
                        },
                        disable: user.accountType !== ACCOUNT_TYPE.REGULAR,
                    },
                ],
            },
            {
                group_title: 'Undang Teman',
                data: [
                    {
                        label: 'Undang Teman',
                        onPress() {
                            props.navigation.navigate('UndangTeman')
                        },
                    },
                ],
            },
            {
                group_title: 'Bantuan',
                data: [
                    {
                        label: 'Kebijakan dan Privasi Pengguna',
                        onPress() {
                            const params: WebViewPageParams = {
                                title: 'Kebijakan Privasi Pengguna',
                                url: 'https://docheck.id/app/kebijakan-privasi',
                            }
                            props.navigation.navigate('WebView', params)
                        },
                    },
                    {
                        label: 'FAQ',
                        onPress() {
                            const params: WebViewPageParams = {
                                title: 'FAQ',
                                url: 'https://app.docheck.id/faq',
                            }
                            props.navigation.navigate('WebView', params)
                        },
                    },
                    {
                        label: 'Syarat dan Ketentuan',
                        onPress() {
                            const params: WebViewPageParams = {
                                title: 'Syarat dan Ketentuan',
                                url: 'https://docheck.id/app/syarat-dan-ketentuan',
                            }
                            props.navigation.navigate('WebView', params)
                        },
                    },
                    {
                        label: 'Kirim Feedback',
                        onPress() {
                            props.navigation.navigate('Feedback')
                        },
                    },
                ],
            },
        ],
        [
            props.navigation,
            user.accountType,
            listenerSuccessValidatePasswordForEmailChange,
            listenerSuccessValidatePasswordForPasswordChange,
            disableQuestionaires,
        ]
    )

    useEffect(() => {
        getTotals()
    }, [])

    const username = useMemo(
        () => limitChar(titleCase(getFirstAndMiddleName(user.fullname)), 18),
        [user.fullname]
    )

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
            >
                <WithPadding>
                    <Space value={32} />
                    <ProfileCard
                        imageUrl={user.profilePicture}
                        nama={username}
                        username={getUsername(user)}
                        deskripsi={user.description}
                        lastSync={new Date()}
                        umur={userProfileBirthdate}
                        lokasi={user.city}
                        pekerjaan={user.hobby}
                        totalPengikut={total_data.follower}
                        totalMengikuti={total_data.following}
                        totalGoal={total_data.goal}
                        gender={user.gender}
                        loadingTotal={loadingTotal}
                        onEditProfile={gotoEditProfile}
                        onPengikutPress={gotoDaftarPengikut}
                        onMengikutiPress={gotoDaftarMengikuti}
                    />
                    <Space value={25} />
                    <ProfileButtons data={profileButtonMenu} />
                    <DevelopmentMode />
                    <Space value={5} />
                    <LogoutButton logoutHandler={setShowPopupLogout} />
                    <Space value={10} />
                    <Version />
                    <Space value={35} />
                </WithPadding>
            </ScrollView>
            <LoadingFull loading={loadingLogout} />
            <PopupYesNo
                show={showPopupLogout}
                setShow={setShowPopupLogout}
                image={<ImageKeluar />}
                title={'Yakin Ingin Keluar?'}
                labelNo={'Batal'}
                labelYes={'Keluar'}
                onYes={logoutHandler}
                onNo={() => {
                    setShowPopupLogout(false)
                }}
                cancelable
            />
        </>
    )
}

export default React.memo(AkunSection, () => true)
