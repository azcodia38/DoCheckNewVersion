import {
    DailyTaskType,
    TabSwitchHeaderType,
} from 'src/pages/inside-pages/home/types'
import { createContext } from 'react'
import { Alert } from 'react-native'
import Carousel from 'react-native-snap-carousel-v4'
import NotifService from 'src/services/Notification/notifService'
import { GoalsTabType } from 'src/utils/types'

interface DefaultContext {
    activeTab?: TabSwitchHeaderType
    dailyTaskTab?: DailyTaskType
    goalsTab?: GoalsTabType
    hasNotch?: boolean
    setGoalsTab?: (status: GoalsTabType) => void
    setActiveTab?: (status: TabSwitchHeaderType) => void
    setDailyTaskTab?: (status: DailyTaskType) => void
    setHasNotch?: (status: boolean) => void
    notifService?: NotifService
    goalSlider?: Carousel<any> | any
}

const defaultContext: DefaultContext = {
    dailyTaskTab: 'hari-ini',
    goalsTab: 'proses',
    activeTab: 'saya',
    setDailyTaskTab: (status) => undefined,
    hasNotch: false,
    setGoalsTab: (status) => undefined,
    setHasNotch: (status) => undefined,
    notifService: new NotifService(
        () => {},
        (notif: any) => {
            Alert.alert(notif.title, notif.message)
        }
    ),
    goalSlider: {},
}

const GlobalContext = createContext(defaultContext)

export default GlobalContext
