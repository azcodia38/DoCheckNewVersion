import React from 'react'

import { ImageNoReferal } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'
import { TaskKosong } from 'src/pages/inside-pages/buat-goal-baru/styled'

export default function EmptySearchResult() {
    return (
        <TaskKosong style={{ height: '67%' }}>
            <ImageNoReferal />
            <Tipografi type={'title'} style={{ color: '#444145' }}>
                Whoops!
            </Tipografi>
            <Tipografi type={'small'} style={{ color: '#818487' }} center>
                {'Akun yang kamu cari tidak ditemukan!'}
            </Tipografi>
        </TaskKosong>
    )
}
