import {AuthActionsEnum, SetAuthAction, SetDarkTheme, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import AuthService from "../../../services/AuthService";
import {AuthResponse} from "../../../models/response/AuthResponse";
import {API_URL} from "../../../http";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setDarkTheme: (payload: boolean): SetDarkTheme => ({type: AuthActionsEnum.SET_DARK_THEME, payload: payload}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload: payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: payload}),
    login: (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try {
            const response = await AuthService.login(email, password);
            if (!response) {
                dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
            } else {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                dispatch(AuthActionCreators.setError(''));
                dispatch(AuthActionCreators.setUser(response.data.user));
                dispatch(AuthActionCreators.setIsAuth(true));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
        }
    },
    registration: (email: string, password: string, name: string, surname: string, patronymic: string, gender: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try{
            const response = await AuthService.registration(email, password, name, surname, patronymic, gender);
            if (!response){
                dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
            }
            else {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                dispatch(AuthActionCreators.setIsAuth(true));
                dispatch(AuthActionCreators.setUser(response.data.user));
                dispatch(AuthActionCreators.setError(''));
            }

        } catch (e){
            dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
            await AuthService.logout();
            localStorage.removeItem('token');
             localStorage.removeItem('refreshToken');
            dispatch(AuthActionCreators.setIsAuth(false));
            dispatch(AuthActionCreators.setUser({} as IUser));

    },
    checkAuth: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try{
            const refreshToken = localStorage.getItem('refreshToken');
            // const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, {refreshToken});
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(AuthActionCreators.setUser(response.data.user));
            dispatch(AuthActionCreators.setIsAuth(true));
        } catch (e){
            dispatch(AuthActionCreators.setError('Произошла ошибка при проверка авторизации'));
        }
    },
    updateUser: (email: string, name: string, surname: string, patronymic: string, gender: string) => async (dispatch: AppDispatch) => {
        try{
            const response = await AuthService.updateUserInformation(email, name, surname, patronymic, gender);
            if (response){
                dispatch(AuthActionCreators.setUser(response.data.user));
            }
        } catch (e){
            dispatch(AuthActionCreators.setError('Произошла ошибка при проверка авторизации'));
        }
    },
}