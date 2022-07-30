import { User } from './User.entity'

export interface SuspendedReasons {
  id: string;
  user: User;
  reason: string;
  createdAt?: Date;
  updatedAt?: Date;
}
