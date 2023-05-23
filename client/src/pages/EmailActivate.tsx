import React, {FC} from 'react';
import {Layout, Row} from "antd";
import EmailActivateFom from "../components/EmailActivateFom";

const EmailActivate: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <EmailActivateFom/>
            </Row>
        </Layout>
    );
};

export default EmailActivate;