/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { CloseGrayIcon, SearchGrayIcon } from 'components/icons/Icons'
import Space from 'src/components/atoms/space'

interface SearchProp {
    setQuery: (query: string) => void
    query: string
}

export default function Search({ query, setQuery }: SearchProp) {
    return (
        <>
            <Space value={7} />
            <FormTextInput
                state={'special-task'}
                style={{ marginBottom: 0 }}
                leftItem={<SearchGrayIcon style={{ marginRight: 4 }} />}
                rightItem={
                    query.length > 0 && (
                        <CloseGrayIcon
                            onPress={() => setQuery('')}
                            style={{ marginLeft: 10, marginRight: 10 }}
                        />
                    )
                }
                value={query}
                inputStyle={{
                    // paddingTop: 14,
                    // paddingBottom: 14,
                    paddingLeft: 8,
                }}
                onChangeText={setQuery}
                placeholder={'Cari Goals Kamu'}
                noMarginBottom
                sizeWrapper='small'
            />
        </>
    )
}
