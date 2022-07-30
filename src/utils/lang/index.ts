import { DailyTaskType } from 'src/pages/inside-pages/home/types'

type CurrentlyModeType = 'Beta Mode' | 'Development Mode'

export const COPY_MESSAGE = 'Tautan disalin'
export const TASK_CATEGORY: Record<string, DailyTaskType> = {
    TOMORROW: 'besok',
    SKIPPED: 'terlewat',
    TODAY: 'hari-ini',
    WEEK: 'minggu-ini',
    NEXT_WEEK: 'minggu-depan',
}
export const EMPTY_DATA_TASK = {
    [TASK_CATEGORY.TOMORROW]: `Belum ada task untuk besok.\nKlik + untuk membuat taskmu`,
    [TASK_CATEGORY.SKIPPED]: `Tidak ada task yang terlewat`,
    [TASK_CATEGORY.TODAY]: `Belum ada task untuk hari ini.\nKlik + untuk membuat taskmu`,
    [TASK_CATEGORY.WEEK]: `Belum ada task untuk minggu ini.\nKlik + untuk membuat taskmu`,
    [TASK_CATEGORY.NEXT_WEEK]: `Belum ada task untuk minggu depan.\nKlik + untuk membuat taskmu`,
}

export const EMPTY_TASK = {
    OOPS: 'Whoops!',
    TASK_NOT_BEEN_CREATED: 'Belum ada task yang dibuat nih...',
    TEMPLATE_DETAIL_TASK: {
        TITLE: 'Tidak ada task',
        DESCRIPTION: 'Tidak ada task yang ditampilkan.',
    },
    DETAIL_TASK: {
        TITLE: 'Task Kamu Kosong :(',
        DESCRIPTION: 'Tambahkan task biar lebih produktif.',
    },
    OFFLINE: {
        TITLE: 'Yah, Koneksi Kamu Terputus :(',
        DESCRIPTION: `Pastikan wifi atau data seluler\ndihidupkan lalu coba lagi`,
    },
    RECOMMENDATION: {
        DESCRIPTION: 'Tidak ada rekomendasi yang ditampikan',
    },
    ONLINE: {
        TITLE: 'Hore, Kamu Kembali Terhubung.',
    },
}

export const TITLE_GOAL = {
    MY_GOAL: 'Goal Saya',
    GROUP_GOAL: 'Goal Grup',
}

export const TEMPLATE_GOALS = {
    title: 'Template Goals',
    placeholderSearch: 'Cari Template Goals',
    label: {
        RECOMMENDATION: 'Rekomendasi',
        FOLLOWING: 'Mengikuti',
        RELEVANCY: 'Relevansi',
        ALL: 'Semua',
    },
    ERROR_MESSAGE: {
        TITLE: 'Whoops!',
        DESCRIPTION: 'Tidak ada template goals yang ditampilkan',
        DESCRIPTION_RELEVANCY: 'Belum ada Relevansi yang ditampilkan',
    },
}

export const TITLE_GROUP = {
    DAILY_TASK: 'Daily Task',
    RECOMMENDATION: 'Rekomendasi',
}

export const CURRENTLY_MODE: CurrentlyModeType = 'Development Mode'
