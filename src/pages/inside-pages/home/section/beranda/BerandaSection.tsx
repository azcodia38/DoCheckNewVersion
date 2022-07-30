/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useRef } from 'react'
import Carousel from 'react-native-snap-carousel-v4'
import { useStateRef } from 'src/hook/useStateRef'

// @components
import GoalRecommendationSlider from 'components/goal-recommendation-slider/GoalRecommendationSlider'
import GoalsSlider from 'components/goals-slider/GoalsSlider'
import ScrollView from 'src/components/atoms/scrollView'
import Space from 'src/components/atoms/space'
import DailyTask from 'src/components/atoms/homepage/dailyTask'
import TabGroupHeader from 'src/components/atoms/homepage/tabGroupHeader'
import HeaderHomepage from 'src/components/atoms/homepage/header'

// @helpers
import { BerandaSectionContainer } from './styled'
import { TITLE_GROUP } from 'src/utils/lang'

import GlobalContext from 'src/context/GlobalContext'
import WithMainHomepage, {
    WithMainHomepageHOCProps,
} from 'src/hoc/withMainHomepageHOC'

export default WithMainHomepage(function BerandaSection({
    activeTab,
    changeTabHandler,
    goalTitleMemo,
    isEmptyGoals,
    isHideGoal,
    isLoadingCardGoal,
    isLoadingGoal,
    isLoadingRecommendation,
    isLoadingTask,
    myTask,
    onGotoGoalDetailPage,
    onPressReadMoreRecommendation,
    onPressRecommendationGoals,
    onReadMore,
    onReadMoreDailyTask,
    onTaskPressHandler,
    onTaskTick,
    pinnedGoalGroup,
    recomendationGoals,
    refreshControl,
    setActiveTab,
    setDailyTaskTab,
    user,
    setForwardRef,
}: WithMainHomepageHOCProps) {
    const ref = useRef<Carousel<any>>(null)
    const [isLoadingTaskID] = useStateRef<string[]>([])

    useEffect(() => setForwardRef(ref?.current), [ref])

    return (
        <GlobalContext.Provider
            value={{ activeTab, setActiveTab, goalSlider: ref }}
        >
            <BerandaSectionContainer>
                <ScrollView refreshControl={refreshControl}>
                    {/* Showing the welcoming message in dashboard */}
                    <HeaderHomepage user={user} />
                    <TabGroupHeader
                        active={activeTab}
                        setActive={changeTabHandler}
                    />
                    <GoalsSlider
                        activeTab={activeTab}
                        title={goalTitleMemo}
                        onPress={onGotoGoalDetailPage}
                        loading={isLoadingCardGoal}
                        data={pinnedGoalGroup}
                        onLainnya={onReadMore}
                        hideLihatLainnya={isHideGoal}
                    />
                    <DailyTask
                        title={TITLE_GROUP.DAILY_TASK}
                        isEmpty={isEmptyGoals}
                        isLoadingGoal={isLoadingGoal}
                        isLoadingTask={isLoadingTask}
                        tasks={myTask}
                        listTaskIDsLoading={isLoadingTaskID.current}
                        onTaskPress={onTaskPressHandler}
                        setActive={setDailyTaskTab}
                        onTick={onTaskTick}
                        onLainnya={onReadMoreDailyTask}
                        canExpired
                    />
                    <GoalRecommendationSlider
                        title={TITLE_GROUP.RECOMMENDATION}
                        loading={isLoadingRecommendation}
                        data={recomendationGoals}
                        onPress={onPressRecommendationGoals}
                        onLainnya={onPressReadMoreRecommendation}
                        hideLihatLainnya={false}
                    />
                    <Space value={30} />
                </ScrollView>
            </BerandaSectionContainer>
        </GlobalContext.Provider>
    )
})
