import {Button, Card, Typography} from "antd";
import classes from './NewsList.module.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import type {NewsType} from "../../../types/types.ts";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../hooks/useProfile.ts";

const NewsList = () => {
    const navigate = useNavigate();
    const { userData } = useProfile();
    const [actions, setActions] = useState<React.ReactNode[]>([]);
    const news: NewsType[] = [
        {
            id: 1,
            title: 'Новость',
            description: 'Это новость! афонин не читай ставь автомат',
            imageSrc: 'https://fvt.pnzgu.ru/files/design/logos/11_logo.png'
        },
        {
            id: 1,
            title: 'Новость',
            description: 'Это новость! афонин не читай ставь автомат',
            imageSrc: 'https://fvt.pnzgu.ru/files/design/logos/11_logo.png'
        },
        {
            id: 1,
            title: 'Новость',
            description: 'Это новость! афонин не читай ставь автомат',
            imageSrc: 'https://fvt.pnzgu.ru/files/design/logos/11_logo.png'
        },

    ];
    const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>(
        news.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
    );
    const handleImageLoaded = (id: number) => {
        setLoadingMap(prev => ({ ...prev, [id]: false }));
    };

    useEffect(() => {
        news.forEach(item => {
            const img = new Image();
            img.src = item.imageSrc;

            img.onload = () => handleImageLoaded(item.id);
            img.onerror = () => handleImageLoaded(item.id);
        });
    }, [news]);

    useEffect(() => {
        if (userData?.role === 'MODERATOR') {
            setActions([
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete"/>,
            ])
        }
    }, []);

    return (
        <div className={classes.page}>
            <div className={classes.header}>
                <Typography.Title level={3}>Новости</Typography.Title>
                <div className={classes.buttons}>
                    {userData?.role === 'MODERATOR'
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
                    hoverable
                    loading={loadingMap[item.id]}
                    actions={actions}
                >
                    <div className={classes.newsContent}>
                        <img
                            className={classes.newsImage}
                            draggable={false}
                            alt="example"
                            src={item.imageSrc}
                            onLoad={() => handleImageLoaded(item.id)}
                            onError={() => handleImageLoaded(item.id)}
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
        </div>
    );
};

export default NewsList;