import React from 'react'
import moment from 'moment'

import {
    getDatefromDateOrString,
    limitChar,
    removeStripLine,
    titleCaseAlternative,
} from 'src/utils'
import Space from 'src/components/atoms/space'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import {
    CalendarTaskIcon,
    CalendarTaskRedIcon,
    PinTaskIcon,
    RepeatTaskIcon,
} from 'components/icons/Icons'
import {
    ItemTaskContainer,
    PinTaskContainer,
    TaskDetailContainer,
} from 'components/item-task/styled'
import { Task } from 'src/entity/Task.entity'
import { theme } from 'src/utils/const'
import Tipografi from 'src/components/atoms/tipografi'
import TouchableWithoutFeedback from '../touchableWithoutFeedback'

interface DescriptionCheckboxProps {
    hasDone: boolean
    onPress: (() => void) | undefined
    task: Task
    onLongPress?: () => void
    pinned?: boolean
    red?: boolean
}

const calendar_task_icon = <CalendarTaskIcon />
const calendar_task_red_icon = <CalendarTaskRedIcon />
const repeat_task_icon = <RepeatTaskIcon />

// `Audio (${formatMinuteSeconds(
//     (task.audioDurationMs ?? 0) / 1000
// )})`

export default function DescriptionCheckbox({
    onPress,
    onLongPress,
    hasDone,
    task,
    red,
    pinned,
}: DescriptionCheckboxProps) {
    return (
        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
            <ItemTaskContainer style={{ paddingLeft: 5 }}>
                <TaskDetailContainer>
                    <Tipografi
                        type={'small'}
                        style={{
                            textDecorationStyle: 'solid',
                            textDecorationLine: hasDone
                                ? 'line-through'
                                : 'none',
                        }}
                    >
                        {task.title
                            ? limitChar(
                                  removeStripLine(
                                      titleCaseAlternative(task.title)
                                  ),
                                  85
                              )
                            : 'Belum ada judul'}
                    </Tipografi>
                    <Space value={2} />
                    <ContainerAlignItemsCenter>
                        {!red && calendar_task_icon}
                        {red && calendar_task_red_icon}
                        <Tipografi
                            type={'smaller'}
                            style={{
                                color: red ? theme.redColor : theme.main_color,
                            }}
                        >
                            {` ${
                                task.dueDate
                                    ? moment(
                                          getDatefromDateOrString(task.dueDate)
                                      ).format('DD/MM/YYYY HH:mm')
                                    : 'Tidak ada tanggal'
                            } `}
                        </Tipografi>
                        {!!task.repeatTask && repeat_task_icon}
                    </ContainerAlignItemsCenter>
                </TaskDetailContainer>
                {/* {!!task.audioUrl && (
            <PlayIcon style={{ marginRight: 12 }} />
        )} */}
                <PinTaskContainer>{pinned && <PinTaskIcon />}</PinTaskContainer>
            </ItemTaskContainer>
        </TouchableWithoutFeedback>
    )
}
