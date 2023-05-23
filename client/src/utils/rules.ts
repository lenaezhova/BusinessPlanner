import dayjs, {Dayjs} from "dayjs";
import {formateDate, getDateTime} from "./date";
import {IEvent} from "../models/IEvent";

export const rules = {
    required: (message: string = 'поле обязательно для заполнения') => ({required: true, message}),
    requerdWithDop: (isChanging?: boolean,message: string = 'поле обязательно для заполнения') => {
        if (isChanging) return ({required: true, message})
        return ({required: false, message})
    },
    isDateAfter: () => () => ({
        validator(_:any, value: Dayjs[]){
            if (!value)
                return Promise.resolve();
            const dateNow  = formateDate(dayjs().toDate());
            const datepickerForm  = formateDate(value[0].toDate());
            const datepickerTo  = formateDate(value[1].toDate());
             if ((dateNow === datepickerForm || value[0].isAfter(dayjs())) &&
                 ((dateNow === datepickerTo || value[1].isAfter(dayjs())) )){
                 return Promise.resolve();
             }
             return Promise.reject(new Error("нельзя создать событие на прошедшую дату"));
        }
    }),
    isNewDate: (events: IEvent[], type?: 'add' | 'change' | 'info' | 'delete', currentEvent?: IEvent ) => () => ({
        validator(_:any, value: Dayjs[]){
            if (!value)
                return Promise.resolve();
            const datepickerForm  = formateDate(value[0].toDate());
            const datepickerTo  = formateDate(value[1].toDate());
            const timepickerFrom = getDateTime(value[0].toDate())
            const timepickerTo = getDateTime(value[1].toDate())

            for (let i = 0; i < events.length; i++){
                if (events[i].startDate === datepickerForm && events[i].startTime === timepickerFrom ||
                    events[i].endDate === datepickerTo && events[i].endTime === timepickerTo) {
                    if (!(type === 'change' && events[i] === currentEvent)){
                        return Promise.reject(new Error("на одной из дат уже есть событие"));
                    }
                }
            }

            return Promise.resolve();
        }
    }),
}