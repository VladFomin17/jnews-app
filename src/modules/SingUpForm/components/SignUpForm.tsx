import classes from "./SignUpForm.module.css";
import {Button, Form, Input, message, Typography, Upload, type UploadProps} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {
    const navigate = useNavigate();

    const onFinish = () => {
        navigate('/');
    };

    const props: UploadProps = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            console.log(info.fileList);
        },
    };

    return (
        <div className={classes.formContainer}>
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
                    <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Введите пароль" />
                </Form.Item>
                <Form.Item
                    name="comfirmPassword"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Повторите пароль" />
                </Form.Item>
                <Form.Item
                    name="file"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Загрузите изображение формата png</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                    <a onClick={() => navigate('/')}>Уже есть аккаунт</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUpForm;