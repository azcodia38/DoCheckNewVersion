import { User } from './User.entity'
import { GoalCategories } from './GoalCategories.entity'
import { Task } from './Task.entity'
import { GoalMembers } from './GoalMembers.entity'
import { PinnedTasks } from './PinnedTasks.entity'

export interface PromotionGoals {
    isPromoted?: boolean
    promotionUrl?: string
    ctaTitle?: string
    promotionalMessage?: string
    bannerUrl?: string
}

export interface Goals {
    id: string
    owner: User
    name: string
    description: string
    category: GoalCategories
    tasks: Task[]
    goalMembers: GoalMembers[]
    pinnedTasks: PinnedTasks[]
    image: string
    isPublic: boolean
    totalView: string
    isTemplate: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    totalCopy?: number
}
