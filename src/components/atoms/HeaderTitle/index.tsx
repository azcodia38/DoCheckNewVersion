/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'

import { InlineCenter } from 'src/pages/inside-pages/home/section/beranda/styled'
import { theme } from 'src/utils/const'

interface HeaderTitleProps {
    title: string
    isHide?: boolean
    onPress?: () => void
    color?: string
    showCaseTitle?: string
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
    isHide = true,
    onPress = () => {},
    title,
    color = theme.main_color,
    showCaseTitle = 'Lihat Lainnya',
}) => {
    return (
        <WithPadding>
            <InlineCenter style={{ justifyContent: 'space-between' }}>
                <Tipografi
                    type={'title-medium'}
                    style={{ fontWeight: 'normal', color: '#000' }}
                >
                    {title}
                </Tipografi>
                {!isHide && (
                    <TouchableOpacity onPress={onPress}>
                        <Tipografi
                            type={'small'}
                            style={{
                                fontWeight: 'normal',
                                color,
                            }}
                        >
                            {showCaseTitle}
                        </Tipografi>
                    </TouchableOpacity>
                )}
            </InlineCenter>
        </WithPadding>
    )
}

export default HeaderTitle
