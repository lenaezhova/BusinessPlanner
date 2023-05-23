import React, {CSSProperties, FC} from 'react';

interface ErrorMessageProps{
    isError: any;
    errorMessage: any;
    style?:CSSProperties;
}

const ErrorMessage : FC<ErrorMessageProps> = ({isError, errorMessage, style}) => {
    return (
            isError &&
                <div style={style}>
                    {errorMessage}
                </div>
    );
};

export default ErrorMessage;