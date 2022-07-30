import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { size } from 'lodash'

// @utils
import { titleCaseAlternative } from 'src/utils'
import { Goals } from 'src/entity/Goals.entity'

// @components
import { ArrowRightIcon } from 'components/icons/Icons'
import Tipografi from 'src/components/atoms/tipografi'

import { ItemGoalUserLainContainer } from './styled'

interface ItemGoalUserLainProps {
    goal: Goals
    onPress?(): void
}

export default function ItemGoalUserLain(props: ItemGoalUserLainProps) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <ItemGoalUserLainContainer>
                <View>
                    <Tipografi type={'small'} style={{ color: '#262D33' }}>
                        {titleCaseAlternative(props.goal.name)}
                    </Tipografi>
                    <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                        {size(props.goal.tasks)} Task
                    </Tipografi>
                </View>
                <ArrowRightIcon style={{ width: 22, height: 22 }} />
            </ItemGoalUserLainContainer>
        </TouchableOpacity>
    )
}
