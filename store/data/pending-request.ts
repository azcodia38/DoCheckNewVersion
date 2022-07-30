import { APIMethod, PendingRequest } from "src/api";
import { PendingRequestData } from "../types";
import { v4 as uuidv4 } from 'uuid';

const initial_state: PendingRequestData = {
  list: []
}

enum PendingRequestActionType {
  ADD_PENDING_REQUEST = "ADD_PENDING_REQUEST",
  REMOVE_PENDING_REQUEST = "REMOVE_PENDING_REQUEST"
}

interface PendingRequestActionData {
  type: PendingRequestActionType
  data: string | PendingRequest
}

export function pendingRequestReducer(state: PendingRequestData = initial_state, action: PendingRequestActionData): PendingRequestData {
  switch (action.type) {
    case PendingRequestActionType.ADD_PENDING_REQUEST: 
      return {
        list: [ ...state.list, action.data as PendingRequest ]
      }
    case PendingRequestActionType.REMOVE_PENDING_REQUEST: 
      return {
        list: state.list.filter((pr: PendingRequest) => pr.id !== action.data as string)
      }
    default:
      return state;
  }
}

export function addPendingRequestData(path: string, method: APIMethod, body: any, header: any): PendingRequestActionData {
  return {
    type: PendingRequestActionType.ADD_PENDING_REQUEST,
    data: {
      id: uuidv4().toString(),
      path,
      method,
      body,
      header
    }
  }
}

export function removePendingRequestData(pr_id: string): PendingRequestActionData {
  return {
    type: PendingRequestActionType.REMOVE_PENDING_REQUEST,
    data: pr_id
  }
}
