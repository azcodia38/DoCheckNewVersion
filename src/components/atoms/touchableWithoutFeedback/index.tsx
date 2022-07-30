import { omitBy } from 'lodash'
import React from 'react'
import {
    TouchableHighlightProps,
    TouchableWithoutFeedback as TouchableIOS,
} from 'react-native'
import { TouchableWithoutFeedback as TouchableAndroid } from 'react-native-gesture-handler'
import GenericTouchable, {
    GenericTouchableProps,
} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable'

import { isAndroid, isIOS } from 'src/utils'

type TouchableAndroid = React.ForwardRefExoticComponent<
    GenericTouchableProps & {
        children?: React.ReactNode
    } & React.RefAttributes<GenericTouchable>
>

const TouchableWithoutFeedback: React.FC<
    TouchableHighlightProps | TouchableAndroid
> = (props) => {
    return (
        <>
            {/* {Boolean(isAndroid) && (
                <TouchableAndroid {...(props as TouchableAndroid)}>
                    {props.children}
                </TouchableAndroid>
            )}
            {Boolean(isIOS) && ( */}
            <TouchableIOS
                {...(omitBy(props, 'children') as TouchableHighlightProps)}
            >
                {props.children}
            </TouchableIOS>
            {/* )} */}
        </>
    )
}

export default TouchableWithoutFeedback
