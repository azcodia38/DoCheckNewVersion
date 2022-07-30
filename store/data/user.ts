import { UserLoginData } from "../types";

const initial_state: UserLoginData = {
  user: {
    id: ''
  } as any,
  access_token: ''
}

enum UserActionType {
  SET_USER = "SET_USER",
  REMOVE_USER = "REMOVE_USER"
}

interface UserActionData {
  type: UserActionType
  data: any
}

export function userReducer(state: UserLoginData = initial_state, action: UserActionData): UserLoginData {
  switch (action.type) {
    case UserActionType.SET_USER: 
      return action.data;
    case UserActionType.REMOVE_USER: 
      return initial_state;
    default:
      return state;
  }
}

export function setUserLoginData(user_status: UserLoginData): UserActionData {
  return {
    type: UserActionType.SET_USER,
    data: user_status
  }
}

export function removeUserLoginData(): UserActionData {
  return {
    type: UserActionType.REMOVE_USER,
    data: null
  }
}
