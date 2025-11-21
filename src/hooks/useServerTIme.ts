import { useEffect, useState } from "react";
import { BASE_API } from "../constants/baseApi.ts";

export function useServerTime() {
    const [time, setTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchTime() {
        try {
            const res = await fetch(BASE_API + "user/time", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                setError("Не удалось получить время сервера");
                return;
            }

            const data = await res.json();
            setTime(data.serverTime);
            setError(null);

        } catch {
            setError("Ошибка сети");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // первый запрос
        fetchTime();

        // обновление каждую секунду
        const interval = setInterval(fetchTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return { time, loading, error };
}
