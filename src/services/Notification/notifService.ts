import { Task } from 'src/entity/Task.entity'
import { toNumber, uniqueId } from 'lodash'
import moment from 'moment'
import PushNotification, { Importance } from 'react-native-push-notification'
import NotificationHandler from 'src/utils/module/notificationHandler'
import { NotificationTask } from 'store/types'
import { filterIDtoNumber } from 'src/utils'

export default class NotifService {
    lastId: string | number
    lastChannelCounter

    constructor(onRegister: any, onNotification: any) {
        this.lastId = 0
        this.lastChannelCounter = 0

        this.createDefaultChannels()

        NotificationHandler.attachRegister(onRegister)
        NotificationHandler.attachNotification(onNotification)

        // Clear badge number at start
        PushNotification.getApplicationIconBadgeNumber(function (number) {
            if (number > 0) {
                PushNotification.setApplicationIconBadgeNumber(0)
            }
        })

        PushNotification.getChannels(function (channels) {
            // console.log(channels)
        })
    }

    createDefaultChannels() {
        PushNotification.createChannel(
            {
                channelId: 'default-channel-id', // (required)
                channelName: `Default channel`, // (required)
                channelDescription: 'A default channel', // (optional) default: undefined.
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => {}
            // console.log(
            //     `createChannel 'default-channel-id' returned '${created}'`
            // ) // (optional) callback returns whether the channel was created, false means it already existed.
        )
        PushNotification.createChannel(
            {
                channelId: 'sound-channel-id', // (required)
                channelName: `Sound channel`, // (required)
                channelDescription: 'A sound channel', // (optional) default: undefined.
                soundName: 'sample.mp3', // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => {}
            // console.log(
            //     `createChannel 'sound-channel-id' returned '${created}'`
            // ) // (optional) callback returns whether the channel was created, false means it already existed.
        )
    }

    createOrUpdateChannel() {
        this.lastChannelCounter++
        PushNotification.createChannel(
            {
                channelId: 'custom-channel-id', // (required)
                channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
                channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
                soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        )
    }

    popInitialNotification() {
        PushNotification.popInitialNotification(
            (notification) => {}
            // console.log('InitialNotication:', notification)
        )
    }

    localNotif(soundName?: any) {
        this.lastId = toNumber(this.lastId) + 1
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
            ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText:
                'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            subText: 'This is a subText', // (optional) default: none
            color: 'red', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            category: '', // (optional) default: empty string
            // subtitle: 'My Notification Subtitle', // (optional) smaller title below notification title

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: 'Local Notification', // (optional)
            message: 'My Notification Message', // (required)
            userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: !!soundName, // (optional) default: true
            soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        })
    }

    checkChannel(channelId: string) {
        PushNotification.channelExists(channelId, function (exists) {
            console.log('checkChannel', exists) // true/false
        })
    }

    getTask() {
        PushNotification.getScheduledLocalNotifications(
            (list) => {}
            // console.log(list)
        )
    }

    scheduleNotif(
        username: string,
        taskId: string,
        date: Date,
        taskName: string,
        taskTime: string,
        soundName?: any
    ) {
        // this.lastId++
        PushNotification.getScheduledLocalNotifications((list) => {
            if (
                !list.find(
                    (notificatonList) =>
                        notificatonList.data['taskId'] == taskId
                )
            ) {
                PushNotification.localNotificationSchedule({
                    // date: new Date(Date.now() + 5 * 1000), // in 30 secs
                    date,
                    /* Android Only Properties */
                    channelId: soundName
                        ? 'sound-channel-id'
                        : 'default-channel-id',
                    ticker: 'My Notification Ticker', // (optional)
                    autoCancel: true, // (optional) default: true
                    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                    smallIcon: 'ic_small_icon', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                    bigText: `${taskName}<br/>${taskTime} WIB`, // (optional) default: "message" prop
                    // subText: 'Sekerung', // (optional) default: none
                    // color: '#2FCC71', // (optional) default: system default
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    // tag: 'some_tag', // (optional) add tag to message
                    // group: 'group', // (optional) add group to message
                    // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
                    // ongoing: false, // (optional) set whether this is an "ongoing" notification
                    actions: ['Selesaikan', 'Batal'], // (Android only) See the doc for notification actions to know more
                    invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

                    // when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
                    // usesChronometer: true, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
                    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

                    /* iOS only properties */
                    category: '', // (optional) default: empty string

                    /* iOS and Android properties */
                    id: filterIDtoNumber(taskId), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    title: `${username}, jangan lupa task kamu! 🔔`, // (optional)
                    message: `${taskName} | ${taskTime} WIB
                    `, // (required)
                    userInfo: { sceen: 'home', taskId }, // (optional) default: {} (using null throws a JSON value '<null>' error)
                    playSound: !!soundName, // (optional) default: true
                    soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                    number: uniqueId(), // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                })
            }
        })
    }

    havingYesAction(): boolean {
        return true
    }

    yesAction(
        goalId: string,
        taskId: string
    ): { goalId: string; taskId: string } {
        return {
            goalId,
            taskId,
        }
    }

    checkPermission(cbk: any) {
        return PushNotification.checkPermissions(cbk)
    }

    requestPermissions() {
        return PushNotification.requestPermissions()
    }

    cleanLocalNotification() {
        PushNotification.getScheduledLocalNotifications((list) => {
            for (const task of list) {
                const dueDate = moment(task.date)
                const now = moment(new Date())

                if (dueDate.diff(now) <= 0)
                    PushNotification.cancelLocalNotification(task.id)
            }
        })
    }

    /**
     * Anticipate if completeBy is undefined or defined
     */
    cleanCompleteBy(tasks: Task[] | NotificationTask[]) {
        PushNotification.getScheduledLocalNotifications((lists) => {
            for (const task of tasks) {
                if (task.completeBy) {
                    // if this has complete by
                    // please delete the localNotif
                    const getLocationNotification = lists.find(
                        (list) => list.data.taskId == task.id
                    )
                    if (getLocationNotification)
                        PushNotification.cancelLocalNotification(
                            getLocationNotification?.id
                        )
                }
            }
        })
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications()
    }

    cancelNotification(key: string) {
        PushNotification.getScheduledLocalNotifications((lists) => {
            const foundTask = lists.find((list) => list.data.taskId == key)
            if (foundTask)
                PushNotification.cancelLocalNotification(foundTask.id)
        })
    }

    updateNotification(key: string, callback: any) {
        PushNotification.getScheduledLocalNotifications((lists) => {
            const foundTask = lists.find((list) => list.data.taskId == key)
            if (foundTask) {
                PushNotification.cancelLocalNotification(foundTask.id)
                callback()
            }
        })
    }

    abandonPermissions() {
        PushNotification.abandonPermissions()
    }

    getScheduledLocalNotifications(callback: any) {
        PushNotification.getScheduledLocalNotifications(callback)
    }

    getDeliveredNotifications(callback: any) {
        PushNotification.getDeliveredNotifications(callback)
    }
}
