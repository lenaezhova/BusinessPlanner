import React, {FC} from 'react';
import {Form, Input, theme} from "antd";
import {rules} from "../utils/rules";
import {infoState} from "./AuthForm";

interface LoginListProps {
    info: infoState;
    setInfo:  React.Dispatch<React.SetStateAction<infoState>>
}


const LoginList : FC<LoginListProps> = ({info, setInfo}) => {
    return (
        <>
            <Form.Item
                name="email"
                initialValue={info.email}
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setInfo({...info, email: e.target.value})}
                    value={info.email}
                    placeholder="E-mail"
                    type="text"
                />
            </Form.Item>
            <Form.Item
                name="password"
                initialValue={info.password}
                rules={[rules.required()]}
            >
                <Input.Password
                    onChange={e => setInfo({...info, password: e.target.value})}
                    value={info.password}
                    placeholder="Пароль"
                />
            </Form.Item>
        </>
    );
};

export default LoginList;