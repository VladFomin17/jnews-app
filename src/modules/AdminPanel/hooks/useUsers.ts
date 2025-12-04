import {useEffect, useState} from "react";
import type {UserDataType} from "../../../types/types.ts";
import {useNavigate} from "react-router-dom";
import {usersRequest} from "../api/usersRequest.ts";
import {deleteRequest} from "../api/deleteRequest.ts";

export function useUsers() {
    const [users, setUsers] = useState<UserDataType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleUsers() {
        setIsLoading(true);
        const result = await usersRequest();
        if (result.status === 200 && result.data) {
            setUsers(result.data);
        } else if (result.status === 500) {
            navigate("/");
            setError("Ошибка авторизации");
        } else {
            setError("Ошибка соединения с сервером");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        handleUsers();
    }, []);

    async function handleDelete(id: number) {
        const status = await deleteRequest(id);

        if (status === 200) {
            handleUsers();
        } else {
            setError("Не удалось удалить пользователя");
        }
    }

    return {
        users,
        isLoading,
        error,
        setError,
        handleUsers,
        handleDelete,
        navigate
    }
}