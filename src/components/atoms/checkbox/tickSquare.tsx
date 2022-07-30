import React from 'react'

import { Task } from 'src/entity/Task.entity'

import InputBox, { InputBoxState } from 'components/form/input-box/InputBox'
import TickTask from 'src/components/atoms/tickTask'
import DescriptionCheckbox from 'src/components/atoms/checkbox/description'
import { isAndroid, isIOS } from 'src/utils'

interface TickSquareProps {
    inputStatus: InputBoxState
    loadingTick?: boolean
    hasDone: boolean
    canPress: boolean
    onTick: ((done: boolean) => void) | undefined
    onPress: (() => void) | undefined
    task: Task
    onLongPress?: () => void
    pinned?: boolean
    red?: boolean
}

export default function TickSquare({
    canPress,
    hasDone,
    inputStatus,
    onPress,
    onTick,
    loadingTick,
    task,
    red,
    onLongPress,
    pinned,
}: TickSquareProps) {
    return (
        <InputBox
            style={{
                marginBottom: 4,
                marginTop: 4,
            }}
            state={inputStatus}
            isTask
            leftItem={
                <TickTask
                    loadingTick={loadingTick}
                    done={hasDone}
                    onTick={canPress ? onTick : () => {}}
                    red={red}
                />
            }
            leftItemStyle={{ paddingLeft: 3 }}
        >
            <DescriptionCheckbox
                hasDone={hasDone}
                onPress={onPress}
                task={task}
                onLongPress={onLongPress}
                red={red}
                pinned={pinned}
            />
        </InputBox>
    )
}
