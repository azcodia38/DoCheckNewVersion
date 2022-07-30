import React from 'react'

import {
    ImageBerhasilDiubah,
    ImageSimpanPerubahan,
} from 'components/icons/Icons'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import PopupYesNo from 'components/popup/yes-no/PopupYesNo'

type VoidReturnType = () => void

interface PopupDescriptionTaskProps {
    deleteTask: {
        showPopupDelete: boolean
        setShowPopupDelete: (status: boolean) => void
        continueToDelete: boolean
        setLoadingDelete: (status: boolean) => void
        continueDeleteTasks: () => void
        deleteTasks: VoidReturnType
    }
    deleteAllTask: {
        showPopupDeleteAll: boolean
        setShowPopupDeleteSemua: (status: boolean) => void
        deleteAllTask: VoidReturnType
        continueDeleteAllTask: VoidReturnType
    }
    successDelete: {
        isSuccessPopupDelete: boolean
        setShowCheck: (status: boolean) => void
        setShowPopupDeleteSuccess: (status: boolean) => void
        setCheckedIDs: (groupChecked: string[]) => void
    }
    successDeleteTask: {
        isSuccessPopupDeleteAll: boolean
        setShowPopupDeleteSemuaSuccess: (status: boolean) => void
        goBack: () => void
    }
}

export default function PopupDescriptionTask({
    deleteTask: {
        continueDeleteTasks,
        continueToDelete,
        setLoadingDelete,
        setShowPopupDelete,
        showPopupDelete,
        deleteTasks,
    },
    deleteAllTask: {
        setShowPopupDeleteSemua,
        showPopupDeleteAll,
        deleteAllTask,
        continueDeleteAllTask,
    },
    successDelete: {
        isSuccessPopupDelete,
        setShowPopupDeleteSuccess,
        setCheckedIDs,
        setShowCheck,
    },
    successDeleteTask: {
        isSuccessPopupDeleteAll,
        setShowPopupDeleteSemuaSuccess,
        goBack,
    },
}: PopupDescriptionTaskProps) {
    return (
        <>
            <PopupYesNo
                show={showPopupDelete}
                setShow={setShowPopupDelete}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToDelete) {
                        setLoadingDelete(true)
                        continueDeleteTasks()
                    }
                }}
                title={'Hapus Task?'}
                onNo={() => setShowPopupDelete(false)}
                onYes={deleteTasks}
                cancelable
            />
            <PopupYesNo
                show={showPopupDeleteAll}
                setShow={setShowPopupDeleteSemua}
                image={<ImageSimpanPerubahan />}
                onModalHide={() => {
                    if (continueToDelete) continueDeleteAllTask()
                }}
                title={'Hapus Semua Task?'}
                onNo={() => setShowPopupDeleteSemua(false)}
                onYes={deleteAllTask}
                cancelable
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={isSuccessPopupDelete}
                setShow={setShowPopupDeleteSuccess}
                onCancelRequest={() => {
                    setShowPopupDeleteSuccess(false)
                    setShowCheck(false)
                    setCheckedIDs([])
                }}
                image={<ImageBerhasilDiubah />}
                title={'Task Berhasil\nDihapus'}
                noButton
            />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={isSuccessPopupDeleteAll}
                setShow={setShowPopupDeleteSemuaSuccess}
                onCancelRequest={() => {
                    setShowPopupDeleteSemuaSuccess(false)
                    goBack()
                }}
                image={<ImageBerhasilDiubah />}
                title={'Task Berhasil\nDihapus'}
                noButton
            />
        </>
    )
}
