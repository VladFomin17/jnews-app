import {Button, Form, Input, Spin, Typography, Upload, type UploadFile, type UploadProps} from "antd";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import type {NewsFormType } from "../../../types/types.ts";
import classes from './NewsForm.module.css'
import {useNewsForm} from "../hooks/useNewsForm.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";

interface NewsFormProps {
    id?: number;
    type?: 'create' | 'edit';
}

const TITLES = {
    edit: "Редактировать новость",
    create: "Создать новость",
} as const;

const NewsForm: React.FC<NewsFormProps> = ({type = 'create', id}) => {
    const {
        error,
        setError,
        navigate,
        isLoading,
        handleNewsForm,
        getNewsById
    } = useNewsForm();
    const [newsData, setNewsData] = useState<NewsFormType>({
        title: '',
        description: '',
        image: null,
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        async function fillFormData() {
            if (id) {
                const user = await getNewsById(id);
                if (user) {
                    setNewsData(prev => ({
                        ...prev,
                        title: user.title,
                        description: user.description,
                    }));
                    form.setFieldsValue({
                        title: user.title,
                        description: user.description,
                    });
                }
            }
        }

        if (type === 'edit') fillFormData();
    }, [id, type, form]);

    function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const key = e.target.name;
        setNewsData({...newsData ,[key]: e.target.value});
    }

    const onFinish = () => {
        if (type !== 'edit') {
            handleNewsForm(newsData, type);
        } else {
            handleNewsForm(newsData, type, id);
        }
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
            {error && <ErrorAlert message={error} close={() => setError(null)}/>}
            <Typography.Title level={3}>{TITLES[type]}</Typography.Title>
            {!isLoading
                ?
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
                               onChange={(e) => onChange(e)}
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
                            onChange={(e) => onChange(e)}
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
                :
                <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default NewsForm;