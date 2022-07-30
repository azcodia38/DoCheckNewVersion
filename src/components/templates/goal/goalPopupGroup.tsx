/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React from 'react'

import {
    ImageBerhasilDiubah,
    ImageSimpanPerubahan,
} from 'components/icons/Icons'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'

type HandlerFunctionType = (status: boolean) => void
type HandlerFunctionVoidType = () => void

interface PopupGroupProps {
    goalsDeleteAction: {
        setShowPopupDelete: HandlerFunctionType
        continueToDelete: boolean
        setLoadDelete: HandlerFunctionType
        continueDeleteGoal: HandlerFunctionVoidType
        deleteGoal: HandlerFunctionVoidType
        cancelable: boolean
        isPopupDelete: boolean
    }
    goalsDeleteAllAction: {
        isDeleteAll: boolean
        setShowDeleteAll: HandlerFunctionType
        continueDeleteAllGoal: HandlerFunctionVoidType
        deleteAllGoals: HandlerFunctionVoidType
        cancelable: boolean
    }
    goalsDeleteSuccessAction: {
        popupDeleteHandler: HandlerFunctionType
        setShowPopupDeleteSuccess: HandlerFunctionType
        onHide: HandlerFunctionVoidType
        noButton?: boolean
        isPopupDeleteSuccess: boolean
    }
    goalDeleteAllSuccessAction: {
        isDeleteAllSuccess: boolean
        setShow: HandlerFunctionType
        onCancel: HandlerFunctionVoidType
        noButton?: boolean
    }
}

export default function PopupGroup({
    goalsDeleteAction: {
        continueDeleteGoal,
        isPopupDelete,
        continueToDelete,
        deleteGoal,
        setLoadDelete,
        setShowPopupDelete,
        cancelable: cancelableDelete = true,
    },
    goalsDeleteAllAction: {
        cancelable: cancelableDeleteAll = true,
        deleteAllGoals,
        setShowDeleteAll,
        isDeleteAll,
        continueDeleteAllGoal,
    },
    goalsDeleteSuccessAction: {
        noButton: noButtonGoalsDeleteSuccess = true,
        onHide,
        popupDeleteHandler,
        setShowPopupDeleteSuccess,
        isPopupDeleteSuccess,
    },
    goalDeleteAllSuccessAction: {
        isDeleteAllSuccess,
        onCancel,
        setShow,
        noButton: noButtonAllSuccess = true,
    },
}: PopupGroupProps) {
    return (
        <>
            <PopupYesNo
                show={isPopupDelete}
                setShow={setShowPopupDelete}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToDelete) {
                        setLoadDelete(true)
                        continueDeleteGoal()
                    }
                }}
                title={'Hapus Goals?'}
                onNo={() => setShowPopupDelete(false)}
                onYes={deleteGoal}
                cancelable={cancelableDelete}
            />
            <PopupYesNo
                show={isDeleteAll}
                setShow={setShowDeleteAll}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToDelete) {
                        setLoadDelete(true)
                        continueDeleteAllGoal()
                    }
                }}
                title={'Hapus Semua Goals?'}
                onNo={() => setShowDeleteAll(false)}
                onYes={deleteAllGoals}
                cancelable={cancelableDeleteAll}
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={isPopupDeleteSuccess}
                setShow={popupDeleteHandler}
                onCancelRequest={() => {
                    setShowPopupDeleteSuccess(false)
                }}
                onModalHide={onHide}
                image={<ImageBerhasilDiubah />}
                title={'Goals Berhasil\nDihapus'}
                noButton={noButtonGoalsDeleteSuccess}
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={isDeleteAllSuccess}
                setShow={setShow}
                onCancelRequest={onCancel}
                image={<ImageBerhasilDiubah />}
                title={'Goals Berhasil\nDihapus'}
                noButton={noButtonAllSuccess}
            />
        </>
    )
}
