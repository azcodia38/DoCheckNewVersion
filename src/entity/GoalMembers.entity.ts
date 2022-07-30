import { User } from "./User.entity";
import { Goals } from "./Goals.entity";
export interface GoalMembers {
  id: string;
  user_id: string;
  user?: User;
  goal?: Goals;
  isConfirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
