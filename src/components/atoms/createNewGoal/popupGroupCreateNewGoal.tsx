import React, { useCallback, useMemo } from 'react'

import {
    ImageBerhasilDiubah,
    ImageDaftarTersimpan,
    ImageSimpanPerubahan,
} from 'components/icons/Icons'
import PopupAnggota from 'components/popup/anggota-goal/PopupAnggota'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'
import { SearchHandlerType } from 'src/utils/types'
import { SearchResultData } from 'src/api/mock-api'

type GoalMemberType = string[]
type StatusHandlerType = (status: boolean) => void

type UserHandlerType = (userId: string) => void

interface PopupGroupCreateNewGoalProps {
    hasTappedBack: boolean
    setHasTappedBack: StatusHandlerType
    setShowPopupMemberGoal: StatusHandlerType
    onNewCreateGoalPage: () => void
    onGoBack: () => void

    isEditMode?: boolean
    onPopupYesNo: {
        isShowupCancel: boolean
        setShowupCancel: React.Dispatch<React.SetStateAction<boolean>>
    }
    onPopupNormalOK: {
        setShowSuccessPopup: StatusHandlerType
        isShowupSuccess: boolean
    }
    onPopupAnggota: {
        onSearchAPI: SearchHandlerType
        onGetInitialParticipants: () => Promise<SearchResultData[]>
        onGoUserProfile: UserHandlerType
        onAddUserToMemberGoal: UserHandlerType
        onRemoveUserFromMemberGoal: UserHandlerType
        isShowupMemberGoal: boolean
        goalMembers: GoalMemberType
        setParticipants: React.Dispatch<
            React.SetStateAction<SearchResultData[]>
        >
    }
}

export default function PopupGroupCreateNewGoal({
    onPopupYesNo: { isShowupCancel, setShowupCancel },
    onPopupNormalOK: { isShowupSuccess, setShowSuccessPopup },
    onPopupAnggota: {
        goalMembers,
        isShowupMemberGoal,
        onAddUserToMemberGoal,
        onGetInitialParticipants,
        onGoUserProfile,
        onRemoveUserFromMemberGoal,
        onSearchAPI,
        setParticipants,
    },
    isEditMode = false,
    hasTappedBack,
    onGoBack,
    onNewCreateGoalPage,
    setHasTappedBack,
    setShowPopupMemberGoal,
}: PopupGroupCreateNewGoalProps) {
    const normalOKTitle = useMemo(
        () => (isEditMode ? 'Goals Berhasil\nDisimpan' : undefined),
        [isEditMode]
    )
    const normalOKDescription = useMemo(
        () =>
            isEditMode
                ? undefined
                : 'Yeay sekarang kamu sudah bisa buat sesuatu\nyang hebat.',
        [isEditMode]
    )
    const normalOKIlustrateImage = useMemo(
        () => (isEditMode ? <ImageDaftarTersimpan /> : <ImageBerhasilDiubah />),
        [isEditMode]
    )

    const onCancelHandler = useCallback(
        () => setShowPopupMemberGoal(false),
        [setShowPopupMemberGoal]
    )

    const onCancelRequestHandler = useCallback(() => {
        setHasTappedBack(true)
        setShowSuccessPopup(false)
        if (isEditMode) onGoBack()
        else onNewCreateGoalPage()
    }, [
        setHasTappedBack,
        setShowSuccessPopup,
        isEditMode,
        onGoBack,
        onNewCreateGoalPage,
    ])

    const onNohandler = useCallback(() => {
        setShowupCancel(false)
        onGoBack()
    }, [setShowupCancel, onGoBack])

    const onOKhandler = useCallback(() => {
        setShowSuccessPopup(false)
        if (isEditMode) onGoBack()
        else onNewCreateGoalPage()
    }, [setShowSuccessPopup, isEditMode, onGoBack, onNewCreateGoalPage])

    const onModalHideHandler = useCallback(() => {
        if (hasTappedBack) return
        setShowSuccessPopup(false)
        if (isEditMode) {
            onGoBack()
        }
    }, [hasTappedBack, setShowSuccessPopup, isEditMode, onGoBack])

    const onUserPressHandler = useCallback(
        (user: SearchResultData) => {
            setShowPopupMemberGoal(false)
            onGoUserProfile(user.id)
        },
        [setShowPopupMemberGoal, onGoUserProfile]
    )
    

    return (
        <>
            <PopupYesNo
                show={isShowupCancel}
                setShow={setShowupCancel}
                image={<ImageSimpanPerubahan />}
                title={'Whoops!'}
                text={'Goal belum tersimpan, yakin mau\nkeluar?'}
                labelNo={'Keluar'}
                labelYes={'Lanjut'}
                onYes={() => setShowupCancel(false)}
                onNo={onNohandler}
                cancelable
            />
            <PopupNormalOK
                title={normalOKTitle}
                text={normalOKDescription}
                image={normalOKIlustrateImage}
                onCancelRequest={onCancelRequestHandler}
                onOK={onOKhandler}
                onModalHide={onModalHideHandler}
                show={isShowupSuccess}
                setShow={setShowSuccessPopup}
                noButton={isEditMode}
            />
            <PopupAnggota
                searchAPI={onSearchAPI}
                onUserPress={onUserPressHandler}
                getInitialParticipants={onGetInitialParticipants}
                show={isShowupMemberGoal}
                onCancel={onCancelHandler}
                memberIDs={goalMembers}
                onMembersChange={setParticipants}
                onAddUser={onAddUserToMemberGoal}
                onRemoveUser={onRemoveUserFromMemberGoal}
                editable={true}
            />
        </>
    )
}
