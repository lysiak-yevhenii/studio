
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageCircle, Repeat, Send, OctagonAlert, Eye } from "lucide-react";

interface PostUser {
  name: string;
  avatarUrl: string;
  headline: string;
}

interface Post {
  id: string;
  user: PostUser;
  timestamp: string;
  content: string;
  image?: string;
  imageHint?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="relative pt-12 mb-6"> {/* Increased top padding for the top tab, mb-6 for spacing between posts */}
      
      {/* Top Action Tab (Yellow) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center space-x-1 p-1.5 bg-yellow-400 rounded-b-lg shadow-md min-w-[280px]">
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

      {/* Left Action Tab (Red) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20 flex flex-col items-center space-y-1.5 p-2 bg-red-600 text-white rounded-r-lg shadow-md w-12">
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-500/80 h-8 w-8 p-1.5" aria-label="Dislike">
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-500/80 h-8 w-8 p-1.5" aria-label="Report">
          <OctagonAlert className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Action Tab (Green) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20 flex flex-col items-center p-2 bg-green-500 text-white rounded-l-lg shadow-md w-12">
        <Button variant="ghost" size="icon" className="text-white hover:bg-green-400/80 h-8 w-8 p-1.5" aria-label="Like">
          <ThumbsUp className="h-5 w-5" />
        </Button>
        {post.likes > 0 && <span className="text-xs font-semibold mt-0.5">{post.likes}</span>}
      </div>

      {/* Main Post Card Content */}
      <Card className="shadow-lg overflow-hidden mx-auto max-w-xl sm:mx-14 bg-card text-card-foreground rounded-xl border-2 border-border">
        <CardHeader className="p-4">
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
        <CardContent className="p-4 pt-0">
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
    </div>
  );
}
