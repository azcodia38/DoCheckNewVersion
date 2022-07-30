/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'

import { FeedbackSubmitData, sendFeedbackAPI } from 'src/api/feedback'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import Header from 'components/header/Header'
import {
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
import { isIOS } from 'src/utils'
import { ReportPageContainer } from './styled'
import Button from 'src/components/atoms/button'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

interface ReportPageProps extends NavProps {}

export default function ReportPage(props: ReportPageProps) {
    const [keyboard_height] = useKeyboard()
    const [data, setData] = useState<FeedbackSubmitData>({
        title: '',
        type: FEEDBACK_TYPE.OTHERS,
        value: '',
    })
    const [continueToSubmit, setContinueToSubmit] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [showPopupSubmit, setShowPopupSubmit] = useState<boolean>(false)
    const [showPopupSubmitSuccess, setShowPopupSubmitSuccess] =
        useState<boolean>(false)

    const submit = useCallback(() => {
        setContinueToSubmit(true)
        setShowPopupSubmit(false)
    }, [setShowPopupSubmit, setContinueToSubmit])

    const continueSubmit = useCallback(async () => {
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
    }, [setLoading, sendFeedbackAPI, data, setShowPopupSubmit])

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
                            title={'Report'}
                            navigation={props.navigation}
                            withBack
                            greenArrow
                        />
                        <ReportPageContainer>
                            <ImageYesNo />
                            <Tipografi
                                type={'small'}
                                style={{ color: '#979797' }}
                                center
                            >
                                {
                                    'Beri tahu kami tentang kekhawatiran Anda!\nDengan memberitahu kami, Anda membantu\nkami untuk meningkatkan DoCheck'
                                }
                            </Tipografi>
                            <Space value={25} />
                            <FormTextInput
                                accessibilityLabel={accessibilitylabels.emailReport}
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
                                placeholder={'Email'}
                            />
                            <FormTextareaInput
                                accessibilityLabel={accessibilitylabels.emailDesc}
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
                                accessibilityLabel={accessibilitylabels.btnKirimDesc}
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
                        </ReportPageContainer>
                    </WithPadding>
                </ScrollView>
            </DocheckSafeAreaView>
            <PopupYesNo
                accessibilityLabelNo={accessibilitylabels.btnPopUpBatalDesc}
                accessibilityLabelYes={accessibilitylabels.btnPopUpKirimDesc}
                show={showPopupSubmit}
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
                show={showPopupSubmitSuccess}
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
