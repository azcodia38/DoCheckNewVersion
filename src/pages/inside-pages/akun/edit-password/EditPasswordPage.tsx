/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { DebugAlert } from 'src/utils/alert'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import { HidePasswordIcon, ShowPasswordIcon } from 'components/icons/Icons'
import PasswordStatus from 'components/password-status/PasswordStatus'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

import { NavProps, theme } from 'src/utils/const'
import { changePasswordAPI } from 'src/api/profile'
import useAuthorization from 'src/hook/useAuthorization'
import { removeUserLoginData } from 'store/data/user'
import FinishedView from 'src/components/atoms/finishedView'
import useConnected from 'src/hook/useConnected'
import Button from 'src/components/atoms/button'

interface FinishedView {
    onOK?(): void
}

interface EditPasswordPageProps extends NavProps {}

export default function EditPasswordPage(props: EditPasswordPageProps) {
    const dispatch = useDispatch()
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [repassword, setRepassword] = useState<string>('')
    const [show_password, setShowPassword] = useState<boolean>(false)
    const [isFinished, setFinished] = useState<boolean>(false)

    const [passwordError, setPasswordError] = useState<string>('')
    const [repasswordError, setRePasswordError] = useState<string>('')

    const submit = useCallback(async () => {
        setLoading(true)
        try {
            await changePasswordAPI(auth, password, repassword)
            setFinished(true)
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        changePasswordAPI,
        setFinished,
        auth,
        password,
        repassword,
        setLoading,
    ])

    const logout = useCallback(() => {
        dispatch(removeUserLoginData())
        AsyncStorage.setItem('is_logged_in', '0')
        props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'First',
                },
            ],
        })
    }, [removeUserLoginData, props.navigation, AsyncStorage.setItem])

    useEffect(() => {
        if (password.length === 0 || repassword.length === 0) {
            setRePasswordError('')
            return
        }
        if (password === repassword) {
            setRePasswordError('')
            return
        }
        setRePasswordError('Password tidak sama')
    }, [password, repassword])

    return (
        <DocheckSafeAreaView>
            <View>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={isFinished ? 'Berhasil' : 'Ubah Kata Sandi'}
                        navigation={props.navigation}
                        style={{ marginBottom: 0 }}
                        withBack
                        greenArrow
                    />
                </WithPadding>
                <ScrollView>
                    <WithPadding
                        style={{
                            paddingLeft: theme.left_right_padding * 1.2,
                            paddingRight: theme.left_right_padding * 1.2,
                        }}
                    >
                        <Space value={40} />
                        {!isFinished && (
                            <>
                                <FormTextInput
                                    state={
                                        password.length === 0
                                            ? 'normal'
                                            : passwordError.length === 0
                                            ? 'done'
                                            : 'error'
                                    }
                                    label={'Kata Sandi Baru'}
                                    rightItem={
                                        show_password ? (
                                            <ShowPasswordIcon
                                                onPress={() =>
                                                    setShowPassword(false)
                                                }
                                            />
                                        ) : (
                                            <HidePasswordIcon
                                                onPress={() =>
                                                    setShowPassword(true)
                                                }
                                            />
                                        )
                                    }
                                    value={password}
                                    onChangeText={setPassword}
                                    errorText={passwordError}
                                    secureTextEntry={!show_password}
                                    placeholder={'Kata Sandi Baru'}
                                />
                                <PasswordStatus
                                    onValidationChange={(ok) =>
                                        setPasswordError(
                                            ok
                                                ? ''
                                                : 'Password belum memenuhi syarat'
                                        )
                                    }
                                    password={password}
                                />
                                <FormTextInput
                                    state={
                                        repassword.length === 0
                                            ? 'normal'
                                            : repasswordError.length === 0
                                            ? 'done'
                                            : 'error'
                                    }
                                    label={'Konfirmasi Kata Sandi'}
                                    errorText={repasswordError}
                                    rightItem={
                                        show_password ? (
                                            <ShowPasswordIcon
                                                onPress={() =>
                                                    setShowPassword(false)
                                                }
                                            />
                                        ) : (
                                            <HidePasswordIcon
                                                onPress={() =>
                                                    setShowPassword(true)
                                                }
                                            />
                                        )
                                    }
                                    value={repassword}
                                    onChangeText={setRepassword}
                                    secureTextEntry={!show_password}
                                    placeholder={'Konfirmasi Kata Sandi'}
                                />
                                <Space value={50} />
                                <Button
                                    loading={loading}
                                    inactive={
                                        password.length === 0 ||
                                        repassword.length === 0 ||
                                        passwordError.length > 0 ||
                                        repasswordError.length > 0 ||
                                        !connected
                                    }
                                    onPress={submit}
                                >
                                    Atur ulang
                                </Button>
                            </>
                        )}
                        {isFinished && (
                            <FinishedView
                                navigationHandler={logout}
                                title="Kata Sandi Anda Telah Diubah."
                            />
                        )}
                        <Space value={30} />
                    </WithPadding>
                </ScrollView>
            </View>
        </DocheckSafeAreaView>
    )
}
