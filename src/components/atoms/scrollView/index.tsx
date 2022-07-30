import React from 'react'
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    RefreshControlProps,
    StyleProp,
    ViewStyle,
} from 'react-native'

export interface ScrollViewProps {
    children: any[] | any
    refreshing?: boolean
    onRefresh?(): void
    refreshControl?: React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
    >
    scrollEnabled?: boolean
    onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
    style?: StyleProp<ViewStyle>
}

export default function ScrollView(props: ScrollViewProps) {
    const render_data = (
        Array.isArray(props.children) ? props.children : [props.children]
    ).map((element, i) => ({ element, i }))
    return (
        <FlatList
            scrollEnabled={props.scrollEnabled}
            style={{
                height: '100%',
                width: '100%',
                ...((props.style as any) ?? {}),
            }}
            data={render_data}
            refreshControl={props.refreshControl}
            onScroll={props.onScroll}
            renderItem={(c) => c.item.element}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyExtractor={(c) => String(c.i)}
        />
    )
}
