import { Goals } from "src/entity/Goals.entity";
import { PinnedGoals } from "src/entity/PinnedGoals.entity";
import { GoalsData } from "../types";

const initial_state: GoalsData = {
  my_goals: [],
  my_group_goals: [],
  pinned_goals: []
}

export enum GoalsActionType {
  ADD_MY_GOALS = "ADD_MY_GOALS",
  SET_MY_GOALS = "SET_MY_GOALS",
  UPDATE_MY_GOALS = "UPDATE_MY_GOALS",
  DELETE_MY_GOAL = "DELETE_MY_GOAL",
  DELETE_SOME_MY_GOALS = "DELETE_SOME_MY_GOALS",
  ADD_MY_GROUP_GOALS = "ADD_MY_GROUP_GOALS",
  SET_MY_GROUP_GOALS = "SET_MY_GROUP_GOALS",
  UPDATE_MY_GROUP_GOALS = "UPDATE_MY_GROUP_GOALS",
  DELETE_MY_GROUP_GOAL = "DELETE_MY_GROUP_GOAL",
  DELETE_SOME_MY_GROUP_GOALS = "DELETE_SOME_MY_GROUP_GOALS",
  SET_PINNED_GOALS = "SET_PINNED_GOALS",
}

export interface GoalsActionData {
  type: GoalsActionType
  data: Goals | Goals[] | PinnedGoals[] | string[]
}

export function goalsReducer(state: GoalsData = initial_state, action: GoalsActionData): GoalsData {
  switch (action.type) {
    case GoalsActionType.ADD_MY_GOALS: 
      return {
        ...state,
        my_goals: [
          ...state.my_goals,
          action.data as Goals
        ]
      };
    case GoalsActionType.SET_MY_GOALS: 
      return {
        ...state,
        my_goals: action.data as Goals[]
      };
    case GoalsActionType.UPDATE_MY_GOALS: 
      return {
        ...state,
        my_goals: state.my_goals.map((g: Goals) => {
          if ((action.data as Goals).id === g.id) {
            return { ...(action.data as Goals) };
          }

          return g;
        })
      };
    case GoalsActionType.DELETE_MY_GOAL: 
      return {
        ...state,
        my_goals: state.my_goals.filter((g: Goals) => (action.data as Goals).id !== g.id)
      };
    case GoalsActionType.DELETE_SOME_MY_GOALS: 
      return {
        ...state,
        my_goals: state.my_goals.filter((g: Goals) => !(action.data as string[]).includes(g.id))
      };
    case GoalsActionType.ADD_MY_GROUP_GOALS: 
      return {
        ...state,
        my_group_goals: [
          action.data as Goals,
          ...state.my_group_goals,
        ]
      };
    case GoalsActionType.SET_MY_GROUP_GOALS: 
      return {
        ...state,
        my_group_goals: action.data as Goals[]
      };
    case GoalsActionType.UPDATE_MY_GROUP_GOALS: 
      return {
        ...state,
        my_group_goals: state.my_group_goals.map((g: Goals) => {
          if ((action.data as Goals).id === g.id) {
            return { ...(action.data as Goals) };
          }

          return g;
        })
      };
    case GoalsActionType.DELETE_MY_GROUP_GOAL: 
      return {
        ...state,
        my_group_goals: state.my_group_goals.filter((g: Goals) => (action.data as Goals).id !== g.id)
      };
    case GoalsActionType.DELETE_SOME_MY_GROUP_GOALS: 
      return {
        ...state,
        my_group_goals: state.my_group_goals.filter((g: Goals) => !(action.data as string[]).includes(g.id))
      };
    case GoalsActionType.SET_PINNED_GOALS: 
      return {
        ...state,
        pinned_goals: action.data as PinnedGoals[]
      };
    default:
      return state;
  }
}
