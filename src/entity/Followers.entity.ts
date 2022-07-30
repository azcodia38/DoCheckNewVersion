import { User } from './User.entity'

export interface Followers {
  id: string;
  sourceUser: User;
  followingUser: User;
  isConfirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
