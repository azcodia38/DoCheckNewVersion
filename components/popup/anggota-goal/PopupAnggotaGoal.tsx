import React, { useState } from 'react'

import useAuthorization from 'src/hook/useAuthorization'
import { searchUsersAPI } from 'src/api/user'
import { User } from 'src/entity/User.entity'
import PopupAnggota, { PopupAnggotaProps } from './PopupAnggota'

interface PopupAnggotaGoalProps extends PopupAnggotaProps {}

type FocusType = 'search' | 'email' | 'none'

export default function PopupAnggotaGoal(props: PopupAnggotaGoalProps) {
    const auth = useAuthorization()
    const [focus, setFocus] = useState<FocusType>('none')

    async function searchAPI(q: string): Promise<User[]> {
        return await searchUsersAPI(auth, q, 0, 10)
    }

    return (
        <PopupAnggota
            onSearchInputBlur={() => setFocus('none')}
            onSearchInputFocus={() => setFocus('search')}
            // bottomView={props.editable && <UndangEmailContainer style={{ marginTop: focus === 'email' ? '-50%' : -15, display: focus === 'search' ? 'none' : 'flex' }}>
            //   <Tipografi type={'medium'} style={{ color: '#FFF' }}>
            //     ATAU UNDANG LEWAT EMAIL
            //   </Tipografi>
            //   <Space value={25} />
            //   <FormTextInput
            //     inputContainerStyle={{
            //       borderRadius: 11
            //     }}
            //     inputStyle={{
            //       color: '#FFF'
            //     }}
            //     onBlur={() => setFocus('none')}
            //     onFocus={() => setFocus('email')}
            //     keyboardType={'email-address'}
            //     rightItem={<ArrowRightChevronIcon />}
            //     placeholder={'Tulis email disini'}
            //     placeholderTextColor={'#FFF'}
            //     state={'undang-teman'} />
            //   <Space value={6} />
            //   <Tipografi type={'small'} style={{ color: '#FFF', textAlign: 'center' }}>
            //     { 'Temanmu akan menerima undangan untuk\nbergabung dengan goal ini' }
            //   </Tipografi>
            // </UndangEmailContainer>}
            {...props}
            searchAPI={searchAPI}
        />
    )
}
