import classes from "./SignUpForm.module.css";
import {Button, Form, Input, message, Spin, Typography, Upload, type UploadProps} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import {useState} from "react";
import type {SignUpUserType} from "../../../types/types.ts";
import {useSignUp} from "../hooks/useSignUp.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";

const SignUpForm = () => {
    const [userData, setUserData] = useState<SignUpUserType>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: null,
    });

    const { error, setError, handleSignUp, isLoading, navigate } = useSignUp();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        setUserData({...userData ,[key]: e.target.value});
    }

    const onFinish = () => handleSignUp(userData);

    const props: UploadProps = {
        maxCount: 1,
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) message.error(`${file.name} не png файл`);
            return false;
        },
        onChange: (info) => {
            const file = info.file.originFileObj;
            if (file) setUserData(prev => ({ ...prev, avatar: file }));
        },
        onRemove: () => {
            setUserData(prev => ({ ...prev, avatar: null }));
        }
    };

    return (
        <div className={classes.formContainer}>
            {error && <ErrorAlert message={error} close={() => setError(null)}/>}
            {!isLoading
                ? <>
                    <Typography.Title level={3}>Регистрация</Typography.Title>
                    <Form
                        name="signUp"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 360 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Введите имя пользователя' }]}
                        >
                            <Input name="username"
                                   onChange={(e) => onChange(e)}
                                   value={userData.username}
                                   prefix={<UserOutlined />} placeholder="Имя пользователя" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Введите email' }]}
                        >
                            <Input name="email"
                                   onChange={(e) => onChange(e)}
                                   value={userData.email}
                                   prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль!' }]}
                        >
                            <Input.Password name="password"
                                            onChange={(e) => onChange(e)}
                                            value={userData.password}
                                            prefix={<LockOutlined />} type="password" placeholder="Введите пароль" />
                        </Form.Item>
                        <Form.Item
                            name="comfirmPassword"
                            rules={[{ required: true, message: 'Повторите пароль!' }]}
                        >
                            <Input.Password name="comfirmPassword"
                                            onChange={(e) => onChange(e)}
                                            value={userData.confirmPassword}
                                            prefix={<LockOutlined />} type="password" placeholder="Повторите пароль" />
                        </Form.Item>
                        <Form.Item>
                            <Upload {...props} name="avatar">
                                <Button icon={<UploadOutlined />}>Загрузите изображение формата png</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Зарегистрироваться
                            </Button>
                            <a onClick={() => navigate('/')}>Уже есть аккаунт</a>
                        </Form.Item>
                    </Form></>
                :
                <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default SignUpForm;