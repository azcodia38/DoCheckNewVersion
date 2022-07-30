import styled from 'styled-components/native'
import { theme } from 'src/utils/const'

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 7px;
    margin-bottom: 12px;
`

export const LeftSectionView = styled.View`
    width: 50px;
`
export const MiddleSectionView = styled.View<{ withMargihLeft?: boolean }>`
    flex: 1;
    align-items: center;
    margin-left: ${(props) => (props.withMargihLeft ? '50px' : '0px')};
`
export const RightSectionView = styled.View`
    width: 50px;
    align-items: flex-end;
`

export const HeaderBackArrowImage = styled.Image`
    height: 24px;
    width: 24px;
    resize-mode: contain;
`
