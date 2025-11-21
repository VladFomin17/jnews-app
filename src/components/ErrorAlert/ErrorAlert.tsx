import React from 'react';
import classes from './ErrorAlert.module.css'
import {Alert} from "antd";

interface ErrorAlertProps {
    message: string;
    close: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({message, close}) => {
    return (
        <div className={classes.alert}>
            <Alert
                message={message}
                type="error"
                showIcon
                closable
                onClose={close}
            />
        </div>
    );
};

export default ErrorAlert;