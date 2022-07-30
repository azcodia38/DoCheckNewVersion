import { useMemo } from 'react'
import { isIOS } from 'src/utils'
import { screen_height } from 'src/utils/const'
import useDimension from './useDimension'

export default function useDescriptionHeight(modalHeight: number) {
    const { height } = useDimension()
    const descriptionHeight = useMemo(() => {
        if (Boolean(isIOS)) return height - (modalHeight - 65)
        else return `${(screen_height - modalHeight) / 8 + 10}%`
    }, [height, screen_height, modalHeight])

    return { descriptionHeight }
}
