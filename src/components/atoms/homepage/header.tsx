/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { Fragment } from 'react'

// @components
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import DevelopmentMode from 'src/components/atoms/developmentMode'

// @styled
import { InlineCenter } from 'src/pages/inside-pages/home/section/beranda/styled'

// @helpers
import { getFirstAndMiddleName, getUsername, limitChar, titleCase } from 'src/utils'

// @types
import { User } from 'src/entity/User.entity'

interface HeaderHomepageProps {
    user: User
    spaceValue?: number
    limitCharName?: number
    whatToSay?: string
    withBackgroundDevelopmentMode?: boolean
}

const HeaderHomepage: React.FC<HeaderHomepageProps> = ({
    whatToSay = 'Halo',
    user,
    spaceValue = 32, 
    limitCharName = 18,
    withBackgroundDevelopmentMode = true,
}) => {
    return (
        <Fragment>
            <Space value={spaceValue} />

            <WithPadding>
                <DevelopmentMode
                    withBackground={withBackgroundDevelopmentMode}
                />
                <InlineCenter>
                    <Tipografi
                        type={'title-medium'}
                        style={{ fontWeight: 'normal' }}
                    >
                        {`${whatToSay} `}
                    </Tipografi>
                    <Tipografi type={'title'}>
                        {limitChar(
                            titleCase(getFirstAndMiddleName(user.fullname)),
                            limitCharName
                        )}
                    </Tipografi>
                </InlineCenter>
                <Tipografi type={'normal'} style={{ color: '#7E8396' }}>
                    {getUsername(user)}
                </Tipografi>
            </WithPadding>
        </Fragment>
    )
}

export default HeaderHomepage
