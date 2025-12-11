import {Button, Form, Input, Typography, Upload, type UploadFile, type UploadProps} from "antd";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import type {NewsFormType } from "../../../types/types.ts";
import classes from './NewsForm.module.css'
import {useNavigate} from "react-router-dom";

const NewsForm = () => {
    const [newsData, setNewsData] = useState<NewsFormType>({
        title: '',
        description: '',
        image: null,
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = () => {

    }

    const props: UploadProps = {
        maxCount: 1,
        fileList,
        listType: "picture", // важно!
        beforeUpload: (file) => {
            if (!file.type.startsWith("image/")) {
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);

            const latest = info.fileList[0]?.originFileObj;

            if (latest) {
                console.log("Файл выбран:", latest);
                setNewsData(prev => ({ ...prev, image: latest }));
            }
        },
        onRemove() {
            setFileList([]);
            setNewsData(prev => ({ ...prev, image: null }));
        },
    };

    return (
        <div className={classes.formContainer}>
            <Typography.Title level={3}>Новость</Typography.Title>
            <Form
                form={form}
                name="signUp"
                initialValues={{remember: true}}
                style={{maxWidth: 360}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Введите заголовок'}]}
                >
                    <Input name="title"
                           onChange={() => {}}
                           value={newsData.title}
                           prefix={<UserOutlined/>} placeholder="Заголовок"/>
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{required: true, message: 'Введите описание'}]}
                >
                    <Input.TextArea
                        name="description"
                        value={newsData.description}
                        onChange={() => {}}
                        rows={6}
                        placeholder="Описание новости"
                        style={{ resize: 'none' }}
                    />
                </Form.Item>
                <Form.Item>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Загрузите PNG</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Создать новость
                    </Button>
                    <Button onClick={() => navigate(-1)} block variant="outlined">
                        Назад
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewsForm;