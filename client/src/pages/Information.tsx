import React, {FC} from 'react';
import {Layout, Row} from "antd";
import InformationForm from "../components/InformationForm/InformationForm";

const Information:FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <InformationForm/>
            </Row>
        </Layout>
    );
};

export default Information;