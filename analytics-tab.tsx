import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export const AnalyticsTab: React.FC = () => {
    const genderData = [
        { name: "Nam", value: 64, color: "#3B82F6" },
        { name: "Nữ", value: 36, color: "#EC4899" },
    ];

    const ageData = [
        { age: "18-24", percentage: 42 },
        { age: "25-34", percentage: 28 },
        { age: "35-44", percentage: 16 },
        { age: "45-54", percentage: 8 },
        { age: "55+", percentage: 6 },
    ];

    const locationData = [
        { country: "Việt Nam", percentage: 68 },
        { country: "Hoa Kỳ", percentage: 12 },
        { country: "Singapore", percentage: 8 },
        { country: "Nhật Bản", percentage: 5 },
        { country: "Khác", percentage: 7 },
    ];

    const trafficSources = [
        { source: "Tìm kiếm", percentage: 42, color: "#10B981" },
        { source: "Trang chủ", percentage: 26, color: "#3B82F6" },
        { source: "Video đề xuất", percentage: 18, color: "#8B5CF6" },
        { source: "Liên kết ngoài", percentage: 8, color: "#F59E0B" },
        { source: "Khác", percentage: 6, color: "#6B7280" },
    ];

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Audience Analytics */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Khán giả của bạn</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Phân tích nhân khẩu học người xem
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Giới tính</h3>
                            <div className="h-[200px] mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={genderData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {genderData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1F2937",
                                                border: "1px solid #374151",
                                                borderRadius: "8px",
                                                color: "#F3F4F6",
                                            }}
                                        />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-2">
                                {genderData.map((item) => (
                                    <div key={item.name} className="flex justify-between">
                                        <div className="flex items-center">
                                            <div
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: item.color }}
                                            ></div>
                                            <span>{item.name}</span>
                                        </div>
                                        <span>{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Độ tuổi</h3>
                            <div className="space-y-4">
                                {ageData.map((item) => (
                                    <div key={item.age}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-zinc-400 text-sm">
                                                {item.age}
                                            </span>
                                            <span className="text-sm">{item.percentage}%</span>
                                        </div>
                                        <Progress
                                            value={item.percentage}
                                            className="h-2 bg-zinc-800"
                                            indicatorClassName="bg-purple-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6 bg-zinc-800" />

                    {/* Geographic Distribution */}
                    <div>
                        <h3 className="font-semibold mb-4">Vị trí địa lý</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="col-span-3">
                                <div className="h-[300px] flex items-center justify-center bg-zinc-800 rounded-lg">
                                    <div className="flex flex-col items-center">
                                        <Activity className="w-12 h-12 text-purple-500 mb-2" />
                                        <p className="text-zinc-400 text-center">
                                            Bản đồ vị trí
                                            <br />
                                            <span className="text-xs">
                                                (Có thể tích hợp Google Maps hoặc Mapbox)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                                            <TableHead>Quốc gia</TableHead>
                                            <TableHead className="text-right">Lượt xem</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {locationData.map((item) => (
                                            <TableRow
                                                key={item.country}
                                                className="hover:bg-zinc-800/50 border-zinc-800"
                                            >
                                                <TableCell>{item.country}</TableCell>
                                                <TableCell className="text-right">
                                                    {item.percentage}%
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Nguồn lưu lượng truy cập
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Các nguồn mang lại lượt xem cho video của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={trafficSources}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ source, percentage }) =>
                                                `${source} ${percentage}%`
                                            }
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="percentage"
                                        >
                                            {trafficSources.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1F2937",
                                                border: "1px solid #374151",
                                                borderRadius: "8px",
                                                color: "#F3F4F6",
                                            }}
                                        />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-4">
                                {trafficSources.map((item) => (
                                    <div key={item.source}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-zinc-400 text-sm">
                                                {item.source}
                                            </span>
                                            <span className="text-sm">{item.percentage}%</span>
                                        </div>
                                        <Progress
                                            value={item.percentage}
                                            className="h-2 bg-zinc-800"
                                            style={
                                                {
                                                    "--progress-foreground": item.color,
                                                } as React.CSSProperties
                                            }
                                            indicatorClassName={`bg-[${item.color}]`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Device & Browser Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Thiết bị</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Loại thiết bị người xem sử dụng
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-zinc-400 text-sm">Desktop</span>
                                    <span className="text-sm">45%</span>
                                </div>
                                <Progress
                                    value={45}
                                    className="h-2 bg-zinc-800"
                                    indicatorClassName="bg-blue-500"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-zinc-400 text-sm">Mobile</span>
                                    <span className="text-sm">35%</span>
                                </div>
                                <Progress
                                    value={35}
                                    className="h-2 bg-zinc-800"
                                    indicatorClassName="bg-green-500"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-zinc-400 text-sm">Tablet</span>
                                    <span className="text-sm">20%</span>
                                </div>
                                <Progress
                                    value={20}
                                    className="h-2 bg-zinc-800"
                                    indicatorClassName="bg-purple-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Thời gian xem</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Phân tích thời gian xem video
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Thời gian xem trung bình</span>
                                <span className="font-semibold">2 phút 34 giây</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Tỷ lệ xem hết video</span>
                                <span className="font-semibold">68%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Điểm rời khỏi video</span>
                                <span className="font-semibold">1 phút 45 giây</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Tỷ lệ click-through</span>
                                <span className="font-semibold">12.3%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Engagement Over Time */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Tương tác theo thời gian
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Phân tích tương tác trong 30 ngày qua
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { date: "01/06", likes: 450, comments: 32, shares: 18 },
                                    { date: "02/06", likes: 520, comments: 41, shares: 25 },
                                    { date: "03/06", likes: 380, comments: 28, shares: 15 },
                                    { date: "04/06", likes: 680, comments: 55, shares: 32 },
                                    { date: "05/06", likes: 720, comments: 63, shares: 41 },
                                    { date: "06/06", likes: 590, comments: 47, shares: 28 },
                                    { date: "07/06", likes: 820, comments: 71, shares: 45 },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="date" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        border: "1px solid #374151",
                                        borderRadius: "8px",
                                        color: "#F3F4F6",
                                    }}
                                />
                                <Bar dataKey="likes" fill="#8B5CF6" name="Lượt thích" />
                                <Bar dataKey="comments" fill="#10B981" name="Bình luận" />
                                <Bar dataKey="shares" fill="#F59E0B" name="Chia sẻ" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
