import styled from 'styled-components/native'

export const IntroContainer = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
`

export const IntroItem = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

export const IntroItemImage = styled.Image`
    width: 100%;
    height: 58%;
    resize-mode: contain;
    margin-top: 50px;
`

export const IntroNavigation = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

export const IntroNavigationImageBackground = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: contain;
    position: absolute;
    bottom: 0;
    background: #0005;
`

export const IntroContainerNavActions = styled.View`
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const BackSkipButtonContainer = styled.View`
    display: flex;
    flex: 1;
`

export const BackButton = styled.Text`
    display: flex;
    padding-left: 24px;
    color: #fffb;
    font-family: OpenSans-SemiBold;
`
export const SkipButton = styled.Text`
    display: flex;
    text-align: right;
    padding-right: 24px;
    color: #fffb;
    font-family: OpenSans-SemiBold;
`
