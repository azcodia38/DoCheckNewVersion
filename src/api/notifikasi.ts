import API, { OfflineFallback } from ".";
import { Notification, NOTIFICATION_TYPE } from "src/entity/Notification.entity";

export interface FollowerRequesAdditionalData {
  followerId: string
}

export interface FollowRequestAcceptedRequesAdditionalData {}

export interface GoalInvitationAdditionalData {
  goalId: string
}

export interface NoActionAdditionalData {}


export type NotificationAdditionalData = FollowerRequesAdditionalData | FollowRequestAcceptedRequesAdditionalData | GoalInvitationAdditionalData | NoActionAdditionalData

export interface NotificationData {
  type: NOTIFICATION_TYPE
  additionalData: NotificationAdditionalData
}

export interface NotificationBody {
  title: string
  body: string
}

export interface NotificationPayload {
  notification: NotificationBody
  data: NotificationData
}

export async function allNotifikasiAPI(Authorization: string, of?: OfflineFallback<Notification[]>): Promise<Notification[]> {
  try {
    const result: Notification[] = await API<Notification[]>('/me/notification', 'get', {}, { Authorization }, of);
    return result;
  } catch (err) {
    throw err;
  }
}
