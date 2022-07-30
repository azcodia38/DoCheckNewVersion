/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */


import React from 'react'

import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import {
    NavBottomSearchOffIcon,
    NavBottomSearchOnIcon,
} from 'components/icons/Icons'

import NavbarBottomHOC from 'src/hoc/navbarBottomHOC'
import { NavbarBottomProps } from 'src/utils/types'

const FindFriend = ({
    active,
    setActive,
    title,
    onPosition,
    onNotPosition,
}: NavbarBottomProps) => {
    return (
        <CenterContainer>
            <NavBottomSearchOnIcon
                style={{
                    position: onPosition,
                    opacity: active === title ? 1 : 0,
                }}
                onPress={() => setActive(title)}
            />
            <NavBottomSearchOffIcon
                style={{
                    position: onNotPosition,
                    opacity: active !== title ? 1 : 0,
                }}
                onPress={() => setActive(title)}
            />
        </CenterContainer>
    )
}

export default NavbarBottomHOC(FindFriend)
