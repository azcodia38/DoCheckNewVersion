import React from 'react'
import { TouchableOpacity } from 'react-native'

import InputBox from '../form/input-box/InputBox'
import { FacebookIcon, GoogleIcon } from '../icons/Icons'
import Tipografi from '../../src/components/atoms/tipografi'

interface SocialMediaButtonProps {
    label: string
    leftItem?: React.ReactNode
    onPress?(): void
    accessibilitylabel: string
}

function SocialMediaButton(props: SocialMediaButtonProps) {
    return (
        <TouchableOpacity
            accessibilityLabel={props.accessibilitylabel}
            onPress={props.onPress}
        >
            <InputBox
                leftItem={props.leftItem}
                inputContainerStyle={{
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
                state={'done'}
            >
                <Tipografi
                    type={'small'}
                    style={{
                        textAlign: 'center',
                        paddingRight: 24,
                        color: '#262D33',
                        paddingTop: 14,
                        paddingBottom: 14,
                    }}
                >
                    {props.label}
                </Tipografi>
            </InputBox>
        </TouchableOpacity>
    )
}

interface SocialLoginButtonProps {
    onPress?(): void
    accessibilitylabel: string
}

export function GoogleLoginButton(props: SocialLoginButtonProps) {
    return (
        <SocialMediaButton
            accessibilitylabel={props.accessibilitylabel}
            onPress={props.onPress}
            label={'Masuk dengan Google'}
            leftItem={<GoogleIcon />}
        />
    )
}

export function FacebookLoginButton(props: SocialLoginButtonProps) {
    return (
        <SocialMediaButton
            accessibilitylabel={props.accessibilitylabel}
            onPress={props.onPress}
            label={'Masuk dengan Facebook'}
            leftItem={<FacebookIcon />}
        />
    )
}
