import React from 'react'
import CheckLabel from '../check-label/CheckLabel'
import {
    AbsoluteCheckContainer,
    CheckItemContainerContainer,
    ChildrenContainer,
    CoverPressContainer,
} from './styled'

interface CheckItemContainerProps {
    containerCheck?: boolean
    onContainerCheckChange?(check: boolean): void
    checkMode?: boolean
    children?: React.ReactNode
}

export default function CheckItemContainer(props: CheckItemContainerProps) {
    return (
        <CheckItemContainerContainer>
            <AbsoluteCheckContainer>
                <CheckLabel
                    onCheckChange={props.onContainerCheckChange}
                    check={props.containerCheck}
                />
            </AbsoluteCheckContainer>
            <ChildrenContainer
                style={{
                    marginLeft: props.checkMode ? 30 : 0,
                    marginRight: props.checkMode ? -30 : 0,
                }}
            >
                {props.children}
            </ChildrenContainer>
            {props.checkMode && (
                <CoverPressContainer
                    onPress={() =>
                        props.onContainerCheckChange &&
                        props.onContainerCheckChange(!props.containerCheck)
                    }
                />
            )}
        </CheckItemContainerContainer>
    )
}
