import React, { useCallback, useState } from 'react'
import { DeviceEventEmitter, ScrollView, View } from 'react-native'

import { checkPasswordAPI } from 'src/api/auth'
import Button from 'src/components/atoms/button'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import { HidePasswordIcon, ShowPasswordIcon } from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps, theme } from 'src/utils/const'
import useAuthorization from 'src/hook/useAuthorization'
import { ValidasiPasswordPageParams } from 'src/pages/inside-pages/akun/validasi-password/params'
import { ValidasiPasswordPageContainer } from 'src/pages/inside-pages/akun/validasi-password/styled'
import useConnected from 'src/hook/useConnected'

interface ValidasiPasswordPageProps extends NavProps {}

export default function ValidasiPasswordPage(props: ValidasiPasswordPageProps) {
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const params: ValidasiPasswordPageParams = props.route.params
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [show_password, setShowPassword] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>('')

    // async function submit() {
    //     setLoading(true)
    //     setErrorText('')
    //     try {
    //         const _: boolean = await checkPasswordAPI(auth, password)
    //         if (!_) {
    //             setErrorText(`Password salah`)
    //             return
    //         }
    //         props.navigation.goBack()
    //         DeviceEventEmitter.emit(params.emit_key, {})
    //     } catch (err: any) {
    //         setErrorText(err.toString())
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const submitHandler = useCallback(async () => {
        setLoading(true)
        setErrorText('')
        try {
            const _: boolean = await checkPasswordAPI(auth, password)
            if (!_) {
                setErrorText(`Password salah`)
                return
            }
            props.navigation.goBack()
            DeviceEventEmitter.emit(params.emit_key, {})
        } catch (err: any) {
            setErrorText(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        setErrorText,
        checkPasswordAPI,
        props.navigation,
        DeviceEventEmitter,
        params,
    ])

    return (
        <DocheckSafeAreaView>
            <ValidasiPasswordPageContainer>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={params.title ?? 'Kata Sandi'}
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
                        <Space value={30} />
                        <Tipografi type={'small'} style={{ color: '#979797' }}>
                            Untuk mengamankan akunmu, silakan verifikasi
                            Identitas dengan memasukkan kata sandi.
                        </Tipografi>
                        <Space value={20} />
                        <FormTextInput
                            state={
                                errorText.length > 0
                                    ? 'error'
                                    : password.length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            errorText={errorText}
                            label={'Kata Sandi'}
                            rightItem={
                                <View style={{ marginRight: 15 }}>
                                    {show_password ? (
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
                                    )}
                                </View>
                            }
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!show_password}
                            placeholder={'Kata Sandi'}
                        />
                        <Space value={30} />
                        <Button
                            loading={loading}
                            inactive={password.length === 0 || !connected}
                            onPress={submitHandler}
                        >
                            Lanjut
                        </Button>
                        <Space value={30} />
                    </WithPadding>
                </ScrollView>
            </ValidasiPasswordPageContainer>
        </DocheckSafeAreaView>
    )
}
