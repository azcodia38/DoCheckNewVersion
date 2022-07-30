import { User } from "./User.entity";
import { Goals } from './Goals.entity';
export interface PinnedGoals {
  id: string;
  user?: User;
  goal: Goals;
  createdAt?: Date;
  updatedAt?: Date;
}
