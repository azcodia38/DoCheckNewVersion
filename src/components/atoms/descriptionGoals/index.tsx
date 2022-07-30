/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { Text, Linking, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import stringReplaceToArray from 'string-replace-to-array'
import { isEmpty, uniqueId } from 'lodash'
import Clipboard from '@react-native-community/clipboard'
import Snackbar from 'react-native-snackbar'

import { parseStringtoHyperlink } from 'src/utils/module'
import * as LANG from 'src/utils/lang'

interface DescriptionGoalsProps {
    description?: string
    adsGoal?: boolean
}

const DescriptionGoals: React.FC<DescriptionGoalsProps> = ({
    description,
    adsGoal = false,
}) => {
    const [hyperlink, setHyperLink] = useState<string[]>([])
    const [renderHyperlink, setRenderHyperlink] =
        useState<React.ReactNode>(null)
    const [hasCopied, setHasCopied] = useState<boolean>(false)

    const descriptionStyle = useMemo(() => {
        if (adsGoal)
            return {
                linkColor: '#2FCC71',
                descriptionColor: '#fff',
            }
        return {
            linkColor: 'blue',
            descriptionColor: '#000',
        }
    }, [adsGoal])

    const isEmptyDescription: boolean = useMemo(
        () => isEmpty(description),
        [description]
    )

    const splitDescriptionLength: number | undefined = useMemo(() => {
        if (description) return description!.split(' ').length - 1
    }, [description])

    const spacesWrapper = useCallback((word: string, index: number): string => {
        if (!isEmptyDescription && index == splitDescriptionLength) return word
        return `${word} `
    }, [])

    const copyToClipboard = useCallback((word: string) => {
        setHasCopied(true)
        Clipboard.setString(word)
    }, [])

    // Dispatch this if description params is ready
    useEffect(() => {
        if (!isEmptyDescription && description)
            setHyperLink(parseStringtoHyperlink(description!))
    }, [description])

    // Dispatching this if user has copied the link
    useEffect(() => {
        if (hasCopied) {
            Snackbar.show({
                text: LANG.COPY_MESSAGE,
                duration: Snackbar.LENGTH_SHORT,
            })
            setHasCopied(false)
        }
    }, [hasCopied])

    const newRenderDescription = useCallback(
        (description: string, hyperlink: string[]) => {
            let renderDescription: (string | Element | JSX.Element)[] | string =
                description
            for (let i = hyperlink.length - 1; i >= 0; i--) {
                let URL: string = hyperlink[i]
                let haveDotted: boolean = false
                if (URL.charAt(URL.length - 1) == '.') {
                    URL = URL.substring(0, URL.length - 1)
                    haveDotted = true
                }
                renderDescription = stringReplaceToArray(
                    renderDescription as string,
                    RegExp(
                        '\\b' +
                            URL.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') +
                            '\\b',
                        'g'
                    ),
                    function (href: string) {
                        return (
                            <TouchableOpacity
                                key={uniqueId()}
                                onLongPress={() => copyToClipboard(href)}
                                onPress={() => Linking.openURL(href)}
                            >
                                <Text
                                    style={{
                                        color: descriptionStyle.linkColor,
                                    }}
                                >
                                    {haveDotted && href}
                                    {!haveDotted && spacesWrapper(href, i)}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                )
            }

            return renderDescription
        },
        []
    )

    // Dispatch this if hyperlink and description was ready
    useEffect(() => {
        if (!isEmptyDescription && description && !isEmpty(hyperlink)) {
            const transformDescription = newRenderDescription(
                description,
                hyperlink
            )
            setRenderHyperlink(transformDescription)
        } else setRenderHyperlink(description)
    }, [hyperlink, description])

    return (
        <Text style={{ color: descriptionStyle.descriptionColor }}>
            {renderHyperlink}
        </Text>
    )
}

export default DescriptionGoals
