import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatsOverviewProps {
    totalStats: {
        videos: number;
        views: number;
        followers: number;
        engagement: number;
        monthlyGrowth: number;
    };
    videoStats: Array<{
        views: number;
        title: string;
    }>;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalStats, videoStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">Tổng video</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStats.videos}</div>
                    <p className="text-xs text-zinc-500 mt-1">+3 trong tháng này</p>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">
                        Tổng lượt xem
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStats.views.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-emerald-500 mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+{totalStats.monthlyGrowth}% từ tháng trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">
                        Người theo dõi
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {totalStats.followers.toLocaleString()}
                    </div>
                    <div className="flex items-center text-xs text-emerald-500 mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+45 trong tuần này</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">
                        Tỷ lệ tương tác
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStats.engagement}%</div>
                    <div className="flex items-center text-xs text-emerald-500 mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+1.2% từ tuần trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">
                        Video tốt nhất
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {videoStats[0]?.views.toLocaleString()}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 truncate">{videoStats[0]?.title}</p>
                </CardContent>
            </Card>
        </div>
    );
};
