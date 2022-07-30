import { Questionnaires } from './Questionnaires.entity';
export interface ActiveQuestionnaires {
  id: string;
  questionnaire: Questionnaires;
  order: number
  deletedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
