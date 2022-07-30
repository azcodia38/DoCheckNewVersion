import React from 'react'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { CloseGrayIcon, SearchGrayIcon } from 'components/icons/Icons'

interface SearchTaskProps {
    query: string
    setQuery: (query: string) => void
}

export default function SearchTask({ setQuery, query }: SearchTaskProps) {
    return (
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
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 8,
            }}
            onChangeText={setQuery}
            placeholder={'Cari Task Kamu'}
            noMarginBottom
            sizeWrapper="small"
        />
    )
}
