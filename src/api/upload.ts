import { ENDPOINT } from './index'
import axios, { AxiosRequestConfig } from 'axios'

export async function requestUpload<T>(
    Authorization: string,
    config: AxiosRequestConfig
): Promise<T> {
    try {
        const response: { data: T } = await axios.request({
            baseURL: ENDPOINT,
            url: config.url,
            method: 'post',
            data: config.data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'ch-version': '2.0',
                Authorization,
            },
        })

        return response.data
    } catch (err: any) {
        // console.log(err);
        throw err.toString()
    }
}

// Upload
export interface IUploadResponse {
    success: number
    file: {
        url: string
    }
}

export async function uploadAPI(
    Authorization: string,
    image_uri: string,
    file_type: string = 'image/jpg'
): Promise<string> {
    try {
        let formData = new FormData()
        formData.append('file', {
            uri: image_uri,
            type: file_type,
            name: String(new Date().getTime()),
        } as any)
        const upload_result = await requestUpload(Authorization, {
            url: '/me/upload',
            data: formData,
        })
        return upload_result as string
    } catch (err) {
        throw err
    }
}

export async function uploadAudioAPI(
    Authorization: string,
    audio_uri: string,
    file_type: string = 'audio/mp3'
): Promise<string> {
    try {
        let formData = new FormData()
        formData.append('file', {
            uri: audio_uri,
            type: file_type,
            name: String(new Date().getTime()),
        } as any)
        const upload_result = await requestUpload(Authorization, {
            url: '/me/upload',
            data: formData,
        })
        return upload_result as string
    } catch (err) {
        throw err
    }
}
