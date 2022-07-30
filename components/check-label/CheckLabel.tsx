import { isFunction, uniqueId } from 'lodash'
import React, { useEffect } from 'react'

import { CheckOffIcon, CheckOnIcon } from '../icons/Icons'
import { CheckLabelContainer, CheckSection, LabelSection } from './styled'

interface CheckLabelProps {
    check?: boolean
    onCheckChange?(check: boolean): void
    children?: React.ReactNode
    accessibilityLabel?: string
}

export default function CheckLabel(props: CheckLabelProps) {
    useEffect(() => console.log('props.check', props.check), [props.check])
    return (
        <CheckLabelContainer>
            <CheckSection accessibilityLabel={props.accessibilityLabel}>
                {props.check && (
                    <CheckOnIcon
                        style={{
                            position: props.check ? 'relative' : 'absolute',
                            zIndex: props.check ? 1 : 0,
                            opacity: props.check ? 1 : 0,
                        }}
                        key={uniqueId()}
                        onPress={() =>
                            isFunction(props.onCheckChange) &&
                            props.onCheckChange(false)
                        }
                    />
                )}
                {!props.check && (
                    <CheckOffIcon
                        style={{
                            position: !props.check ? 'relative' : 'absolute',
                            zIndex: !props.check ? 1 : 0,
                            opacity: !props.check ? 1 : 0,
                        }}
                        key={uniqueId()}
                        onPress={() =>
                            isFunction(props.onCheckChange) &&
                            props.onCheckChange(true)
                        }
                    />
                )}
            </CheckSection>
            <LabelSection>{props.children}</LabelSection>
        </CheckLabelContainer>
    )
}
