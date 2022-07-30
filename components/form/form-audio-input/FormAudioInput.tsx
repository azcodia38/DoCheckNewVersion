import React, { useEffect, useState } from 'react'
import {
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import { theme } from 'src/utils/const'
import { AudioPathDuration, formatMinuteSeconds } from 'src/utils'
import {
    DeleteAudioIcon,
    PauseIcon,
    PlayIcon,
    StopIcon,
    TickSquareIcon,
    VoiceIcon,
} from '../../icons/Icons'
import Space from '../../../src/components/atoms/space'
import Tipografi from '../../../src/components/atoms/tipografi'
import InputBox, { InputBoxState } from '../input-box/InputBox'
import {
    AudioBarContainer,
    CircleButtonContainer,
    FrequencyItem,
    HFlexEnd,
    HFlexStart,
    HSpaceBetween,
    RandomFrequencyContainer,
} from './styled'
import { RECORD_TIME_GAP, useAudioRecording } from './useAudioRecording'

const FREQ_MAX_SLICE = 22
const AUDIO_WAVE = [
    4, 10, 3, 12, 15, 11, 20, 21, 16, 22, 9, 6, 13, 15, 7, 4, 16, 15, 14, 9, 6,
    13, 15, 7, 4, 16, 15, 14,
]

interface FormAudioInputProps extends TextInputProps {
    initialAudioState?: RecordingState
    autoRecord?: boolean
    duration?: number
    label?: string
    state?: InputBoxState
    errorText?: string
    leftItem?: React.ReactNode
    rightItem?: React.ReactNode
    noMarginBottom?: boolean
    inputStyle?: StyleProp<TextStyle>
    inputContainerStyle?: StyleProp<TextStyle>
    onDeleteAudio?(): void
    onAudioRecorded?(audio_pd: AudioPathDuration): void
    useAudio?: boolean
    deleteMode?: boolean
}

export enum RecordingState {
    INITIAL = 'INITIAL',
    RECORDING = 'RECORDING',
    RECORDED = 'RECORDED',
    PLAYING = 'PLAYING',
    PAUSE = 'PAUSE',
}

interface RandomFrequencyProps {
    i?: number
}

export function RandomFrequency(props: RandomFrequencyProps) {
    return (
        <RandomFrequencyContainer>
            {AUDIO_WAVE.slice(0, FREQ_MAX_SLICE).map((_, i: number) => (
                <FrequencyItem
                    key={i}
                    style={{
                        height: _,
                        backgroundColor:
                            i < (props.i ?? 0) ? theme.main_color : '#C4C4C4',
                    }}
                />
            ))}
        </RandomFrequencyContainer>
    )
}

interface CircleIconButtonProps {
    style?: StyleProp<ViewStyle>
    noShadow?: boolean
    icon?: any
    onPress?(): void
}

export function CircleIconButton(props: CircleIconButtonProps) {
    const shadow = props.noShadow
        ? {}
        : {
              shadowColor: '#555',
              shadowOffset: {
                  width: 0,
                  height: 4,
              },
              shadowOpacity: 0.4,
              shadowRadius: 8.0,
              elevation: 7,
          }

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                ...((props.style as any) ?? {}),
                position: 'absolute',
                right: 0,
                zIndex: 999,
            }}
            onPress={props.onPress}
        >
            <CircleButtonContainer style={shadow}>
                {props.icon ?? (
                    <TickSquareIcon style={{ width: 18, height: 18 }} />
                )}
            </CircleButtonContainer>
        </TouchableOpacity>
    )
}

export default function FormAudioInput(props: FormAudioInputProps) {
    const {
        startRecord,
        stopRecord,
        startPlay,
        stopPlay,
        setDuration,
        audio_state,
    } = useAudioRecording()
    const [state, setRecordingState] = useState<RecordingState>(
        props.initialAudioState ?? RecordingState.INITIAL
    )

    const play_progress = Math.ceil(
        ((FREQ_MAX_SLICE + 1) * audio_state.currentPositionSec) /
            audio_state.recordSecs
    )

    function onPlay() {
        setRecordingState(RecordingState.PLAYING)
        startPlay(props.value)
    }

    function onPause() {
        setRecordingState(RecordingState.PAUSE)
        stopPlay()
    }

    async function onStopRecord() {
        setRecordingState(RecordingState.RECORDED)
        const audio_pd: AudioPathDuration = await stopRecord()
        if (props.onAudioRecorded) {
            props.onAudioRecorded(audio_pd)
        }
    }

    function onStartRecord() {
        setRecordingState(RecordingState.RECORDING)
        startRecord((audio_pd: AudioPathDuration) => {
            setRecordingState(RecordingState.RECORDED)
            if (props.onAudioRecorded) {
                props.onAudioRecorded(audio_pd)
            }
        })
    }

    function onResetRecord() {
        setRecordingState(RecordingState.INITIAL)
        stopRecord(true)
    }

    useEffect(() => {
        if (props.autoRecord && props.useAudio === true) {
            onStartRecord()
        }
    }, [props.autoRecord, props.useAudio])

    useEffect(() => {
        return () => {
            onPause()
            onStopRecord()
        }
    }, [])

    useEffect(() => {
        if (
            audio_state.isPlaying &&
            audio_state.currentPositionSec + RECORD_TIME_GAP * 1000 >=
                audio_state.recordSecs
        ) {
            onPause()
        }
    }, [
        audio_state.isPlaying,
        audio_state.currentPositionSec,
        audio_state.recordSecs,
    ])

    useEffect(() => {
        if (props.duration) {
            setDuration(props.duration)
        }
    }, [props.duration])

    useEffect(() => {
        // force state to recorded if deleteMode false
        if (!props.deleteMode) {
            setDuration(props.duration ?? 0)
            setRecordingState(RecordingState.RECORDED)
        }
    }, [props.deleteMode])

    return (
        <InputBox
            label={props.label}
            state={'none'}
            errorText={props.errorText}
            leftItem={
                props.deleteMode && (
                    <DeleteAudioIcon
                        onPress={() => {
                            onResetRecord()
                            if (props.onDeleteAudio) {
                                props.onDeleteAudio()
                            }
                        }}
                        style={{ marginRight: 12 }}
                    />
                )
            }
            rightItem={props.rightItem}
            noMarginBottom={props.noMarginBottom}
            leftItemStyle={{
                paddingLeft: 0,
            }}
            rightItemStyle={{
                paddingRight: 0,
            }}
        >
            <AudioBarContainer>
                <HSpaceBetween>
                    <HFlexStart>
                        {[
                            RecordingState.PAUSE,
                            RecordingState.RECORDED,
                        ].includes(state) && <PlayIcon onPress={onPlay} />}
                        {[RecordingState.PLAYING].includes(state) && (
                            <PauseIcon onPress={onPause} />
                        )}
                        {[
                            RecordingState.INITIAL,
                            RecordingState.RECORDING,
                        ].includes(state) && (
                            <Tipografi
                                style={{ fontWeight: '500', fontSize: 12 }}
                            >
                                {formatMinuteSeconds(
                                    audio_state.recordSecs / 1000
                                )}
                            </Tipografi>
                        )}
                    </HFlexStart>
                    {[
                        RecordingState.PAUSE,
                        RecordingState.PLAYING,
                        RecordingState.RECORDED,
                    ].includes(state) && <RandomFrequency i={play_progress} />}
                    <HFlexEnd>
                        {/* Todo: Uncomment this if this features was ready */}
                        {/* {[RecordingState.RECORDING].includes(state) && (
                            <StopIcon onPress={pauseRecord} />
                        )} */}
                        {[
                            RecordingState.RECORDED,
                            RecordingState.PLAYING,
                            RecordingState.PAUSE,
                        ].includes(state) && (
                            <Tipografi
                                style={{ fontWeight: '500', fontSize: 12 }}
                            >
                                {formatMinuteSeconds(
                                    ((audio_state.recordSecs
                                        ? audio_state.recordSecs
                                        : 0) -
                                        (audio_state.currentPositionSec
                                            ? audio_state.currentPositionSec
                                            : 0)) /
                                        1000
                                )}
                            </Tipografi>
                        )}
                        {[
                            RecordingState.INITIAL,
                            RecordingState.RECORDING,
                        ].includes(state) && <Space width={44} />}
                    </HFlexEnd>
                </HSpaceBetween>
            </AudioBarContainer>
            {[RecordingState.RECORDING].includes(state) && (
                <CircleIconButton onPress={onStopRecord} />
            )}
            {[RecordingState.INITIAL].includes(state) && (
                <CircleIconButton
                    onPress={onStartRecord}
                    icon={<VoiceIcon />}
                />
            )}
        </InputBox>
    )
}
