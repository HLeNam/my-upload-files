import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Youtube, Facebook } from "lucide-react";

export const PlatformStats: React.FC = () => {
    const platforms = [
        {
            name: "YouTube",
            icon: Youtube,
            color: "text-red-600",
            bgColor: "bg-red-600",
            stats: {
                totalViews: 125670,
                subscribers: 1245,
                engagement: 7.8,
                viewsProgress: 85,
                subscribersProgress: 65,
                engagementProgress: 40,
            },
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "text-blue-600",
            bgColor: "bg-blue-600",
            stats: {
                totalViews: 95480,
                subscribers: 870,
                engagement: 9.2,
                viewsProgress: 65,
                subscribersProgress: 48,
                engagementProgress: 55,
            },
        },
        {
            name: "TikTok",
            icon: null,
            color: "text-white",
            bgColor: "bg-zinc-300",
            stats: {
                totalViews: 76340,
                subscribers: 580,
                engagement: 12.4,
                viewsProgress: 52,
                subscribersProgress: 35,
                engagementProgress: 70,
            },
        },
    ];

    const TikTokIcon = () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 013.83-4.33v-3.7a6.37 6.37 0 00-5.94 9.94 6.37 6.37 0 0010.98-4.4s0-.08 0-.12V9.4a8.16 8.16 0 003.55.77v-3.48z" />
        </svg>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => {
                const IconComponent = platform.icon || TikTokIcon;
                return (
                    <Card key={platform.name} className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center pb-2">
                            <IconComponent className={`w-5 h-5 ${platform.color} mr-2`} />
                            <CardTitle className="text-lg font-semibold">{platform.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-zinc-400 text-sm">Tổng lượt xem</span>
                                        <span className="text-sm">
                                            {platform.stats.totalViews.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress
                                        value={platform.stats.viewsProgress}
                                        className="h-1 bg-zinc-800"
                                        indicatorClassName={platform.bgColor}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-zinc-400 text-sm">
                                            {platform.name === "YouTube"
                                                ? "Người đăng ký"
                                                : "Người theo dõi"}
                                        </span>
                                        <span className="text-sm">
                                            {platform.stats.subscribers.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress
                                        value={platform.stats.subscribersProgress}
                                        className="h-1 bg-zinc-800"
                                        indicatorClassName={platform.bgColor}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-zinc-400 text-sm">
                                            Tỷ lệ tương tác
                                        </span>
                                        <span className="text-sm">
                                            {platform.stats.engagement}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={platform.stats.engagementProgress}
                                        className="h-1 bg-zinc-800"
                                        indicatorClassName={platform.bgColor}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        variant="outline"
                                        className="w-full border-zinc-700 hover:bg-zinc-800"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
