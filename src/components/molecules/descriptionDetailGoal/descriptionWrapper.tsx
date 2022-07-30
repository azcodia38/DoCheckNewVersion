import React from 'react'
import { Text, View } from 'react-native'

import { ShareIcon } from 'components/icons/Icons'
import OnlyShow from 'components/only-show/OnlyShow'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import DescriptionGoals from 'src/components/atoms/descriptionGoals'
import useDimension from 'src/hook/useDimension'
import DescriptionBar from 'src/components/molecules/detailGoal/descriptionBar'
import { EMPTY_SPACES } from 'src/utils/types/componentsTypes'

interface BodyDescriptionProps {
    goalInnerTitle: string
    shareGoal: () => void
    setPublic: (isPublic: boolean) => Promise<void>
    isOwner: boolean
    isPinned: boolean
    isReadOnly: boolean
    loadingPublic: boolean
    isPublic?: boolean
    description?: string
}

export default function DescriptionWrapper({
    goalInnerTitle,
    isOwner,
    isPinned,
    isPublic,
    isReadOnly,
    loadingPublic,
    setPublic,
    shareGoal,
    description,
}: BodyDescriptionProps) {
    const { width } = useDimension()
    return (
        <View
            style={{
                alignSelf: 'flex-start',
                width,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: width * 0.78,
                }}
            >
                <Text>
                    <Tipografi
                        type={'title'}
                        style={{
                            color: '#000',
                        }}
                    >
                        {goalInnerTitle + EMPTY_SPACES}
                    </Tipografi>
                </Text>
                <OnlyShow if={isPublic}>
                    <View>
                        <ShareIcon onPress={shareGoal} />
                    </View>
                </OnlyShow>
            </View>
            <Space value={13} />
            <Text
                style={{
                    width: width * 0.8,
                    textAlign: 'justify',
                }}
            >
                <Tipografi type={'normal'} style={{ lineHeight: 23 }}>
                    <DescriptionGoals description={description} />
                </Tipografi>
            </Text>
            <DescriptionBar
                isOwner={isOwner}
                isPinned={isPinned}
                isReadOnly={isReadOnly}
                loadingPublic={loadingPublic}
                setPublic={setPublic}
                isPublic={isPublic}
            />
        </View>
    )
}
