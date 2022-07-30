/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { isFunction } from 'lodash'

// @tools
import {
    AudioPathDuration,
    getDatefromDateOrString,
    isURLValid,
} from 'src/utils'
import useAuthorization from 'src/hook/useAuthorization'

// @api
import { SearchResultData } from 'src/api/mock-api'
import { TaskCreateGoalRequest } from 'src/api/my-goal'
import { searchUsersByIDsAPI } from 'src/api/user'
import { uploadAudioAPI } from 'src/api/upload'

interface EditorTaskProps {
    task: TaskCreateGoalRequest
    setTask(task: TaskCreateGoalRequest): void
    onSimpan?(task: TaskCreateGoalRequest): void
    onUserPress?(user: SearchResultData): void
    height: number
    loadingSubmit?: boolean
    getInitialParticipants(): Promise<SearchResultData[]>
    goalMemberIDs?: string[]
    heightHandler?: (height: number) => void
}

export interface WithEditorTaskHOC extends EditorTaskProps {
    heightHandler: any
    errorDate: any
    setShowPopupParticipants: any
    participants: any
    loadingParticipants: any
    errorLink: any
    loading: any
    saveAndSubmitAudio: any
    tmpRecordedAudio: any
    searchAPI: any
    setParticipants: any
    onAddUserToActiveTask: any
    onRemoveUserFromActiveTask: any
    showPopupNotification: any
}

export default function WithEditorTask<
    T extends EditorTaskProps = EditorTaskProps
>(WrappedComponent: React.ComponentType<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentMainWithHomepage = (props: EditorTaskProps) => {
        // props comes afterwards so the can override the default ones.

        const auth = useAuthorization()

        const [participants, setParticipants] = useState<SearchResultData[]>([])
        const [loadingParticipants, setLoadingParticipants] =
            useState<boolean>(false)
        const [showPopupNotification, setShowPopupParticipants] =
            useState<boolean>(false)
        const [tmpRecordedAudio, setTempRecordedAudio] =
            useState<AudioPathDuration>({
                path: props.task.audioUrl,
                duration: props.task.audioDurationMs,
            })
        const [errorDate, setErrorDate] = useState<string>('')
        const [errorLink, setErrorLink] = useState<string>('')
        const [loading, setLoading] = useState<boolean>(false)

        // const heightHandler = useCallback(
        //     (height: number) => {
        //         if (isFunction(props.heightHandler))
        //             return props.heightHandler(height)
        //         return () => {}
        //     },
        //     [props.heightHandler]
        // )

        const onAddUserToActiveTask = useCallback(
            (userId: string) => {
                if ((props.task.assignees ?? []).includes(userId)) {
                    return
                }
                props.setTask({
                    ...props.task,
                    assignees: [...(props.task.assignees ?? []), userId],
                })
            },
            [props.task.assignees, props.setTask]
        )

        const onRemoveUserFromActiveTask = useCallback(
            (userId: string) =>
                props.setTask({
                    ...props.task,
                    assignees: (props.task.assignees ?? []).filter(
                        (x) => x !== userId
                    ),
                }),
            [props.setTask, props.task]
        )

        const searchAPI = useCallback(
            async (q: string) =>
                await searchUsersByIDsAPI(auth, props.goalMemberIDs ?? [], q),
            [searchUsersByIDsAPI, auth, props.goalMemberIDs]
        )

        const saveAndSubmitAudio = useCallback(async () => {
            setLoading(true)
            // moment(new Date()).format("HH:mm")
            // moment(new Date()).format("DD/MMMM/YYYY")
            try {
                let updated_task = props.task

                console.log("saveAndSubmitAudio: ", updated_task)

                if (tmpRecordedAudio.path) {
                    const _ = await uploadAudioAPI(auth, tmpRecordedAudio.path)
                    updated_task = {
                        ...props.task,
                        audioUrl: _,
                        audioDurationMs: tmpRecordedAudio.duration,
                    }
                    props.setTask(updated_task)
                }
                if (isFunction(props.onSimpan)) props.onSimpan(updated_task)
            } catch (err: any) {
                // console.log(err)
                //
            } finally {
                setLoading(false)
            }
        }, [
            setLoading,
            props.task,
            tmpRecordedAudio,
            uploadAudioAPI,
            auth,
            props.setTask,
            props.onSimpan,
        ])

        useEffect(() => {
            if ((props.task.assignees ?? []).length === 0) {
                return
            }

            setLoadingParticipants(true)
            props
                .getInitialParticipants()
                .then((_) => {
                    setLoadingParticipants(false)
                    setParticipants(_)
                })
                .finally(() => setLoadingParticipants(false))
        }, [props.task.id])

        useEffect(() => {
            const diff = moment(
                getDatefromDateOrString(props.task.dueDate)
            ).diff(new Date(), 'm')
            const is_before_now = diff < 0
            setErrorDate(
                is_before_now
                    ? 'Tanggal atau jam tidak boleh sebelum saat ini'
                    : ''
            )
        }, [props.task.dueDate])

        useEffect(() => {
            setErrorLink(
                props.task.recommendationUrl &&
                    !isURLValid(props.task.recommendationUrl ?? '')
                    ? 'URL tidak valid'
                    : ''
            )
        }, [props.task.recommendationUrl])
        return (
            <WrappedComponent
                {...{
                    errorDate,
                    setShowPopupParticipants,
                    participants,
                    loadingParticipants,
                    errorLink,
                    loading,
                    saveAndSubmitAudio,
                    tmpRecordedAudio,
                    searchAPI,
                    setParticipants,
                    onAddUserToActiveTask,
                    onRemoveUserFromActiveTask,
                    showPopupNotification,
                }}
                {...(props as T)}
            />
        )
    }

    ComponentMainWithHomepage.displayName = `withMainHomePage(${displayName})`

    return ComponentMainWithHomepage
}
