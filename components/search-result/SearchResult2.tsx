import React, { useCallback, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { accessibilitylabels } from 'src/utils/types/componentsTypes'
import { SearchResultData } from 'src/api/mock-api'
import { getPlaceholderImage, theme } from 'src/utils/const'
import { GENDER } from 'src/entity/User.entity'

import { PlusOGreenIcon } from 'components/icons/Icons'
import Loading from 'components/loading/Loading'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import {
    ImageUser,
    NameUsername,
    OwnerBox,
    UserSearch2Container,
} from './styled'
import { isFunction } from 'lodash'

interface ItemSearchProps {
    index: number
    dataLength: number
    userId: string
    name: string
    username: string
    imageurl: string
    participantIDs: string[]
    onAddUser?(userId: string): void
    onRemoveUser?(userId: string): void
    onUserPress: (user: Pick<SearchResultData, 'id'>) => void
    gender: GENDER
    editable?: boolean
    loading?: boolean
    owner?: boolean
}

function ItemSearch(props: ItemSearchProps) {
    const is_participant = (props.participantIDs ?? []).includes(props.userId)

    const onAnotherUserProfileHandler = useCallback(
        () => props.onUserPress({ id: props.participantIDs[props.index] }),
        [props.onUserPress, props.participantIDs, props.index]
    )

    return (
        <TouchableOpacity onPress={onAnotherUserProfileHandler}>
            <WithPadding
                style={{
                    borderBottomColor: '#DFDFDF',
                    borderBottomWidth: 0.5,
                    borderStyle: 'solid',
                    paddingLeft: 15,
                    paddingRight: 15,
                }}
            >
                <UserSearch2Container
                    style={{
                        marginTop: props.index === 0 ? 4 : 0,
                        marginBottom:
                            props.index === props.dataLength - 1 ? 4 : 0,
                    }}
                >
                    <ImageUser
                        source={
                            props.imageurl
                                ? { uri: props.imageurl }
                                : getPlaceholderImage(props.gender)
                        }
                    />
                    <NameUsername>
                        <Tipografi type={'label'} style={{ color: '#262D33' }}>
                            {props.name}
                        </Tipografi>
                        {props.owner && (
                            <OwnerBox>
                                <Tipografi
                                    type={'smaller'}
                                    style={{ color: theme.main_color }}
                                    center
                                >
                                    Owner
                                </Tipografi>
                            </OwnerBox>
                        )}
                        <Tipografi type={'small'} style={{ color: '#ABABAB' }}>
                            {props.username}
                        </Tipografi>
                    </NameUsername>
                    {!props.owner && (
                        <Loading
                            style={{ marginTop: -14 }}
                            small
                            loading={props.loading}
                        >
                            <>
                                {!is_participant && props.editable && (
                                    <PlusOGreenIcon
                                        accessibilityLabel={
                                            accessibilitylabels.onAddUser
                                        }
                                        onPress={() =>
                                            props.onAddUser
                                                ? props.onAddUser(props.userId)
                                                : null
                                        }
                                    />
                                )}
                                {is_participant && props.editable && (
                                    <TouchableOpacity
                                        accessibilityLabel={
                                            accessibilitylabels.onRemoveUser
                                        }
                                        onPress={() =>
                                            props.onRemoveUser
                                                ? props.onRemoveUser(
                                                      props.userId
                                                  )
                                                : null
                                        }
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <Tipografi
                                                type={'small'}
                                                style={{
                                                    color: '#ABABAB',
                                                }}
                                            >
                                                Hapus
                                            </Tipografi>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </>
                        </Loading>
                    )}
                </UserSearch2Container>
            </WithPadding>
        </TouchableOpacity>
    )
}

interface SearchResult2Props {
    participantIDs?: string[]
    data: SearchResultData[]
    loadingIDs?: string[]
    onAddUser?(userId: string): void
    onRemoveUser?(userId: string): void
    onUserPress?(user: Pick<SearchResultData, 'id'>): void
    editable?: boolean
}

export default function SearchResult2(props: SearchResult2Props) {
    return (
        <View>
            {props.data.map((item: SearchResultData, i: number) => (
                <ItemSearch
                    editable={props.editable}
                    onAddUser={props.onAddUser}
                    onRemoveUser={props.onRemoveUser}
                    onUserPress={props.onUserPress!}
                    key={i}
                    index={i}
                    userId={item.id}
                    gender={item.gender}
                    participantIDs={props.participantIDs!}
                    dataLength={props.data.length}
                    name={item.name}
                    username={item.username}
                    imageurl={item.imageurl ?? ''}
                    loading={(props.loadingIDs ?? []).includes(item.id)}
                    owner={item.owner}
                />
            ))}
        </View>
    )
}
