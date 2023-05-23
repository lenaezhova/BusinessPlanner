import React, {FC} from 'react';
import {Button, Layout, Menu, Row, theme} from "antd";
import { UserOutlined } from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom'
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {MenuItemType} from "antd/es/menu/hooks/useItems";


const Navbar : FC = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuth} = useTypedSelector(state => state.auth)
    const {isLoading} = useTypedSelector(state => state.auth)
    const {user} = useTypedSelector(state => state.auth)
    const {token: {colorBgContainer}} = theme.useToken();

    return (
        <Layout.Header style={{padding: '0'}}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '30px',
                    justifyContent: 'space-between',
                    background: 'dark'
                }}
                key={'calendar'}
            >

                <div
                    onClick={() => navigate('/')}
                    style={{marginLeft: 20, cursor: 'pointer',color: 'white'}}
                >
                    BusinessPlanner
                </div>

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
                        {isAuth
                            ?
                            user.isActivated
                                    ?
                                        <UserOutlined
                                            style={{fontSize: '25px', marginRight: 20, color: 'white'}}
                                            onClick={() => {
                                                if (location.pathname !== '/information') {
                                                    navigate('/information')
                                                } else {
                                                    navigate('/')
                                                }
                                            }}
                                        />
                                    :
                                    <div style={{fontSize: '20px', marginRight: 20,color: 'white', cursor: 'pointer'}} onClick={() => AuthActionCreators.logout()(dispatch)}> Выйти </div>
                            :
                            <div style={{fontSize: '20px', marginRight: 20,color: 'white', cursor: 'pointer'}} onClick={() => navigate(RouteNames.LOGIN)}> Авторизация </div>
                    }
                        </>
                    }
            </div>
        </Layout.Header>
    );
};

export default Navbar;