import React from 'react'
import WebView from 'react-native-webview'

import { TaskCreateGoalRequest } from 'src/api/my-goal'
import {
    WebViewErrorEvent,
    WebViewNavigation,
    WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes'

interface RecommendationLink {
    webViewRef: React.RefObject<WebView<{}>>
    taskEditData: TaskCreateGoalRequest
    setLoadingWebview: (value: React.SetStateAction<boolean>) => void
    setTaskEditData: (
        value: React.SetStateAction<TaskCreateGoalRequest>
    ) => void
    silentUpdateTask: () => Promise<void>
}

const HOST_ENDPOINT = 'duckduckgo.com'
const SOURCE_ENDPOINT_RECOMMENDATION_ENGINE = `https://${HOST_ENDPOINT}/?q=!ducky+`

export default function RecommendationLink({
    setLoadingWebview,
    setTaskEditData,
    silentUpdateTask,
    taskEditData,
    webViewRef,
}: RecommendationLink) {
    return (
        <WebView
            ref={webViewRef}
            source={{
                uri: `${SOURCE_ENDPOINT_RECOMMENDATION_ENGINE}${encodeURIComponent(
                    taskEditData.title ?? ''
                )}`,
            }}
            style={{
                width: 0,
                height: 0,
            }}
            onNavigationStateChange={(event: WebViewNavigation) => {
                // console.log(event.url);
            }}
            onLoadStart={() => {
                setLoadingWebview(true)
            }}
            onLoad={(
                syntheticEvent: WebViewNavigationEvent | WebViewErrorEvent
            ) => {
                const { nativeEvent } = syntheticEvent
                setLoadingWebview(false)
                if (
                    !taskEditData.recommendationUrl &&
                    !nativeEvent.url.includes(HOST_ENDPOINT)
                ) {
                    setTaskEditData({
                        ...taskEditData,
                        recommendationUrl: nativeEvent.url,
                    })
                    taskEditData.recommendationUrl = nativeEvent.url
                    silentUpdateTask()
                }
            }}
            mediaPlaybackRequiresUserAction={true}
        />
    )
}
