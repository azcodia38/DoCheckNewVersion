/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import useDimension from 'src/hook/useDimension'

import { ImageBelumAdaTask } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'
import { TaskKosong } from 'src/pages/inside-pages/buat-goal-baru/styled'

export function GoalKosongView() {
    const { height: viewportHeight } = useDimension()
    return (
        <TaskKosong style={{ height: viewportHeight * 0.5 }}>
            <ImageBelumAdaTask />
            <Tipografi type={'title'} style={{ color: '#444145' }}>
                Whoops!
            </Tipografi>
            <Tipografi type={'small'} style={{ color: '#818487' }} center>
                {'Belum ada Goals yang dibuat,\nKlik + untuk membuat taskmu'}
            </Tipografi>
        </TaskKosong>
    )
}
