import React, { useContext, useEffect } from 'react'
import Tipografi from 'src/components/atoms/tipografi'
import AppContext from 'src/context/AppContext'

export default function Version() {
    const { version } = useContext(AppContext)
    return (
        <Tipografi style={{ color: '#979797' }} type={'small'} center>
            DoCheck v {version}
        </Tipografi>
    )
}
