import { User } from "../../../entity/User.entity";

export interface UserListPageParams {
  users: User[]
  title: string
}
