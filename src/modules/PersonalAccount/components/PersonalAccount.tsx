import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, message, Spin, Upload, type UploadProps} from "antd";
import classes from './PersonalAccount.module.css';
import {useProfile} from "../../../hooks/useProfile.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";
import ServerTime from "../../../components/ServerTime/ServerTime.tsx";
import {BASE_API, defaultAvatar} from "../../../constants/baseApi.ts";

const PersonalAccount = () => {
    const {
        navigate,
        userData,
        isLoading,
        error,
        setHasError,
        handleLogout
    } = useProfile();

    const uploadProps: UploadProps = {
        maxCount: 1,
        customRequest: async ({ file, onSuccess, onError }) => {
            if (!(file instanceof File)) return;

            if (!file.type.startsWith("image/")) {
                setHasError(`${file.name} — это не изображение`);
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch(BASE_API + "user/avatar", {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                });

                if (!res.ok) {
                    message.error("Ошибка загрузки аватара");
                    onError?.(new Error("Ошибка загрузки"));
                    return;
                }

                message.success("Аватар обновлён!");
                onSuccess?.(res, new XMLHttpRequest());
                window.location.reload();
            } catch (err) {
                message.error("Ошибка сети");
                onError?.(err as Error);
            }
        },
    };

    return (
        <div className={classes.page}>
            {error &&
                <ErrorAlert message={error} close={() => setHasError(null)}/>
            }
            {!isLoading
                ?
                <div className={classes.contentContainer}>
                    <ServerTime/>
                    <div className={classes.accountContainer}>
                        <div className={classes.infoContainer}>
                            <Avatar
                                shape="square"
                                size={128}
                                icon={<UserOutlined />}
                                src={userData?.avatar}
                            />
                            <div className={classes.userInfo}>
                                <span>Имя пользователя: {userData?.username}</span>
                                <span>Почта: {userData?.email}</span>
                                <span>Роль: {userData?.role}</span>
                                <span>Посещения: {userData?.visitsCount}</span>
                            </div>
                        </div>
                        <Button onClick={() => {handleLogout()}} color="danger" variant="outlined">
                            Выйти
                        </Button>
                    </div>
                    <div className={classes.actionButtons}>
                        {userData?.avatar === defaultAvatar && (
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                            </Upload>
                        )}
                        <Button onClick={() => navigate('/account/edit')}>Редактировать</Button>
                    </div>
                </div>
                :
                <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default PersonalAccount;