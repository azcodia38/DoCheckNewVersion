/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */


// @helpers
import { TabSwitchHeaderType } from 'src/pages/inside-pages/home/types'
import { BottomNavType, DailyTaskPropertyType } from '.'
import { TEMPLATE_GOALS } from '../lang'

export const DEFAULT_USERNAME = 'DoCheckers'

export const DAILY_TASK_PROPERTY: DailyTaskPropertyType[] = [
    {
        label: 'Terlewat',
        value: 'terlewat',
    },
    {
        label: 'Hari ini',
        value: 'hari-ini',
    },
    {
        label: 'Besok',
        value: 'besok',
    },
    {
        label: 'Minggu ini',
        value: 'minggu-ini',
    },
    {
        label: 'Minggu depan',
        value: 'minggu-depan',
    },
]
export const MAX_TASK_SECTION_LENGTH: number = 5
export const ACTIVE_TAB: Record<string, TabSwitchHeaderType> = {
    FIRST_TAB: 'saya',
    SECOND_TAB: 'grup',
}

export const MY_GOAL_TAB_PROPERTY = [
    {
        label: 'Proses',
        value: 'proses',
    },
    {
        label: 'Selesai',
        value: 'selesai',
    },
]

export const EMPTY_SPACES = ' '
export const HOMEBAR_KEY_TYPE: BottomNavType[] = [
    'beranda',
    'cari-teman',
    'notifikasi',
    'akun',
]

export const TEMPLATES_TAB = [
    {
        label: TEMPLATE_GOALS.label.RECOMMENDATION,
        value: 'recommendation',
    },
    {
        label: TEMPLATE_GOALS.label.FOLLOWING,
        value: 'following',
    },
    {
        label: TEMPLATE_GOALS.label.RELEVANCY,
        value: 'relevancy',
    },
    {
        label: TEMPLATE_GOALS.label.ALL,
        value: 'all',
    },
]

export const ROUTE_PAGE = {
    GOAL: 'Goal',
    GOALS: 'Goals',
    DAILY_TASK: 'DailyTask',
    PREDEFINED_GOAL: 'PredefinedGoal',
    ADS_GOAL: 'AdsGoalsPage',
    PREDEFINED_GOALS: 'PredefinedGoals',
}

export const accessibilitylabels = {
    // outside pages
    intro: 'btnInto',
    skipIntro: "btnSkipIntro",
    backIntro: "backIntro",
    // Login & Register
    login: "btnLogin",
    sandi: "lupaSandi",
    password: "password",
    email: "email",
    masukGoogle:  "masukGoogle",
    masukFacebook: "masukFacebook",
    reportError: "reportError",
    btnDafttar: "btnDafttar",

    // lupa sandi
    emailLupaSandi : "emailLupaSandi",
    btnLupaSandi : "btnLupaSandi",
    btnPopupLupaSandi : "btnPopupLupaSandi",

    // report pages
    emailReport : "emailReport",
    emailDesc : "emailDesc",
    btnKirimDesc : "btnKirimDesc",
    btnPopUpBatalDesc : "btnPopUpBatalDesc",
    btnPopUpKirimDesc : "btnPopUpKirimDesc",

    // Register
    namaDaftar : "namaDaftar",
    usernameDaftar : "usernameDaftar",
    emailDaftar : "emailDaftar",
    jlakiLaki : "jlakiLaki",
    jPerempuan : "jPerempuan",
    tLahir : "tLahir",
    tLahir2 : "tLahir2",
    kataSandiDaftar : "kataSandiDaftar",
    konfirKataSandiDaftar : "konfirKataSandiDaftar",
    kodeRefferal : "kodeRefferal",
    setujuSyarat : "setujuSyarat",
    termsAndCondition : "termsAndCondition",
    privacyAndTerms : "privacyAndTerms",
    sendBtnDaftar : "sendBtnDaftar",
    btnBackToLogin : "btnBackToLogin",

    //Goal
    makeGoal: "makeGoal",
    textJudulGoal: "textJudulGoal",
    textDescGoal: "textDescGoal",
    switchPublik: "switchPublik",
    tambahAnggota: "tambahAnggota",
    tambahTask: "tambahTask",


    //popUpAnggota
    formSearch : "formSearch",
    onRemoveUser: "onRemoveUser",
    onAddUser: "onAddUser",
    onCancel: "onCancel",
    onCreateNewTask: "onCreateNewTask",

    judulTask: "judulTask",
    btnDate: "btnDate",
    btnDate2: "btnDate2",
    btnDate3: "btnDate3",
    reminderDaily: "reminderDaily",
    reminderDaily2: "reminderDaily2",
    formPeopleInput: "formPeopleInput",
    linkTask: "linkTask",
    btnSimpanTask: "btnSimpanTask",
    btnSimpanGoal: "btnSimpanGoal"

}
