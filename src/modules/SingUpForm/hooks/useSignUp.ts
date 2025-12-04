import {BASE_API} from "../../../constants/baseApi.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {SignUpUserType, UserDataType} from "../../../types/types.ts";

export function useSignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSignUp(data: SignUpUserType, type = 'signUp', id?: number) {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('email', data.email);
            if (data.role) formData.append('role', data.role);
            if (data.avatar) formData.append('avatar', data.avatar);
            let apiURL = '';
            let method = '';
            switch (type) {
                case 'signUp':
                    apiURL = 'auth/register';
                    method = 'POST';
                    break;
                case 'edit':
                    apiURL = 'user/edit';
                    method = 'PATCH';
                    break;
                case 'create':
                    apiURL = 'admin/create';
                    method = 'POST';
                    break;
                case 'editAdmin':
                    if (!id) throw new Error('ID пользователя обязателен для editAdmin');
                    apiURL = `admin/${id}`;
                    method = 'PATCH';
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
                setError(result || 'Ошибка при регистрации');
            }
        } catch {
            setError('Сервер недоступен');
        }

        setIsLoading(false);
    }

    async function getUserById(id: number) {
        setIsLoading(true);
        try {
            const response = await fetch(BASE_API + `admin/users/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data: UserDataType = await response.json();
            setIsLoading(false);
            return data;
        } catch {
            setError(`Не удалось получить данные о пользователе с id ${id}`)
        }
        setIsLoading(false);
    }

    return {
        error,
        setError,
        navigate,
        isLoading,
        handleSignUp,
        getUserById
    };
}