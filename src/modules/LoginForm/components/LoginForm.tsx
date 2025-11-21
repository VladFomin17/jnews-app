import {Button, Form, Input, Spin, Typography} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import classes from './LoginForm.module.css'
import {useState} from "react";
import type {LoginInfoType} from "../types/types.ts";
import {useLogin} from "../hooks/useLogin.ts";

const LoginForm = () => {
    const [userData, setUserData] = useState<LoginInfoType>({username: '', password: ''});
    const {
        navigate,
        hasError,
        isLoading,
        handleLogin
    } = useLogin();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        setUserData({...userData ,[key]: e.target.value});
    }

    const onFinish = () => {
        handleLogin(userData);
    };

    return (
        <div className={classes.formContainer}>
            {!isLoading
                ? <>
                    <Typography.Title level={3}>Авторизация</Typography.Title>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            required={true}
                            name="username"
                            rules={[{ required: true, message: 'Введите имя пользователя' }]}
                            validateStatus={hasError ? 'error' : undefined}
                            help={hasError ? 'Неверное имя пользователя или пароль' : undefined}
                        >
                            <Input
                                name="username"
                                onChange={(e) => onChange(e)}
                                value={userData.username}
                                prefix={<UserOutlined />}
                                placeholder="Имя пользователя"
                            />
                        </Form.Item>
                        <Form.Item
                            required={true}
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль!' }]}
                            validateStatus={hasError ? 'error' : undefined}
                            help={hasError ? 'Неверное имя пользователя или пароль' : undefined}
                        >
                            <Input.Password
                                name="password"
                                onChange={(e) => onChange(e)}
                                value={userData.username}
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Пароль"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Войти
                            </Button>
                            <a onClick={() => navigate('/sign-up')}>Ещё нет аккаунта</a>
                        </Form.Item>
                    </Form>
                </>
                : <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default LoginForm;