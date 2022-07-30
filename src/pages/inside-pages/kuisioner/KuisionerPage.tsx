/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, View } from 'react-native'

import { DebugAlert } from 'src/utils/alert'
import {
    questionnaireAPI,
    QuestionnaireResponse,
    submitQuestionnaireAnswerAPI,
} from 'src/api/questionnaire'

import { CarouselKuisionerData } from 'components/carousel-kuisioner/CarouselKuisioner'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import IntroDotIndicator from 'components/intro-dot-indicator/IntroDotIndicator'

// @utils
import { NavProps, theme } from 'src/utils/const'
import { QuestionnaireAnswers } from 'src/entity/QuestionnaireAnswers.entity'
import { Questionnaires } from 'src/entity/Questionnaires.entity'
import { UserQuestionnaireAnswers } from 'src/entity/UserQuestionnaireAnswers.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { KuisionerPageParams } from './params'
import { KuisionerPageContainer } from './styled'
import useConnected from 'src/hook/useConnected'
import ActionButton from 'src/components/atoms/questionnaires/actionButton'
import Content from 'src/components/atoms/questionnaires/content'
import Header from 'src/components/atoms/questionnaires/header'
import { size } from 'lodash'
import { act } from 'react-test-renderer'

interface TempUserQuestionnaireAnswer {
    questionnaire_id: string
    answers: string[]
}

export default function KuisionerPage(props: NavProps) {
    const params: KuisionerPageParams = props.route.params

    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const [onlyOnce, setOnlyOnce] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [questionnaires, setQuestionnaires] = useState<Questionnaires[]>([])
    const [userQuestionnaireAnswers, setUserQuestionnaireAnswers] = useState<
        TempUserQuestionnaireAnswer[]
    >([])
    const [questionaireList, setQuestionaireList] = useState<
        CarouselKuisionerData[]
    >([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

    const onValuesChange = useCallback(
        (index: number, new_values: string[]) => {
            let update_answers = [...userQuestionnaireAnswers]
            setQuestionaireList(
                questionaireList.map(
                    (kuisioner: CarouselKuisionerData, i: number) => {
                        if (i !== index) return kuisioner

                        update_answers = update_answers.map(
                            (_answer: TempUserQuestionnaireAnswer) => {
                                if (
                                    _answer.questionnaire_id !== kuisioner.key
                                ) {
                                    return _answer
                                }

                                return {
                                    ..._answer,
                                    answers: new_values,
                                }
                            }
                        )

                        return {
                            ...kuisioner,
                            values: new_values,
                        }
                    }
                )
            )
            setUserQuestionnaireAnswers(update_answers)
        },
        [setQuestionaireList, questionaireList, setUserQuestionnaireAnswers]
    )

    // function onValuesChange(index: number, new_values: string[]) {
    //     let update_answers = [...userQuestionnaireAnswers]
    //     setQuestionaireList(
    //         questionaireList.map(
    //             (kuisioner: CarouselKuisionerData, i: number) => {
    //                 if (i !== index) {
    //                     return kuisioner
    //                 }

    //                 update_answers = update_answers.map(
    //                     (_answer: TempUserQuestionnaireAnswer) => {
    //                         if (_answer.questionnaire_id !== kuisioner.key) {
    //                             return _answer
    //                         }

    //                         return {
    //                             ..._answer,
    //                             answers: new_values,
    //                         }
    //                     }
    //                 )

    //                 return {
    //                     ...kuisioner,
    //                     values: new_values,
    //                 }
    //             }
    //         )
    //     )
    //     setUserQuestionnaireAnswers(update_answers)
    // }

    const skip = useCallback(() => {
        BackHandler.removeEventListener('hardwareBackPress', backAction)
        if (params.mode === 'edit') {
            props.navigation.goBack()
            return
        }
        props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Home',
                },
            ],
        })
    }, [BackHandler, params.mode, props.navigation.goBack, props.navigation])

    // function skip() {
    //     BackHandler.removeEventListener('hardwareBackPress', backAction)
    //     if (params.mode === 'edit') {
    //         props.navigation.goBack()
    //         return
    //     }
    //     props.navigation.reset({
    //         index: 0,
    //         routes: [
    //             {
    //                 name: 'Home',
    //             },
    //         ],
    //     })
    // }

    // function nextPage() {
    //     if (activeIndex === questionaireList.length - 1 && !onlyOnce) {
    //         setOnlyOnce(true)
    //         submit()
    //         return
    //     }
    //     setActiveIndex(Math.min(activeIndex + 1, questionaireList.length - 1))
    // }

    const prevPage = useCallback(
        () => setActiveIndex(Math.max(activeIndex - 1, 0)),
        [setActiveIndex, activeIndex]
    )

    // function prevPage() {
    //     setActiveIndex(Math.max(activeIndex - 1, 0))
    // }

    const getTitle = useMemo(() => {
        if (questionaireList.length - 1 < activeIndex) return ''
        return questionaireList[activeIndex].topic
    }, [questionaireList, activeIndex])

    // function getTitle() {
    //     if (questionaireList.length - 1 < activeIndex) {
    //         return ''
    //     }

    //     return questionaireList[activeIndex].topic
    // }

    const backAction = useCallback(() => {
        if (activeIndex === 0) {
            props.navigation.goBack()
            return true
        }
        prevPage()
        return true
    }, [activeIndex, props.navigation.goBack, prevPage])

    // function backAction(): boolean {
    //     if (activeIndex === 0) {
    //         props.navigation.goBack()
    //         return true
    //     }
    //     prevPage()
    //     return true
    // }

    const getQuestionnairesAndUserAnswers = useCallback(async () => {
        setLoading(true)
        try {
            const _: QuestionnaireResponse = await questionnaireAPI(auth, {
                connected,
                fallback() {
                    return {
                        questionnaires: [],
                        userQuestionnaireAnswers: [],
                    }
                },
            })
            setQuestionnaires(_.questionnaires)
            setUserQuestionnaireAnswers(
                _.questionnaires.map((q: Questionnaires) => ({
                    questionnaire_id: q.id,
                    answers: _.userQuestionnaireAnswers
                        .filter(
                            (uqa: UserQuestionnaireAnswers) =>
                                uqa.questionnaire?.id === q.id
                        )
                        .map((uqa: UserQuestionnaireAnswers) => uqa.answer.id),
                }))
            )
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        auth,
        setLoading,
        questionnaireAPI,
        connected,
        setQuestionnaires,
        setUserQuestionnaireAnswers,
    ])

    // async function getQuestionnairesAndUserAnswers() {
    //     setLoading(true)
    //     try {
    //         const _: QuestionnaireResponse = await questionnaireAPI(auth, {
    //             connected,
    //             fallback() {
    //                 return {
    //                     questionnaires: [],
    //                     userQuestionnaireAnswers: [],
    //                 }
    //             },
    //         })
    //         setQuestionnaires(_.questionnaires)
    //         setUserQuestionnaireAnswers(
    //             _.questionnaires.map((q: Questionnaires) => ({
    //                 questionnaire_id: q.id,
    //                 answers: _.userQuestionnaireAnswers
    //                     .filter(
    //                         (uqa: UserQuestionnaireAnswers) =>
    //                             uqa.questionnaire?.id === q.id
    //                     )
    //                     .map((uqa: UserQuestionnaireAnswers) => uqa.answer.id),
    //             }))
    //         )
    //     } catch (err: any) {
    //         DebugAlert(err.toString())
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // async function submit() {
    //     setLoadingSubmit(true)
    //     try {
    //         for await (const answer of userQuestionnaireAnswers) {
    //             await submitQuestionnaireAnswerAPI(
    //                 auth,
    //                 answer.questionnaire_id,
    //                 answer.answers
    //             )
    //         }
    //         props.navigation.reset({
    //             index: 0,
    //             routes: [
    //                 {
    //                     name: 'RekomendasiKuisioner',
    //                 },
    //             ],
    //         })
    //     } catch (err: any) {
    //         DebugAlert(err.toString())
    //     } finally {
    //         setLoadingSubmit(false)
    //         setOnlyOnce(false)
    //     }
    // }

    const submit = useCallback(async () => {
        setLoadingSubmit(true)
        try {
            for await (const answer of userQuestionnaireAnswers) {
                await submitQuestionnaireAnswerAPI(
                    auth,
                    answer.questionnaire_id,
                    answer.answers
                )
            }
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'RekomendasiKuisioner',
                    },
                ],
            })
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoadingSubmit(false)
            setOnlyOnce(false)
        }
    }, [
        setLoadingSubmit,
        userQuestionnaireAnswers,
        submitQuestionnaireAnswerAPI,
        auth,
        props.navigation,
        setOnlyOnce,
    ])

    const nextPage = useCallback(() => {
        if (activeIndex === questionaireList.length - 1 && !onlyOnce) {
            setOnlyOnce(true)
            submit()
            return
        }
        setActiveIndex(Math.min(activeIndex + 1, questionaireList.length - 1))
    }, [
        activeIndex,
        questionaireList,
        onlyOnce,
        setOnlyOnce,
        submit,
        setActiveIndex,
    ])

    useEffect(() => {
        setQuestionaireList(
            questionnaires.map((q: Questionnaires) => {
                const user_answer_id =
                    userQuestionnaireAnswers.find(
                        (tuqa: TempUserQuestionnaireAnswer) =>
                            tuqa.questionnaire_id === q.id
                    )?.answers ?? []
                return {
                    description: q.description,
                    title: q.question,
                    topic: '',
                    type: q.type.toLowerCase() as 'dropdown' | 'bubble',
                    options: (q.questionnaireAnswers ?? []).map(
                        (a: QuestionnaireAnswers) => ({
                            label: a.value,
                            value: a.id,
                        })
                    ),
                    key: q.id,
                    values: user_answer_id,
                }
            })
        )
    }, [questionnaires, userQuestionnaireAnswers])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [activeIndex])

    useEffect(() => {
        setOnlyOnce(false)
        getQuestionnairesAndUserAnswers()
    }, [])

    return (
        <DocheckSafeAreaView>
            <KuisionerPageContainer>
                <View>
                    <Header
                        activeIndex={activeIndex}
                        backAction={backAction}
                        navigation={props.navigation}
                        title={getTitle}
                        totalDots={size(questionaireList)}
                    />
                </View>
                <Content
                    activeIndex={activeIndex}
                    loading={loading}
                    onValuesChange={onValuesChange}
                    questionaireList={questionaireList}
                    setActiveIndex={setActiveIndex}
                />
                <ActionButton
                    loadingSubmit={loadingSubmit}
                    nextPage={nextPage}
                    skip={skip}
                />
            </KuisionerPageContainer>
        </DocheckSafeAreaView>
    )
}
