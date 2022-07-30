import moment from 'moment';
import React from 'react';
import { Dimensions, FlatList, RefreshControlProps, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPlaceholderImage, theme } from 'src/utils/const';
import { GoalMembers } from 'src/entity/GoalMembers.entity';
import { Notification, NOTIFICATION_TYPE } from 'src/entity/Notification.entity';
import { TaskKosong } from 'src/pages/inside-pages/buat-goal-baru/styled';
import { ImageTidakAdaNotif } from '../icons/Icons';
import Loading from '../loading/Loading';
import Space from '../../src/components/atoms/space';
import Tipografi from '../../src/components/atoms/tipografi';
import WithPadding from 'src/components/atoms/withPadding';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { ImageAndDetailContainer, NotifikasiContainer, NotifikasiDetail, SmallButtonNotifikasi, UserNotifikasiImage } from './styled';


function NotifKosongView() {
  return (
    <TaskKosong style={{ height: viewportHeight * .6 }}>
      <ImageTidakAdaNotif />
      <Tipografi type={'title'} style={{ color: '#444145' }}>
        Whoops!
      </Tipografi>
      <Tipografi type={'small'} style={{ color: '#818487' }} center>
        {'Belum ada Notifikasi yang ditampilkan.'}
      </Tipografi>
    </TaskKosong>
  );
}

export interface NotifikasiData {
  id: string
  imageurl: string
  nama: string
  deskripsi: string
  timestamp: Date
  status: 'waiting' | 'done'
}

const padding_size = theme.left_right_padding; //Math.floor(theme.left_right_padding * 2 / 3);

type NotifRenderType = 'item' | 'title' | 'loading';

function getImageNotification(notification: Notification) {
  switch (notification.type) {
    case NOTIFICATION_TYPE.FOLLOWER:
    case NOTIFICATION_TYPE.GOALINVITATION:
      return notification.sourceUser?.profilePicture ? { uri: notification.sourceUser?.profilePicture } : getPlaceholderImage(notification.sourceUser?.gender);
    case NOTIFICATION_TYPE.TASK_EXPIRED:
      return require('src/assets/images/notif-task-due.png');
    case NOTIFICATION_TYPE.TASK_ALMOST_DUE:
      return require('src/assets/images/notif-task-almost-due.png');
    default: return '';
  }
}

function getTextNotification(notification: Notification) {
  switch (notification.type) {
    case NOTIFICATION_TYPE.FOLLOWER:
    case NOTIFICATION_TYPE.GOALINVITATION:
      return (
        <Text>
          <Tipografi type={'small'} style={{ fontWeight: 'bold' }}>
            { notification.sourceUser?.fullname ?? '' }
          </Tipografi>
          <Tipografi type={'small'}>
            { (() => {
              switch (notification.type) {
                case NOTIFICATION_TYPE.FOLLOWER:
                  return ' mulai mengikuti Anda.';
                case NOTIFICATION_TYPE.GOALINVITATION:
                  return ` ingin menambahkan anda di ${notification.sourceGoal?.name}`;
                default: return ''
              }
            })() }
          </Tipografi>
        </Text>
      );
    case NOTIFICATION_TYPE.TASK_ALMOST_DUE: return (
      <Text>
        <Tipografi type={'small'}>
          {'Cek '}
        </Tipografi>
        <Tipografi type={'small'} style={{ fontWeight: 'bold' }}>
          {'Task '}
        </Tipografi>
        <Tipografi type={'small'}>
          kamu sekarang sebelum jatuh tempo.
        </Tipografi>
      </Text>
      // 
    );
    case NOTIFICATION_TYPE.TASK_EXPIRED: return (
      <Text>
        <Tipografi type={'small'}>
          {'Ada '}
        </Tipografi>
        <Tipografi type={'small'} style={{ fontWeight: 'bold' }}>
          {'Task '}
        </Tipografi>
        <Tipografi type={'small'}>
          sudah melewati batas cek sekarang.
        </Tipografi>
      </Text>
      // Cek Task kamu sekarang sebelum jatuh tempo.
    );
  }
}

function getButtonNotification(notification: Notification, listFollowingID: string[], myUserID: string, loading: boolean, onPress?: () => void) {
  switch (notification.type) {
    case NOTIFICATION_TYPE.GOALINVITATION:
      const dikonfirmasi = notification.sourceGoal?.goalMembers
        .filter((gm: GoalMembers) => gm.isConfirmed)
        .map((gm: GoalMembers) => gm.user?.id ?? '')
        .includes(myUserID);
      return (
        <TouchableOpacity onPress={() => !loading && !dikonfirmasi && onPress && onPress()}>
          <Loading small loading={loading}>
            <SmallButtonNotifikasi 
              style={{
                borderColor: dikonfirmasi ? '#D1E8F8' : '#2294E7',
                backgroundColor: dikonfirmasi ? '#D1E8F8' : '#2294E7',
              }}>
                <Tipografi style={{ color: dikonfirmasi ? '#2294E7' : '#FFF' }} type={'small'}>
                  { dikonfirmasi ? 'Dikonfirmasi' : 'Konfirmasi' }
                </Tipografi>
            </SmallButtonNotifikasi>
          </Loading>
        </TouchableOpacity>
      )
    case NOTIFICATION_TYPE.FOLLOWER:
      const diikuti = listFollowingID.includes(notification.sourceUser.id);
      return (
        <TouchableOpacity onPress={() => !loading && onPress && onPress()}>
          <Loading small loading={loading}>
            <SmallButtonNotifikasi 
              style={{
                borderColor: diikuti ? '#D1E8F8' : '#2FCC71',
                backgroundColor: diikuti ? '#D1E8F8' : '#2FCC71'
              }}>
                <Tipografi style={{ color: '#FFF' }} type={'small'}>
                  { diikuti ? 'Diikuti' : 'Ikuti'}
                </Tipografi>
            </SmallButtonNotifikasi>
          </Loading>
        </TouchableOpacity>
      )
    default: return <></>
  }
}

interface CustomNotifItemProps {
  type: NotifRenderType
  title?: string
  myUserID?: string
  loading?: boolean
  onPress?(): void
  listFollowingID?: string[]
  data?: {
    data: Notification
    backgroundColor: string
    button: {
      text: string
      color: string
    }
  }
}

function CustomNotifItem(props: CustomNotifItemProps) {
  if (props.type === 'loading') {
    return (
      <NotifKosongView />
    )
  }

  if (props.title) {
    return (
      <WithPadding style={{ paddingLeft: padding_size, paddingRight: padding_size, marginTop: 12, paddingBottom: 12 }}>
        <Tipografi type={'label-bold'}>
          { props.title }
        </Tipografi>
      </WithPadding>
    );
  }

  return (
    <WithPadding style={{ paddingLeft: padding_size, paddingRight: padding_size }}>
      <NotifikasiContainer style={{ backgroundColor: props.data?.backgroundColor }}>
        <ImageAndDetailContainer>
          <UserNotifikasiImage source={getImageNotification(props.data?.data!)} />
          <NotifikasiDetail>
            { getTextNotification(props.data?.data!) }
            <Space value={4}/>
            <Tipografi type={'small'} style={{ color: '#888888' }}>
              { moment(props.data?.data.createdAt).format('DD MMM YYYY HH:mm') }
            </Tipografi>
          </NotifikasiDetail>
        </ImageAndDetailContainer>
        { getButtonNotification(props.data?.data!, props.listFollowingID ?? [], props.myUserID ?? '', props.loading ?? false, props.onPress) }
      </NotifikasiContainer>
    </WithPadding>
  );
}

interface GrupNotifikasiProps {
  loading: boolean
  myUserID?: string
  data: Notification[]
  onNotificationPress?(notification: Notification): void
  loadingIDs?: string[]
  listFollowingID?: string[]
  refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>>
}

export default function GrupNotifikasi(props: GrupNotifikasiProps) {
  function renderItem(x: { item: CustomNotifItemProps, index: number }) {
    return (
      <CustomNotifItem 
        {...x.item}
        myUserID={props.myUserID}
        onPress={() => props.onNotificationPress && props.onNotificationPress(x.item.data?.data!)}
        loading={(props.loadingIDs ?? []).includes(x.item.data?.data.id ?? '')}
        listFollowingID={props.listFollowingID} />
    );
  }

  const now_date = new Date();
  const notifikasi_baru = props.data.filter((n: Notification) => moment(n.createdAt).diff(now_date, 'week') < 1);
  const notifikasi_minggu_ini = props.data.filter((n: Notification) => moment(n.createdAt).diff(now_date, 'week') >= 1);
  const grouped_items: CustomNotifItemProps[] = [
    ...((notifikasi_baru.length + notifikasi_minggu_ini.length) === 0 && !props.loading ? [{
      type: 'loading' as NotifRenderType,
      title: ''
    }] : []),
    ...(notifikasi_baru.length > 0 && !props.loading ? [{
      type: 'title' as NotifRenderType,
      title: 'Baru'
    }, ...notifikasi_baru.map((x) => ({
      type: 'item' as NotifRenderType,
      data: {
        data: x,
        backgroundColor: '#D9F6E5',
        button: {
          text: 'Done',
          color: theme.main_color
        },
      }
    }))] : []),
    ...(notifikasi_minggu_ini.length > 0 && !props.loading ? [{
      type: 'title' as NotifRenderType,
      title: 'Minggu ini'
    }, ...notifikasi_minggu_ini.map((x) => ({
      type: 'item' as NotifRenderType,
      data: {
        data: x,
        backgroundColor: '#D9F6E5',
        button: {
          text: 'Done',
          color: theme.main_color
        },
      }
    }))] : []),
    {
      type: 'title',
      title: ' '
    },
  ]

  return (
    <FlatList
      refreshControl={props.refreshControl}
      style={{ height: '100%', width: '100%' }}
      data={grouped_items}
      renderItem={renderItem}
      keyExtractor={c => c.data?.data.id ?? Math.random().toFixed(9)} />
  );
}
