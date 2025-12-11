import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../hooks/useProfile.ts";
import {useEffect, useState} from "react";
import type {NewsType} from "../../../types/types.ts";
import {fetchNews} from "../api/fetchNews.ts";
import {deleteNews} from "../deleteNews.ts";

export function useNews() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { userData } = useProfile();
    const [news, setNews] = useState<NewsType[]>([]);

    async function handleNews() {
        setIsLoading(true);
        const result = await fetchNews();
        if (result.status === 200 && result.data) {
            setNews(result.data);
        } else {
            setError("Ошибка соединения с сервером");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        handleNews();
    }, []);

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

    async function handleDelete(id: number) {
        const status = await deleteNews(id);

        if (status === 200) {
            handleNews();
        } else {
            setError("Не удалось удалить новость");
        }
    }

    return {
        news,
        navigate,
        userData,
        loadingMap,
        error,
        setError,
        isLoading,
        handleDelete,
    }
}
