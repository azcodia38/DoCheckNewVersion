import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { DebugAlert } from 'src/utils/alert';
import Space from '../../../components/atoms/space';
import WithPadding from '../../../components/atoms/withPadding';
import { NavProps } from 'src/utils/const';
import { checkAudioPermission, randomID } from 'src/utils';
import AudioRecorderPlayer, { OutputFormatAndroidType, AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import Tipografi from '../../../components/atoms/tipografi';
import { stat } from 'react-native-fs';
import notifee, { AndroidImportance, AndroidStyle, AndroidVisibility, EventType } from '@notifee/react-native';
import Button from 'src/components/atoms/button';

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
  AudioSamplingRateAndroid: 88200
};

const audioRecorderPlayer = new AudioRecorderPlayer();

// Page Props
export interface AudioTestPageProps extends NavProps {}

// Default Function
export default function AudioTestPage(props: AudioTestPageProps) {
  const [is_recording, setIsRecording] = useState<boolean>(false);
  const [is_playing, setIsPlaying] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    recordSecs: 0,
    recordTime: '',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '',
    duration: '',
  });
  const [filestat, setFilestat] = useState<any>({});

  async function onStartRecord() {
    try {
      await checkAudioPermission();
    } catch (err: any) {
      DebugAlert(err.toString());
      return;
    }

    const result = await audioRecorderPlayer.startRecorder(undefined, audioSet, true);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setState({
        ...state,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      setIsRecording(true);
      return;
    });
    // console.log(`file path: `, result);
  };

  async function onStopRecord() {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      ...state,
      recordSecs: 0,
    });
    setIsRecording(false);
    // console.log('result', result);
    const statResult = await stat(result);
    // console.log(statResult);
    setFilestat(statResult);
  };

  async function onStartPlay() {
    // console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    // console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setState({
        ...state,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      setIsPlaying(true);
      return;
    });
  };

  async function onStopPlay() {
    // console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
  };

  async function showNotification() {
    const channelId = await notifee.createChannel({
      id: 'custom-soundz',
      importance: AndroidImportance.HIGH,
      name: 'Default Channel',
      sound: 'sample'
    });
    await notifee.displayNotification({
      title: 'Contoh Notifikasi',
      body: 'Lorem ipsum dolor sit amet',
      android: {
        channelId,
        sound: 'sample',
        pressAction: {
          id: 'notifikasi-' + randomID(10)
        },
        style: {
          type: AndroidStyle.BIGTEXT, 
          text: 'Lorem ipsum dolor sit amet',
        },
      },
      data: {}
    }).catch(console.log);
  }

  return (
    <>
      <SafeAreaView>
        <WithPadding>
          <Space value={25} />
          { !is_recording && <Button onPress={onStartRecord}>
            Record
          </Button> }
          { is_recording && <Button onPress={onStopRecord}>
            Stop
          </Button> }
          <Space value={5} />
          <Tipografi>
            { state.recordSecs }
          </Tipografi>
          <Space value={5} />
          <Tipografi>
            { JSON.stringify(filestat, null, 2) }
          </Tipografi>
          <Space value={25} />
          { !is_playing && <Button onPress={onStartPlay}>
            Play
          </Button> }
          { is_playing && <Button onPress={onStopPlay}>
            Stop Play
          </Button> }
          <Space value={5} />
          <Tipografi>
            { state.currentDurationSec }
          </Tipografi>
          <Space value={15} />
          <Button onPress={showNotification}>
            Show Notification
          </Button>
        </WithPadding>
      </SafeAreaView>
    </>
  );
}
