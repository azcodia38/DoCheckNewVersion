import { ConnectionStatus } from "../types";

const initial_state: ConnectionStatus = {
  connected: true
}

enum ConnectionActionType {
  SET_CONNECTION = "SET_CONNECTION"
}

interface ConnectionActionData {
  type: ConnectionActionType
  data: boolean
}

export function connectionReducer(state: ConnectionStatus = initial_state, action: ConnectionActionData): ConnectionStatus {
  switch (action.type) {
    case ConnectionActionType.SET_CONNECTION: 
      return {
        connected: action.data
      };
    default:
      return state;
  }
}

export function setConnectionStatus(status: boolean): ConnectionActionData {
  return {
    type: ConnectionActionType.SET_CONNECTION,
    data: status
  }
}
