import {useState} from "react";
import type {LoginInfoType} from "../../../types/types.ts";
import {useNavigate} from "react-router-dom";
import {BASE_API} from "../../../constants/baseApi.ts";

export function useLogin() {
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(data: LoginInfoType) {
        setIsLoading(true);

        try {
            const url = BASE_API + 'auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.status === 200) {
                navigate('/account');
            }
            else {
                setHasError(true);
            }
        } catch {
            setHasError(true);
        }

        setIsLoading(false);
    }

    return {
        navigate,
        hasError,
        isLoading,
        handleLogin
    }
}