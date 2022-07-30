import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'

// @components
import {
    ImageBerhasilDiubah,
    ImageBerhasilPinGoal,
    ImageSimpanPerubahan,
} from 'components/icons/Icons'
import PopupAnggotaGoal from 'components/popup/anggota-goal/PopupAnggotaGoal'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'

// @helpers
import { SearchResultData } from 'src/api/mock-api'
import { InitialParticipantsResponseType } from 'src/utils/types'

type UserToMemberGoalHandlerType = (userId: string) => Promise<void>

interface PopupGroupDescriptionGoalProps {
    deleteGoalModal: {
        showPopupDelete: boolean
        continueToDelete: boolean
        setDeleteGoal: () => void
        setShowPopupDelete: (status: boolean) => void
        setLoadingModal: (status: boolean) => void
        continueDeleteGoal: () => void
        onNo: () => void
    }
    successDeleteGoalModal: {
        showPopupDeleteSuccess: boolean
        setShowPopupDeleteSuccess: React.Dispatch<React.SetStateAction<boolean>>
        setGoBack: () => void
    }
    successPinnedGoalModal: {
        showPopupPinSuccess: boolean
        setShowPopupPinSuccess: React.Dispatch<React.SetStateAction<boolean>>
        isPinnedText: string
    }
    memberGoal: {
        getInitialParticipants: InitialParticipantsResponseType
        showPopupMemberGoal: boolean
        isEditable: boolean
        goalMemberMapID: string[]
        isMemberLoading: string[]
        onMemberChange: React.Dispatch<React.SetStateAction<SearchResultData[]>>
        onAddUserToMemberGoal: UserToMemberGoalHandlerType
        onRemoveUserToMemberGoal: UserToMemberGoalHandlerType
        setShowPopupMemberGoal: (status: boolean) => void
        visitAnotherUser: (userId: string) => void
        onCancel: () => void
    }
    userId: string
}

export default function PopupGroupDescriptionGoal({
    deleteGoalModal: {
        continueDeleteGoal,
        continueToDelete,
        setLoadingModal,
        showPopupDelete,
        setShowPopupDelete,
        setDeleteGoal,
        onNo,
    },
    successDeleteGoalModal: {
        setGoBack,
        setShowPopupDeleteSuccess,
        showPopupDeleteSuccess,
    },

    successPinnedGoalModal: {
        setShowPopupPinSuccess,
        showPopupPinSuccess,
        isPinnedText,
    },
    memberGoal: {
        getInitialParticipants,
        goalMemberMapID,
        isEditable,
        isMemberLoading,
        onAddUserToMemberGoal,
        onMemberChange,
        onRemoveUserToMemberGoal,
        setShowPopupMemberGoal,
        showPopupMemberGoal,
        visitAnotherUser,
        onCancel,
    },
    userId,
}: PopupGroupDescriptionGoalProps) {
    const onUserPressHandler = useCallback(
        () =>
            ({ id }: SearchResultData) => {
                // Redirect if this user click itself
                if (id === userId) return
                setShowPopupMemberGoal(false)
                visitAnotherUser(id)
                console.log('id', id)
            },
        [userId, setShowPopupMemberGoal, visitAnotherUser]
    )

    const onModalHideHandler = useCallback(() => {
        if (continueToDelete) {
            setLoadingModal(true)
            continueDeleteGoal()
        }
    }, [continueToDelete, setLoadingModal, continueDeleteGoal])

    return (
        <>
            <PopupYesNo
                show={showPopupDelete}
                setShow={setShowPopupDelete}
                image={<ImageSimpanPerubahan />}
                onModalHide={onModalHideHandler}
                title={'Hapus Goals?'}
                onNo={onNo}
                onYes={setDeleteGoal}
                cancelable
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={showPopupDeleteSuccess}
                setShow={setShowPopupDeleteSuccess}
                onCancelRequest={() => setShowPopupDeleteSuccess(false)}
                onModalHide={() => setGoBack()}
                image={<ImageBerhasilDiubah />}
                title={'Goals Berhasil\nDihapus'}
                noButton
            />
            <PopupNormalOK
                style={style.successPinModal}
                animationIn={'slideInDown'}
                show={showPopupPinSuccess}
                setShow={setShowPopupPinSuccess}
                onCancelRequest={() => setShowPopupPinSuccess(false)}
                image={<ImageBerhasilPinGoal />}
                text={isPinnedText}
                noButton
            />
            <PopupAnggotaGoal
                onUserPress={onUserPressHandler}
                getInitialParticipants={getInitialParticipants}
                show={showPopupMemberGoal}
                onCancel={onCancel}
                memberIDs={goalMemberMapID}
                loadingIDs={isMemberLoading}
                onMembersChange={onMemberChange}
                onAddUser={onAddUserToMemberGoal}
                onRemoveUser={onRemoveUserToMemberGoal}
                editable={isEditable}
            />
        </>
    )
}

const style = StyleSheet.create({
    successPinModal: {
        paddingBottom: 32,
        paddingTop: 32,
    },
})
