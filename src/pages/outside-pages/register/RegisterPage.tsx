/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import moment from 'moment'

// @components
import Button from 'src/components/atoms/button'
import FormDateInput from 'components/form/form-date-input/FormDateInput'
import FormRadioInput from 'components/form/form-radio-input/FormRadioInput'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import {
    CalendarIcon,
    HidePasswordIcon,
    ImageDaftarTersimpan,
    ShowPasswordIcon,
    TickIcon,
} from 'components/icons/Icons'
import ScrollView from 'src/components/atoms/scrollView'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import CheckLabel from 'components/check-label/CheckLabel'
import PasswordStatus from 'components/password-status/PasswordStatus'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

// @utils
import { NavProps, theme } from 'src/utils/const'
import { registerAPI, RegisterRequest } from 'src/api/auth'
import { ageUnderTerm, isEmailValid, isIOS } from 'src/utils'
import { useKeyboard } from 'src/hook/useKeyboard'
import { GENDER } from 'src/entity/User.entity'

// @pages
import { WebViewPageParams } from 'src/pages/webview/params'
import { InlineTextLinkContainer, LoginLabelButtonContainer } from './styled'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

// Page Props
export interface RegisterPageProps extends NavProps {}

// Default Function
export default function RegisterPage(props: RegisterPageProps) {
    const [keyboard_height] = useKeyboard()

    const [data, setData] = useState<RegisterRequest>({
        fullname: '',
        username: '',
        email: '',
        gender: GENDER.UNKNOWN,
        birthDate: '',
        password: '',
        rePassword: '',
        referralCode: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [enableButton, setEnableButton] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('')
    const [tanggalLahirError, setTanggalLahirError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [repasswordError, setRePasswordError] = useState<string>('')
    const [usernameError, setUsernameError] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showRepassword, setShowRePassword] = useState<boolean>(false)
    const [confirmFAQ, setConfirmFAQ] = useState<boolean>(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false)

    const goToTermsAndConditionHandler = useCallback(() => {
        const params: WebViewPageParams = {
            title: 'Syarat dan Ketentuan',
            url: 'https://docheck.id/app/syarat-dan-ketentuan',
        }
        props.navigation.navigate('WebView', params)
    }, [props.navigation.navigate])

    const goToPrivacyAndTermsHandler = useCallback(() => {
        const params: WebViewPageParams = {
            title: 'Kebijakan Privasi Pengguna',
            url: 'https://docheck.id/app/kebijakan-privasi',
        }
        props.navigation.navigate('WebView', params)
    }, [props.navigation.navigate])

    const submitDaftar = useCallback(async () => {
        setLoading(true)
        try {
            await registerAPI(data)
            setShowSuccessPopup(true)
        } catch (err: any) {
            const err_text: string = err.toString()
            if (err_text.toLowerCase().includes('email')) {
                setEmailError(err_text)
            } else if (err_text.toLowerCase().includes('username')) {
                setUsernameError(err_text)
            } else {
                // DebugAlert(err_text)
            }
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        registerAPI,
        setShowPassword,
        setEmailError,
        setUsernameError,
        data,
    ])

    useEffect(() => {
        if (usernameError.length === 0) {
            return
        }
        setUsernameError('')
    }, [data.username])

    useEffect(() => {
        setEmailError(
            data.email.length > 0 && !isEmailValid(data.email)
                ? `Email tidak valid`
                : ''
        )
    }, [data.email])

    useEffect(() => {
        setTanggalLahirError(data.birthDate && ageUnderTerm(data.birthDate))
    }, [data.birthDate])

    useEffect(() => {
        if (data.password.length === 0 || data.rePassword.length === 0) {
            setRePasswordError('')
            return
        }
        if (data.password === data.rePassword) {
            setRePasswordError('')
            return
        }
        setRePasswordError('Password tidak sama')
    }, [data.password, data.rePassword])

    useEffect(() => {
        setEnableButton(
            data.fullname.length > 0 &&
                data.username.length > 0 &&
                emailError.length === 0 &&
                // data.gender.length > 0 &&
                data.birthDate !== undefined &&
                tanggalLahirError.length === 0 &&
                usernameError.length === 0 &&
                passwordError.length === 0 &&
                repasswordError.length === 0 &&
                confirmFAQ
        )
    }, [
        data.fullname,
        data.username,
        emailError,
        data.gender,
        data.birthDate,
        tanggalLahirError,
        usernameError,
        passwordError,
        repasswordError,
        confirmFAQ,
    ])

    return (
        <>
            <DocheckSafeAreaView>
                <ScrollView>
                    <WithPadding>
                        <View>
                            <Header
                                navigation={props.navigation}
                                title={'Daftar'}
                                withBack
                                greenArrow
                            />
                            <Space value={20} />
                        </View>
                        <FormTextInput
                            accessibilityLabel={accessibilitylabels.namaDaftar}
                            state={data.fullname.length > 0 ? 'done' : 'normal'}
                            rightItem={
                                data.fullname.length ? (
                                    <TickIcon style={{ marginRight: 15 }} />
                                ) : null
                            }
                            label={'Nama'}
                            style={{
                                fontFamily: 'OpenSans-Regular',
                            }}
                            placeholderTextColor={'#818487'}
                            onChangeText={(fullname) =>
                                setData({ ...data, fullname })
                            }
                            value={data.fullname}
                            placeholder={'Nama lengkap'}
                        />
                        <FormTextInput
                            accessibilityLabel={
                                accessibilitylabels.usernameDaftar
                            }
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            state={
                                usernameError.length > 0
                                    ? 'error'
                                    : data.username.length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            errorText={usernameError}
                            rightItem={
                                data.username.length ? (
                                    <TickIcon style={{ marginRight: 15 }} />
                                ) : null
                            }
                            label={'Username'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.username}
                            onChangeText={(_) =>
                                setData({ ...data, username: _.toLowerCase() })
                            }
                            placeholder={'Tulis username paling keren'}
                        />
                        <FormTextInput
                            accessibilityLabel={accessibilitylabels.emailDaftar}
                            keyboardType={'email-address'}
                            state={
                                data.email.length === 0
                                    ? 'normal'
                                    : emailError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            rightItem={
                                isEmailValid(data.email) ? (
                                    <TickIcon style={{ marginRight: 15 }} />
                                ) : null
                            }
                            errorText={emailError}
                            label={'Email'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            autoCapitalize={'none'}
                            placeholderTextColor={'#818487'}
                            value={data.email}
                            onChangeText={(_) =>
                                setData({ ...data, email: _.toLowerCase() })
                            }
                            placeholder={'docheck@mail.com'}
                        />
                        <FormRadioInput<GENDER>
                            label={'Jenis Kelamin'}
                            subLabel={'Opsional'}
                            value={data.gender}
                            options={[
                                {
                                    accessibilityLabel:
                                        accessibilitylabels.jlakiLaki,
                                    label: 'Laki-laki',
                                    value: GENDER.MALE,
                                },
                                {
                                    accessibilityLabel:
                                        accessibilitylabels.jPerempuan,
                                    label: 'Perempuan',
                                    value: GENDER.FEMALE,
                                },
                            ]}
                            onValueChange={(gender) =>
                                setData({
                                    ...data,
                                    gender:
                                        gender === data.gender
                                            ? (null as any)
                                            : gender,
                                })
                            }
                        />
                        <FormDateInput
                            state={
                                data.birthDate.length === 0
                                    ? 'normal'
                                    : tanggalLahirError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            errorText={tanggalLahirError}
                            label={'Tanggal Lahir'}
                            subLabel={'Opsional'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            rightItem={
                                <CalendarIcon style={{ marginRight: 15 }} />
                            }
                            inputStyle={{
                                marginTop: isIOS ? 0 : 5,
                                marginBottom: isIOS ? 0 : 5,
                            }}
                            placeholderTextColor={'#818487'}
                            value={
                                data.birthDate
                                    ? moment(
                                          data.birthDate,
                                          'DD/MM/YYYY'
                                      ).format('DD/MMMM/YYYY')
                                    : undefined
                            }
                            date={
                                data.birthDate
                                    ? moment(
                                          data.birthDate,
                                          'DD/MM/YYYY'
                                      ).toDate()
                                    : null
                            }
                            onDateChange={(date) =>
                                setData({
                                    ...data,
                                    birthDate:
                                        moment(date).format('DD/MM/YYYY'),
                                })
                            }
                            placeholder={'Hari/Bulan/Tahun'}
                        />
                        <FormTextInput
                            accessibilityLabel={
                                accessibilitylabels.kataSandiDaftar
                            }
                            state={
                                data.password.length === 0
                                    ? 'normal'
                                    : passwordError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            errorText={passwordError}
                            label={'Kata sandi'}
                            secureTextEntry={!showPassword}
                            rightItem={
                                <View style={{ marginRight: 15 }}>
                                    {showPassword ? (
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
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.password}
                            onChangeText={(password) =>
                                setData({ ...data, password })
                            }
                            placeholder={'Minimal 5 karakter'}
                        />
                        <PasswordStatus
                            onValidationChange={(ok) =>
                                setPasswordError(
                                    ok ? '' : 'Password belum memenuhi syarat'
                                )
                            }
                            password={data.password}
                        />
                        <FormTextInput
                            accessibilityLabel={
                                accessibilitylabels.konfirKataSandiDaftar
                            }
                            state={
                                data.rePassword.length === 0
                                    ? 'normal'
                                    : repasswordError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            errorText={repasswordError}
                            label={'Konfirmasi kata sandi'}
                            secureTextEntry={!showRepassword}
                            rightItem={
                                <View style={{ marginRight: 15 }}>
                                    {showRepassword ? (
                                        <ShowPasswordIcon
                                            onPress={() =>
                                                setShowRePassword(false)
                                            }
                                        />
                                    ) : (
                                        <HidePasswordIcon
                                            onPress={() =>
                                                setShowRePassword(true)
                                            }
                                        />
                                    )}
                                </View>
                            }
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.rePassword}
                            onChangeText={(rePassword) =>
                                setData({ ...data, rePassword })
                            }
                            placeholder={'Minimal 5 karakter'}
                        />
                        <Space value={10} />
                        <FormTextInput
                            accessibilityLabel={
                                accessibilitylabels.kodeRefferal
                            }
                            keyboardType={'default'}
                            autoCapitalize={'none'}
                            state={'normal'}
                            // errorText={usernameError}
                            rightItem={
                                data.referralCode.length ? (
                                    <TickIcon style={{ marginRight: 15 }} />
                                ) : null
                            }
                            label={'Kode Referral'}
                            subLabel={'Opsional'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.referralCode}
                            onChangeText={(_) =>
                                setData({
                                    ...data,
                                    referralCode: _.toLowerCase(),
                                })
                            }
                            placeholder={'Masukkan kode referral'}
                        />
                        <Space value={10} />
                        <CheckLabel
                            accessibilityLabel={
                                accessibilitylabels.setujuSyarat
                            }
                            check={confirmFAQ}
                            onCheckChange={setConfirmFAQ}
                        >
                            <View>
                                <Tipografi
                                    type={'small'}
                                    style={{ color: '#393F45' }}
                                >
                                    Dengan mendaftar, saya menyetujui
                                </Tipografi>
                                <InlineTextLinkContainer>
                                    <TouchableOpacity
                                        accessibilityLabel={
                                            accessibilitylabels.termsAndCondition
                                        }
                                        onPress={goToTermsAndConditionHandler}
                                    >
                                        <Tipografi
                                            type={'small'}
                                            style={{ color: theme.main_color }}
                                        >
                                            {'Syarat dan Ketentuan '}
                                        </Tipografi>
                                    </TouchableOpacity>
                                    <Tipografi
                                        type={'small'}
                                        style={{ color: '#393F45' }}
                                    >
                                        {'serta '}
                                    </Tipografi>
                                    <TouchableOpacity
                                        accessibilityLabel={
                                            accessibilitylabels.privacyAndTerms
                                        }
                                        onPress={goToPrivacyAndTermsHandler}
                                    >
                                        <Tipografi
                                            type={'small'}
                                            style={{ color: theme.main_color }}
                                        >
                                            Kebijakan Privasi
                                        </Tipografi>
                                    </TouchableOpacity>
                                </InlineTextLinkContainer>
                            </View>
                        </CheckLabel>
                        <Space value={20} />
                        <View>
                            <Button
                                accessibilityLabel={
                                    accessibilitylabels.sendBtnDaftar
                                }
                                loading={loading}
                                onPress={submitDaftar}
                                inactive={!enableButton}
                            >
                                Daftar
                            </Button>
                            <Space value={15} />
                            <LoginLabelButtonContainer>
                                <Tipografi
                                    style={{ color: '#202135' }}
                                    type={'small'}
                                    center
                                >
                                    Sudah punya akun DoCheck?
                                </Tipografi>
                                <TouchableOpacity
                                    accessibilityLabel={
                                        accessibilitylabels.btnBackToLogin
                                    }
                                    onPress={props.navigation.goBack}
                                >
                                    <Tipografi
                                        style={{
                                            color: theme.main_color,
                                            fontWeight: 'bold',
                                            marginLeft: 4,
                                        }}
                                        type={'small'}
                                        center
                                    >
                                        Masuk
                                    </Tipografi>
                                </TouchableOpacity>
                            </LoginLabelButtonContainer>
                            <Space value={32 + keyboard_height * isIOS} />
                        </View>
                    </WithPadding>
                </ScrollView>
            </DocheckSafeAreaView>
            <PopupNormalOK
                text={
                    'Yeay sekarang kamu bisa melanjutkan\nsesuatu yang hebat.'
                }
                image={<ImageDaftarTersimpan />}
                onCancelRequest={props.navigation.goBack}
                onOK={props.navigation.goBack}
                show={showSuccessPopup}
                setShow={setShowSuccessPopup}
            />
        </>
    )
}
