import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'

import { SearchHandlerType } from 'src/utils/types'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'

import { SearchResultData } from 'src/api/mock-api'
import { User } from 'src/entity/User.entity'
import { useKeyboard } from 'src/hook/useKeyboard'
import StoreData from 'store/types'
import { getUsername, isIOS, TypingTimeout } from 'src/utils'

import FormTextInput from 'components/form/form-text-input/FormTextInput'
import { ContainerAlignItemsCenter } from 'components/goalCard/styled'
import { CloseGrayIcon, SearchGrayIcon } from 'components/icons/Icons'
import { TaskParticipantListLoading } from 'components/loader-collections'
import SearchResult2 from 'components/search-result/SearchResult2'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import ContainerPopup from 'components/popup/container/ContainerPopup'

import { InnnerContainer, PopupAnggotaContainer } from './styled'
import { debounce, isEmpty, isEqual, isFunction } from 'lodash'

export interface PopupAnggotaProps {
    show?: boolean
    onCancel?(): void
    memberIDs?: string[]
    loadingIDs?: string[]
    onAddUser?(userId: string): void
    onRemoveUser?(userId: string): void
    onMembersChange?(members: SearchResultData[]): void
    onSearchInputFocus?(): void
    onSearchInputBlur?(): void
    onUserPress?(user: SearchResultData): void
    getInitialParticipants(): Promise<SearchResultData[]>
    bottomView?: React.ReactNode
    editable?: boolean
    searchAPI?: SearchHandlerType
}

let popup_just_hidden = false
let typing_timeout: TypingTimeout = {
    is_typing: false,
    timeout: null,
}

export default function PopupAnggota(props: PopupAnggotaProps) {
    const user = useSelector((_: StoreData) => _.user_login_data.user)

    const [keyboard_height] = useKeyboard()

    const [value, setValue] = useState<string>('')
    const [debouncedText] = useDebounce(value, 500)
    const [showPopup, setShowPopup] = useState(false)
    // const [typingTimeout, setTypingTimeout] = useState<{
    //     isTyping: boolean
    //     timeout: any
    // }>({
    //     isTyping: false,
    //     timeout: null,
    // })
    const [users, setUsers] = useState<SearchResultData[]>([])
    const [participants, setParticipants] = useState<SearchResultData[]>([])
    const [loading_get_users, setLoadingGetUsers] = useState<boolean>(false)
    const [data, setData] = useState<SearchResultData[]>(users)

    // if (props.show && popup_just_hidden) {
    //     popup_just_hidden = false
    //     data = users
    //         .filter((x) => {
    //             return props.editable || (props.memberIDs ?? []).includes(x.id)
    //         })
    //         .sort((a, b) => {
    //             const _a = (props.memberIDs ?? []).includes(a.id) ? 1 : 0
    //             const _b = (props.memberIDs ?? []).includes(b.id) ? 1 : 0
    //             return _b - _a
    //         })
    // }

    const sortirMember = useCallback(
        (users: SearchResultData[]) =>
            users
                .filter((x) => {
                    return (
                        props.editable || (props.memberIDs ?? []).includes(x.id)
                    )
                })
                .sort((a, b) => {
                    const _a = (props.memberIDs ?? []).includes(a.id) ? 1 : 0
                    const _b = (props.memberIDs ?? []).includes(b.id) ? 1 : 0
                    return _b - _a
                }),
        [props.editable, props.memberIDs]
    )

    const onGoalMemberQueryChange = useCallback(
        async (q: string) => {
            if (!q) {
                setUsers(participants)
                return
            }

            if (debouncedText) {
                if (!isFunction(props.searchAPI)) return []

                setLoadingGetUsers(true)
                const searchAPIData: User[] = await props.searchAPI(q)
                if (!isEmpty(searchAPIData)) {
                    setUsers(
                        searchAPIData.map((u: User) => ({
                            id: u.id,
                            imageurl: u.profilePicture,
                            gender: u.gender,
                            name: u.fullname,
                            username: getUsername(u),
                            owner: isEqual(u.id, user.id),
                        }))
                    )
                    setLoadingGetUsers(false)
                }
            }
        },
        [
            setUsers,
            participants,
            props.searchAPI,
            setLoadingGetUsers,
            getUsername,
            participants,
            getUsername,
            debouncedText,
            value,
        ]
    )

    useEffect(() => {
        onGoalMemberQueryChange(value)
    }, [value])

    const getInitialParticipantData = useCallback(() => {
        setLoadingGetUsers(true)
        props
            .getInitialParticipants()
            .then((participant) => {
                setLoadingGetUsers(false)
                setParticipants(participant)
                setUsers(participant)
            })
            .finally(() => setLoadingGetUsers(false))
    }, [
        setLoadingGetUsers,
        props.getInitialParticipants,
        setLoadingGetUsers,
        setParticipants,
        setUsers,
    ])

    const onAddUser = useCallback(
        (userId: string) => {
            const newUser = users.find(
                (user: SearchResultData) => user.id === userId
            )
            if (newUser) {
                setParticipants([...participants, newUser])
            }
            props.onAddUser && props.onAddUser(userId)
        },
        [users, setParticipants, participants]
    )

    const onRemoveUser = useCallback(
        (userId: string) => {
            setParticipants(
                participants.filter(
                    (user: SearchResultData) => user.id !== userId
                )
            )
            isFunction(props.onRemoveUser) && props.onRemoveUser(userId)
        },
        [setParticipants, participants, props.onRemoveUser]
    )

    useEffect(() => {
        isFunction(props.onMembersChange) && props.onMembersChange(participants)
    }, [participants])

    useEffect(() => {
        if (!props.show) setShowPopup(true)
    }, [props.show])

    useEffect(() => {
        // popup_just_hidden = false
        setShowPopup(false)
        setData(sortirMember(users))
    }, [props.show, showPopup, users])

    useEffect(() => {
        getInitialParticipantData()
    }, [])

    useEffect(() => console.log('users', users), [users])

    return (
        <ContainerPopup
            width={'100%'}
            show={props.show}
            onCancel={props.onCancel}
        >
            <PopupAnggotaContainer>
                <WithPadding>
                    <InnnerContainer>
                        {!props.editable &&
                            (props.memberIDs ?? []).length === 0 && (
                                <WithPadding style={{ paddingTop: 24 }}>
                                    <Tipografi>Belum ada data</Tipografi>
                                </WithPadding>
                            )}
                        {props.editable && <Space value={31} />}
                        {props.editable && (
                            <WithPadding>
                                <FormTextInput
                                    accessibilityLabel={
                                        accessibilitylabels.formSearch
                                    }
                                    state={'special-task'}
                                    value={value}
                                    onFocus={props.onSearchInputFocus}
                                    onBlur={props.onSearchInputBlur}
                                    onChangeText={setValue}
                                    placeholder={'Ketik Nama'}
                                    placeholderTextColor={'#818487'}
                                    leftItem={
                                        <SearchGrayIcon
                                            style={{ marginRight: 8 }}
                                        />
                                    }
                                    rightItem={
                                        <ContainerAlignItemsCenter>
                                            {value.length > 0 && (
                                                <CloseGrayIcon
                                                    onPress={() => setValue('')}
                                                    style={{
                                                        marginLeft: 10,
                                                        marginRight: 10,
                                                    }}
                                                />
                                            )}
                                        </ContainerAlignItemsCenter>
                                    }
                                />
                            </WithPadding>
                        )}
                        <ScrollView>
                            <Space value={0} />
                            {loading_get_users && (
                                <TaskParticipantListLoading />
                            )}
                            {!loading_get_users && (
                                <SearchResult2
                                    onUserPress={props.onUserPress}
                                    editable={props.editable}
                                    loadingIDs={props.loadingIDs}
                                    participantIDs={props.memberIDs ?? []}
                                    data={data}
                                    onAddUser={onAddUser}
                                    onRemoveUser={onRemoveUser}
                                />
                            )}
                            <Space value={48} />
                        </ScrollView>
                    </InnnerContainer>
                    {props.bottomView}
                </WithPadding>
                <Space value={isIOS * keyboard_height} />
            </PopupAnggotaContainer>
        </ContainerPopup>
    )
}
