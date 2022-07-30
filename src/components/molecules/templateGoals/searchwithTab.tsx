import React from 'react'
import { StyleSheet, View } from 'react-native'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { SearchGrayIcon } from 'components/icons/Icons'
import Space from 'src/components/atoms/space'
import TabHeader from 'src/components/atoms/tabHeader'
import ClearMessageButton from 'src/components/atoms/button/clearMessageButton'
import { TEMPLATE_GOALS } from 'src/utils/lang'
import { TEMPLATES_TAB } from 'src/utils/types/componentsTypes'
import { PredefinedGoalsTabType } from 'src/utils/types'

interface SearchWithTabProps {
    query: string
    setQuery: (query: string) => void
    setActiveTabHeader: (tabHeader: PredefinedGoalsTabType) => void
}

export default function SearchWithTab({
    query,
    setActiveTabHeader,
    setQuery,
}: SearchWithTabProps) {
    return (
        <>
            <FormTextInput
                state={'special-task'}
                style={{ marginBottom: 0 }}
                leftItem={<SearchGrayIcon style={{ marginRight: 4 }} />}
                rightItem={
                    <View style={{ marginRight: 10 }}>
                        <ClearMessageButton query={query} onPress={setQuery} />
                    </View>
                }
                value={query}
                inputStyle={styles.inputStyles}
                onChangeText={setQuery}
                placeholder={TEMPLATE_GOALS.placeholderSearch}
                noMarginBottom
                sizeWrapper="small"
            />
            <Space value={17} />
            <TabHeader
                setActive={setActiveTabHeader}
                tabs={TEMPLATES_TAB}
                type="templateType"
            />
            <Space value={7} />
        </>
    )
}

const styles = StyleSheet.create({
    inputStyles: {
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 8,
    },
})
