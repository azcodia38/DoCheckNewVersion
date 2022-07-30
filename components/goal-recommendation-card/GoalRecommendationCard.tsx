import React, { useMemo } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, View } from 'react-native'

// @helpers
import { getPlaceholderImage } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'
import {
    getBackgroundColor,
    getFirstAndMiddleName,
    getUsername,
    limitChar,
    titleCase,
} from 'src/utils'
import {
    ContainerAlignItemsCenter,
    SpaceBetweenContainerCenter,
} from 'components/goalCard/styled'
import { RecommendationImageCreator } from 'components/goal-recommendation-slider/styled'
import {
    RecommendationTotalCopyIcon,
    RecommendationTotalCopyWhiteIcon,
    RecommendationTotalViewIcon,
    RecommendationTotalViewWhiteIcon,
} from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import {
    GoalRecommendationCardContainer,
    GoalRecommendationCardInnerContainer,
} from './styled'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

// import Images from 'src/assets'

interface GoalRecommendationCardProps {
    data: Goals
    onPress?(): void
    useGoalBackground?: boolean
    customImage: boolean
}

// type SourceImageType =
//     | {
//           uri: string
//       }
//     | ImageSourcePropType

const hasBackground = false

export default function GoalRecommendationCard(
    props: GoalRecommendationCardProps
) {
    // const hasBg= props.data.image ? true : false
    const textShadow: StyleProp<TextStyle> = {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        textShadowColor: !hasBackground ? '#FFF' : '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowOffset: {
            width: 0,
            height: 1,
        },
        textShadowRadius: 4,
    }

    // const sourceImage = useMemo<SourceImageType>(() => {
    //     if (props.customImage) return Images.recommendationGoals
    //     return { uri: props.data.image }
    // }, [])

    const styleofRecommendationCard = useMemo(
        () =>
            props.useGoalBackground
                ? {
                      backgroundColor: getBackgroundColor(props.data.id),
                  }
                : {},
        [props.useGoalBackground, props.data.id, getBackgroundColor]
    )

    // const backgroundImageofCard = useMemo(() => {
    //     if (hasBackground) {
    //         return (
    //             <>
    //                 <ImageGoalRecommendationCard source={sourceImage} />
    //                 <LinearGradient
    //                     start={{ x: 0, y: 0 }}
    //                     end={{ x: 1, y: 0 }}
    //                     colors={['#2FCC71', '#2FCC7100']}
    //                     style={{
    //                         opacity: 0.7,
    //                         position: 'absolute',
    //                         left: -21,
    //                         top: 0,
    //                         width: '100%',
    //                         height: '100%',
    //                         borderRadius: 22,
    //                     }}
    //                 />
    //             </>
    //         )
    //     }
    // }, [hasBackground, sourceImage])

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <GoalRecommendationCardContainer
                style={{ overflow: 'hidden', ...styleofRecommendationCard }}
            >
                <GoalRecommendationCardInnerContainer>
                    <View>
                        <Tipografi
                            numberOfLines={2}
                            type={'label'}
                            style={{
                                color: hasBackground ? 'white' : '#262D33',
                                fontSize: 15,
                                lineHeight: 22,
                            }}
                        >
                            {props.data.name}
                        </Tipografi>
                        <Space value={8} />
                        <Tipografi
                            numberOfLines={2}
                            type={'small'}
                            style={{
                                color: hasBackground ? '#EEE' : '#666',
                            }}
                        >
                            {props.data.description}
                        </Tipografi>
                    </View>
                    <SpaceBetweenContainerCenter>
                        <ContainerAlignItemsCenter>
                            <RecommendationImageCreator
                                source={
                                    props.data.owner?.profilePicture
                                        ? {
                                              uri: props.data.owner
                                                  ?.profilePicture,
                                          }
                                        : getPlaceholderImage(
                                              props.data.owner?.gender
                                          )
                                }
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Tipografi
                                    numberOfLines={2}
                                    type={'small-semibold'}
                                    style={{
                                        color: hasBackground ? '#FFF' : '#000',
                                    }}
                                >
                                    {limitChar(
                                        titleCase(
                                            getFirstAndMiddleName(
                                                props.data.owner?.fullname
                                            )
                                        ),
                                        18
                                    )}
                                </Tipografi>
                                <Tipografi
                                    numberOfLines={2}
                                    type={'smaller'}
                                    style={{
                                        color: hasBackground
                                            ? '#EEE'
                                            : '#888888',
                                        marginTop: -2,
                                    }}
                                >
                                    {props.data.owner?.username
                                        ? `@${props.data.owner?.username}`
                                        : props.data.owner
                                        ? getUsername(props.data.owner)
                                        : ''}
                                </Tipografi>
                            </View>
                        </ContainerAlignItemsCenter>
                        <ContainerAlignItemsCenter>
                            <ContainerAlignItemsCenter
                                style={{ marginRight: 12 }}
                            >
                                {!hasBackground ? (
                                    <RecommendationTotalCopyIcon />
                                ) : (
                                    <RecommendationTotalCopyWhiteIcon />
                                )}
                                <Tipografi
                                    type={'small'}
                                    style={{
                                        marginLeft: 8,
                                        color: hasBackground ? '#FFF' : '#000',
                                        ...textShadow,
                                    }}
                                >
                                    {`${props.data.totalCopy ?? 0}`}
                                </Tipografi>
                            </ContainerAlignItemsCenter>
                            <ContainerAlignItemsCenter></ContainerAlignItemsCenter>
                            {!hasBackground ? (
                                <RecommendationTotalViewIcon />
                            ) : (
                                <RecommendationTotalViewWhiteIcon />
                            )}
                            <Tipografi
                                type={'small'}
                                style={{
                                    marginLeft: 8,
                                    color: hasBackground ? '#FFF' : '#000',
                                    ...textShadow,
                                }}
                            >
                                {props.data.totalView ?? 0}
                            </Tipografi>
                        </ContainerAlignItemsCenter>
                    </SpaceBetweenContainerCenter>
                </GoalRecommendationCardInnerContainer>
            </GoalRecommendationCardContainer>
        </TouchableOpacity>
    )
}
