import React, {FC} from 'react';
import {Form} from "antd";
const EmailActivateFom: FC = () => {
    return (
        <Form>
            <div>
                Чтобы воспользоваться сервисом, необходимо подтвердить почту.
                <div>
                    Для этого перейдите по ссылке, которая прикреплена к письму.
                </div>
                <div>
                    После подтверждения, обновите страницу.
                </div>
            </div>
        </Form>
    );
};

export default EmailActivateFom;