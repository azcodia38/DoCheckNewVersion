import React from 'react'
import WithPadding from 'src/components/atoms/withPadding'
import { View } from 'react-native'

import Button from 'src/components/atoms/button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Tipografi from 'src/components/atoms/tipografi'
import Space from 'src/components/atoms/space'
import { theme } from 'src/utils/const'
import useConnected from 'src/hook/useConnected'

interface ActionButtonProps {
    loadingSubmit: boolean
    nextPage: () => void
    skip: () => void
}

export default function ActionButton({
    loadingSubmit,
    nextPage,
    skip,
}: ActionButtonProps) {
    const { connected } = useConnected()
    return (
        <View>
            <WithPadding>
                <Button
                    loading={loadingSubmit}
                    onPress={nextPage}
                    inactive={!connected}
                >
                    Lanjut
                </Button>
                <Space value={18} />
                <TouchableOpacity onPress={skip}>
                    <Tipografi
                        type={'label-bold'}
                        style={{
                            textAlign: 'center',
                            color: theme.main_color,
                        }}
                    >
                        Skip Now
                    </Tipografi>
                </TouchableOpacity>
                <Space value={20} />
            </WithPadding>
        </View>
    )
}
