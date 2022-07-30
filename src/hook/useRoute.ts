import { StackNavigationOptions } from '@react-navigation/stack'
import { uniqueId } from 'lodash'

import LoginPage from 'src/pages/outside-pages/login/LoginPage'
import FirstPage from 'src/pages/outside-pages/FirstPage'
import RegisterPage from 'src/pages/outside-pages/register/RegisterPage'
import LupaKataSandiPage from 'src/pages/outside-pages/lupa-kata-sandi/LupaKataSandiPage'
import KuisionerPage from 'src/pages/inside-pages/kuisioner/KuisionerPage'
import HomePage from 'src/pages/inside-pages/home/HomePage'
import GoalPage from 'src/pages/inside-pages/goal/GoalPage'
import TaskPage from 'src/pages/inside-pages/task/TaskPage'
import BuatGoalBaruPage from 'src/pages/inside-pages/buat-goal-baru/BuatGoalBaruPage'
import PredefinedGoalsPage from 'src/pages/inside-pages/predefined-goals/PredefinedGoalsPage'
import AdsGoalsPage from "src/pages/inside-pages/adsGoal"
import PredefinedGoalPage from 'src/pages/inside-pages/goal/PredefinedGoalPage'
import GoalsPage from 'src/pages/inside-pages/goals/GoalsPage'
import DailyTaskPage from 'src/pages/inside-pages/daily-task/DailyTaskPage'
import OtherProfilUserPage from 'src/pages/inside-pages/other-profil-user/OtherProfilUserPage'
import EditProfilePage from 'src/pages/inside-pages/akun/edit-profile/EditProfilePage'
import ValidasiPasswordPage from 'src/pages/inside-pages/akun/validasi-password/ValidasiPasswordPage'
import EditEmailPage from 'src/pages/inside-pages/akun/edit-email/EditEmailPage'
import EditPasswordPage from 'src/pages/inside-pages/akun/edit-password/EditPasswordPage'
import UndangTemanPage from 'src/pages/inside-pages/akun/undang-teman/UndangTemanPage'
import WebViewPage from 'src/pages/webview/WebViewPage'
import UserListPage from 'src/pages/inside-pages/user-list/UserListPage'
import FeedbackPage from 'src/pages/inside-pages/feedback/FeedbackPage'
import ReportPage from 'src/pages/outside-pages/report/ReportPage'
import OtherUserGoalListPage from 'src/pages/inside-pages/other-profil-user/OtherUserGoalListPage'
import RekomendasiKuisionerPage from 'src/pages/inside-pages/rekomendasi-kuisioner/RekomendasiKuisionerPage'
import AudioTestPage from 'src/pages/outside-pages/audio-test/AudioTestPage'

type RouteType = {
    id: string
    name: string
    component: React.ComponentType<any>
    options?: StackNavigationOptions
}[]

export default function useRoute() {
    const route: RouteType = [
        {
            id: uniqueId(),
            name: 'First',
            component: FirstPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Login',
            component: LoginPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Register',
            component: RegisterPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'LupaKataSandi',
            component: LupaKataSandiPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Kuisioner',
            component: KuisionerPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Home',
            component: HomePage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Goal',
            component: GoalPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Task',
            component: TaskPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'BuatGoalBaru',
            component: BuatGoalBaruPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'PredefinedGoal',
            component: PredefinedGoalPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'AdsGoalsPage',
            component: AdsGoalsPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'PredefinedGoals',
            component: PredefinedGoalsPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Goals',
            component: GoalsPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'DailyTask',
            component: DailyTaskPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'OtherProfilUser',
            component: OtherProfilUserPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'EditProfile',
            component: EditProfilePage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'ValidasiPassword',
            component: ValidasiPasswordPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'EditEmail',
            component: EditEmailPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'EditPassword',
            component: EditPasswordPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'UndangTeman',
            component: UndangTemanPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'WebView',
            component: WebViewPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'UserList',
            component: UserListPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Feedback',
            component: FeedbackPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'Report',
            component: ReportPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'OtherUserGoalList',
            component: OtherUserGoalListPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'RekomendasiKuisioner',
            component: RekomendasiKuisionerPage,
            options: { headerShown: false },
        },
        {
            id: uniqueId(),
            name: 'AudioTest',
            component: AudioTestPage,
            options: { headerShown: false },
        },
    ]

    return route
}
