import React, { useCallback, useEffect, useRef, useState } from 'react'

// @components & pages
import ClearMessageButton from 'src/components/atoms/button/clearMessageButton'
import { SearchGrayIcon } from 'components/icons/Icons'
import Header from 'components/header/Header'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { SearchUserListLoading } from 'components/loader-collections'
import SearchResult from 'components/search-result/SearchResult'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import { OtherUserProfilePageParams } from 'src/pages/inside-pages/other-profil-user/params'
import EmptySearchResult from 'src/components/atoms/emptySearch'

// @utils
import { searchUsersAPI } from 'src/api/user'
import { NavProps } from 'src/utils/const'
import { User } from 'src/entity/User.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'
import { CariTemanSectionContainer } from 'src/pages/inside-pages/home/section/cari-teman/styled'
import { DebugAlert } from 'src/utils/alert'
import useConnected from 'src/hook/useConnected'
import { View } from 'react-native'

interface CariTemanSectionProps extends NavProps {
    isTabActive: boolean
}

interface TypingTimeout {
    is_typing: boolean
    timeout: any
}

function CariTemanSection(props: CariTemanSectionProps) {
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    const [typingTimeout, setTypingTimeout] = useState<TypingTimeout>({
        is_typing: false,
        timeout: 0,
    })
    const [query, setQuery] = useState<string>('')
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [keyboard_height] = useKeyboard()
    const searchInputRef = useRef(null)

    const searchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const _ = await searchUsersAPI(auth, query, 0, 10, {
                connected,
                fallback() {
                    return []
                },
            })
            setUsers(_)
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [setLoading, searchUsersAPI, auth, query, connected, setUsers])

    const onQueryChange = useCallback(
        (q: string) => {
            setQuery(q)
            if (!q || q.length === 0) {
                setUsers([])
                clearTimeout(typingTimeout.timeout)
                return
            }
            if (typingTimeout.is_typing) clearTimeout(typingTimeout.timeout)
            setTypingTimeout({
                is_typing: true,
                timeout: setTimeout(() => {
                    setTypingTimeout({
                        ...typingTimeout,
                        is_typing: false,
                    })
                    searchUsers()
                }, 300),
            })
        },
        [setQuery, setUsers, searchUsers, typingTimeout]
    )

    const gotoOtherUserProfile = useCallback(
        ({ id }: User) => {
            const params: OtherUserProfilePageParams = {
                id,
            }
            props.navigation.navigate('OtherProfilUser', params)
        },
        [props.navigation]
    )

    useEffect(() => {
        onQueryChange(query)
    }, [query])

    useEffect(() => {
        if (props.isTabActive)
            setTimeout(() => (searchInputRef.current as any).focus(), 100)
    }, [props.isTabActive])

    return (
        <CariTemanSectionContainer>
            <Header titleDetail={'Cari Teman'} withMargihLeft />
            <WithPadding style={{ borderBottomWidth: 10, borderColor: '#fff' }}>
                <FormTextInput
                    ref={searchInputRef}
                    style={{ marginBottom: 0 }}
                    leftItem={<SearchGrayIcon style={{ marginRight: 10 }} />}
                    rightItem={
                        <View style={{ marginRight: 10 }}>
                            <ClearMessageButton
                                query={query}
                                onPress={setQuery}
                            />
                        </View>
                    }
                    value={query}
                    onChangeText={setQuery}
                    placeholder={'Cari Nama Teman'}
                    noMarginBottom
                    state={keyboard_height > 0 ? 'border-green' : 'normal'}
                    sizeWrapper="small"
                />
            </WithPadding>
            {!loading && users.length === 0 && query.length > 0 && (
                <EmptySearchResult />
            )}
            {loading && <SearchUserListLoading />}
            <SearchResult
                data={loading ? [] : users}
                onUserPress={gotoOtherUserProfile}
            />
        </CariTemanSectionContainer>
    )
}

export default React.memo(
    CariTemanSection,
    (prevProps: CariTemanSectionProps, nextProps: CariTemanSectionProps) =>
        prevProps.isTabActive === nextProps.isTabActive
)
