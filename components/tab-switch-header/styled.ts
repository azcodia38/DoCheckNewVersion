import styled from 'styled-components/native'
import { theme } from 'src/utils/const'

export const TabSwitchHeaderContainer = styled.View``

export const TabSwitchHeaderBackground = styled.View`
    position: absolute;
    background-color: #e0f8ea;
    border-radius: 999px;
    top: 0px;
    left: ${theme.left_right_padding}px;
    right: ${theme.left_right_padding}px;
    height: 100%;
`

export const TabSwitchItem = styled.View`
    /* border-radius: 999px; */
    margin: 5px;
    height: 36px;
    /* background-color: ${theme.main_color}; */
`

export const TabSwitchHeaderNoPointer = styled.View`
    position: absolute;
    background-color: #0000;
    border-radius: 999px;
    top: 0px;
    left: ${theme.left_right_padding}px;
    right: ${theme.left_right_padding}px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`
