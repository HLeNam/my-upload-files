import { VideoCardProps } from "@/app/(user)/_components/video-card";
import { useState, useMemo } from "react";

export type VideoStats = {
    id: number;
    title: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    publishDate: string;
    thumbnail: string;
    growth: number;
    platforms: {
        youtube: number;
        facebook: number;
        tiktok: number;
    };
    demographics: {
        gender: { male: number; female: number };
        age: { [key: string]: number };
        location: { [key: string]: number };
    };
};

export type VideoProps = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    source: string;
    duration: number;
    author: {
        name: string;
        id: number;
        username: string;
        avatar: string;
    };
};

export const useDashboardData = () => {
    const [dateRange, setDateRange] = useState("this-week");

    const totalStats = {
        videos: 36,
        views: 245690,
        followers: 1245,
        engagement: 8.7,
        monthlyGrowth: 14.5,
    };

    const recentVideos: VideoCardProps[] = [
        {
            id: 1,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
        {
            id: 2,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
        {
            id: 3,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
        {
            id: 4,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
        {
            id: 5,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
        {
            id: 6,
            title: "AI Portraits",
            description: "A collection of AI-generated portraits.",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            source: "https://cdn.pixabay.com/video/2025/03/11/263962_large.mp4",
            duration: 324,
            views: 123456,
            author: {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                avatar: "https://example.com/john-doe.jpg",
            },
        },
    ];

    const videoStats: VideoStats[] = [
        {
            id: 1,
            title: "AI Portraits Collection",
            views: 45280,
            likes: 3245,
            comments: 156,
            shares: 278,
            publishDate: "2025-05-28",
            thumbnail:
                "https://plus.unsplash.com/premium_photo-1747633943306-0379c57c22dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
            growth: 24,
            platforms: {
                youtube: 22380,
                facebook: 15670,
                tiktok: 7230,
            },
            demographics: {
                gender: { male: 64, female: 36 },
                age: { "18-24": 42, "25-34": 28, "35-44": 16, "45-54": 8, "55+": 6 },
                location: { "Việt Nam": 68, "Hoa Kỳ": 12, Singapore: 8, "Nhật Bản": 5, Khác: 7 },
            },
        },
        {
            id: 2,
            title: "Future City Concepts",
            views: 32450,
            likes: 2180,
            comments: 98,
            shares: 345,
            publishDate: "2025-05-15",
            thumbnail:
                "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1dHVyaXN0aWMlMjBjaXR5fGVufDB8fDB8fHww",
            growth: 18,
            platforms: {
                youtube: 15670,
                facebook: 10450,
                tiktok: 6330,
            },
            demographics: {
                gender: { male: 64, female: 36 },
                age: { "18-24": 42, "25-34": 28, "35-44": 16, "45-54": 8, "55+": 6 },
                location: { "Việt Nam": 68, "Hoa Kỳ": 12, Singapore: 8, "Nhật Bản": 5, Khác: 7 },
            },
        },
        {
            id: 3,
            title: "Abstract Animations",
            views: 28760,
            likes: 1920,
            comments: 87,
            shares: 125,
            publishDate: "2025-06-01",
            thumbnail:
                "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D",
            growth: 32,
            platforms: {
                youtube: 12450,
                facebook: 8970,
                tiktok: 7340,
            },
            demographics: {
                gender: { male: 64, female: 36 },
                age: { "18-24": 42, "25-34": 28, "35-44": 16, "45-54": 8, "55+": 6 },
                location: { "Việt Nam": 68, "Hoa Kỳ": 12, Singapore: 8, "Nhật Bản": 5, Khác: 7 },
            },
        },
        {
            id: 4,
            title: "Nature Through AI",
            views: 18450,
            likes: 1240,
            comments: 63,
            shares: 89,
            publishDate: "2025-06-05",
            thumbnail:
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww",
            growth: 12,
            platforms: {
                youtube: 8750,
                facebook: 5890,
                tiktok: 3810,
            },
            demographics: {
                gender: { male: 64, female: 36 },
                age: { "18-24": 42, "25-34": 28, "35-44": 16, "45-54": 8, "55+": 6 },
                location: { "Việt Nam": 68, "Hoa Kỳ": 12, Singapore: 8, "Nhật Bản": 5, Khác: 7 },
            },
        },
    ];

    const viewsTrendData = useMemo(
        () => [
            { day: "T2", views: 12450, engagement: 7.2 },
            { day: "T3", views: 14780, engagement: 8.1 },
            { day: "T4", views: 18920, engagement: 9.3 },
            { day: "T5", views: 15670, engagement: 7.8 },
            { day: "T6", views: 22340, engagement: 10.2 },
            { day: "T7", views: 25670, engagement: 11.4 },
            { day: "CN", views: 28750, engagement: 12.1 },
        ],
        []
    );

    const platformData = useMemo(
        () => [
            { name: "YouTube", value: 125670, color: "#ff0000" },
            { name: "Facebook", value: 95480, color: "#3b5998" },
            { name: "TikTok", value: 76340, color: "#69c9d0" },
        ],
        []
    );

    return {
        dateRange,
        setDateRange,
        totalStats,
        recentVideos,
        videoStats,
        viewsTrendData,
        platformData,
    };
};
