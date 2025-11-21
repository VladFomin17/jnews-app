import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Spin} from "antd";
import classes from './PersonalAccount.module.css';
import {useProfile} from "../hooks/useProfile.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";
import ServerTime from "../../../components/ServerTime/ServerTime.tsx";

const PersonalAccount = () => {
    const {
        userData,
        isLoading,
        hasError,
        setHasError,
        handleLogout
    } = useProfile();

    return (
        <div className={classes.page}>
            {hasError &&
                <ErrorAlert message={'Ошибка загрузки данных'} close={() => setHasError(false)}/>
            }
            <ServerTime/>
            {!isLoading
                ?
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
                :
                <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default PersonalAccount;