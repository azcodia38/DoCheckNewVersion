import API from '.'

export interface FeedbackSubmitData {
    userId?: string
    title: string
    type: string
    value: string
}

export async function sendFeedbackAPI(
    data: FeedbackSubmitData
): Promise<boolean> {
    try {
        await API<any>('/me/feedback', 'post', data, {})
        return true
    } catch (err) {
        throw err
    }
}
