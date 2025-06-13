
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

  const bottomTabHeightRem = 2.25; // Approximate height of the yellow bar
  const bottomTabPosition = `-${bottomTabHeightRem - 0.5}rem`; 

  return (
    <Card className="relative shadow-lg overflow-visible mx-auto max-w-xl rounded-xl border-2 border-border mb-10 mt-8">
      
      {/* Yellow Action Tab - Now at the Bottom */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center space-x-1 p-1.5 bg-yellow-400 rounded-md shadow-md min-w-[280px]"
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

      {/* Left Action Tab (Red) - Full Height */}
      <div className="absolute top-0 bottom-0 -left-12 z-10 flex flex-col items-center justify-center space-y-1.5 p-2 bg-red-600 text-white rounded-lg shadow-md w-12">
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-500/80 h-8 w-8 p-1.5" aria-label="Dislike">
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-500/80 h-8 w-8 p-1.5" aria-label="Report">
          <OctagonAlert className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Action Tab (Green) - Full Height */}
      <div className="absolute top-0 bottom-0 -right-12 z-10 flex flex-col items-center justify-center p-2 bg-green-500 text-white rounded-lg shadow-md w-12">
        <Button variant="ghost" size="icon" className="text-white hover:bg-green-400/80 h-8 w-8 p-1.5" aria-label="Like">
          <ThumbsUp className="h-5 w-5" />
        </Button>
        {post.likes > 0 && <span className="text-xs font-semibold mt-0.5">{post.likes}</span>}
      </div>

      <CardHeader className="p-4 pt-6 pb-2"> {/* Adjusted padding slightly if needed for bottom bar */}
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
      <CardContent className="p-4 pt-2 pb-8"> {/* Increased bottom padding for space above yellow bar */}
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

