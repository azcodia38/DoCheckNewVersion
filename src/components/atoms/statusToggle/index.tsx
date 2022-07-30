import React, { useCallback, useEffect, useState } from 'react'

import Tipografi from 'src/components/atoms/tipografi'
import {
    BodyWrapper,
    IconWrapper,
    StatusToggleWrapper,
    TitleWrapper,
} from './styled'
import {
    ArrowRightDisableGoalIcon,
    LockGoalIcon,
    UnlockGoalIcon,
} from 'components/icons/Icons'
import TouchableWithoutFeedback from '../touchableWithoutFeedback'

const IS_PRIVATE = 'Private to you'
const IS_PUBLIC = 'Public to everyone'

interface StatusToggleProps {
    isPublic: boolean
    isEditMode?: boolean
    onValueChange?: (status: boolean) => void
}

export default function StatusToggle({
    onValueChange = () => {},
    isPublic,
    isEditMode = false,
}: StatusToggleProps) {
    const [localPublic, setLocalPublic] = useState(false)
    const [title, setTitle] = useState(IS_PRIVATE)

    const onPressHandler = useCallback(() => {
        if (localPublic) setTitle(IS_PRIVATE)
        else setTitle(IS_PUBLIC)
        setLocalPublic(!localPublic)
    }, [setTitle, title, localPublic, setLocalPublic])

    useEffect(() => {
        if (isEditMode) {
            if (isPublic) setTitle(IS_PUBLIC)
            else setTitle(IS_PRIVATE)
            setLocalPublic(isPublic)
        }
    }, [isEditMode, isPublic])

    useEffect(() => {
        onValueChange(localPublic)
    }, [localPublic])

    return (
        <TouchableWithoutFeedback onPress={onPressHandler}>
            <StatusToggleWrapper isPublic={localPublic}>
                <BodyWrapper>
                    <IconWrapper>
                        {localPublic ? <UnlockGoalIcon /> : <LockGoalIcon />}
                    </IconWrapper>
                    <TitleWrapper>
                        <Tipografi type="label">{title}</Tipografi>
                    </TitleWrapper>
                    <IconWrapper>
                        <ArrowRightDisableGoalIcon />
                    </IconWrapper>
                </BodyWrapper>
            </StatusToggleWrapper>
        </TouchableWithoutFeedback>
    )
}
