import { Goals, PromotionGoals } from "../../../entity/Goals.entity";

export interface GoalPageParams {
  id: string
  readonly?: boolean
}

export interface PredefinedGoalPageParams {
  goal: Goals & PromotionGoals
}
