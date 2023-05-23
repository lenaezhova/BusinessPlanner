import React, {FC} from 'react';
import {infoState} from "./AuthForm";
import {Form, Input, Select} from "antd";
import {rules} from "../utils/rules";
interface RegistrationListProps {
    info: infoState;
    setInfo:  React.Dispatch<React.SetStateAction<infoState>>
}
const RegistrationList : FC<RegistrationListProps> = ({info, setInfo}) => {
    return (
        <>
            <Form.Item
                name="name"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setInfo({...info, name: e.target.value})}
                    value={info.name}
                    placeholder="Имя"
                    type="text"
                />
            </Form.Item>
            <Form.Item
                name="patronymic"
            >
                <Input
                    onChange={e => setInfo({...info, patronymic: e.target.value})}
                    value={info.patronymic}
                    placeholder="Отчество"
                    type="text"
                />
            </Form.Item>
            <Form.Item
                name="surname"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setInfo({...info, surname: e.target.value})}
                    value={info.surname}
                    placeholder="Фамилия"
                    type="text"
                />
            </Form.Item>
            <Form.Item
                name="gender"
            >
                <Select
                    placeholder="Пол"
                    value={info.gender}
                    onChange={(gender:string) => setInfo({...info, gender: gender})}
                >
                    <Select.Option value="Мужской">
                        Мужской
                    </Select.Option>
                    <Select.Option value="Женский">
                        Женский
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="email"
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
                rules={[rules.required()]}
            >
                <Input.Password
                    onChange={e => setInfo({...info, password: e.target.value})}
                    value={info.password}
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    rules.required(),
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder="Подтвердите пароль"
                />
            </Form.Item>
        </>
    );
};

export default RegistrationList;