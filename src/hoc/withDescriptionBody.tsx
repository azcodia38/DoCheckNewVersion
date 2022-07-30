/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

// @components
import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'

import { ThreeDotsIcon } from 'components/icons/Icons'
import OnlyShow from 'components/only-show/OnlyShow'

// @helpers
import { SearchResultData } from 'src/api/mock-api'
import { screen_height } from 'src/utils/const'
import { isIOS, limitChar, share } from 'src/utils'
import { EMPTY_SPACES } from 'src/utils/types/componentsTypes'
import { Task } from 'src/entity/Task.entity'
import { shareGoalMessage } from 'src/utils/module/templateLiterral'
import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { privateMyGoalAPI, publicMyGoalAPI } from 'src/api/my-goal'
import { initializePrivateGoal, initializePublicGoal } from 'src/store/actions'
import { DetailGoalType } from 'src/utils/types'
import useConnected from 'src/hook/useConnected'
import useDimension from 'src/hook/useDimension'
import useDescriptionHeight from 'src/hook/useDescriptionHeight'

export interface DescriptionBodyProps {
    newPaddingSize: number
    modalHeight: number
    goalInnerTitle: string
    navigation: NavigationContainerRef
    goalMemberWaitingMapID: string[]
    goalMemberMapID: string[]
    members: SearchResultData[]
    isOwner: boolean
    menuHandler: () => void
    setShowPopupMemberGoal: (status: boolean) => void
    goal?: DetailGoalType
    task?: Task[]
    params: GoalPageParams
    marginBottomSpace: number
    auth: string
    fontContent?: 'dark' | 'light'
}

const DEFAULT_TITLE = 'Goal Detail'

export interface WithDescriptionBodyProps extends DescriptionBodyProps {
    goalTitle: string
    descriptionHeight: string | number
    rightSectionViewHeader: JSX.Element
    isReadOnly: boolean
    loadingPublic: boolean
    progressTask: string
    progress: number
    scrollingHandler: (event: any) => void
    setPublic: (isPublic: boolean) => Promise<void>
    shareGoal: () => void
    isPublic?: boolean
}

export default function WithDescriptionBodyHOC<
    T extends DescriptionBodyProps = DescriptionBodyProps
>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentMainWithHomepage = (props: DescriptionBodyProps) => {
        // props comes afterwards so the can override the default ones.
        const dispatch = useDispatch()
        const { connected } = useConnected()
        const { descriptionHeight } = useDescriptionHeight(props.modalHeight)

        const { auth, goalInnerTitle, menuHandler, params, goal, task } = props

        const [completeTask, setCompleteTask] = useState<Task[]>([])
        const [goalTitle, setGoalTitle] = useState<string>(DEFAULT_TITLE)
        const [loadingPublic, setLoadingPublic] = useState<boolean>(false)

        const progress = useMemo(
            () =>
                (goal?.tasks ?? []).length > 0
                    ? Math.round(
                          Math.min(
                              Math.max(
                                  completeTask.length /
                                      (goal?.tasks ?? []).length,
                                  0
                              ),
                              1
                          ) * 100
                      )
                    : 0,
            [goal?.tasks, completeTask.length]
        )

        const isPublic = useMemo(() => goal?.isPublic, [goal?.isPublic])

        const limitChatTitle = useMemo(
            () => limitChar(goalInnerTitle, 50),
            [limitChar, goalInnerTitle]
        )

        const isReadOnly = useMemo(() => !params.readonly, [params.readonly])

        const rightSectionViewHeader = useMemo(
            () => (
                <CenterContainer>
                    <OnlyShow if={isReadOnly}>
                        <ThreeDotsIcon onPress={menuHandler} />
                    </OnlyShow>
                </CenterContainer>
            ),
            [isReadOnly, menuHandler]
        )

        const progressTask = useMemo(() => {
            let progressDescription = EMPTY_SPACES
            if (completeTask.length == 0 && goal?.tasks?.length == 0)
                return progressDescription.concat('Belum Ada Task')
            return progressDescription.concat(
                `${completeTask.length} task / ${
                    (goal?.tasks ?? []).length
                } task`
            )
        }, [
            completeTask.length,
            completeTask,
            goal?.tasks,
            goal?.tasks?.length,
        ])

        /**
         * Changing title if user scroll handler
         */
        const scrollingHandler = useCallback(
            (event) => {
                const offsetY = event.nativeEvent.contentOffset.y
                if (offsetY >= 44) setGoalTitle(limitChatTitle)
                else setGoalTitle(DEFAULT_TITLE)
            },
            [goalTitle, setGoalTitle]
        )

        /**
         * publicGoal Handler
         */
        const setPublic = useCallback(
            async (isPublic: boolean) => {
                // const invokerAPI = isPublic ? publicMyGoalAPI : privateMyGoalAPI
                setLoadingPublic(true)
                const payload = {
                    goalId: params.id,
                    token: auth,
                    isConnected: connected,
                    isLoading: setLoadingPublic,
                }

                if (isPublic) dispatch(initializePublicGoal(payload))
                else dispatch(initializePrivateGoal(payload))
            },
            [
                publicMyGoalAPI,
                privateMyGoalAPI,
                setLoadingPublic,
                connected,
                auth,
                params.id,
                goal,
            ]
        )

        /**
         * ShareGoal Handler
         */
        const shareGoal = useCallback(() => {
            const shareMessage = shareGoalMessage(
                goal?.owner?.fullname,
                goal?.name,
                params.id
            )
            share(shareMessage)
        }, [goal, share])

        /**
         * SetCompleteTask handler
         */
        useEffect(
            () =>
                setCompleteTask(
                    (goal?.tasks ?? []).filter(
                        ({ completeBy }: Task) => !!completeBy
                    )
                ),
            [task]
        )

        return (
            <WrappedComponent
                {...{
                    goalTitle,
                    descriptionHeight,
                    rightSectionViewHeader,
                    isPublic,
                    scrollingHandler,
                    isReadOnly,
                    loadingPublic,
                    setPublic,
                    shareGoal,
                    progressTask,
                    progress,
                }}
                {...(props as T)}
            />
        )
    }

    ComponentMainWithHomepage.displayName = `withMainHomePage(${displayName})`

    return ComponentMainWithHomepage
}
