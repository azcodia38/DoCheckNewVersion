import { getLinkPreview } from 'link-preview-js'
import React, { useEffect, useState } from 'react'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'
import Tipografi from '../tipografi'
import {
    ImageTextContainer,
    LinkContainer,
    LinkImage,
    TautanRekomendasiContainer,
    TextContainer,
} from './styled'

interface TautanRekomendasiProps {
    url?: string
    onOpenLink?(url: string): void
}

export default function TautanRekomendasi(props: TautanRekomendasiProps) {
    const [data, setData] = useState<any>({} as any)

    async function fetchUrlData() {
        try {
            const _data = await getLinkPreview(props.url!)
            setData(_data)
        } catch (err) {
            setData({} as any)
        }
    }

    useEffect(() => {
        if (!props.url) {
            setData({})
            return
        }
        fetchUrlData()
    }, [props.url])

    return (
        <TouchableWithoutFeedback
            onPress={() =>
                props.url && props.onOpenLink && props.onOpenLink(props.url)
            }
        >
            <TautanRekomendasiContainer
                style={{
                    shadowColor: '#555',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 4,
                }}
            >
                <ImageTextContainer>
                    {data.images?.length > 0 && (
                        <LinkImage source={{ uri: data.images[0] }} />
                    )}
                    <TextContainer>
                        <Tipografi
                            type={'label'}
                            style={{ color: '#262D33', fontSize: 15 }}
                        >
                            {data.title}
                        </Tipografi>
                        <Tipografi
                            numberOfLines={3}
                            type={'smaller'}
                            style={{ color: '#262D33' }}
                        >
                            {data.description}
                        </Tipografi>
                        <Tipografi
                            type={'smaller'}
                            style={{ color: '#ABABAB' }}
                        >
                            {data.siteName}
                        </Tipografi>
                    </TextContainer>
                </ImageTextContainer>
                <LinkContainer>
                    <Tipografi
                        type={'smaller'}
                        style={{
                            color: '#979797',
                            padding: 16,
                            paddingBottom: 8,
                            paddingTop: 8,
                        }}
                    >
                        {props.url ?? ''}
                    </Tipografi>
                </LinkContainer>
            </TautanRekomendasiContainer>
        </TouchableWithoutFeedback>
    )
}
