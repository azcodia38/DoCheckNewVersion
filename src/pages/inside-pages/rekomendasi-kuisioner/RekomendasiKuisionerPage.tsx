import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

import { DebugAlert } from 'src/utils/alert'

import Button from 'src/components/atoms/button'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import GoalSuggestionCard from 'components/goal-suggestion-card/GoalSuggestionCard'
import Loading from 'components/loading/Loading'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { copyTemplateToGoalAPI, myGoalsRecommendationAPI } from 'src/api/my-goal'
import { NavProps, theme } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'
import useAuthorization from 'src/hook/useAuthorization'
import StoreData from 'store/types'
import {
    ButtonsContainer,
    RekomendasiKuisionerPageContainer,
} from 'src/pages/inside-pages/rekomendasi-kuisioner/styled'
import useConnected from 'src/hook/useConnected'

interface RekomendasiKuisionerPageProps extends NavProps {}

export default function RekomendasiKuisionerPage(
    props: RekomendasiKuisionerPageProps
) {
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const [goals, setGoals] = useState<Goals[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingCopy, setLoadingCopy] = useState<boolean>(false)
    const [goalCopyIds, setGoalCopyIDs] = useState<string[]>([])

    const getGoals = useCallback(async () => {
        setLoading(true)
        try {
            const _ = await myGoalsRecommendationAPI(auth, '', 10, 0, {
                connected,
                fallback() {
                    return {
                        goals: [],
                        total: 0,
                        totalCopy: {},
                    }
                },
            })
            setGoals(_.goals)
        } catch (err: any) {
            setGoals([])
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [setLoading, myGoalsRecommendationAPI, auth, connected, setGoals])

    const skipHandler = useCallback(() => {
        props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Home',
                },
            ],
        })
    }, [props.navigation])

    const copyAllGoal = useCallback(async () => {
        setLoadingCopy(true)
        for (const id of goalCopyIds) {
            try {
                await copyTemplateToGoalAPI(auth, id)
            } catch (err: any) {
                DebugAlert(err.toString())
                break
            }
        }
        setLoadingCopy(false)
        skipHandler()
    }, [goalCopyIds, copyTemplateToGoalAPI, auth, setLoadingCopy, skipHandler])

    const addGoalToCopyList = useCallback(
        (id: string) => setGoalCopyIDs([...goalCopyIds, id]),
        [setGoalCopyIDs, goalCopyIds]
    )

    const removeGoalFromCopyList = useCallback(
        (id: string) =>
            setGoalCopyIDs(goalCopyIds.filter((_id: string) => _id !== id)),
        [setGoalCopyIDs, goalCopyIds]
    )

    const onCopy = useCallback(
        (goal: Goals) => {
            if (goalCopyIds.includes(goal.id)) {
                removeGoalFromCopyList(goal.id)
            } else {
                addGoalToCopyList(goal.id)
            }
        },
        [goalCopyIds, removeGoalFromCopyList, addGoalToCopyList]
    )

    useEffect(() => {
        getGoals()
    }, [])

    return (
        <DocheckSafeAreaView>
            <RekomendasiKuisionerPageContainer>
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                >
                    <WithPadding>
                        <Space value={24} />
                        <Tipografi type={'title-medium'}>
                            {'Rekomendasi\nUntukmu'}
                        </Tipografi>
                        <Space value={12} />
                        <Tipografi type={'normal'}>
                            {'Good work. Rekomendasi ini hanya\nuntuk kamu!'}
                        </Tipografi>
                        <Space value={20} />
                        <Loading loading={loading} style={{ marginTop: 25 }}>
                            {goals.map((g: Goals) => (
                                <View key={g.id}>
                                    <GoalSuggestionCard
                                        copy={goalCopyIds.includes(g.id)}
                                        goal={g}
                                        onPress={() => onCopy(g)}
                                    />
                                    <Space value={15} />
                                </View>
                            ))}
                        </Loading>
                    </WithPadding>
                </ScrollView>
                <WithPadding>
                    <ButtonsContainer>
                        <Button
                            onPress={skipHandler}
                            style={{
                                backgroundColor: '#FFF',
                            }}
                            textStyle={{
                                color: theme.main_color,
                            }}
                            containerStyle={{
                                flex: 1,
                            }}
                            noShadow
                        >
                            Lewati
                        </Button>
                        <View style={{ width: 12 }} />
                        <Button
                            onPress={copyAllGoal}
                            loading={loadingCopy}
                            containerStyle={{ flex: 1 }}
                        >
                            Lanjut
                        </Button>
                    </ButtonsContainer>
                </WithPadding>
            </RekomendasiKuisionerPageContainer>
        </DocheckSafeAreaView>
    )
}
