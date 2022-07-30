import { useEffect, useState } from 'react'
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player'
import Sound from 'react-native-sound'
import { stat } from 'react-native-fs'

import { DebugAlert } from 'src/utils/alert'
import { AudioPathDuration, checkAudioPermission } from 'src/utils'

const audioSet: AudioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
    OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,

    // how many bit per seconds (conversion 1 byte = 8 bit)
    AudioEncodingBitRateAndroid: 2000 /* byte per seconds */ * 8,

    // list common sample rate https://github.com/audiojs/sample-rate
    AudioSamplingRateAndroid: 88200,
}

export const RECORD_TIME_GAP = 0.2
export const MAX_RECORDING_DURATION_MS = 1 * 60 * 1000

const audioRecorderPlayer = new AudioRecorderPlayer()
audioRecorderPlayer.setSubscriptionDuration(RECORD_TIME_GAP)

export function useAudioRecording() {
    const [audio_state, setAudioState] = useState({
        recordSecs: 0,
        recordTime: '',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '',
        duration: '',
        isPlaying: false,
        isRecording: false,
        recordedAudioPath: '',
    })
    const [filestat, setFilestat] = useState({})

    async function stopRecord(
        reset_record: boolean = false
    ): Promise<AudioPathDuration> {
        const result = await audioRecorderPlayer.stopRecorder()
        audioRecorderPlayer.removeRecordBackListener()
        setAudioState({
            ...audio_state,
            currentPositionSec: 0,
            currentDurationSec: 0,
            recordSecs: reset_record ? 0 : audio_state.recordSecs,
            isRecording: false,
            recordedAudioPath: result,
        })
        const statResult = await stat(result)
        // console.log(statResult)
        setFilestat(statResult)

        return {
            path: result,
            duration: reset_record ? 0 : audio_state.recordSecs,
        }
    }

    async function startRecord(
        onReachLimitRecording: (_: AudioPathDuration) => void
    ) {
        try {
            await checkAudioPermission()
        } catch (err: any) {
            DebugAlert(err.toString())
            return
        }

        const result = await audioRecorderPlayer.startRecorder(
            undefined,
            audioSet,
            true
        )
        audioRecorderPlayer.addRecordBackListener(async (e) => {
            setAudioState({
                ...audio_state,
                isRecording: true,
                recordSecs: e.currentPosition,
                recordTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.currentPosition)
                ),
            })
            if (e.currentPosition >= MAX_RECORDING_DURATION_MS) {
                const ap = await stopRecord()
                onReachLimitRecording(ap)
            }
            return
        })
        // console.log(`file path: `, result)
    }

    async function startPlay(uri?: string) {
        // console.log('onStartPlay', uri, '--]')
        const real_path = await audioRecorderPlayer.startPlayer(uri)
        const whoosh = new Sound(real_path, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                // console.log('failed to load the sound', error)
                return
            }

            audioRecorderPlayer.addPlayBackListener((e) => {
                setAudioState({
                    ...audio_state,
                    isPlaying: true,
                    recordSecs: whoosh.getDuration() * 1000,
                    currentPositionSec: e.currentPosition
                        ? e.currentPosition
                        : 0,
                    currentDurationSec: e.duration,
                    playTime: audioRecorderPlayer.mmssss(
                        Math.floor(e.currentPosition)
                    ),
                    duration: audioRecorderPlayer.mmssss(
                        Math.floor(e.duration)
                    ),
                })
                return
            })
        })
    }

    async function stopPlay() {
        // console.log('onStopPlay')
        audioRecorderPlayer.stopPlayer()
        audioRecorderPlayer.removePlayBackListener()
        setAudioState({
            ...audio_state,
            currentPositionSec: 0,
            isPlaying: false,
        })
    }

    function setDuration(duration: number) {
        setAudioState({
            ...audio_state,
            recordSecs: duration,
        })
    }

    async function pauseRecord() {
        try {
            // console.log('onPause')
            await audioRecorderPlayer.pauseRecorder()
        } catch (e) {
            // console.log('pauseRecord', e)
        }
    }

    async function onResume() {
        await audioRecorderPlayer.resumeRecorder()
    }

    useEffect(() => {
        // console.log(audio_state)
    }, [audio_state])

    useEffect(() => {
        setAudioState({
            recordSecs: 0,
            recordTime: '',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '',
            duration: '',
            isPlaying: false,
            isRecording: false,
            recordedAudioPath: '',
        })
    }, [])

    return {
        startRecord,
        stopRecord,
        startPlay,
        stopPlay,
        setDuration,
        pauseRecord,
        onResume,
        audio_state,
    }
}
