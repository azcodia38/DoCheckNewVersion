/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { ENDPOINT } from 'src/api'

const baseURL = ENDPOINT

export const serviceUrl = {
    baseURL: baseURL,
    singleGoal: '/me/goal',
    goal: (endpoint: string, goalId: string, taskId: string) =>
        `/me/goal/${goalId}/task/${taskId}/${endpoint}`,
    goals: '/me/goals',
    task: (goalId: string, taskId: string) =>
        `/me/goal/${goalId}/task/${taskId}`,
    tasks: (goalId: string) => `/me/goal/${goalId}/task`,
    singleTask: (goalId: string, taskId: string) =>
        `/me/goal/${goalId}/task/${taskId}`,
    pinnedGoals: '/me/pinned-goal',
    groupGoals: '/me/group-goals',
    deleteGoal: '/me/goals/delete',
    deleteAllGoal: '/me/delete-all-goal',
    deleteTask: '/me/delete-tasks',
    deleteAllTask: '/me/delete-all-tasks',
    pinGoal: (goalId: string) => `/me/goal/${goalId}/pin`,
    unpinGoal: (goalId: string) => `/me/goal/${goalId}/unpin`,
    anotherUserGoal: (userId: string) => `/user/${userId}/goals`,
    invitationGoalMember: (id: string) => `/goal/${id}/invitation-member`,
    removingMemberGoal: (id: string, memberId: string) =>
        `/goal/${id}/member/${memberId}`,
    trackingSessionStart: '/tracking/users/starts',
    trackingSesssionEnd: '/tracking/users/ends',
    goalsRecommendation: '/me/goals-recommendation',
    goalsPromotionsCTA: '/me/goals-promotions/count/cta'
}
