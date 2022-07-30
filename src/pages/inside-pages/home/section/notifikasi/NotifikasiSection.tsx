/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging'

import { DebugAlert } from 'src/utils/alert'

import { confirmInvitationMemberGoalAPI } from 'src/api/my-goal'
import { allNotifikasiAPI } from 'src/api/notifikasi'
import { followAPI, followingsAPI } from 'src/api/user'

import GrupNotifikasi from 'components/grup-notifikasi/GrupNotifikasi'
import Header from 'components/header/Header'
import { NotificationListLoading } from 'components/loader-collections'

import { NavProps } from 'src/utils/const'
import { Notification, NOTIFICATION_TYPE } from 'src/entity/Notification.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { useStateRef } from 'src/hook/useStateRef'
import useConnected from 'src/hook/useConnected'
import StoreData from 'store/types'
import { NotifikasiSectionContainer } from 'src/pages/inside-pages/home/section/notifikasi/styled'

interface NotifikasiSectionProps extends NavProps {}

function NotifikasiSection(props: NotifikasiSectionProps) {
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const user = useSelector((_: StoreData) => _.user_login_data.user)
    const [listNotifikasi, setListNotifikasi] = useState<Notification[]>([])
    const [listIdLoading, setListIDLoading] = useStateRef<string[]>([])
    const [listFollowingId, setListFollowingID] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const filterEmptyNotification = useCallback(
        (n: Notification) => {
            switch (n.type) {
                case NOTIFICATION_TYPE.FOLLOWER:
                    return n.sourceUser
                case NOTIFICATION_TYPE.GOALINVITATION:
                    return n.sourceUser && n.sourceGoal
                default:
                    return true
            }
        },
        [NOTIFICATION_TYPE]
    )

    const followUser = useCallback(
        async (notification: Notification) => {
            setListIDLoading([
                ...listIdLoading.current.filter((id) => id !== notification.id),
                notification.id,
            ])
            try {
                await followAPI(auth, notification.sourceUser.id)
                const listFollowing = await followingsAPI(auth, user.id)
                setListFollowingID(listFollowing.map((x) => x.id))
            } catch (err: any) {
                DebugAlert(err.toString())
            } finally {
                setListIDLoading(
                    listIdLoading.current.filter((id) => id !== notification.id)
                )
            }
        },
        [
            setListIDLoading,
            listIdLoading,
            followAPI,
            auth,
            followingsAPI,
            setListFollowingID,
        ]
    )

    const konfirmasiInvitationGoal = useCallback(
        async (notification: Notification) => {
            setListIDLoading([
                ...listIdLoading.current.filter((id) => id !== notification.id),
                notification.id,
            ])
            try {
                await confirmInvitationMemberGoalAPI(
                    auth,
                    notification.sourceGoal.id
                )
                const _ = await allNotifikasiAPI(auth)
                setListNotifikasi(_.filter(filterEmptyNotification))
            } catch (err: any) {
                DebugAlert(err.toString())
            } finally {
                setListIDLoading(
                    listIdLoading.current.filter((id) => id !== notification.id)
                )
            }
        },
        [
            setListIDLoading,
            listIdLoading,
            confirmInvitationMemberGoalAPI,
            auth,
            allNotifikasiAPI,
            setListNotifikasi,
            filterEmptyNotification,
        ]
    )

    const onNotificationPress = useCallback(
        (notification: Notification) => {
            switch (notification.type) {
                case NOTIFICATION_TYPE.GOALINVITATION:
                    konfirmasiInvitationGoal(notification)
                    break
                case NOTIFICATION_TYPE.FOLLOWER:
                    followUser(notification)
                default:
                    return
            }
        },
        [konfirmasiInvitationGoal, followUser, NOTIFICATION_TYPE]
    )

    const getNotificationData = useCallback(async () => {
        setLoading(true)
        try {
            const _ = await allNotifikasiAPI(auth, {
                connected,
                fallback() {
                    return []
                },
            })
            const listFollowing = await followingsAPI(auth, user.id, {
                connected,
                fallback() {
                    return []
                },
            })
            setListNotifikasi(_.filter(filterEmptyNotification))
            setListFollowingID(listFollowing.map((x) => x.id))
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        allNotifikasiAPI,
        connected,
        followingsAPI,
        auth,
        user.id,
        setListNotifikasi,
        filterEmptyNotification,
        setListFollowingID,
    ])

    const onRefresh = useCallback(
        () => getNotificationData(),
        [getNotificationData]
    )

    useEffect(() => {
        getNotificationData()
    }, [])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            getNotificationData()
        })
        function unsubscribeAll() {
            unsubscribe()
        }
        return unsubscribeAll
    }, [])

    return (
        <NotifikasiSectionContainer>
            <Header titleDetail={'Notifikasi'} withMargihLeft />
            {loading && <NotificationListLoading />}
            {/* <TouchableOpacity
                onPress={() => props.navigation.navigate('DailyTask')}
            > */}
            <GrupNotifikasi
                loading={loading}
                loadingIDs={listIdLoading.current}
                listFollowingID={listFollowingId}
                myUserID={user.id}
                onNotificationPress={onNotificationPress}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
                data={listNotifikasi}
            />
            {/* </TouchableOpacity> */}
        </NotifikasiSectionContainer>
    )
}

export default React.memo(NotifikasiSection, () => true)
