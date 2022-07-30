import React, { useMemo } from 'react'

import Button from 'src/components/atoms/button'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import { TickIcon } from 'components/icons/Icons'

import useConnected from 'src/hook/useConnected'

interface NotFinishedViewProps {
    email: string
    emailError: string
    loading: boolean
    setEmail: (status: string) => void
    submitHandler: () => Promise<void>
}

export default function NotFinishedView({
    email,
    emailError,
    loading,
    setEmail,
    submitHandler,
}: NotFinishedViewProps) {
    const { connected } = useConnected()

    const stateEmail = useMemo(
        () =>
            email.length === 0
                ? 'normal'
                : emailError.length > 0
                ? 'error'
                : 'done',
        [email, emailError]
    )

    const rightItemEmail = useMemo(
        () =>
            emailError.length === 0 && email.length > 0 ? (
                <TickIcon style={{ marginRight: 15 }} />
            ) : null,
        [emailError, email]
    )

    return (
        <>
            <Tipografi type={'small'} style={{ color: '#979797' }}>
                Masukkan email terbarumu untuk melanjutkan, dan cek Email-mu
                untuk verifikasi
            </Tipografi>
            <Space value={20} />
            <FormTextInput
                label={'Email'}
                state={stateEmail}
                rightItem={rightItemEmail}
                keyboardType={'email-address'}
                value={email}
                autoCapitalize={'none'}
                errorText={emailError}
                onChangeText={(_) => setEmail(_.toLowerCase())}
                placeholder={'Email'}
            />
            <Space value={30} />
            <Button
                loading={loading}
                inactive={emailError.length > 0 || !connected}
                onPress={submitHandler}
            >
                Selesai
            </Button>
        </>
    )
}
