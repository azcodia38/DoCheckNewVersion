import { View } from 'react-native'
import React from 'react'

import {
    ContainerAlignItemsCenter,
    ContainerAlignItemsEnd,
} from 'components/goalCard/styled'
import { RecommendationImageCreator } from 'components/goal-recommendation-slider/styled'
import Tipografi from 'src/components/atoms/tipografi'
import { getPlaceholderImage } from 'src/utils/const'
import { getUsername } from 'src/utils'
import { GENDER, User } from 'src/entity/User.entity'

interface CardProfileInfoProps {
    ownerProfilePicture: string
    gender: GENDER
    hasBackground: boolean
    username: string
    fullname: string
    owner: User
}

export default function CardProfileInfo({
    gender,
    hasBackground,
    ownerProfilePicture,
    username,
    fullname,
    owner,
}: CardProfileInfoProps) {
    return (
        <ContainerAlignItemsEnd>
            <ContainerAlignItemsCenter>
                <RecommendationImageCreator
                    source={
                        ownerProfilePicture
                            ? {
                                  uri: ownerProfilePicture,
                              }
                            : getPlaceholderImage(gender)
                    }
                />
                <View
                    style={{
                        marginLeft: 8,
                    }}
                >
                    <Tipografi
                        numberOfLines={2}
                        type={'small-semibold'}
                        style={{
                            color: hasBackground ? '#FFF' : '#000',
                        }}
                    >
                        {fullname ?? ''}
                    </Tipografi>
                    <Tipografi
                        numberOfLines={2}
                        type={'smaller'}
                        style={{
                            color: hasBackground ? '#EEE' : '#888888',
                            marginTop: -2,
                        }}
                    >
                        {username
                            ? `@${username}`
                            : owner
                            ? getUsername(owner)
                            : ''}
                    </Tipografi>
                </View>
            </ContainerAlignItemsCenter>
        </ContainerAlignItemsEnd>
    )
}
