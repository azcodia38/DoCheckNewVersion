/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */


import React from 'react'

import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import {
    NavBottomHomeOffIcon,
    NavBottomHomeOnIcon,
} from 'components/icons/Icons'

import NavbarBottomHOC from 'src/hoc/navbarBottomHOC'
import { NavbarBottomProps } from 'src/utils/types'

const HomePage = ({
    active,
    setActive,
    title,
    onPosition,
    onNotPosition,
}: NavbarBottomProps) => {
    return (
        <CenterContainer>
            <NavBottomHomeOnIcon
                style={{
                    position: onPosition,
                    opacity: active === title ? 1 : 0,
                }}
                onPress={() => setActive(title)}
            />
            <NavBottomHomeOffIcon
                style={{
                    position: onNotPosition,
                    opacity: active !== title ? 1 : 0,
                }}
                onPress={() => setActive(title)}
            />
        </CenterContainer>
    )
}

export default NavbarBottomHOC(HomePage)
