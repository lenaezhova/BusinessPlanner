import React, {FC} from 'react';
import {Spin} from "antd";
type LoaderProps = {
    mt?:  string | number
}
const Loader:FC<LoaderProps> = ({mt}) => {
    return (
        <Spin tip="Loading" size="large">
            <div
                style={{
                    display:'flex',
                    height: '100vh',
                    width: '100vh',
                }}
                className="content"
            />
        </Spin>
    );
};

export default Loader;