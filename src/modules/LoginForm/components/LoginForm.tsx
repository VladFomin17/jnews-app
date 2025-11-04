import {Button, Form, Input, Typography} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import classes from './LoginForm.module.css'
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = () => {

    };

    return (
        <div className={classes.formContainer}>
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
                >
                    <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
                </Form.Item>
                <Form.Item
                    required={true}
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password
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
        </div>
    );
};

export default LoginForm;