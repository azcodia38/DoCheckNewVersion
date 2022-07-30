/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { DailyTaskType } from 'src/pages/inside-pages/home/types'
import { EMPTY_DATA_TASK } from '../lang'

export default function transformDescription(type: DailyTaskType) {
    return EMPTY_DATA_TASK[type]
}
