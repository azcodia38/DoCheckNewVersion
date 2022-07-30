import React from 'react'
import { View } from 'react-native'

import {
    ContainerAlignItemsCenter,
    CardMemberWrapper,
} from 'components/goalCard/styled'
import { GoalCardShareIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'
import ProgressDescription from 'src/components/atoms/goalCard/progressDescription'
import MemberList from 'src/components/atoms/memberGoal/memberList'
import Space from 'src/components/atoms/space'

interface DescriptionProps {
    innerProgressDescription: string
    opacityStyle: any
    spaceBottom?: number
    withShare?: boolean
    withMember?: boolean
    goalMemberMapID?: string[]
    goalMemberWaitingMapID?: string[]
    options: any
}

export default function Description({
    innerProgressDescription,
    opacityStyle,
    withShare = false,
    spaceBottom = 15,
    withMember = false,
    goalMemberMapID,
    goalMemberWaitingMapID,
    options,
}: DescriptionProps) {
    return (
        <View>
            <CardMemberWrapper>
                <ProgressDescription title={innerProgressDescription} />
                {withMember && (
                    <MemberList
                        waitingListID={goalMemberWaitingMapID}
                        values={goalMemberMapID}
                        smaller={true}
                        options={options}
                    />
                )}
            </CardMemberWrapper>

            <Space value={spaceBottom} />
            {/* TODO: update total share */}
            {withShare && (
                <ContainerAlignItemsCenter style={opacityStyle}>
                    <GoalCardShareIcon />
                    <Tipografi type={'small'}>
                        {/* TODO: update total share */}
                        {`  ${0} dibagikan`}
                    </Tipografi>
                </ContainerAlignItemsCenter>
            )}
        </View>
    )
}
