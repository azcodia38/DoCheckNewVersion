import React from 'react'
import { View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

import OnlyShow from 'components/only-show/OnlyShow'
import Space from 'src/components/atoms/space'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import Tipografi from 'src/components/atoms/tipografi'
import Loading from 'components/loading/Loading'
import { SharedAsTemplate } from 'src/pages/inside-pages/goal/styled'

import { theme } from 'src/utils/const'
import { isIOS } from 'src/utils'

interface DescriptionBarProps {
    isReadOnly: boolean
    loadingPublic: boolean
    isOwner: boolean
    setPublic: (isPublic: boolean) => Promise<void>
    isPinned?: boolean
    isPublic?: boolean
}

export default function DescriptionBar({
    isPinned,
    isReadOnly,
    isOwner,
    loadingPublic,
    setPublic,
    isPublic,
}: DescriptionBarProps) {
    return (
        <OnlyShow if={isReadOnly}>
            <Space value={13} />
            <ContainerAlignItemsCenter
                style={{
                    justifyContent: 'space-between',
                    flex: 1,
                    width: '82%',
                }}
            >
                <View>
                    {isPinned && (
                        <SharedAsTemplate
                            style={{
                                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                                paddingRight: 8,
                                paddingLeft: 8,
                                borderRadius: 5,
                            }}
                        >
                            <Tipografi
                                type={'smaller'}
                                style={{
                                    color: '#FFF',
                                    fontWeight: '600',
                                }}
                            >
                                Pinned Goals
                            </Tipografi>
                        </SharedAsTemplate>
                    )}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Tipografi
                        type={'label'}
                        style={{
                            marginRight: isIOS ? 8 : 4,
                        }}
                    >
                        Publik
                    </Tipografi>
                    <Loading loading={loadingPublic} small>
                        <Switch
                            disabled={isOwner}
                            value={isPublic ?? false}
                            onValueChange={setPublic}
                            thumbColor={isPublic ? theme.main_color : '#FFF'}
                            trackColor={{
                                true: `${theme.main_color}77`,
                                false: '#21212122',
                            }}
                        />
                    </Loading>
                </View>
            </ContainerAlignItemsCenter>
        </OnlyShow>
    )
}
