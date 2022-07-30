import React from 'react'
import { Dimensions, View } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationContainerRef } from '@react-navigation/native'

// @components
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import {
    LoginPageContainer,
    SpaceBetweenColumnContainer,
} from 'src/pages/outside-pages/login/styled'
import { isAndroid, isIOS } from 'src/utils'
import Tipografi from 'src/components/atoms/tipografi'
import {
    EmailIcon,
    HidePasswordIcon,
    LockIcon,
    ShowPasswordIcon,
    TickIcon,
} from 'components/icons/Icons'
import {
    FacebookLoginButton,
    GoogleLoginButton,
} from 'components/social-media-button/SocialMediaButton'
import Button from 'src/components/atoms/button'

import { theme } from 'src/utils/const'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

const { height: viewportHeight } = Dimensions.get('window')

interface LoginFormProps {
    keyboardHeight: number
    navigation: NavigationContainerRef
    dataCredential: {
        email: string
        password: string
        emailError: string
        passwordError: string
    }
    gotoRegister: () => void
    loading: boolean
    enableButton: boolean
    submitLogin: () => Promise<void>
    gotoReport: () => void
    onAppleButtonPress: () => Promise<void>
    actionLoginFB: () => Promise<void>
    actionLoginGoogle: () => Promise<void>
    gotoLupaKataSandi: () => void
    setShowPassword: (status: boolean) => void
    setEmail: (password: string) => void
    showPassword: boolean
    setPassword: (password: string) => void
}

export default function LoginForm({
    keyboardHeight,
    navigation,
    dataCredential: { email, emailError, password, passwordError },
    gotoRegister,
    loading,
    actionLoginFB,
    actionLoginGoogle,
    enableButton,
    gotoLupaKataSandi,
    gotoReport,
    onAppleButtonPress,
    submitLogin,
    setShowPassword,
    showPassword,
    setEmail,
    setPassword,
}: LoginFormProps) {
    return (
        <WithPadding
            style={{
                minHeight: viewportHeight - 32 - isAndroid * keyboardHeight,
            }}
        >
            <LoginPageContainer>
                <View>
                    <Header
                        navigation={navigation}
                        title={'Masuk'}
                        withBack
                        greenArrow
                    />
                </View>
                <SpaceBetweenColumnContainer>
                    <View>
                        <View style={{ minHeight: 105 }}>
                            <FormTextInput
                                accessibilityLabel={accessibilitylabels.email}
                                state={
                                    email.length === 0
                                        ? 'normal'
                                        : emailError.length > 0
                                        ? 'error'
                                        : 'done'
                                }
                                rightItem={
                                    emailError.length === 0 &&
                                    email.length > 0 ? (
                                        <TickIcon style={{ marginRight: 15 }} />
                                    ) : null
                                }
                                errorText={emailError}
                                keyboardType={'email-address'}
                                value={email}
                                autoCapitalize={'none'}
                                onChangeText={(_) => setEmail(_.toLowerCase())}
                                leftItem={
                                    <EmailIcon style={{ marginRight: 15 }} />
                                }
                                placeholder={'Email'}
                                label={'Email'}
                            />
                        </View>
                        <FormTextInput
                            accessibilityLabel={accessibilitylabels.password}
                            state={
                                password.length === 0
                                    ? 'normal'
                                    : passwordError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            rightItem={
                                <View style={{ marginRight: 15 }}>
                                    {password.length ===
                                    0 ? null : showPassword ? (
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
                            errorText={passwordError}
                            secureTextEntry={!showPassword}
                            leftItem={<LockIcon style={{ marginRight: 15 }} />}
                            placeholder={'Password'}
                            label={'Password'}
                        />
                        <TouchableOpacity
                            accessibilityLabel={accessibilitylabels.sandi}
                            onPress={gotoLupaKataSandi}
                        >
                            <Tipografi
                                style={{
                                    color: theme.main_color,
                                    textAlign: 'right',
                                }}
                                type={'small'}
                                center
                            >
                                Lupa kata sandi?
                            </Tipografi>
                        </TouchableOpacity>
                        <Space value={15} />
                    </View>
                    <View>
                        {keyboardHeight === 0 && (
                            <>
                                <Tipografi
                                    type={'label'}
                                    style={{
                                        color: '#000',
                                        textAlign: 'center',
                                    }}
                                >
                                    Atau
                                </Tipografi>
                                <Space value={12} />
                                <GoogleLoginButton
                                    accessibilitylabel={
                                        accessibilitylabels.masukGoogle
                                    }
                                    onPress={actionLoginGoogle}
                                />
                                {/* <FacebookLoginButton
                                    accessibilitylabel={
                                        accessibilitylabels.masukFacebook
                                    }
                                    onPress={actionLoginFB}
                                /> */}
                                {isIOS === 1 && (
                                    <>
                                        <AppleButton
                                            buttonStyle={
                                                AppleButton.Style.WHITE_OUTLINE
                                            }
                                            buttonType={
                                                AppleButton.Type.SIGN_IN
                                            }
                                            style={{
                                                width: '100%', // You must specify a width
                                                height: 48, // You must specify a height
                                            }}
                                            onPress={onAppleButtonPress}
                                        />
                                        <Space value={15} />
                                    </>
                                )}
                                <Tipografi
                                    accessibilitylabel={
                                        accessibilitylabels.reportError
                                    }
                                    onPress={gotoReport}
                                    type={'small'}
                                    style={{
                                        color: theme.main_color,
                                        textAlign: 'center',
                                    }}
                                >
                                    Report an error
                                </Tipografi>
                            </>
                        )}
                    </View>
                    <View>
                        <Space value={15} />
                        <View accessibilityLabel={accessibilitylabels.login}>
                            <Button
                                onPress={submitLogin}
                                inactive={!enableButton}
                                loading={loading}
                            >
                                Masuk
                            </Button>
                        </View>
                        <Space value={15} />
                        <Tipografi
                            style={{ color: '#202135' }}
                            type={'smaller'}
                            center
                        >
                            Belum punya akun DoCheck?
                        </Tipografi>
                        <Space value={5} />
                        <TouchableOpacity
                            accessibilityLabel={accessibilitylabels.btnDafttar}
                            onPress={gotoRegister}
                        >
                            <Tipografi
                                style={{ color: theme.main_color }}
                                type={'button'}
                                center
                            >
                                Daftar
                            </Tipografi>
                        </TouchableOpacity>
                        <Space value={32 + isIOS * keyboardHeight} />
                    </View>
                </SpaceBetweenColumnContainer>
            </LoginPageContainer>
        </WithPadding>
    )
}
