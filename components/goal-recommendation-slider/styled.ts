import styled from 'styled-components/native'

export const GoalRecommendationSliderContainer = styled.View`
    width: 100%;
`

export const GoalRecommendationCardContainer = styled.View`
    width: 100%;
    height: 110px;
    background-color: #A4F4C5;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
`

export const ImageGoalRecommendation = styled.Image`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`

export const GradientBackground = styled.Image`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`

export const TextContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    padding-top: 13px;
    padding-bottom: 13px;
`

export const RecommendationImageCreator = styled.Image`
    height: 30px;
    width: 30px;
    border-radius: 999px;
    position: relative;
`

export const OverlayCardProfileInfo = styled.View`
    width: 180px;
    height: 38px;
    background-color: linear-gradient(
            49.9deg,
            rgba(0, 0, 0, 0.124) 32.89%,
            rgba(0, 0, 0, 0) 62.65%
        ),
        linear-gradient(
            89.65deg,
            rgba(32, 33, 53, 0.4) 24.86%,
            rgba(32, 33, 53, 0) 99.63%
        );
    position: absolute;
    left: -7;
`
