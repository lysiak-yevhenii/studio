
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <Card className="shadow-sm overflow-hidden">
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
      </CardHeader>
      <CardContent className="p-4 pt-0">
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
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col items-start space-y-2">
        <div className="flex justify-between w-full text-xs text-muted-foreground">
            <span>{post.likes} Likes</span>
            <div className="space-x-2">
                <span>{post.comments} Comments</span>
                <span>{post.shares} Shares</span>
            </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-1">
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <ThumbsUp className="h-4 w-4 mr-1.5" /> Like
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <MessageCircle className="h-4 w-4 mr-1.5" /> Comment
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Repeat className="h-4 w-4 mr-1.5" /> Repost
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Send className="h-4 w-4 mr-1.5" /> Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
