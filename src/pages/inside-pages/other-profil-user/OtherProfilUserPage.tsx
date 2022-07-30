/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { size } from 'lodash'

import { DebugAlert } from 'src/utils/alert'

import {
    followAPI,
    followersAPI,
    followingsAPI,
    followingStatusUserAPI,
    totalFollowerUserAPI,
    totalFollowingUserAPI,
    totalGoalUserAPI,
    unfollowAPI,
    userByIDAPI,
    userGoalsAPI,
} from 'src/api/user'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import Header from 'components/header/Header'
import { ArrowRightGreenIcon } from 'components/icons/Icons'
import ItemGoalUserLain from 'components/item-goal-user-lain/ItemGoalUserLain'
import { UserProfileLoading } from 'components/loader-collections'
import OnlyShow from 'components/only-show/OnlyShow'
import ProfileCard from 'components/profile-card/ProfileCard'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps, theme } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'
import { GENDER, User } from 'src/entity/User.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { getUsername, titleCaseAlternative, TotalData } from 'src/utils'

import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { UserListPageParams } from 'src/pages/inside-pages/user-list/params'
import {
    OtherUserGoalListPageParams,
    OtherUserProfilePageParams,
} from './params'
import { OtherProfilUserContainer } from './styled'
import {
    onSetAnotherUserGoal,
    onSetDetailAnotherUserGoal,
} from 'src/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import FollowOrUnfollow from 'src/components/atoms/button/followOrUnfollow'
import StoreData from 'store/types'
import { Task } from 'src/entity/Task.entity'
import useConnected from 'src/hook/useConnected'

interface OtherProfilUserPageProps extends NavProps {}

const MAX_GOAL_PREVIEW = 3

export default function OtherProfilUserPage(props: OtherProfilUserPageProps) {
    const dispatch = useDispatch()
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const params: OtherUserProfilePageParams = props.route.params

    // const [active_tab, setActiveTab] = useState<string>('goals')
    const [user, setUser] = useState<User>()
    const [total_data, setTotalData] = useState<TotalData>({
        goal: 0,
        follower: 0,
        following: 0,
    })

    // const [goals, setGoals] = useState<Goals[]>([])
    const [followed, setFollowed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loading_follow, setLoadingFollow] = useState<boolean>(false)
    const [loading_goal, setLoadingGoal] = useState<boolean>(false)
    const [followers, setFollowers] = useState<User[]>([])
    const [followings, setFollowings] = useState<User[]>([])

    const goals = useSelector(
        ({ myGoals }: StoreData) => myGoals.anotherUserGoals
    )

    const goToUserFollower = useCallback(() => {
        if (!followed) return

        const params: UserListPageParams = {
            users: followers,
            title: 'Pengikut',
        }
        props.navigation.navigate('UserList', params)
    }, [followed, followers, params])

    const goToUserFollowing = useCallback(() => {
        if (!followed) return

        const params: UserListPageParams = {
            users: followings,
            title: 'Mengikuti',
        }
        props.navigation.navigate('UserList', params)
    }, [followed, followings, params])

    const gotoGoalList = useCallback(() => {
        const _params: OtherUserGoalListPageParams = {
            id: params.id,
        }
        props.navigation.navigate('OtherUserGoalList', _params)
    }, [params.id])

    const getUserData = useCallback(async () => {
        setLoading(true)
        try {
            const _ = await userByIDAPI(auth, params.id)
            setUser(_)
            setTotalData({
                goal: await totalGoalUserAPI(auth, params.id),
                following: await totalFollowingUserAPI(auth, params.id),
                follower: await totalFollowerUserAPI(auth, params.id),
            })
            setFollowed(await followingStatusUserAPI(auth, params.id))
            setFollowers(await followersAPI(auth, params.id))
            setFollowings(await followingsAPI(auth, params.id))
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        userByIDAPI,
        setUser,
        setTotalData,
        totalGoalUserAPI,
        totalFollowerUserAPI,
        totalFollowingUserAPI,
        setFollowed,
        setFollowers,
        setFollowings,
    ])

    const followUnfollow = useCallback(async () => {
        setLoadingFollow(true)
        const invokerAPI = followed ? unfollowAPI : followAPI
        try {
            await invokerAPI(auth, params.id)
            setFollowed(!followed)
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoadingFollow(false)
        }
    }, [
        setLoadingFollow,
        followed,
        unfollowAPI,
        followAPI,
        auth,
        params,
        setFollowed,
    ])

    const getUserGoals = useCallback(() => {
        setLoadingGoal(true)

        const onDone = () => {
            setLoadingGoal(false)
        }

        dispatch(
            onSetAnotherUserGoal({
                token: auth,
                userId: params.id,
                isDone: onDone,
                isConnected: connected,
            })
        )
    }, [setLoadingGoal, userGoalsAPI, auth, onSetAnotherUserGoal, connected])

    const gotoGoals = useCallback(
        (goal: Goals) => {
            const params: GoalPageParams = {
                id: goal.id,
                readonly: true,
            }
            dispatch(onSetDetailAnotherUserGoal({ goalId: goal.id }))
            props.navigation.navigate('Goal', params)
        },
        [params, onSetDetailAnotherUserGoal]
    )

    useEffect(() => {
        getUserData()
        getUserGoals()
    }, [])

    return (
        <DocheckSafeAreaView>
            <OtherProfilUserContainer>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={''}
                        navigation={props.navigation}
                        style={{ marginBottom: 0 }}
                        withBack
                        greenArrow
                    />
                </WithPadding>
                <ScrollView>
                    <WithPadding>
                        {!loading && (
                            <>
                                <ProfileCard
                                    imageUrl={user?.profilePicture ?? ''}
                                    nama={titleCaseAlternative(
                                        user?.fullname ?? ''
                                    )}
                                    username={user ? getUsername(user) : '-'}
                                    deskripsi={user?.description ?? ''}
                                    lastSync={new Date()}
                                    umur={
                                        user?.birthDate
                                            ? moment(new Date())
                                                  .diff(user.birthDate, 'years')
                                                  .toFixed(0)
                                            : ''
                                    }
                                    lokasi={user?.city ?? ''}
                                    pekerjaan={user?.hobby ?? ''}
                                    totalPengikut={total_data.follower}
                                    totalMengikuti={total_data.following}
                                    totalGoal={total_data.goal}
                                    onEditProfile={() =>
                                        props.navigation.navigate('UbahProfil')
                                    }
                                    gender={user?.gender ?? GENDER.UNKNOWN}
                                    noEdit
                                    onPengikutPress={goToUserFollower}
                                    onMengikutiPress={goToUserFollowing}
                                />
                                <Space value={20} />
                                <FollowOrUnfollow
                                    onFollowHandler={followUnfollow}
                                    isFollowed={followed}
                                    loadingFollow={loading_follow}
                                />
                            </>
                        )}
                        {loading && <UserProfileLoading />}
                        <Space value={22} />
                        {goals
                            ?.slice(0, MAX_GOAL_PREVIEW)
                            .map((goal: Goals) => (
                                <ItemGoalUserLain
                                    key={goal.id}
                                    goal={goal}
                                    onPress={() => gotoGoals(goal)}
                                />
                            ))}
                        <OnlyShow if={size(goals) > 0 && size(goals) >= 5}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={gotoGoalList}
                            >
                                <ContainerAlignItemsCenter
                                    style={{
                                        justifyContent: 'flex-end',
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                    }}
                                >
                                    <Tipografi
                                        type={'normal'}
                                        style={{
                                            color: theme.main_color,
                                            marginRight: 5,
                                        }}
                                    >
                                        Lihat lainnya
                                    </Tipografi>
                                    <ArrowRightGreenIcon />
                                </ContainerAlignItemsCenter>
                            </TouchableOpacity>
                        </OnlyShow>
                        <Space value={56} />
                    </WithPadding>
                </ScrollView>
            </OtherProfilUserContainer>
        </DocheckSafeAreaView>
    )
}
