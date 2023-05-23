import {IEvent} from "../../../models/IEvent";

export interface EventState{
    events:IEvent[];
    isEventLoading:boolean;
    errorEvent: string;
}

export enum EventActionEnum{
    SET_ERROR_EVENT="SET_ERROR_EVENT",
    ADD_EVENT="ADD_EVENT",
    SET_EVENTS = "SET_EVENTS",
    SET_IS_EVENT_LOADING = "SET_IS_EVENT_LOADING",
    DELETE_EVENT="DELETE_EVENT",
    UPDATE_EVENT="UPDATE_EVENT"
}
export interface UpdateEventAction{
    type:EventActionEnum.UPDATE_EVENT;
    payload:
        {
            oldEvent: IEvent,
            newEvent: IEvent
        }
}
export interface DeleteEventAction{
    type:EventActionEnum.DELETE_EVENT;
    payload: IEvent
}
export interface SetEventsAction{
    type:EventActionEnum.SET_EVENTS;
    payload:IEvent[]
}
export interface AddEventAction{
    type:EventActionEnum.ADD_EVENT;
    payload:IEvent
}
export interface SetIsEventLoadingAction{
    type:EventActionEnum.SET_IS_EVENT_LOADING;
    payload:boolean
}
export interface SetErrorEventAction{
    type:EventActionEnum.SET_ERROR_EVENT;
    payload:string
}

export type EventAction =
    SetEventsAction |
    SetIsEventLoadingAction |
    AddEventAction |
    SetErrorEventAction |
    DeleteEventAction |
    UpdateEventAction