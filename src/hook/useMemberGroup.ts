import { useMemo } from 'react'
import { DefaultTheme, StyledComponent } from 'styled-components'
import { Image, View } from 'react-native'

import {
    RoundImageContainer,
    RoundImagePeserta,
    SmallerRoundImageContainer,
    SmallerRoundImagePeserta,
    SmallPicture,
} from 'components/peserta-grup/styled'

// type ImagePeserta = StyledComponent<typeof Image, DefaultTheme, {}, never>
type ImageContainer = StyledComponent<typeof View, DefaultTheme, {}, never>

interface UseMemberGroupProps {
    smaller?: boolean
    isVerySmall?: boolean
}

interface MemberGroup {
    ImageContainer: ImageContainer
    ImagePeserta: any
}

export default function useMemberGroup({
    smaller,
    isVerySmall,
}: UseMemberGroupProps): MemberGroup {
    const ImageContainer = useMemo(
        () => (smaller ? SmallerRoundImageContainer : RoundImageContainer),
        [smaller, SmallerRoundImageContainer, RoundImageContainer]
    )

    const ImagePeserta = useMemo(
        () =>
            smaller
                ? isVerySmall
                    ? SmallPicture
                    : SmallerRoundImagePeserta
                : RoundImagePeserta,
        [
            smaller,
            SmallerRoundImageContainer,
            SmallPicture,
            RoundImagePeserta,
            isVerySmall,
        ]
    )

    return {
        ImageContainer,
        ImagePeserta,
    }
}
