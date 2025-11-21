import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
import classes from './PersonalAccount.module.css';
import {useNavigate} from "react-router-dom";

const PersonalAccount = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.accountContainer}>
            <div className={classes.infoContainer}>
                <Avatar shape="square" size={128} icon={<UserOutlined />} />
                <div className={classes.userInfo}>
                    <span>Имя пользователя</span>
                    <span>Роль</span>
                </div>
            </div>
            <Button onClick={() => {navigate('/')}} color="danger" variant="outlined">
                Выйти
            </Button>
        </div>
    );
};

export default PersonalAccount;