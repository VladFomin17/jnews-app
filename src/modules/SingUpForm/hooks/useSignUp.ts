import {BASE_API} from "../../../consts/baseApi.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {SignUpUserType} from "../../../types/types.ts";

export function useSignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignUp(data: SignUpUserType) {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('email', data.email);
            if (data.avatar) formData.append('avatar', data.avatar);

            const response = await fetch(BASE_API + 'auth/register', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return {
        navigate,
        isLoading,
        handleSignUp
    };
}