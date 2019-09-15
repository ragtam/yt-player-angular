import { StateType } from './state-type';

export interface StateChange {
    type: StateType;
    payload?: string;
}
