import classes from './AdminPanel.module.css'
import {Button, Space, Spin, Table, type TableProps, Typography} from "antd";
import type {UserDataType} from "../../../types/types.ts";
import {useUsers} from "../hooks/useUsers.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";
import {useProfile} from "../../../hooks/useProfile.ts";

const AdminPanel = () => {
    const { userData: profileData, isLoading: profileLoading } = useProfile();
    const {
        users,
        isLoading,
        error,
        setError,
        handleDelete,
        navigate
    } = useUsers();

    if (profileData?.role !== 'ADMIN') {
        navigate(-1);
        return null
    }

    const columns: TableProps<UserDataType>['columns'] = [
        {
            title: 'Имя',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Посещения',
            dataIndex: 'visitsCount',
            key: 'visitsCount',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/admin/edit/${record.id}`)}>Редактировать</a>
                    <a onClick={() => handleDelete(record.id)}>Удалить</a>
                </Space>
            ),
        },
    ];

    return (
        <div className={classes.page}>
            {error &&
                <ErrorAlert message={error} close={() => setError(null)}/>
            }
            {!isLoading && !profileLoading
                ?
                <div>
                    <div className={classes.header}>
                        <Typography.Title level={3}>Пользователи</Typography.Title>
                        <div className={classes.buttons}>
                            <Button onClick={() => navigate('/admin/create')}>Создать</Button>
                            <Button onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </div>
                    <Table<UserDataType> columns={columns} dataSource={users} />
                </div>
                :
                <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default AdminPanel;