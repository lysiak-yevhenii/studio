
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ThumbsUp, MessageCircle, Repeat, Send, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="relative mb-6">
      {/* Right Action Buttons Tab */}
      <div className="absolute top-6 right-0 z-30 w-16 bg-card border border-border rounded-lg shadow-lg p-1 flex flex-col items-center space-y-1">
        {/* Like Button & Count */}
        <div className="flex flex-col items-center space-y-0.5">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 w-10 h-10">
            <ThumbsUp className="h-5 w-5" />
          </Button>
          {post.likes > 0 && <span className="text-xs text-muted-foreground">{post.likes}</span>}
        </div>
        {/* Send Button */}
        <div className="flex flex-col items-center space-y-0.5">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-indigo-600 hover:bg-indigo-600/10 w-10 h-10">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Post Card */}
      <Card className="shadow-sm overflow-hidden mr-16">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
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
            <div className="flex items-center space-x-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-green-600 hover:bg-green-600/10">
                <Repeat className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Post</DropdownMenuItem>
                  <DropdownMenuItem>Report Post</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        <CardFooter className="p-4 pt-2 flex items-center space-x-4 text-xs text-muted-foreground">
            {post.comments > 0 && <span>{post.comments} Comments</span>}
            {post.shares > 0 && <span>{post.shares} Reposts</span>}
        </CardFooter>
      </Card>
    </div>
  );
}
