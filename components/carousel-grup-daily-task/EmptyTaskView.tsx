/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useEffect } from 'react'

import {
    EmptySearchIllustration,
    ImageBelumAdaTask,
    OfflineModeCanvas,
} from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import { TaskKosong } from 'src/pages/inside-pages/buat-goal-baru/styled'

// @utils
import { EMPTY_TASK } from 'src/utils/lang'

interface TaskKosongViewProps {
    description: string
    title?: string
    withHeight?: boolean
    verticalPoint?: number
    isOffline?: boolean
    isEmptySearch?: boolean
}

export default function TaskKosongView({
    description,
    title,
    withHeight = true,
    verticalPoint = 90,
    isOffline = false,
    isEmptySearch = true,
}: TaskKosongViewProps) {
    return (
        <TaskKosong
            style={{
                [withHeight ? 'height' : '']:
                    verticalPoint > 100 ? '100%' : `${verticalPoint}%`,
            }}
        >
            {isOffline && <OfflineModeCanvas style={{ width: '40%' }} />}
            {!isOffline && isEmptySearch && (
                <EmptySearchIllustration style={{ width: '40%' }} />
            )}
            {!isOffline && !isEmptySearch && (
                <ImageBelumAdaTask
                    style={{ width: '40%' }}
                    width={'80%'}
                    height={150}
                />
            )}

            <Tipografi
                type={'title'}
                style={{ color: '#444145', marginBottom: 5 }}
            >
                {title ?? EMPTY_TASK.OOPS}
            </Tipografi>
            <Tipografi type={'small'} style={{ color: '#818487' }} center>
                {description}
            </Tipografi>
            <Space value={20} />
        </TaskKosong>
    )
}
