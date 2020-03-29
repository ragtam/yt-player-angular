import { StateChangeType } from "./state-change-type";

export interface StateChange {
  type: StateChangeType;
  payload?: any;
}
