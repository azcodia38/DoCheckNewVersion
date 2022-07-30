import React, { useEffect, useMemo } from 'react'
import { ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// @helpers
import { Goals, PromotionGoals } from 'src/entity/Goals.entity'
import { getBackgroundColor } from 'src/utils'

import {
    GoalRecommendationCardContainer,
    GoalRecommendationCardInnerContainer,
    ImageGoalRecommendationCard,
} from './styled'

import Images from 'src/assets'
import Pills from 'src/components/atoms/pills'
import DescriptionAdsCard from './descriptionAdsCard'
import CardProfileInfo from './cardProfileInfo'

interface GoalAdsCard {
    data: Goals & PromotionGoals
    onPress?(): void
    useGoalBackground?: boolean
    customImage: boolean
}

const hasBackground = true

export default function GoalAdsCard(props: GoalAdsCard) {
    const styleofRecommendationCard = useMemo(
        () =>
            props.useGoalBackground
                ? {
                      backgroundColor: getBackgroundColor(props.data.id),
                  }
                : {},
        [props.useGoalBackground, props.data.id, getBackgroundColor]
    )

    const backgroundImageofCard = useMemo(() => {
        if (hasBackground) {
            return (
                <>
                    <ImageGoalRecommendationCard
                        style={{ resizeMode: 'cover' }}
                        source={{ uri: props.data.bannerUrl! }}
                    />
                </>
            )
        }
    }, [hasBackground, props.data])

    return (
        <GoalRecommendationCardContainer
            style={{
                overflow: 'hidden',
                ...styleofRecommendationCard,
            }}
        >
            <TouchableOpacity onPress={props.onPress}>
                {backgroundImageofCard}
                <Pills title="PROMOTED" style={styles.pills} />
                <GoalRecommendationCardInnerContainer
                    style={styles.adsCardWraper}
                >
                    <CardProfileInfo
                        fullname={props.data.owner?.fullname}
                        gender={props.data.owner?.gender}
                        hasBackground={hasBackground}
                        owner={props.data.owner}
                        ownerProfilePicture={props.data.owner?.profilePicture}
                        username={props.data.owner?.fullname}
                    />
                    <DescriptionAdsCard
                        description={props.data.promotionalMessage!}
                        hasBackground={hasBackground}
                        name={props.data.name}
                    />
                </GoalRecommendationCardInnerContainer>
            </TouchableOpacity>
        </GoalRecommendationCardContainer>
    )
}

const styles = StyleSheet.create({
    pills: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 25,
        borderRadius: 5,
        backgroundColor: '#FACD20',
    },
    adsCardWraper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
})
