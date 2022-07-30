import { Questionnaires } from './Questionnaires.entity';
import { GoalCategories } from './GoalCategories.entity';

export interface QuestionnaireAnswers {
  id: string;
  questionnaire: Questionnaires;
  value: string;
  order: number;
  category: GoalCategories;
  createdAt?: Date;
  updatedAt?: Date;
}
