import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, ThumbsUp, MessageSquare, Share2, Youtube, Facebook } from "lucide-react";
import Image from "next/image";
import { VideoStats } from "@/hooks/use-dashboard-data"; // Adjust the import path as needed

interface VideoDetailModalProps {
    video: VideoStats;
    onClose: () => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({ video, onClose }) => {
    return (
        <Card className="bg-zinc-900 border-zinc-800 mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-semibold">{video.title}</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Phát hành: {video.publishDate}
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800"
                    onClick={onClose}
                >
                    Đóng
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Video thumbnail và stats */}
                    <div>
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <Image
                                src={video.thumbnail}
                                width={600}
                                height={338}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-800 p-4 rounded-lg">
                                <div className="flex items-center text-zinc-400 mb-1">
                                    <Eye className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Lượt xem</span>
                                </div>
                                <div className="text-xl font-bold">
                                    {video.views.toLocaleString()}
                                </div>
                            </div>

                            <div className="bg-zinc-800 p-4 rounded-lg">
                                <div className="flex items-center text-zinc-400 mb-1">
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Lượt thích</span>
                                </div>
                                <div className="text-xl font-bold">
                                    {video.likes.toLocaleString()}
                                </div>
                            </div>

                            <div className="bg-zinc-800 p-4 rounded-lg">
                                <div className="flex items-center text-zinc-400 mb-1">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Bình luận</span>
                                </div>
                                <div className="text-xl font-bold">
                                    {video.comments.toLocaleString()}
                                </div>
                            </div>

                            <div className="bg-zinc-800 p-4 rounded-lg">
                                <div className="flex items-center text-zinc-400 mb-1">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Chia sẻ</span>
                                </div>
                                <div className="text-xl font-bold">
                                    {video.shares.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform performance và demographics */}
                    <div>
                        <h3 className="font-semibold mb-4">Hiệu suất theo nền tảng</h3>

                        {/* YouTube */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                    <Youtube className="w-4 h-4 text-red-600 mr-2" />
                                    <span>YouTube</span>
                                </div>
                                <span>{video.platforms.youtube.toLocaleString()}</span>
                            </div>
                            <Progress
                                value={(video.platforms.youtube / video.views) * 100}
                                className="h-2 bg-zinc-800"
                                indicatorClassName="bg-red-600"
                            />
                        </div>

                        {/* Facebook */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                    <Facebook className="w-4 h-4 text-blue-600 mr-2" />
                                    <span>Facebook</span>
                                </div>
                                <span>{video.platforms.facebook.toLocaleString()}</span>
                            </div>
                            <Progress
                                value={(video.platforms.facebook / video.views) * 100}
                                className="h-2 bg-zinc-800"
                                indicatorClassName="bg-blue-600"
                            />
                        </div>

                        {/* TikTok */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                    >
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 013.83-4.33v-3.7a6.37 6.37 0 00-5.94 9.94 6.37 6.37 0 0010.98-4.4s0-.08 0-.12V9.4a8.16 8.16 0 003.55.77v-3.48z" />
                                    </svg>
                                    <span>TikTok</span>
                                </div>
                                <span>{video.platforms.tiktok.toLocaleString()}</span>
                            </div>
                            <Progress
                                value={(video.platforms.tiktok / video.views) * 100}
                                className="h-2 bg-zinc-800"
                                indicatorClassName="bg-zinc-300"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
