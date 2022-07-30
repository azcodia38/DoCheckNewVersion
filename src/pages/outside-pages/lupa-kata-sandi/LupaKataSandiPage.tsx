/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import Header from 'components/header/Header'
import {
    EmailIcon,
    ImageLupaKataSandi,
    ImageBerhasilDiubah,
    TickIcon,
} from 'components/icons/Icons'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps } from 'src/utils/const'
import { resetPasswordAPI } from 'src/api/auth'
import { useKeyboard } from 'src/hook/useKeyboard'
import { isEmailValid, isIOS } from 'src/utils'
import { LupaKataSandiPageContainer } from 'src/pages/outside-pages/lupa-kata-sandi/styled'
import Button from 'src/components/atoms/button'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

// Page Props
export interface LupaKataSandiPageProps extends NavProps {}

// Default Function
export default function LupaKataSandiPage(props: LupaKataSandiPageProps) {
    const [keyboard_height] = useKeyboard()
    const [email, setEmail] = useState<string>('')
    const [enableButton, setEnableButton] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [emailError, setEmailError] = useState<string>('')
    const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false)

    async function submitLupaPassword() {
        setLoading(true)
        try {
            await resetPasswordAPI(email)
            setShowSuccessPopup(true)
        } catch (err: any) {
            setEmailError(err.toString())
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setEnableButton(email.length > 0 && emailError.length === 0)
        setEmailError(!isEmailValid(email) ? `Email tidak valid` : '')
    }, [email])

    useEffect(() => {
        setEnableButton(email.length > 0 && emailError.length === 0)
    }, [emailError])

    return (
        <>
            <DocheckSafeAreaView>
                <WithPadding>
                    <LupaKataSandiPageContainer>
                        <View>
                            <Header
                                navigation={props.navigation}
                                title={''}
                                withBack
                                greenArrow
                            />
                        </View>
                        <View>
                            {keyboard_height === 0 && <ImageLupaKataSandi />}
                        </View>
                        <View>
                            <Tipografi type={'title'} center>
                                Lupa Kata sandi?
                            </Tipografi>
                            <Space value={10} />
                            <Tipografi
                                style={{
                                    lineHeight: 26,
                                    color: '#2B2C43',
                                    opacity: 0.3,
                                }}
                                type={'normal'}
                                center
                            >
                                {
                                    'Masukan alamat email anda, untuk\nmemulihkan akun anda'
                                }
                            </Tipografi>
                        </View>
                        <View style={{ minHeight: 115 }}>
                            <Tipografi type={'label'}>Email</Tipografi>
                            <Space value={10} />
                            <FormTextInput
                                accessibilityLabel={
                                    accessibilitylabels.emailLupaSandi
                                }
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
                                autoCapitalize={'none'}
                                value={email}
                                onChangeText={(_) => setEmail(_.toLowerCase())}
                                leftItem={
                                    <EmailIcon style={{ marginRight: 15 }} />
                                }
                                placeholder={'Masukan email kamu'}
                            />
                            <Space value={10} />
                        </View>
                        <View
                            accessibilityLabel={
                                accessibilitylabels.btnLupaSandi
                            }
                        >
                            <Button
                                onPress={submitLupaPassword}
                                inactive={!enableButton}
                                loading={loading}
                            >
                                Kirim
                            </Button>
                            <Space value={52} />
                        </View>
                        <Space value={32 + keyboard_height * isIOS} />
                    </LupaKataSandiPageContainer>
                </WithPadding>
            </DocheckSafeAreaView>
            <PopupNormalOK
                accessibilityLabel={accessibilitylabels.btnPopupLupaSandi}
                text={
                    'Permintaan kamu sudah dikirim ke email,\ncek Emailmu sekarang!'
                }
                image={<ImageBerhasilDiubah />}
                onModalHide={() => props.navigation.goBack()}
                onCancelRequest={() => setShowSuccessPopup(false)}
                onOK={() => setShowSuccessPopup(false)}
                show={showSuccessPopup}
                setShow={setShowSuccessPopup}
            />
        </>
    )
}
