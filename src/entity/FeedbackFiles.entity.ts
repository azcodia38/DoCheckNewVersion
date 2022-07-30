import { Feedback } from "./Feedback.entity";

export interface FeedbackFiles {
  id: string;
  feedback: Feedback;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
