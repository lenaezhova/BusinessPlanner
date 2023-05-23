import React, {FC, useState} from 'react';
import {Button, Form, theme} from "antd";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {NavLink, useLocation} from "react-router-dom";
import {RouteNames} from "../router";
import LoginList from "./LoginList";
import RegistrationList from "./RegistrationList";
import {useTypedSelector} from "../hooks/useTypedSelector";
import ErrorMessage from "./ErrorMessage";

export type infoState = {
    email:  string,
    password:   string,
    name: string,
    surname: string,
    gender: string,
    patronymic: string
}

const AuthForm: FC = () => {
    const location = useLocation();
    const isLogin = location.pathname === RouteNames.LOGIN;
    const [info, setInfo] = useState<infoState>({
        patronymic: '',
        gender: ''
    } as infoState)
    const dispatch = useDispatch();
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const {token: {colorTextBase}} = theme.useToken();
    const submit = () => {
        try {
                isLogin
                    ?
                    AuthActionCreators.login(info.email, info.password)(dispatch)
                    :
                    AuthActionCreators.registration(info.email, info.password, info.name, info.surname, info.patronymic, info.gender)(dispatch)
        } catch (e) {
        }
    }

    return (
        <div
            className="login__box"
        >
                <h2 className="login__box__header">
                    <div
                        style={{color: colorTextBase}}
                    >
                    {isLogin
                        ? 'Авторизация'
                        : 'Регистрация'
                    }
                    </div>
                </h2>
            <Form
                onFinish={submit}
            >
                <ErrorMessage
                    style ={{color:'red'}}
                    isError={error}
                    errorMessage={error}
                />
                {isLogin
                ?
                    <LoginList
                        info={info}
                        setInfo={setInfo}
                    />
                :
                    <RegistrationList
                        info={info}
                        setInfo={setInfo}
                    />
                }
                <Form.Item>
                    <div className="login__box__content__item">
                        {isLogin ? (
                            <div>
                                Нет аккаунта?{" "}
                                <NavLink to={RouteNames.REGISTRATION}>Зарегиструйтесь!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт?{" "}
                                <NavLink to={RouteNames.LOGIN}>Войдите!</NavLink>
                            </div>
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            {isLogin
                                ? 'Войти'
                                : 'Регистрация'
                            }
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AuthForm;