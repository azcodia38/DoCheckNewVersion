import React from 'react'

import { theme } from 'src/utils/const'
import { EMPTY_TASK } from 'src/utils/lang'

import { SpaceBetweenContainerCenter } from 'components/goalCard/styled'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import { ReloadIcon } from 'components/icons/Icons'
import Loading from 'components/loading/Loading'
import TautanRekomendasi from 'src/components/atoms/recommendationLink'
import TaskKosongView from 'components/carousel-grup-daily-task/EmptyTaskView'

interface RecommendationPreviewProps {
    toggleMenu: boolean
    onPress: () => void
    isEmptyRecommendationLink: boolean
    loadingWebview: boolean
    onOpenLink: (url: string) => void
    recommendationUrl: string
}

export default function RecommendationPreview({
    onPress,
    toggleMenu,
    isEmptyRecommendationLink,
    loadingWebview,
    onOpenLink,
    recommendationUrl,
}: RecommendationPreviewProps) {
    return (
        <>
            <WithPadding>
                <Space value={5} />
                <SpaceBetweenContainerCenter>
                    <Tipografi
                        type={'normal'}
                        style={{
                            fontWeight: 'bold',
                            color: theme.main_color,
                        }}
                    >
                        Rekomendasi tautan
                    </Tipografi>
                    <ReloadIcon onPress={onPress} menuToggle={toggleMenu} />
                </SpaceBetweenContainerCenter>
            </WithPadding>
            <WithPadding>
                <Space value={15} />
                {!isEmptyRecommendationLink && (
                    <Loading loading={loadingWebview}>
                        <TautanRekomendasi
                            onOpenLink={onOpenLink}
                            url={recommendationUrl}
                        />
                    </Loading>
                )}
                {isEmptyRecommendationLink && (
                    <TaskKosongView
                        withHeight={false}
                        title={EMPTY_TASK.OOPS}
                        description={EMPTY_TASK.RECOMMENDATION.DESCRIPTION}
                        isOffline={false}
                    />
                )}
                <Space value={5} />
            </WithPadding>
        </>
    )
}
