import { QuestionnaireAnswers } from './QuestionnaireAnswers.entity';

export enum QUESTIONNAIRE_TYPE {
  BUBBLE = 'Bubble',
  DROPDOWN = 'Dropdown'
}

export interface Questionnaires {
  id: string;
  description: string;
  question: string;
  order: number;
  type: QUESTIONNAIRE_TYPE;
  questionnaireAnswers: QuestionnaireAnswers[];
  createdAt?: Date;
  updatedAt?: Date;
}
