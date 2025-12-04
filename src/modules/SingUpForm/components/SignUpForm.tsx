import classes from "./SignUpForm.module.css";
import {Button, Form, Input, Spin, Typography, Upload, type UploadFile, type UploadProps} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import type {SignUpUserType} from "../../../types/types.ts";
import {useSignUp} from "../hooks/useSignUp.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";
import { useProfile } from "../../../hooks/useProfile.ts";

interface SignUpProps {
    type?: 'signUp' | 'edit' | 'create';
}

const TITLES = {
    signUp: "Регистрация",
    edit: "Редактирование профиля",
    create: "Создание пользователя"
} as const;

const SignUpForm: React.FC<SignUpProps> = ({type = 'signUp'}) => {
    const { userData: profileData, isLoading: profileLoading } = useProfile();
    const [userData, setUserData] = useState<SignUpUserType>({
        username: profileData?.username || '',
        password: '',
        confirmPassword: '',
        email: profileData?.email || '',
        avatar: null,
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { error, setError, handleSignUp, isLoading, navigate } = useSignUp();
    const [form] = Form.useForm();

    useEffect(() => {
        if (profileData) {
            setUserData(prev => ({
                ...prev,
                username: profileData.username,
                email: profileData.email,
            }));
            form.setFieldsValue({
                username: profileData.username,
                email: profileData.email,
            });
        }
    }, [profileData, form]);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name;
        setUserData({...userData ,[key]: e.target.value});
    }

    const onFinish = () => handleSignUp(userData, type);

    const props: UploadProps = {
        maxCount: 1,
        fileList,
        listType: "picture", // важно!
        beforeUpload: (file) => {
            if (!file.type.startsWith("image/")) {
                setError(`${file.name} — это не изображение`);
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);

            const latest = info.fileList[0]?.originFileObj;

            if (latest) {
                console.log("Файл выбран:", latest);
                setUserData(prev => ({ ...prev, avatar: latest }));
            }
        },
        onRemove() {
            setFileList([]);
            setUserData(prev => ({ ...prev, avatar: null }));
        },
    };

    return (
        <div className={classes.formContainer}>
            {error && <ErrorAlert message={error} close={() => setError(null)}/>}
            {!isLoading && !profileLoading
                ? <>
                    <Typography.Title level={3}>{TITLES[type]}</Typography.Title>
                    <Form
                        form={form}
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
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Повторите пароль!' }]}
                        >
                            <Input.Password name="confirmPassword"
                                            onChange={(e) => onChange(e)}
                                            value={userData.confirmPassword}
                                            prefix={<LockOutlined />} type="password" placeholder="Повторите пароль" />
                        </Form.Item>
                        <Form.Item>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Загрузите PNG</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Зарегистрироваться
                            </Button>
                            <Button onClick={() => navigate(-1)} block variant="outlined">
                                Назад
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