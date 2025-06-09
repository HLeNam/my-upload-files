import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";

interface ViewsTrendChartProps {
    data: Array<{
        day: string;
        views: number;
        engagement: number;
    }>;
}

export const ViewsTrendChart: React.FC<ViewsTrendChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F3F4F6",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: "#8B5CF6" }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

interface PlatformPieChartProps {
    data: Array<{
        name: string;
        value: number;
        color: string;
    }>;
}

export const PlatformPieChart: React.FC<PlatformPieChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: number) => value.toLocaleString()}
                    contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F3F4F6",
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

interface PlatformComparisonChartProps {
    data: Array<{
        platform: string;
        views: number;
        engagement: number;
        subscribers: number;
    }>;
}

export const PlatformComparisonChart: React.FC<PlatformComparisonChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="platform" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F3F4F6",
                    }}
                />
                <Legend />
                <Bar dataKey="views" fill="#8B5CF6" name="Lượt xem" />
                <Bar dataKey="engagement" fill="#10B981" name="Tương tác %" />
                <Bar dataKey="subscribers" fill="#F59E0B" name="Người theo dõi" />
            </BarChart>
        </ResponsiveContainer>
    );
};
