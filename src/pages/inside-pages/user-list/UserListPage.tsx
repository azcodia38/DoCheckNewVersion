/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import Header from 'components/header/Header'
import SearchResult from 'components/search-result/SearchResult'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import { NavProps } from 'src/utils/const'
import EmptyComponent from 'src/pages/inside-pages/user-list/EmptyComponent'

import { UserListPageParams } from 'src/pages/inside-pages/user-list/params'
import { UserListPageContainer } from 'src/pages/inside-pages/user-list/styled'

interface UserListPageProps extends NavProps {}

export default function UserListPage(props: UserListPageProps) {
    const params: UserListPageParams = props.route.params
    return (
        <DocheckSafeAreaView>
            <WithPadding>
                <Space value={7} />
                <Header
                    title={params.title}
                    navigation={props.navigation}
                    withBack
                    greenArrow
                />
            </WithPadding>
            {params.users.length > 0 ? (
                <UserListPageContainer>
                    <SearchResult data={params.users} onUserPress={() => {}} />
                </UserListPageContainer>
            ) : (
                <EmptyComponent title={params.title} />
            )}
        </DocheckSafeAreaView>
    )
}
