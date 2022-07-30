import styled from 'styled-components/native'
import { theme } from 'src/utils/const'

export const GoalPageContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: #fff;
`

export const TouchHeadContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    align-items: center;
    padding: 10px;
    padding-left: ${theme.left_right_padding}px;
    padding-right: ${theme.left_right_padding}px;
    padding-bottom: 16px;
`

export const TouchStick = styled.View`
    width: 50px;
    height: 5px;
    border-radius: 999px;
    background-color: #c4c4c4;
`

export const AbsoluteSwipeableContainer = styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
`

export const ImageUserPredefinedGoal = styled.Image`
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background-color: #fff;
`

export const CopyGoalContainer = styled.View`
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    background-color: ${theme.main_color};
    padding: 11px;
    padding-left: 11px;
    padding-right: 9px;
    border-radius: 10px;
`

export const CopyGoalAdsGoalContainer = styled.View`
    background-color: #fff;
    padding: 11px;
    padding-left: 11px;
    padding-right: 9px;
    border-radius: 14px;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SharedAsTemplate = styled.View`
    background-color: #545579;
    border-radius: 7px;
    padding: 2px 7px;
    padding-bottom: 3px;
    align-self: flex-start;
    margin-bottom: 6px;
`

export const TitleGoalInner = styled.View`
    padding-left: 10px;
`
