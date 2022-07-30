import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
// import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import iid from '@react-native-firebase/iid'
import appleAuth, {
    AppleRequestResponse,
} from '@invertase/react-native-apple-authentication'

// @components

import { ImageBerhasilDiubah } from 'components/icons/Icons'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'

import LoadingFull from 'components/loading/LoadingFull'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

// @pages
import { KuisionerPageParams } from 'src/pages/inside-pages/kuisioner/params'

// @utils
import { useKeyboard } from 'src/hook/useKeyboard'
import { setUserLoginData } from 'store/data/user'
import { updateFCMTokenAPI } from 'src/api/profile'
import {
    loginByEmailAPI,
    loginByTokenAPI,
    LoginThirdPartyType,
} from 'src/api/auth'
import { NavProps } from 'src/utils/const'
import { isEmailValid } from 'src/utils'
import { DebugAlert } from 'src/utils/alert'
import LoginForm from 'src/components/atoms/loginForm'
import { questionnaireAPI, QuestionnaireResponse } from 'src/api/questionnaire'
import AppContext from 'src/context/AppContext'
import { firebase } from '@react-native-firebase/messaging'

// Page Props
export interface LoginPageProps extends NavProps {}

// Default Function
export default function LoginPage(props: LoginPageProps) {
    const dispatch = useDispatch()

    const { disableQuestionaires } = useContext(AppContext)

    const [keyboard_height] = useKeyboard()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [enableButton, setEnableButton] = useState<boolean>(false)

    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingLoginToken, setLoadingLoginToken] = useState<boolean>(false)
    const [firstTimeQuestionnaire, setFirstTimeQuestionnaire] =
        useState<boolean>(false)

    const gotoNext = useCallback(() => {
        setShowSuccessPopup(false)
        props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: firstTimeQuestionnaire ? 'Kuisioner' : 'Home',
                    params: firstTimeQuestionnaire
                        ? ({ mode: 'new' } as KuisionerPageParams)
                        : undefined,
                },
            ],
        })
    }, [setShowSuccessPopup, props.navigation, firstTimeQuestionnaire])

    const gotoRegister = useCallback(
        () => props.navigation.navigate('Register'),
        [props.navigation]
    )

    const gotoReport = useCallback(
        () => props.navigation.navigate('Report'),
        [props.navigation]
    )

    const gotoLupaKataSandi = useCallback(
        () => props.navigation.navigate('LupaKataSandi'),
        [props.navigation]
    )

    const submitLogin = useCallback(async () => {
        setLoading(true)
        try {
            const _ = await loginByEmailAPI(email, password)
            // const fcm_token: string = await iid().getToken()
            const defaultAppMessaging = firebase.messaging()

            await updateFCMTokenAPI(
                `Bearer ${_.access_token}`,
                await defaultAppMessaging.getToken()
            )
            AsyncStorage.setItem('is_logged_in', '1')

            // TODO: Toggle off questionaires
            if (!disableQuestionaires) {
                const questionnaire_status: QuestionnaireResponse =
                    await questionnaireAPI(`Bearer ${_.access_token}`)
                setFirstTimeQuestionnaire(
                    questionnaire_status.userQuestionnaireAnswers.length === 0
                )
            }

            dispatch(setUserLoginData(_))
            setShowSuccessPopup(true)
        } catch (err: any) {
            const err_string: string = err.toString()
            if (err_string.toLowerCase().includes('password')) {
                setPasswordError(err_string)
            } else {
                setEmailError(err_string)
            }
        } finally {
            setLoading(false)
        }
    }, [
        loginByEmailAPI,
        email,
        password,
        // iid,
        AsyncStorage,
        setUserLoginData,
        setShowSuccessPopup,
        setPasswordError,
        setLoading,
        updateFCMTokenAPI,
    ])

    const submitLoginThirdParty = useCallback(
        async (
            third_party_id: LoginThirdPartyType,
            access_token: string,
            name?: string
        ) => {
            setLoadingLoginToken(true)
            try {
                const _ = await loginByTokenAPI(
                    third_party_id,
                    access_token,
                    name
                )
                // const fcm_token: string = await iid().getToken()

                const defaultAppMessaging = firebase.messaging()

                await updateFCMTokenAPI(
                    `Bearer ${_.access_token}`,
                    await defaultAppMessaging.getToken()
                )

                if (!disableQuestionaires) {
                    const questionnaire_status: QuestionnaireResponse =
                        await questionnaireAPI(`Bearer ${_.access_token}`)
                    AsyncStorage.setItem('is_logged_in', '1')
                    setFirstTimeQuestionnaire(
                        questionnaire_status.userQuestionnaireAnswers.length ===
                            0
                    )
                }

                dispatch(setUserLoginData(_))
                setShowSuccessPopup(true)
            } catch (err: any) {
                DebugAlert(err.toString())
            } finally {
                setLoadingLoginToken(false)
            }
        },
        [
            setLoadingLoginToken,
            loginByTokenAPI,
            // iid,
            updateFCMTokenAPI,
            setUserLoginData,
            setShowSuccessPopup,
        ]
    )

    const actionLoginFB = useCallback(async () => {
        try {
            LoginManager.logOut()
            const result: any = await LoginManager.logInWithPermissions([
                'public_profile',
            ])

            if (result.isCancelled) throw new Error('Login cancelled')

            const data = await AccessToken.getCurrentAccessToken()
            if (!data?.accessToken) {
                DebugAlert(`Facebook login failed`)
                return
            }

            setLoadingLoginToken(true)
            submitLoginThirdParty('facebook', data?.accessToken)
        } catch (err) {
            // console.log(err);
        }
    }, [LoginManager, AccessToken, setLoadingLoginToken, submitLoginThirdParty])

    const actionLoginGoogle = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            if (!userInfo.idToken) {
                DebugAlert(`Google login failed`)
                return
            }
            setLoadingLoginToken(true)
            submitLoginThirdParty('google', userInfo.idToken)
        } catch (error: any) {
            // console.log(error.toString());
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }, [GoogleSignin, submitLoginThirdParty, setLoadingLoginToken, statusCodes])

    const onAppleButtonPress = useCallback(async () => {
        try {
            // performs login request
            const appleAuthRequestResponse: AppleRequestResponse =
                await appleAuth.performRequest({
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [
                        appleAuth.Scope.EMAIL,
                        appleAuth.Scope.FULL_NAME,
                    ],
                })

            // console.log(appleAuthRequestResponse);

            if (appleAuthRequestResponse.identityToken) {
                const final_name: string = [
                    appleAuthRequestResponse.fullName?.namePrefix,
                    appleAuthRequestResponse.fullName?.givenName,
                    appleAuthRequestResponse.fullName?.middleName,
                    appleAuthRequestResponse.fullName?.nameSuffix,
                    appleAuthRequestResponse.fullName?.familyName,
                ]
                    .filter((x) => (x ?? '').length > 0)
                    .join(' ')
                setLoadingLoginToken(true)
                submitLoginThirdParty(
                    'apple',
                    appleAuthRequestResponse.identityToken,
                    final_name
                )
            } else {
                // something went wrong
            }
        } catch (err) {
            // console.log(err);
        }
    }, [appleAuth, setLoadingLoginToken, submitLoginThirdParty])

    useEffect(() => {
        setEnableButton(
            email.length > 0 && password.length > 0 && emailError.length === 0
        )
        setEmailError(!isEmailValid(email) ? `Email tidak valid` : '')
    }, [email, password])

    useEffect(() => {
        setPasswordError('')
    }, [password])

    useEffect(() => {
        setEnableButton(
            email.length > 0 && password.length > 0 && emailError.length === 0
        )
    }, [emailError])

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '48796971795-akfld5mh1fu8hhqjvlom88mdfco4foqs.apps.googleusercontent.com',
        })
    }, [])

    return (
        <>
            <DocheckSafeAreaView>
                <ScrollView>
                    <LoginForm
                        actionLoginFB={actionLoginFB}
                        actionLoginGoogle={actionLoginGoogle}
                        dataCredential={{
                            email,
                            emailError,
                            password,
                            passwordError,
                        }}
                        enableButton={enableButton}
                        gotoLupaKataSandi={gotoLupaKataSandi}
                        gotoRegister={gotoRegister}
                        gotoReport={gotoReport}
                        keyboardHeight={keyboard_height}
                        loading={loading}
                        navigation={props.navigation}
                        onAppleButtonPress={onAppleButtonPress}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
                        submitLogin={submitLogin}
                    />
                </ScrollView>
            </DocheckSafeAreaView>
            <LoadingFull loading={loadingLoginToken} />
            <PopupNormalOK
                text={
                    'Yeay sekarang kamu bisa melanjutkan\nsesuatu yang hebat.'
                }
                image={<ImageBerhasilDiubah />}
                onCancelRequest={gotoNext}
                onOK={gotoNext}
                show={showSuccessPopup}
                setShow={setShowSuccessPopup}
            />
        </>
    )
}
