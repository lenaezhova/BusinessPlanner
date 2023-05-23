import {IEvent} from "../../../models/IEvent";
import {
    AddEventAction, DeleteEventAction,
    EventActionEnum,
    SetErrorEventAction,
    SetEventsAction,
    SetIsEventLoadingAction, UpdateEventAction
} from "./types";
import {AppDispatch} from "../../index";
import AuthService from "../../../services/AuthService";

export const EventActionCreators = {
    addEvent: (payload: IEvent): AddEventAction => ({type: EventActionEnum.ADD_EVENT, payload}),
    delEvent: (payload: IEvent): DeleteEventAction => ({type: EventActionEnum.DELETE_EVENT, payload}),
    updEvent: (payload: {
        oldEvent: IEvent,
        newEvent: IEvent
    }): UpdateEventAction => ({type: EventActionEnum.UPDATE_EVENT, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    setErrorEvent: (payload: string): SetErrorEventAction => ({type: EventActionEnum.SET_ERROR_EVENT, payload}),
    setIsEventLoading: (payload: boolean): SetIsEventLoadingAction => ({
        type: EventActionEnum.SET_IS_EVENT_LOADING,
        payload: payload
    }),
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        const {email, startDate, startTime, endDate, endTime, description, header} = event;
        try {
            const response = await AuthService.createEvent(email, startDate, startTime, endDate, endTime, header, description);
            if (!response) {
                await dispatch(EventActionCreators.setErrorEvent('Произошла ошибка при создании события'))
            } else {
                await dispatch(EventActionCreators.addEvent(response.data));
            }
        } catch (e) {
        }
    },
    fetchEvents: (email: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setIsEventLoading(true))
            const response = await AuthService.getAllEvents(email);
            if (response) {
                dispatch(EventActionCreators.setEvents(Object.values(response.data)));
                dispatch(EventActionCreators.setIsEventLoading(false));
            }
        } catch (e) {
        }
    },
    deleteEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.deleteEvent(event._id);
            if (response) {
                dispatch(EventActionCreators.delEvent(event));
            }
        } catch (e) {
        }
    },
    updateEvent: (email: string, oldEvent: IEvent, newEvent: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const response =  await AuthService.updateEvent(email, oldEvent, newEvent)
            if (response) {
                dispatch(EventActionCreators.updEvent({oldEvent, newEvent}));
            }
        } catch (e) {
        }
    },
}