import { User } from "./User.entity";

export enum FEEDBACK_TYPE {
  BUGS = 'Bugs',
  IMPROVEMENT = 'Improvement',
  SUGGESTION = 'Suggestion',
  OTHERS = 'Others'
}

export enum FEEDBACK_STATUS {
  NEW = 'New',
  INVALID = 'Invalid',
  RESOLVED = 'Resolved'
}

export interface Feedback {
  id: string;
  user: User;
  title: string;
  type: FEEDBACK_TYPE;
  status: FEEDBACK_STATUS;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}
