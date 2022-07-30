import { User } from './User.entity';
import { Goals } from './Goals.entity';

export enum NOTIFICATION_TYPE {
  NOACTION = 'NoAction',
  FOLLOWER = "FOLLOWER",
  GOALINVITATION = 'GoalInvitation',
  TASK_ALMOST_DUE = 'TaskAlmostDue',
  TASK_EXPIRED = 'TaskExpired'
}

export interface Notification {
  id: string;
  user: User;
  sourceUser: User;
  sourceGoal: Goals;
  source_user_id: string
  source_goal_id: string
  type: NOTIFICATION_TYPE;
  extraData: string;
  createdAt?: Date;
  updatedAt?: Date;
}
