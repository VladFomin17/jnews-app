import {BASE_API} from "../../../constants/baseApi.ts";
import type {NewsType} from "../../../types/types.ts";

export async function fetchNews() {
    try {
        const response = await fetch(BASE_API + 'news', {
            method: 'GET',
            credentials: 'include',
        });

        const data: NewsType[] = await response.json();
        return {status: response.status, data: data}
    } catch {
        return {status: 0};
    }
}