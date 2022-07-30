import React, { useCallback, useEffect, useState } from 'react'

import { DebugAlert } from 'src/utils/alert'
import { userGoalsAPI } from 'src/api/user'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import GoalList from 'components/goal-list/GoalList'
import Header from 'components/header/Header'
import { GoalCardLoading } from 'components/loader-collections'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { GoalKosongView } from 'src/pages/inside-pages/home/section/beranda/some-view'

import { OtherUserGoalListPageParams } from 'src/pages/inside-pages/other-profil-user/params'
import { OtherUserGoalListPageContainer } from 'src/pages/inside-pages/other-profil-user/styled'

interface OtherUserGoalListPageProps extends NavProps {}

export default function OtherUserGoalListPage(
    props: OtherUserGoalListPageProps
) {
    const auth = useAuthorization(props.navigation)
    const [goals, setGoals] = useState<Goals[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const params: OtherUserGoalListPageParams = props.route.params

    const getUserGoals = useCallback(async () => {
        setLoading(false)
        try {
            const _ = await userGoalsAPI(auth, params.id)
            setGoals(_)
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [setLoading, userGoalsAPI, setGoals, auth, params])

    const goToGoal = useCallback(
        (goal: Goals) => {
            const params: GoalPageParams = {
                id: goal.id,
                readonly: true,
            }
            props.navigation.navigate('Goal', params)
        },
        [props.navigation]
    )

    useEffect(() => {
        getUserGoals()
    }, [])

    return (
        <DocheckSafeAreaView>
            <OtherUserGoalListPageContainer>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={'List Goal'}
                        navigation={props.navigation}
                        withBack
                        greenArrow
                    />
                </WithPadding>
                {loading && <GoalCardLoading />}
                {!loading && goals.length === 0 && <GoalKosongView />}
                {!loading && (
                    <GoalList
                        checkMode={false}
                        checkIDs={[]}
                        onContainerCheckChange={() => {}}
                        onGoalPress={goToGoal}
                        onGoalLongPress={() => {}}
                        style={{
                            flex: 1,
                        }}
                        data={goals}
                    />
                )}
            </OtherUserGoalListPageContainer>
        </DocheckSafeAreaView>
    )
}
