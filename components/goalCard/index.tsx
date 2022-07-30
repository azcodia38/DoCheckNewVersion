/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { isEmpty } from 'lodash'
import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import {
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet,
} from 'react-native'

import { Goals } from 'src/entity/Goals.entity'
import { Task } from 'src/entity/Task.entity'
import { getBackgroundColor, titleCaseAlternative } from 'src/utils'
import CheckItemContainer from 'components/check-item-container/CheckItemContainer'

import { GoalCardContainer } from './styled'
import Title from 'src/components/atoms/goalCard/title'
import ProgressBarCard from 'src/components/atoms/goalCard/progress'
import PinnedGoal from 'src/components/atoms/goalCard/pinnedGoal'
import Description from 'src/components/atoms/goalCard/description'
import GlobalContext from 'src/context/GlobalContext'
import { GoalMembers } from 'src/entity/GoalMembers.entity'

const PADDING_SIZE = 7

interface GoalCardProps {
    containerCheck?: boolean
    onContainerCheckChange?(check: boolean): void
    checkMode?: boolean

    data: Goals
    active?: boolean
    pinned?: boolean
    onPress?(): void
    onLongPress?(): void
    touchStyle?: StyleProp<ViewStyle>
}

const GoalCard: React.FC<GoalCardProps> = ({
    data,
    active = false,
    checkMode = false,
    containerCheck,
    onContainerCheckChange,
    onLongPress = () => {},
    onPress = () => {},
    pinned = false,
    touchStyle = {},
}) => {
    const { activeTab } = useContext(GlobalContext)
    const [tasks, setTasks] = useState<Task[]>([])

    const completeTask = useMemo(
        () => tasks.filter((t: Task) => !isEmpty(t.completeBy)),
        [tasks]
    )

    const progress = useMemo(
        () =>
            tasks.length > 0
                ? Math.round(
                      Math.min(
                          Math.max(completeTask.length / tasks.length, 0),
                          1
                      ) * 100
                  )
                : 0,
        [tasks.length, completeTask.length]
    )

    const innerProgressDescription = useMemo(() => {
        if (completeTask.length == 0 && tasks.length == 0)
            return ' Belum ada Task'
        return `  ${completeTask.length} task / ${tasks.length} task`
    }, [completeTask.length, tasks.length])

    const opacityStyle = useMemo(() => ({ opacity: 0 > 0 ? 1 : 0 }), [])

    const shadow = useMemo(() => {
        if (!active) return new Object()
        return styles.shadowStyle
    }, [active])

    const titleMemo = useMemo(
        () => titleCaseAlternative(data?.name),
        [data?.name, titleCaseAlternative]
    )

    const withMember = useMemo(() => activeTab == 'grup', [activeTab])

    const goalMemberMapID = useMemo(
        () => (data?.goalMembers ?? []).map((gm: GoalMembers) => gm.user?.id),
        [data?.goalMembers]
    )

    const optionsMemo = useMemo(
        () =>
            data?.goalMembers.map((goalMember) => ({
                label: goalMember.user?.profilePicture ?? '',
                value: goalMember.user?.id,
            })),
        [data?.goalMembers]
    )

    const goalMemberWaitingMapID = useMemo(
        () =>
            (data?.goalMembers ?? [])
                .filter((gm: GoalMembers) => !gm.isConfirmed)
                .map((gm: GoalMembers) => gm.user?.id),
        [data?.goalMembers]
    )

    useEffect(() => {
        if (data?.tasks) setTasks(data?.tasks)
    }, [data?.tasks])

    return (
        <View
            style={{
                height: 180,
                marginHorizontal: -PADDING_SIZE,
            }}
        >
            <CheckItemContainer
                containerCheck={containerCheck}
                onContainerCheckChange={onContainerCheckChange}
                checkMode={checkMode}
            >
                <TouchableOpacity
                    onPress={onPress}
                    onLongPress={onLongPress}
                    activeOpacity={1}
                    style={{
                        ...styles.touchableStyle,
                        ...((touchStyle as any) ?? {}),
                    }}
                >
                    <GoalCardContainer
                        style={{
                            backgroundColor: getBackgroundColor(data.id),
                            ...shadow,
                        }}
                    >
                        <Title style={styles.tipografi} title={titleMemo} />
                        <Description
                            innerProgressDescription={innerProgressDescription}
                            opacityStyle={opacityStyle}
                            spaceBottom={5}
                            withMember={withMember}
                            goalMemberMapID={goalMemberMapID as string[]}
                            goalMemberWaitingMapID={
                                goalMemberWaitingMapID as string[]
                            }
                            options={optionsMemo}
                        />
                        <ProgressBarCard
                            progress={progress}
                            withTitle={false}
                        />
                        <PinnedGoal isPinned={pinned} />
                    </GoalCardContainer>
                </TouchableOpacity>
            </CheckItemContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#555',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10.0,
        elevation: 0,
    },
    touchableStyle: {
        paddingBottom: 16,
        paddingTop: 16,
    },
    tipografi: { color: '#000', fontSize: 16 },
})

export default memo(GoalCard)
