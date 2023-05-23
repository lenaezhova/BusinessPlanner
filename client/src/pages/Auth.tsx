import React, {FC} from 'react';
import {Layout, Row} from "antd";
import AuthForm from "../components/AuthForm";

const Auth: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <AuthForm/>
            </Row>
        </Layout>
    );
};

export default Auth;