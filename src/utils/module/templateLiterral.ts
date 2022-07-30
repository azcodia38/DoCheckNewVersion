/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

type ShareGoalMessage = (
    username?: string,
    name?: string,
    userId?: string
) => string

export const shareGoalMessage: ShareGoalMessage = (username, name, userId) => {
    return `Hai! Teman kamu ${username ?? ''} udah berbagi goals "${
        name ?? ''
    }". Untuk cari tau goals selengkapnya, klik tautan ini yuk https://app.docheck.id/goal?ref=${userId}.`
}
