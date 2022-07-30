import React from 'react'
import { View } from 'react-native'

import Loading from 'components/loading/Loading'
import { theme } from 'src/utils/const'
import {
    TickOffIcon,
    TickOffRedIcon,
    TickOnIcon,
    TickOnRedIcon,
} from 'components/icons/Icons'
import { CheckedInnerWrapper, CheckedWrapper } from './styled'
import AnimationPressButton from '../button/animationPress'
import { isFunction } from 'lodash'

interface TickTaskProps {
    red?: boolean
    done?: boolean
    loadingTick?: boolean
    onTick?(done: boolean): void
}

export default function TickTask({
    done,
    loadingTick,
    onTick,
    red,
}: TickTaskProps) {
    return (
        <View style={{ width: 50 }}>
            <AnimationPressButton
                onPress={() => isFunction(onTick) && onTick(!done)}
            >
                <Loading
                    loading={loadingTick}
                    small
                    color={red ? theme.redColor : theme.main_color}
                    style={{ paddingLeft: 20 }}
                >
                    <CheckedWrapper>
                        <CheckedInnerWrapper>
                            {done && !red && <TickOnIcon />}
                            {!done && !red && (
                                <TickOffIcon withOnPress={false} />
                            )}
                            {done && red && <TickOnRedIcon />}
                            {!done && red && <TickOffRedIcon />}
                        </CheckedInnerWrapper>
                    </CheckedWrapper>
                </Loading>
            </AnimationPressButton>
        </View>
    )
}
