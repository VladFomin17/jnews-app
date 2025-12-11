import {BASE_API} from "../../../constants/baseApi.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {NewsFormType, NewsType} from "../../../types/types.ts";

export function useNewsForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleNewsForm(data: NewsFormType, type = 'create', id?: number) {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            if (data.image) formData.append('image', data.image);
            let apiURL = '';
            let method = '';
            switch (type) {
                case 'edit':
                    apiURL = `news/${id}`;
                    method = 'PATCH';
                    break;
                case 'create':
                    apiURL = 'news';
                    method = 'POST';
                    break;
            }

            const response = await fetch(BASE_API + apiURL, {
                method: method,
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                navigate(-1);
            } else {
                const result = await response.text();
                setError(result || 'Ошибка при создании новости');
            }
        } catch {
            setError('Сервер недоступен');
        }

        setIsLoading(false);
    }

    async function getNewsById(id: number) {
        setIsLoading(true);
        try {
            const response = await fetch(BASE_API + `news/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data: NewsType = await response.json();
            setIsLoading(false);
            return data;
        } catch {
            setError(`Не удалось получить данные о новости с id ${id}`)
        }
        setIsLoading(false);
    }

    return {
        error,
        setError,
        navigate,
        isLoading,
        handleNewsForm,
        getNewsById
    };
}