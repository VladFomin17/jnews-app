import {Button, Card, Spin, Typography} from "antd";
import classes from './NewsList.module.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {useNews} from "../hooks/useNews.ts";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert.tsx";
import { BASE_API } from "../../../constants/baseApi.ts";

const NewsList = () => {
    const {
        news,
        navigate,
        userData,
        loadingMap,
        error,
        setError,
        isLoading,
        handleDelete
    } = useNews();

    return (
        <div className={classes.page}>
            {error &&
                <ErrorAlert message={error} close={() => setError(null)}/>
            }
            {!isLoading
                ?
                <>
                    <div className={classes.header}>
                        <Typography.Title level={3}>Новости</Typography.Title>
                        <div className={classes.buttons}>
                            {userData && userData?.role !== 'VISITOR'
                                && <Button onClick={() => navigate('/news/create')}>Добавить</Button>
                            }
                            {userData
                                ? <Button onClick={() => navigate('/account')}>Профиль</Button>
                                : <Button onClick={() => navigate('/login')}>Войти</Button>
                            }
                        </div>
                    </div>
                    {news.map(item =>
                        <Card
                            key={item.id}
                            hoverable
                            loading={loadingMap[item.id]}
                            actions={[
                                userData?.role !== "VISITOR" && userData && (
                                    <>
                                        <EditOutlined onClick={() => navigate(`/news/edit/${item.id}`)} />
                                        <DeleteOutlined onClick={() => handleDelete(item.id)} />
                                    </>
                                )
                            ]}
                        >
                            <div className={classes.newsContent}>
                                <img
                                    className={classes.newsImage}
                                    draggable={false}
                                    alt="example"
                                    src={BASE_API.slice(0, -1) + item.imageSrc}
                                />
                                <Card.Meta
                                    title={item.title}
                                    description={
                                        <>
                                            <p>{item.description}</p>
                                            <p>{item.description}</p>
                                        </>
                                    }
                                />
                            </div>
                        </Card>
                    )}
                </>
                : <div className={'spin'}>
                    <Spin/>
                </div>
            }
        </div>
    );
};

export default NewsList;