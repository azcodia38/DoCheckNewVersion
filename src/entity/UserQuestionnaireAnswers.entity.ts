import { User } from "./User.entity"
import { Questionnaires } from "./Questionnaires.entity"
import { QuestionnaireAnswers } from './QuestionnaireAnswers.entity';
export interface UserQuestionnaireAnswers {
  id: string;
  user: User;
  questionnaire: Questionnaires;
  answer: QuestionnaireAnswers;
  createdAt?: Date;
  updatedAt?: Date;
}
