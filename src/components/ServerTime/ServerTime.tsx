import { Card, Spin, Typography } from "antd";
import {useServerTime} from "../../hooks/useServerTIme.ts";

const ServerTime = () => {
    const { time, loading, error } = useServerTime();

    return (
        <Card style={{ maxWidth: 300 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
                Время сервера
            </Typography.Title>

            {loading && <Spin />}

            {error && (
                <Typography.Text type="danger">{error}</Typography.Text>
            )}

            {!loading && !error && time && (
                <Typography.Text style={{ fontSize: 18 }}>
                    {time}
                </Typography.Text>
            )}
        </Card>
    );
};

export default ServerTime;
