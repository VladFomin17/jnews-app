import {BASE_API} from "../../../constants/baseApi.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {SignUpUserType} from "../../../types/types.ts";

export function useSignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSignUp(data: SignUpUserType, type = 'signUp') {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('email', data.email);
            if (data.avatar) formData.append('avatar', data.avatar);
            const apiURL = type === 'signUp' ? 'auth/register' : 'user/edit';
            const method = type === 'signUp' ? 'POST' : 'PATCH';

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

    return {
        error,
        setError,
        navigate,
        isLoading,
        handleSignUp
    };
}