"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import VideoCard from "@/app/(user)/_components/video-card";

import { StatsOverview } from "@/app/(user)/dashboard/_components/stats-overview";
import {
    PlatformComparisonChart,
    PlatformPieChart,
    ViewsTrendChart,
} from "@/components/charts/dashboard-charts";
import { VideoDetailModal } from "@/app/(user)/dashboard/_components/video-detail-modal";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { VideoTable } from "@/app/(user)/dashboard/_components/video-table";
import { PlatformStats } from "@/app/(user)/dashboard/_components/platform-stats";
import { AnalyticsTab } from "@/app/(user)/dashboard/_components/analytics-tab";

export default function Dashboard() {
    const {
        dateRange,
        setDateRange,
        totalStats,
        recentVideos,
        videoStats,
        viewsTrendData,
        platformData,
    } = useDashboardData();

    const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

    const platformComparisonData = [
        { platform: "YouTube", views: 125670, engagement: 7.8, subscribers: 1245 },
        { platform: "Facebook", views: 95480, engagement: 9.2, subscribers: 870 },
        { platform: "TikTok", views: 76340, engagement: 12.4, subscribers: 580 },
    ];

    return (
        <div className="min-h-screen text-white pb-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold mb-6">Thống kê nội dung</h1>

                <div className="mb-8">
                    <Select defaultValue={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-700">
                            <SelectValue placeholder="Chọn khoảng thời gian" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                            <SelectItem value="today">Hôm nay</SelectItem>
                            <SelectItem value="yesterday">Hôm qua</SelectItem>
                            <SelectItem value="this-week">Tuần này</SelectItem>
                            <SelectItem value="this-month">Tháng này</SelectItem>
                            <SelectItem value="last-month">Tháng trước</SelectItem>
                            <SelectItem value="all-time">Tất cả</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <StatsOverview totalStats={totalStats} videoStats={videoStats} />

                <Tabs defaultValue="overview" className="mb-8">
                    <TabsList className="bg-zinc-900 border border-zinc-800">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800">
                            Tổng quan
                        </TabsTrigger>
                        <TabsTrigger value="videos" className="data-[state=active]:bg-zinc-800">
                            Video của tôi
                        </TabsTrigger>
                        <TabsTrigger value="platforms" className="data-[state=active]:bg-zinc-800">
                            Theo nền tảng
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="data-[state=active]:bg-zinc-800">
                            Phân tích chi tiết
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">
                                        Lượt xem theo thời gian
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Số liệu thống kê 7 ngày qua
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ViewsTrendChart data={viewsTrendData} />
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">
                                        Phân bổ theo nền tảng
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Lượt xem theo nền tảng
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <PlatformPieChart data={platformData} />
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Video nổi bật
                                </CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Video có hiệu suất tốt nhất
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {recentVideos.map((video) => (
                                        <VideoCard key={video.id} video={video} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="videos" className="mt-6">
                        <VideoTable videoStats={videoStats} onVideoSelect={setSelectedVideo} />

                        {selectedVideo && (
                            <VideoDetailModal
                                video={videoStats.find((v) => v.id === selectedVideo)!}
                                onClose={() => setSelectedVideo(null)}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="platforms" className="mt-6">
                        <PlatformStats />

                        <Card className="bg-zinc-900 border-zinc-800 mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    So sánh hiệu suất theo nền tảng
                                </CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Phân tích lượt xem và tương tác trên các nền tảng
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PlatformComparisonChart data={platformComparisonData} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="mt-6">
                        <AnalyticsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
