import type {UserDataType} from "../types/types.ts";
import {getUserData} from "../modules/PersonalAccount/api/getUserData.ts";
import {logoutRequest} from "../modules/PersonalAccount/api/logoutRequest.ts";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export function useProfile() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["userData"],
        queryFn: async (): Promise<UserDataType> => {
            const result = await getUserData();
            if (result.status === 200 && result.data) {
                return result.data;
            } else if (result.status === 500) {
                navigate("/");
                throw new Error("Ошибка авторизации");
            } else {
                throw new Error("Ошибка соединения с сервером");
            }
        }
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const success = await logoutRequest();
            if (!success) throw new Error("Ошибка выхода");
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["userData"] });
            navigate("/");
        }
    });

    const handleLogout = () => logoutMutation.mutate();

    const setHasError = (msg: string | null) => {
        queryClient.setQueryData(["userDataError"], msg);
    };

    return {
        navigate,
        userData: query.data,
        isLoading: query.isFetching,
        error: query.error instanceof Error ? query.error.message : null,
        setHasError,
        handleLogout
    };
}