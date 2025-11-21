import {BASE_API} from "../../../constants/baseApi.ts";

export async function logoutRequest() {
    try {
        const response = await fetch(BASE_API + 'auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Ошибка при выходе');
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}