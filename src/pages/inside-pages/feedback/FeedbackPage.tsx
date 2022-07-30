/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { FeedbackSubmitData, sendFeedbackAPI } from 'src/api/feedback'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormDropdown2Input from 'components/form/form-dropdown-input/FormDropdown2Input'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import Header from 'components/header/Header'
import {
    ArrowDownGrayIcon,
    ImageBerhasilDiubah,
    ImageSimpanPerubahan,
    ImageYesNo,
} from 'components/icons/Icons'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { NavProps, theme } from 'src/utils/const'
import { FEEDBACK_TYPE } from 'src/entity/Feedback.entity'
import { useKeyboard } from 'src/hook/useKeyboard'
import StoreData from 'store/types'
import { isIOS } from 'src/utils'
import { FeedbackPageContainer } from 'src/pages/inside-pages/feedback/styled'
import Button from 'src/components/atoms/button'

interface FeedbackPageProps extends NavProps {}

export default function FeedbackPage(props: FeedbackPageProps) {
    const [keyboard_height] = useKeyboard()
    const user = useSelector(
        ({ user_login_data }: StoreData) => user_login_data.user
    )
    const [data, setData] = useState<FeedbackSubmitData>({
        userId: user.id,
        title: '',
        type: '',
        value: '',
    })

    const [continueToSubmit, setContinueToSubmit] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [show_popup_submit, setShowPopupSubmit] = useState<boolean>(false)
    const [show_popup_submit_success, setShowPopupSubmitSuccess] =
        useState<boolean>(false)

    // function submit() {
    //     continue_to_submit = true
    //     setShowPopupSubmit(false)
    // }

    const submit = useCallback(() => {
        setContinueToSubmit(true)
        setShowPopupSubmit(false)
    }, [setShowPopupSubmit, setContinueToSubmit])

    async function continueSubmit() {
        setLoading(true)
        try {
            await sendFeedbackAPI(data)
            setShowPopupSubmitSuccess(true)
            setTimeout(() => setShowPopupSubmitSuccess(false), 1000)
        } catch (err: any) {
            //
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <DocheckSafeAreaView>
                <ScrollView>
                    <WithPadding
                        style={{
                            paddingLeft: theme.left_right_padding * 1.5,
                            paddingRight: theme.left_right_padding * 1.5,
                        }}
                    >
                        <Space value={7} />
                        <Header
                            title={'Feedback'}
                            navigation={props.navigation}
                            withBack
                            greenArrow
                        />
                        <FeedbackPageContainer>
                            <ImageYesNo />
                            <Tipografi
                                type={'small'}
                                style={{ color: '#979797' }}
                                center
                            >
                                {
                                    'Beri tahu kami tentang kekhawatiran Anda!\nDengan memberitahu kami, Anda membantu kami\nuntuk meningkatkan DoCheck'
                                }
                            </Tipografi>
                            <Space value={25} />
                            <FormTextInput
                                state={
                                    data.title.length > 0
                                        ? 'special-task'
                                        : 'feedback'
                                }
                                style={{ fontFamily: 'OpenSans-Regular' }}
                                placeholderTextColor={'#818487'}
                                onChangeText={(title) =>
                                    setData({ ...data, title })
                                }
                                value={data.title}
                                placeholder={'Title'}
                            />
                            <FormDropdown2Input
                                state={
                                    data.type.length > 0
                                        ? 'special-task'
                                        : 'feedback'
                                }
                                placeholderTextColor={'#818487'}
                                options={[
                                    FEEDBACK_TYPE.BUGS,
                                    FEEDBACK_TYPE.IMPROVEMENT,
                                    FEEDBACK_TYPE.SUGGESTION,
                                    FEEDBACK_TYPE.OTHERS,
                                ].map((ft) => ({
                                    label: ft,
                                    value: ft,
                                }))}
                                rightItem={<ArrowDownGrayIcon />}
                                editable={true}
                                onValueChange={(type) =>
                                    setData({ ...data, type })
                                }
                                inputStyle={{
                                    paddingTop: 17,
                                    paddingBottom: 17,
                                }}
                                optionStyle={{ paddingLeft: 18 }}
                                optionContainerStyle={{ zIndex: 999 }}
                                value={data.type}
                                placeholder={'Feedback Type'}
                            />
                            <Space value={14} />
                            <FormTextareaInput
                                state={
                                    data.value.length > 0
                                        ? 'special-task'
                                        : 'feedback'
                                }
                                placeholderTextColor={'#818487'}
                                onChangeText={(value) =>
                                    setData({ ...data, value })
                                }
                                style={{ zIndex: 0 }}
                                value={data.value}
                                placeholder={'Tuliskan feedbackmu disini...'}
                            />
                            <Space value={24} />
                            <Button
                                onPress={() => setShowPopupSubmit(true)}
                                loading={loading}
                                inactive={
                                    data.title.length === 0 ||
                                    data.type.length === 0 ||
                                    data.value.length === 0
                                }
                            >
                                Kirim
                            </Button>
                            <Space value={32 + keyboard_height * isIOS} />
                        </FeedbackPageContainer>
                    </WithPadding>
                </ScrollView>
            </DocheckSafeAreaView>
            <PopupYesNo
                show={show_popup_submit}
                setShow={setShowPopupSubmit}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToSubmit) {
                        setLoading(true)
                        continueSubmit()
                    }
                }}
                title={'Kirim Feedback?'}
                labelYes={'Kirim'}
                onNo={() => setShowPopupSubmit(false)}
                onYes={submit}
                cancelable
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={show_popup_submit_success}
                setShow={setShowPopupSubmitSuccess}
                onCancelRequest={() => {
                    setShowPopupSubmitSuccess(false)
                }}
                onModalHide={() => {
                    props.navigation.goBack()
                }}
                style={{
                    padding: 12,
                }}
                text={
                    'Terimakasih atas pemikiran Anda. Kami\nmenghargai umpan balik dari Anda.'
                }
                image={<ImageBerhasilDiubah />}
                title={'Berhasil!'}
                noButton
            />
        </>
    )
}
