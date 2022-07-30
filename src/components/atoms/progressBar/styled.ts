import styled from 'styled-components/native'

interface ProgressBarContainerProps {
    primary: boolean
}

export const ProgressBarContainer = styled.View<ProgressBarContainerProps>`
    position: relative;
    width: ${(props) => (props.primary ? '100%' : '85%')};
    border-radius: 999px;
    background-color: #fff5;
`

export const ProgressBarProgress = styled.View`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    background-color: #fff;
    border-radius: 999px;
`
