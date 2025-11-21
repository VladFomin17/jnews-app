import {useEffect, useState} from "react";
import type {UserDataType} from "../../../types/types.ts";
import {getUserData} from "../api/getUserData.ts";
import {logoutRequest} from "../api/logoutRequest.ts";
import {useNavigate} from "react-router-dom";

export function useProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    async function loadData() {
        setHasError(false);
        setIsLoading(true);
        const result = await getUserData();
        if (result.status === 200 && result.data) {
            setUserData(result.data);
        } else {
            setHasError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = async () => {
        const success = await logoutRequest();
        if (success) {
            navigate('/'); // перенаправление на главную или логин
        }
    };

    return {
        navigate,
        userData,
        isLoading,
        hasError,
        setHasError,
        handleLogout
    }
}