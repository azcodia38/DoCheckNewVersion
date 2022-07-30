import styled from 'styled-components/native'

export const StatusToggleWrapper = styled.View<{ isPublic?: boolean }>`
    height: 40px;
    margin: auto;
    width: 215px;
    background-color: ${({ isPublic = false }) =>
        isPublic ? 'rgb(245, 251, 227)' : 'rgb(227, 243, 251)'};
    border-radius: 10px;
    padding: 0 20px;
`

export const BodyWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
`

export const TitleWrapper = styled.View`
    width: 75%;
    display: flex;
    align-items: center;
`

export const IconWrapper = styled.View`
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`
