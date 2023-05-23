import $api from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {IEvent} from "../models/IEvent";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password})
    }
    static async registration(email: string, password: string, name: string, surname: string, patronymic: string, gender: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/registration', {email, password, name, surname, patronymic, gender})
    }
    static async updateUserInformation(email: string, name: string, surname: string, patronymic: string, gender: string){
        return $api.post<AuthResponse>('/update_user_information', {email, name, surname, patronymic, gender})
    }
    static async updateUserPassword(email: string, oldPassword: string, newPassword: string){
        return $api.post<AuthResponse>('/update_user_password', {email, oldPassword, newPassword})
    }
    static async logout(): Promise<void>{
        return $api.post('/logout')
    }
    static async createEvent(email: string, startDate: string, startTime: string,endDate: string, endTime: string,header:string, description: string){
        return $api.post<IEvent>('/event/create', {email, startDate, startTime,endDate, endTime,header, description})
    }

    static async getAllEvents(email: string){
        return $api.get<IEvent[]>(`/event/all/${email}`)
    }

    static async updateEvent(email: string, oldEvent: IEvent, newEvent: IEvent){
        return $api.post<IEvent[]>(`/event/update/${email}`, {oldEvent, newEvent})
    }

    static async deleteEvent(id: string){
        return $api.delete<IEvent[]>(`/event/deleteOne/${id}`)
    }
}