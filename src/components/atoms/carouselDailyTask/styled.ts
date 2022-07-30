import styled from 'styled-components/native'

export const CarouselDailyTaskContainer = styled.View`
    width: 100%;
    min-height: 75px;
    height: ${(props: { height: string }) => props.height};
`

export const ItemContainerListTask = styled.View`
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
`
