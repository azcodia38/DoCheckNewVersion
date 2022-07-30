import { Goals } from "./Goals.entity"
export interface GoalCopies {
  id: string;
  sourceGoal: Goals;
  destinationGoal: Goals;
  createdAt?: Date;
  updatedAt?: Date;
}
