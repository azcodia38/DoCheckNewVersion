import { NavigationContainerRef } from '@react-navigation/native'
import { TaskCreateGoalRequest } from 'src/api/my-goal'
import { GENDER } from 'src/entity/User.entity'
import { Dimensions } from 'react-native'
const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window')
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
import { v4 as uuidv4 } from 'uuid'

export interface NavProps {
    navigation: NavigationContainerRef
    route?: any
}

export interface ComponentProps {
    children?: React.ReactNode | React.ReactNode[]
}

export const theme = {
    background: '#FFF',
    left_right_padding: (6 / 100) * viewportWidth,
    main_color: '#2FCC71',
    redColor: '#ed7179',
    smoothGreen: '#EEFFF5',
}

export type RNModalAnimationType =
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight'

export const screen_height = screenHeight
export const screen_width = screenWidth

export const PLACEHOLDER_MALE_IMAGE = require('assets/images/placeholder-male.png')
export const PLACEHOLDER_FEMALE_IMAGE = require('assets/images/placeholder-female.png')

export function getPlaceholderImage(gender: GENDER) {
    if (gender === GENDER.FEMALE) {
        return PLACEHOLDER_FEMALE_IMAGE
    }

    return PLACEHOLDER_MALE_IMAGE
}

export const repeat_task_options = [
    {
        label: 'Jangan Pernah',
        value: '0',
    },
    {
        label: 'Setiap Hari',
        value: '1',
    },
    {
        label: 'Setiap Minggu',
        value: '7',
    },
    {
        label: 'Setiap Bulan',
        value: '30',
    },
    {
        label: 'Setiap Tahun',
        value: '365',
    },
]

export function getInitialNewTask(): TaskCreateGoalRequest {
    return {
        id: uuidv4().toString(),
        title: '',
        notes: '',
        dueDate: '',
        type: '',
        repeatTask: 0,
        recommendationUrl: '',
        assignees: [],
    }
}

export const GOAL_COLOR_LIST = ['#D8FAD4', '#FFD18B', '#FFBBB8', '#C5D5FF']

export const LISTENER_EVENT_ADD_GOAL = 'goal-added'
export const LISTENER_EVENT_EDIT_GOAL = 'goal-edited'
export const LISTENER_EVENT_DELETE_GOAL = 'goal-deleted'
export const LISTENER_EVENT_EDIT_TASK = 'task-edited'
export const LISTENER_EVENT_DELETE_TASK = 'task-deleted'
export const LISTENER_EVENT_EDIT_PINNED_GOALS = 'pinned-goals-edited'
export const LISTENER_EVENT_DELETE_GOALS = 'goals-deleted'
export const LISTENER_EVENT_DELETE_TASKS = 'tasks-deleted'

export const day1 = 1 * 24 * 60
export const day2 = 2 * 24 * 60
export const day7 = 7 * 24 * 60
export const day14 = 14 * 24 * 60
