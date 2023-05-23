import React from "react";
import Auth from "../pages/Auth";
import Event from "../pages/Event";
import Information from "../pages/Information";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames{
    LOGIN = '/login',
    EVENT = '/',
    REGISTRATION = '/registration',
    INFORMATION = '/information'
}

export const publicRoutes : IRoute[] = [
    {
        path: RouteNames.LOGIN,
        component: Auth
    },
    {
        path: RouteNames.REGISTRATION,
        component: Auth
    },
]

export const privateRoutes : IRoute[] = [
    {
        path: RouteNames.EVENT,
        component: Event
    },
    {
        path: RouteNames.INFORMATION,
        component: Information
    }
]