import API, { OfflineFallback } from '.'
import { Questionnaires } from 'src/entity/Questionnaires.entity'
import { UserQuestionnaireAnswers } from 'src/entity/UserQuestionnaireAnswers.entity'

export interface QuestionnaireResponse {
    questionnaires: Questionnaires[]
    userQuestionnaireAnswers: UserQuestionnaireAnswers[]
}

export async function questionnaireAPI(
    Authorization: string,
    of?: OfflineFallback<QuestionnaireResponse>
): Promise<QuestionnaireResponse> {
    try {
        const result: QuestionnaireResponse = await API<QuestionnaireResponse>(
            '/questionnaire',
            'get',
            {},
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}

export async function submitQuestionnaireAnswerAPI(
    Authorization: string,
    questionnaireId: string,
    questionnaireAnswerIds: string[],
    of?: OfflineFallback<boolean>
): Promise<boolean> {
    try {
        const result: boolean = await API<boolean>(
            `/questionnaire-answer/${questionnaireId}`,
            'post',
            { questionnaireAnswerIds },
            { Authorization },
            of
        )
        return result
    } catch (err) {
        throw err
    }
}
