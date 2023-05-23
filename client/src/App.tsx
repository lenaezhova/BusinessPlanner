import React, {FC, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {ConfigProvider, Layout} from "antd";
import "./App.css"
import {useTypedSelector} from "./hooks/useTypedSelector";
import {AuthActionCreators} from "./store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import { theme } from "antd";
const { defaultAlgorithm, darkAlgorithm } = theme;
const App : FC = () => {
    const {isLoading, darkTheme} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch();
    const body = document.getElementById('body');
    useEffect(() => {
        if (localStorage.getItem('token')) {
            AuthActionCreators.checkAuth()(dispatch)
        }
        const darkTheme = localStorage.getItem('darkTheme');
        dispatch(AuthActionCreators.setDarkTheme(JSON.parse(darkTheme || JSON.stringify(false))));
    }, [])

    useEffect(() => {
        if (body) {
            if (darkTheme) {
                body.classList.add("backGroundColorBlack");
            } else{
                body.classList.add("backGroundColorWhite");
            }
        }
    }, [darkTheme])

    return (
        <ConfigProvider
            theme={{
                algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Layout>
                {isLoading
                    ?
                        <div
                            style={{
                                width: '100vh',
                                height: '100vh'
                            }}
                        >
                        </div>
                    :
                    <>
                        <Navbar/>
                        <Layout.Content>
                            <AppRouter/>
                        </Layout.Content>
                    </>
                }
            </Layout>
        </ConfigProvider>

    );
};

export default App;