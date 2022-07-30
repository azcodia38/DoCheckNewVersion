import React from 'react'
import ButtonOutline from './buttonOutline'

interface LogoutButtonProps {
    logoutHandler: (status: boolean) => void
}

export default function LogoutButton({ logoutHandler }: LogoutButtonProps) {
    return (
        <ButtonOutline
            borderColor={'#DADADA'}
            textStyle={{ color: '#262D33' }}
            onPress={() => logoutHandler(true)}
        >
            Keluar
        </ButtonOutline>
    )
}
