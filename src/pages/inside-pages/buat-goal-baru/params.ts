import { Goals } from "../../../entity/Goals.entity";

export interface BuatGoalBaruPageParams {
  mode?: 'edit' | 'new'
  existing_goal?: Goals
}
