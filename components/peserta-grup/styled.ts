import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { theme } from 'src/utils/const'

const screen = Dimensions.get('screen')
const min_value = Math.min(screen.width, screen.height)

export const smaller_image_width = Math.round(min_value / 8)
export const smaller_container_width = Math.round((smaller_image_width * 2) / 3)

export const smaller_image_width2 = Math.round(min_value / 8)
export const smaller_container_width2 = Math.round(
    (smaller_image_width2 * 8) / 17
)

const image_width = Math.round(min_value / 8)
export const container_width = Math.round((image_width * 2) / 3)

export const PesertaGrupContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const RoundImageContainer = styled.View`
    width: ${container_width}px;
    height: ${image_width}px;
`

export const RoundImagePeserta = styled.Image`
    width: ${image_width}px;
    height: ${image_width}px;
    /* border-radius: 999px; */
    padding: 0;
    margin: 0;
`

export const SmallerRoundImageContainer = styled.View`
    width: ${smaller_container_width}px;
    height: ${smaller_image_width}px;
`

export const SmallPicture = styled.Image`
    width: 35px;
    height: 35px;
    border: 2px solid #fff;
    border-radius: 999px;
`

export const SmallerRoundImagePeserta = styled.Image`
    width: ${smaller_image_width}px;
    height: ${smaller_image_width}px;
    border-radius: 999px;
`

export const SmallerRoundImageContainer2 = styled.View`
    width: ${smaller_container_width2}px;
    height: ${smaller_image_width2}px;
`

export const SmallerRoundImagePeserta2 = styled.Image`
    width: ${smaller_image_width2}px;
    height: ${smaller_image_width2}px;
    border-width: 2.2px;
    border-color: #fff;
    border-radius: 999px;
`

export const SmallerRoundBoxPeserta2 = styled.View`
    width: ${smaller_image_width2}px;
    height: ${smaller_image_width2}px;
    border-width: 2px;
    border-color: #fff;
    border-radius: 999px;
    background-color: ${theme.main_color};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const PesertaGrupContainer2 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: ${smaller_container_width2}px;
`

export const WaitingInvitationIconContainer = styled.View`
    position: absolute;
    width: ${smaller_image_width}px;
    height: ${smaller_image_width}px;
    align-items: center;
    justify-content: center;
    background-color: rgba(196, 196, 196, 0.8);
    border-radius: 999px;
`
