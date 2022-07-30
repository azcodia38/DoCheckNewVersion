/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { DebugAlert } from 'src/utils/alert'
import { changeEmailAPI } from 'src/api/profile'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'

import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import FinishedView from 'src/components/atoms/finishedView'

import { NavProps, theme } from 'src/utils/const'
import useAuthorization from 'src/hook/useAuthorization'
import { isEmailValid } from 'src/utils'
import HeaderEmail from 'src/components/molecules/editEmailPage/header'
import NotFinishedView from 'src/components/molecules/editEmailPage/notFinishedView'

interface EditEmailPageProps extends NavProps {}

export default function EditEmailPage(props: EditEmailPageProps) {
    const auth = useAuthorization(props.navigation)

    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [isFinished, setFinished] = useState<boolean>(false)

    const descriptionEmail = useMemo(
        () =>
            `Email verifikasi sudah dikirim ke alamat email ini ${email}, silakan diperiksa.`,
        [email]
    )

    const submitHandler = useCallback(async () => {
        setLoading(true)
        try {
            await changeEmailAPI(auth, email)
            setFinished(true)
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [changeEmailAPI, auth, email, setFinished, setLoading])

    useEffect(() => {
        setEmailError(!isEmailValid(email) ? `Email tidak valid` : '')
    }, [email])

    return (
        <DocheckSafeAreaView>
            <View>
                <HeaderEmail
                    isFinished={isFinished}
                    navigation={props.navigation}
                />
                <ScrollView>
                    <WithPadding
                        style={{
                            paddingLeft: theme.left_right_padding * 1.2,
                            paddingRight: theme.left_right_padding * 1.2,
                        }}
                    >
                        <Space value={30} />
                        {!isFinished && (
                            <NotFinishedView
                                email={email}
                                emailError={emailError}
                                loading={loading}
                                setEmail={setEmail}
                                submitHandler={submitHandler}
                            />
                        )}
                        {isFinished && (
                            <FinishedView
                                navigationHandler={() =>
                                    props.navigation.goBack()
                                }
                                title={descriptionEmail}
                            />
                        )}
                        <Space value={30} />
                    </WithPadding>
                </ScrollView>
            </View>
        </DocheckSafeAreaView>
    )
}
