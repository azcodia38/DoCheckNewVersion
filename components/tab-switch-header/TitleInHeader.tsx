/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'
import { startCase } from 'lodash'

import Tipografi from '../../src/components/atoms/tipografi'

// @utils
import { theme } from 'src/utils/const'
import { View } from 'react-native'

interface TitleAndHeaderProps {
    title: string
    isActive: boolean
}

const TitleInHeader: React.FC<TitleAndHeaderProps> = ({ isActive, title }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: isActive ? theme.main_color : '#e0f8ea',
                margin: 5, // padding: 10,
                borderRadius: 99,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Tipografi
                style={{
                    padding: 8,
                    color: isActive ? 'white' : theme.main_color,
                }}
                type={'label'}
                center
            >
                {startCase(title)}
            </Tipografi>
        </View>
    )
}

export default TitleInHeader
