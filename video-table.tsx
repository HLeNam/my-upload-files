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
import { Button } from "@/components/ui/button";
import { BarChart3, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VideoStats } from "@/hooks/use-dashboard-data"; // Adjust the import path as needed

interface VideoTableProps {
    videoStats: VideoStats[];
    onVideoSelect: (videoId: number) => void;
}

export const VideoTable: React.FC<VideoTableProps> = ({ videoStats, onVideoSelect }) => {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Tất cả video của tôi</CardTitle>
                <CardDescription className="text-zinc-400">
                    Quản lý và theo dõi hiệu suất của tất cả video
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                            <TableHead>Video</TableHead>
                            <TableHead className="text-right">Lượt xem</TableHead>
                            <TableHead className="text-right">Lượt thích</TableHead>
                            <TableHead className="text-right">Bình luận</TableHead>
                            <TableHead className="text-right">Chia sẻ</TableHead>
                            <TableHead className="text-right">Tăng trưởng</TableHead>
                            <TableHead className="text-center">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videoStats.map((video) => (
                            <TableRow
                                key={video.id}
                                className="hover:bg-zinc-800/50 border-zinc-800"
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-8 rounded overflow-hidden">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                width={48}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="truncate max-w-[150px]">
                                            {video.title}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    {video.views.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {video.likes.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {video.comments.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {video.shares.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <span className="text-emerald-500">+{video.growth}%</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Button
                                            onClick={() => onVideoSelect(video.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            Chi tiết
                                        </Button>
                                        <Link href={`/video-analytics/${video.id}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                                            >
                                                <BarChart3 className="w-4 h-4 mr-1" />
                                                Analytics
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
