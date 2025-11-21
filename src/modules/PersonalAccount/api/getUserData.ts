import {BASE_API} from "../../../constants/baseApi.ts";
import type {UserDataType} from "../../../types/types.ts";

export async function getUserData() {
    try {
        const response = await fetch(BASE_API + 'user/profile', {
            method: 'GET',
            credentials: 'include',
        });

        const data: UserDataType = await response.json();
        return {status: response.status, data: data}
    } catch {
        return {status: 0};
    }
}