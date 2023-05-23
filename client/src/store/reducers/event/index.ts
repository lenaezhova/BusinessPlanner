import {EventAction, EventActionEnum, EventState} from "./types";


const initialState:EventState = {
    events: [],
    isEventLoading: false,
    errorEvent: '',
}

export default function EventReduser(state = initialState, action:EventAction):EventState{
    switch(action.type){
        case EventActionEnum.UPDATE_EVENT:
            return {...state, events: state.events.map(event => {
                    if (event._id === action.payload.oldEvent._id){
                        return action.payload.newEvent
                    }
                    return event
                })};
        case EventActionEnum.DELETE_EVENT:
            return{...state, events: state.events.filter((ev) => ev._id !== action.payload._id)}
        case EventActionEnum.SET_ERROR_EVENT:
            return{...state, errorEvent: action.payload}
        case EventActionEnum.ADD_EVENT:
            return{...state, events: [...state.events, action.payload]}
        case EventActionEnum.SET_EVENTS:
            return{...state, events: action.payload}
        case EventActionEnum.SET_IS_EVENT_LOADING:
            return{...state, isEventLoading: action.payload}
        default:
            return state;
    }
}