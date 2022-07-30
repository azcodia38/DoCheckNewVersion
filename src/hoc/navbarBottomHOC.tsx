import { CenterContainer } from 'src/components/atoms/bottomNavMenu/styled'
import Tipografi from 'src/components/atoms/tipografi'
import React, { useMemo } from 'react'
import NavbarContainer from 'src/components/molecules/navbarBottom/navbarContainer'
import { NavbarBottomProps } from 'src/utils/types'
import { titleCase } from 'src/utils'

const NavbarBottomHOC = (Component: any) => (props: NavbarBottomProps) => {
    const onPosition = useMemo(
        () => (props.active === props.title ? 'relative' : 'absolute'),
        [props.active, props.title]
    )

    const onNotPosition = useMemo(
        () => (props.active !== props.title ? 'relative' : 'absolute'),
        [props.active, props.title]
    )

    return (
        <NavbarContainer setActive={props.setActive} title={props.title}>
            <CenterContainer>
                <Component
                    {...props}
                    onPosition={onPosition}
                    onNotPosition={onNotPosition}
                />
                <Tipografi
                    type={'smaller'}
                    style={{ color: '#242424', fontSize: 11 }}
                >
                    {titleCase(props.title)}
                </Tipografi>
            </CenterContainer>
        </NavbarContainer>
    )
}

export default NavbarBottomHOC
