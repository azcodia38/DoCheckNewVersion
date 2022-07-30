/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'

// @components
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import SearchWithTab from 'src/components/molecules/templateGoals/searchwithTab'
import GoalRecommendationListWrapper from 'src/pages/inside-pages/predefined-goals/goalRecommendationListWrapper'
import EmptyTaskRecommendationWrapper from 'src/pages/inside-pages/predefined-goals/emptyTaskRecommendationWrapper'
import LoadingRecommendationWrapper from 'src/pages/inside-pages/predefined-goals/loadingRecommendationWrapper'
import { PredefinedGoalPageParams } from 'src/pages/inside-pages/goal/params'

// @helpers
import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'
import useConnected from 'src/hook/useConnected'
import { isIOS, TypingTimeout } from 'src/utils'
import { DebugAlert } from 'src/utils/alert'
import {
    allGoalsRecommendationAPI,
    myGoalsFollowingAPI,
    myGoalsRecommendationAPI,
    myGoalsRelevancyAPI,
} from 'src/api/my-goal'
import { ROUTE_PAGE } from 'src/utils/types/componentsTypes'
import {
    PredefinedGoalsPageProps,
    PredefinedGoalsTabType,
} from 'src/utils/types'
import { TEMPLATE_GOALS } from 'src/utils/lang'
import TemplateContext from 'src/context/TemplateContext'

import { PredefinedGoalsPageContainer } from './styled'

export default function PredefinedGoalsPage(props: PredefinedGoalsPageProps) {
    const auth = useAuthorization(props.navigation)

    const [keyboard_height] = useKeyboard()
    const { connected } = useConnected()

    const [typingTimeout, setTypingTimeout] = useState<TypingTimeout>({
        is_typing: false,
        timeout: null,
    })
    const [activeTab, setActiveTab] =
        useState<PredefinedGoalsTabType>('recommendation')
    const [query, setQuery] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [goals, setGoals] = useState<Goals[]>([])

    const spaceValue = useMemo(
        () => isIOS * keyboard_height,
        [isIOS, keyboard_height]
    )

    const gotoPredefinedGoal = useCallback(
        (goal: Goals & PromotionGoals) => {
            const params: PredefinedGoalPageParams = {
                goal,
            }

            if (goal?.isPromoted)
                props.navigation.navigate(ROUTE_PAGE.ADS_GOAL, params)
            else props.navigation.navigate(ROUTE_PAGE.PREDEFINED_GOAL, params)
        },
        [props.navigation.navigate, ROUTE_PAGE.PREDEFINED_GOAL]
    )

    const getGoals = useCallback(async () => {
        setLoading(true)
        let invokerAPI
        switch (activeTab) {
            case 'recommendation':
                invokerAPI = myGoalsRecommendationAPI
                break
            case 'following':
                invokerAPI = myGoalsFollowingAPI
                break
            case 'relevancy':
                invokerAPI = myGoalsRelevancyAPI
                break
            case 'all':
                invokerAPI = allGoalsRecommendationAPI
                break
        }
        try {
            const _ = await invokerAPI(auth, query, 10, 0, {
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
    }, [
        setLoading,
        activeTab,
        myGoalsRecommendationAPI,
        myGoalsFollowingAPI,
        myGoalsRelevancyAPI,
        setGoals,
        auth,
        query,
        connected,
    ])

    // implementing lazy searching of templates
    const onQueryChange = useCallback(
        (q: string) => {
            if (typingTimeout.is_typing) clearTimeout(typingTimeout.timeout)

            typingTimeout.timeout = setTimeout(() => {
                setTypingTimeout({
                    ...typingTimeout,
                    is_typing: false,
                })
                getGoals()
            }, 300)

            setTypingTimeout({
                ...typingTimeout,
                is_typing: true,
            })
        },
        [clearTimeout, typingTimeout, getGoals, setTypingTimeout]
    )

    const setActiveTabHeader = useCallback(
        (_: PredefinedGoalsTabType) => setActiveTab(_),
        [setActiveTab]
    )

    const isRelevancy = useMemo(() => activeTab == 'relevancy', [activeTab])

    useEffect(() => {
        onQueryChange(query)
    }, [query, activeTab])

    return (
        <TemplateContext.Provider
            value={{
                recommendationTab: activeTab,
                setRecommendationTab: setActiveTab,
            }}
        >
            <DocheckSafeAreaView>
                <PredefinedGoalsPageContainer>
                    <WithPadding>
                        <Space value={7} />
                        <Header
                            titleDetail={TEMPLATE_GOALS.title}
                            navigation={props.navigation}
                            withBack
                            greenArrow
                        />
                        <SearchWithTab
                            query={query}
                            setActiveTabHeader={setActiveTabHeader}
                            setQuery={setQuery}
                        />
                    </WithPadding>
                    <LoadingRecommendationWrapper
                        isRelevancy={isRelevancy}
                        loading={loading}
                    />
                    <EmptyTaskRecommendationWrapper
                        goals={goals}
                        isRelevancy={isRelevancy}
                        loading={loading}
                    />
                    <GoalRecommendationListWrapper
                        activeTab={activeTab}
                        goals={goals}
                        gotoPredefinedGoal={gotoPredefinedGoal}
                        isRelevancy={isRelevancy}
                        loading={loading}
                    />
                    <Space value={spaceValue} />
                </PredefinedGoalsPageContainer>
            </DocheckSafeAreaView>
        </TemplateContext.Provider>
    )
}

// const style = StyleSheet.create({
//     inputStyles: {
//         paddingTop: 14,
//         paddingBottom: 14,
//         paddingLeft: 8,
//     },
// })
