/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import { MenuIconText } from 'src/components/atoms/bottomNavMenu/styled'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'
import { BottomNavType } from 'src/utils/types'

interface NavbarContainerProps {
    setActive: (string: BottomNavType) => void
    title: BottomNavType
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({
    setActive,
    title,
    children,
}) => (
    <MenuIconText>
        <TouchableWithoutFeedback onPress={() => setActive(title)}>
            {children}
        </TouchableWithoutFeedback>
    </MenuIconText>
)

export default NavbarContainer
