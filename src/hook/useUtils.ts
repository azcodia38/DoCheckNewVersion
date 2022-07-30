/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { theme } from 'src/utils/const'

export default function useUtil() {
    const TouchHeadHeight = 80
    const newPaddingSize = theme.left_right_padding * 1.5
    const swipeableHideYPosition = 100

    return {
        TouchHeadHeight,
        newPaddingSize,
        swipeableHideYPosition,
    }
}
