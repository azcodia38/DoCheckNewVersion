import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { SearchResultData } from 'src/api/mock-api'
import StoreData from 'store/types'

import { ParticipantListBiggerLoading } from 'components/loader-collections'
import { PesertaGrupDetailGoal } from 'components/peserta-grup/PesertaGrup'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import AddingMemberGoal from 'src/components/atoms/button/addingMemberGoal'

interface MemberGoalProps {
    loading: boolean
    goalMemberWaitingMapID: string[]
    members: SearchResultData[]
    goalMemberMapID: string[]
    setShowPopupMemberGoal: (status: boolean) => void
}

export default function MemberGoal({
    loading,
    setShowPopupMemberGoal,
    members,
    goalMemberMapID,
    goalMemberWaitingMapID,
}: MemberGoalProps) {
    const user = useSelector((user: StoreData) => user.user_login_data.user)
    const optionsMemo = useMemo(
        () =>
            members.map((u: SearchResultData) => ({
                label: u.imageurl ?? '',
                value: u.id,
            })),
        [members]
    )

    return (
        <>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Tipografi
                    type={'title-medium'}
                    style={{
                        color: '#262D33',
                        fontWeight: '700',
                        fontSize: 16,
                        fontFamily: 'Open Sans',
                    }}
                >
                    Anggota
                </Tipografi>
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: 'Open Sans',
                        color: '#979797',
                        fontWeight: '400',
                        marginLeft: 5,
                    }}
                >
                    ({optionsMemo.length})
                </Text>
            </View>
            <Space value={5} />
            {loading && <ParticipantListBiggerLoading />}
            {!loading && (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PesertaGrupDetailGoal
                        onPress={() => setShowPopupMemberGoal(true)}
                        options={optionsMemo}
                        values={goalMemberMapID}
                        waitingListID={goalMemberWaitingMapID}
                        ownerId={user.id}
                    />
                    <AddingMemberGoal
                        setShowPopupMemberGoal={setShowPopupMemberGoal}
                    />
                </View>
            )}
        </>
    )
}
