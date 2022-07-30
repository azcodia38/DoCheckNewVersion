/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useState, useMemo, memo } from 'react'
import {
    ImageSourcePropType,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// @components
import {
    GoalRecommendationCardContainer,
    ImageGoalRecommendation,
    RecommendationImageCreator,
    TextContainer,
} from 'components/goal-recommendation-slider/styled'
import Tipografi from 'src/components/atoms/tipografi'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'

// @helpers
import { Goals } from 'src/entity/Goals.entity'
import { getPlaceholderImage } from 'src/utils/const'
import Images from 'src/assets'
import { isFunction } from 'lodash'

interface GoalsRecommendationProps {
    style: StyleProp<ViewStyle>
    items: {
        item: Goals
        index: number
    }
    onPress?: (goal: Goals) => void
}

export default memo(function GoalsRecommendation({
    items,
    style,
    onPress,
}: GoalsRecommendationProps) {
    const [hasImage] = useState<boolean>(false)

    const username = useMemo(
        () => `@${items.item.owner?.username ?? ''}`,
        [items.item.owner?.username]
    )

    const profilePictureofUser = useMemo<ImageSourcePropType>(
        () =>
            items.item.owner?.profilePicture
                ? {
                      uri: items.item.owner?.profilePicture,
                  }
                : getPlaceholderImage(items.item.owner?.gender),
        [
            items.item.owner?.profilePicture,
            getPlaceholderImage,
            items.item.owner?.gender,
        ]
    )

    return (
        <View style={style}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => isFunction(onPress) && onPress(items.item)}
            >
                <GoalRecommendationCardContainer>
                    {/* {!!items.item.image && ( */}
                    {/* <ImageGoalRecommendation
                        source={Images.recommendationGoals}
                        // source={{
                        //     uri: items.item.image,
                        // }}
                    /> */}
                    {/* )} */}
                    {/* {hasImage && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#2FCC71', '#2FCC7100']}
                            style={internalStyle.linearGradient}
                        />
                    )} */}
                    <TextContainer>
                        <Tipografi
                            numberOfLines={2}
                            type={'label'}
                            style={{
                                ...internalStyle.fontStyleofTitle,
                                fontSize: 14,
                                color: hasImage ? 'white' : '#262D33',
                            }}
                        >
                            {items.item.name}
                        </Tipografi>
                        <ContainerAlignItemsCenter>
                            <RecommendationImageCreator
                                source={profilePictureofUser}
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Tipografi
                                    numberOfLines={2}
                                    type={'small-semibold'}
                                    style={{
                                        color: hasImage ? '#FFF' : '#666',
                                    }}
                                >
                                    {items.item.owner?.fullname ?? ''}
                                </Tipografi>
                                <Tipografi
                                    numberOfLines={2}
                                    type={'smaller'}
                                    style={{
                                        ...internalStyle.fontStyleofGoalTitle,
                                        color: hasImage ? '#EEE' : '#888888',
                                    }}
                                >
                                    {username}
                                </Tipografi>
                            </View>
                        </ContainerAlignItemsCenter>
                    </TextContainer>
                </GoalRecommendationCardContainer>
            </TouchableOpacity>
        </View>
    )
})

const internalStyle = StyleSheet.create({
    linearGradient: {
        position: 'absolute',
        left: -40,
        top: 0,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        opacity: 0.8,
    },
    fontStyleofTitle: {
        lineHeight: 17,
    },
    fontStyleofGoalTitle: {
        marginTop: -2,
    },
})
