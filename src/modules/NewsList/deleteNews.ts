import {BASE_API} from "../../constants/baseApi.ts";

export async function deleteNews(id: number) {
    try {
        const response = await fetch(BASE_API + `news/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return response.status
    } catch {
        return 0;
    }
}