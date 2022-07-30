import React from 'react'
import { useCallback } from 'react'
import { Linking, View } from 'react-native'

import { ArrowRightIconWhite } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

import Button from 'src/components/atoms/button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { onSetCountPromotionCTA } from 'src/store/actions'
import useAuthorization from 'src/hook/useAuthorization'
import useConnected from 'src/hook/useConnected'

interface AdsButtonProps {
    promotionId: string
    title?: string
    href?: string
}

const PADDING_SIZE = 16.5

export default function AdsButton({
    title = 'Klik Disini Untuk Pesan',
    href = 'https://docheck.id',
    promotionId,
}: AdsButtonProps) {
    const dispatch = useDispatch()

    const { connected } = useConnected()
    const auth = useAuthorization()

    const onPressHandler = useCallback(() => {
        dispatch(
            onSetCountPromotionCTA({
                token: auth,
                isConnected: connected,
                isDone: () => Linking.openURL(href!),
                query: {
                    goalId: promotionId!,
                },
            })
        )
    }, [href, auth, connected, promotionId])

    return (
        // <Animated.View style={[animatedScaleStyle]}>
        <TouchableOpacity onPress={onPressHandler}>
            <Button
                style={{
                    paddingTop: PADDING_SIZE,
                    paddingBottom: PADDING_SIZE,
                    borderTopWidth: 1,
                    borderColor: '#fff',
                }}
                noShadow={true}
                containerStyle={{
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ marginRight: 10 }}>
                        <ArrowRightIconWhite />
                    </View>
                    <Tipografi type="label-bold" style={{ color: '#fff' }}>
                        {title}
                    </Tipografi>
                </View>
            </Button>
        </TouchableOpacity>
    )
}
