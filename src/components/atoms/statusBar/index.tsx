import { omit } from 'lodash'
import React from 'react'
import { StatusBar as StatusBarDefault, StatusBarProps } from 'react-native'

export default function StatusBar(
    props: StatusBarProps & { isShow?: boolean }
) {
    return (
        <>
            {props.isShow ? (
                <StatusBarDefault {...omit(props, 'isShow')} />
            ) : null}
        </>
    )
}
