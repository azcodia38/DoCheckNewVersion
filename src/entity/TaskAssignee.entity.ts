import { Task } from "./Task.entity";
import { GoalMembers } from "./GoalMembers.entity";

export interface TaskAssignee {
  id: string;
  task?: Task;
  goalMember: GoalMembers;
  createdAt?: Date;
  updatedAt?: Date;
}
