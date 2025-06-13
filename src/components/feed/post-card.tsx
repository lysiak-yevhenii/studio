
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageCircle, Repeat, Send, OctagonAlert, Eye, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostUser {
  name: string;
  avatarUrl: string;
  headline: string;
}

export interface Post {
  id: string;
  user: PostUser;
  timestamp: string;
  content: string;
  image?: string;
  imageHint?: string;
  likes: number;
  bookmarks: number; // Added bookmarks
  comments: number;
  shares: number;
  views: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentBookmarks, setCurrentBookmarks] = useState(post.bookmarks);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const bottomTabHeightRem = 2.25; 
  const bottomTabPosition = `-${bottomTabHeightRem - 0.5}rem`; 

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setCurrentLikes(currentLikes - 1);
    } else {
      setIsLiked(true);
      setCurrentLikes(currentLikes + 1);
      if (isDisliked) {
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) { 
        setIsLiked(false);
        setCurrentLikes(currentLikes - 1); 
      }
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      setCurrentBookmarks(currentBookmarks - 1);
    } else {
      setIsBookmarked(true);
      setCurrentBookmarks(currentBookmarks + 1);
    }
  };

  return (
    <Card className="relative shadow-lg overflow-visible mx-auto max-w-2xl rounded-xl border-2 border-border mb-10 mt-8">
      
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center space-x-1 p-1.5 bg-yellow-400 rounded-t-xl rounded-b-md min-w-[280px]"
        style={{ bottom: bottomTabPosition }} 
      >
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-neutral-700 hover:bg-yellow-300/80 h-auto px-2 py-1">
          <Repeat className="h-4 w-4" />
          <span className="text-xs font-medium">{post.shares}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-neutral-700 hover:bg-yellow-300/80 h-auto px-2 py-1">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-medium">{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-neutral-700 hover:bg-yellow-300/80 h-auto px-2 py-1">
          <Eye className="h-4 w-4" />
          <span className="text-xs font-medium">{post.views}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-neutral-700 hover:bg-yellow-300/80 h-auto px-2 py-1">
          <Send className="h-4 w-4" />
          <span className="text-xs font-medium">Send</span>
        </Button>
      </div>

      {/* Left Action Tab (Red - Dislike/Report) */}
      <div className={cn(
        "absolute top-0 bottom-0 -left-[46px] z-10 flex flex-col items-center justify-center space-y-1.5 p-2 w-12 rounded-l-xl",
        isDisliked 
          ? 'bg-red-600 border-2 border-red-600 text-white' 
          : 'bg-card border-2 border-red-600'
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8 p-1.5",
            isDisliked ? "text-white hover:bg-white/20" : "text-red-600 hover:bg-red-600/10"
          )} 
          aria-label="Dislike"
          onClick={handleDislike}
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
             "h-8 w-8 p-1.5",
             isDisliked ? "text-white hover:bg-white/20" : "text-red-600 hover:bg-red-600/10"
          )} 
          aria-label="Report"
        >
          <OctagonAlert className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Action Tab (Green - Like/Bookmark) */}
      <div className={cn(
        "absolute top-0 bottom-0 -right-[46px] z-10 flex flex-col items-center justify-around p-2 w-12 rounded-r-xl", // justify-around for spacing
         isLiked 
          ? 'bg-green-500 border-2 border-green-500 text-white'
          : 'bg-card border-2 border-green-500'
      )}>
        <div className="flex flex-col items-center">
            <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
                "h-8 w-8 p-1.5", 
                isLiked ? "text-white hover:bg-white/20" : "text-green-500 hover:bg-green-500/10"
            )} 
            aria-label="Like"
            onClick={handleLike}
            >
            <ThumbsUp className="h-5 w-5" />
            </Button>
            {currentLikes > 0 && <span className={cn(
            "text-xs font-semibold mt-0.5",
            isLiked ? "text-white" : "text-green-500"
            )}>{currentLikes}</span>}
        </div>
        
        <div className="flex flex-col items-center">
            <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
                "h-8 w-8 p-1.5", 
                isLiked ? "text-white hover:bg-white/20" : "text-green-500 hover:bg-green-500/10" // Bookmark icon color matches tab state
            )} 
            aria-label="Bookmark"
            onClick={handleBookmark}
            >
            <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
            {currentBookmarks > 0 && <span className={cn(
            "text-xs font-semibold mt-0.5",
            isLiked ? "text-white" : "text-green-500" // Bookmark count color matches tab state
            )}>{currentBookmarks}</span>}
        </div>
      </div>

      <CardHeader className="p-4 pt-6 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatarUrl} alt={post.user.name} data-ai-hint="person face" />
            <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold leading-tight">{post.user.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{post.user.headline}</CardDescription>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-8"> 
        <div className="space-y-3 min-h-[36px]">
          <p className="text-sm text-foreground whitespace-pre-wrap">{post.content}</p>
          {post.image && (
            <div className="mt-3 rounded-lg overflow-hidden border">
              <Image 
                src={post.image} 
                alt="Post image" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover" 
                data-ai-hint={post.imageHint || "social media image"}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
