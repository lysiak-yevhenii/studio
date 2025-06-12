
import PostCard from "@/components/feed/post-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Globe, Users, Shuffle, ThumbsUp, ThumbsDown, PlusCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';

// Placeholder data for mix feed posts
const mixFeedPosts = [
  {
    id: "mf1",
    user: { name: "Random User One", avatarUrl: "https://placehold.co/40x40.png", headline: "Explorer of Ideas" },
    timestamp: "10m ago",
    content: "Just discovered this amazing new song! What's everyone listening to? #music #discovery",
    likes: 15,
    comments: 2,
    shares: 1,
    image: "https://placehold.co/600x380.png",
    imageHint: "music headphones"
  }
];

// Placeholder data for friends' posts
const friendsPosts = [
  {
    id: "fp1",
    user: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png", headline: "Project Manager at Constructify" },
    timestamp: "1h ago",
    content: "Just finished a major project! So proud of the team. #construction #teamwork",
    likes: 75,
    comments: 10,
    shares: 3,
    image: "https://placehold.co/600x400.png",
    imageHint: "construction site"
  },
  {
    id: "fp2",
    user: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png", headline: "Marketing Lead at AdSolutions" },
    timestamp: "3h ago",
    content: "New marketing campaign launched today! Excited to see the results. #marketing #campaign",
    likes: 110,
    comments: 22,
    shares: 9,
  },
];

// Placeholder data for world posts (can reuse or create new ones)
const worldPosts = [
  {
    id: "wp1",
    user: { name: "Elon Musketeer", avatarUrl: "https://placehold.co/40x40.png", headline: "Innovator at XSpace" },
    timestamp: "30m ago",
    content: "Thinking about colonizing Mars... again. What are your thoughts? #space #innovation #mars",
    likes: 1050,
    comments: 300,
    shares: 50,
    image: "https://placehold.co/600x400.png",
    imageHint: "mars landscape"
  },
  {
    id: "wp2",
    user: { name: "Chef Ramsey Gordon", avatarUrl: "https://placehold.co/40x40.png", headline: "Culinary Genius" },
    timestamp: "2h ago",
    content: "Just created the most amazing soufflé. Perfection! #food #cooking #masterchef",
    likes: 500,
    comments: 80,
    shares: 20,
    image: "https://placehold.co/600x350.png",
    imageHint: "gourmet food"
  },
   {
    id: "wp3",
    user: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png", headline: "Software Engineer at TechCorp" },
    timestamp: "4h ago",
    content: "Excited to share my latest project on AI-driven networking! #AI #Networking #Innovation. Check out the details on my profile.",
    likes: 120,
    comments: 15,
    shares: 7,
    image: "https://placehold.co/600x400.png",
    imageHint: "tech project"
  },
];

// Placeholder data for reels - using rectangular placeholder images
const reels = [
  { id: "r1", userName: "You", imageUrl: "https://placehold.co/100x160.png", type: "add" },
  { id: "r2", userName: "Alice", imageUrl: "https://placehold.co/100x160.png", type: "view" },
  { id: "r3", userName: "Bob", imageUrl: "https://placehold.co/100x160.png", type: "view" },
  { id: "r4", userName: "Charlie", imageUrl: "https://placehold.co/100x160.png", type: "view" },
  { id: "r5", userName: "Diana", imageUrl: "https://placehold.co/100x160.png", type: "view" },
  { id: "r6", userName: "Eve", imageUrl: "https://placehold.co/100x160.png", type: "view" },
  { id: "r7", userName: "Frank", imageUrl: "https://placehold.co/100x160.png", type: "view" },
];

export default function WorldPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Globe className="mr-3 h-7 w-7 text-primary" />
            Discover The World
          </CardTitle>
          <CardDescription>Explore posts from your network and beyond.</CardDescription>
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Reels</h3>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                {reels.map(reel => (
                  <div key={reel.id} className="flex flex-col items-center space-y-1 cursor-pointer group">
                    <div 
                      className={`relative w-24 h-36 rounded-md overflow-hidden border-2 group-hover:border-primary
                        ${reel.type === 'add' ? 'border-dashed border-muted-foreground flex items-center justify-center bg-muted/30 hover:bg-muted/50' : 'border-primary'}`}
                    >
                      {reel.type === 'view' && (
                        <Image 
                          src={reel.imageUrl} 
                          alt={`${reel.userName}'s reel`} 
                          layout="fill" 
                          objectFit="cover" 
                          data-ai-hint="person reel" 
                        />
                      )}
                      {reel.type === 'add' && (
                        <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary">{reel.userName}</span>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="mix-feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mix-feed" className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" /> Mix Feed
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Friends Feed
          </TabsTrigger>
          <TabsTrigger value="world" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> World Feed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mix-feed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mix Feed</CardTitle>
              <CardDescription>Swipe through posts. Like or pass!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mixFeedPosts.length > 0 ? (
                mixFeedPosts.map(post => (
                  <div key={post.id} className="space-y-3">
                    <PostCard post={post} />
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                        <ThumbsDown className="mr-2 h-4 w-4" /> Pass (Swipe Right)
                      </Button>
                      <Button variant="outline" className="border-accent text-accent-foreground hover:bg-accent/10 hover:text-accent">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Like (Swipe Left)
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No posts in the mix feed right now.</p>
              )}
               <p className="text-xs text-muted-foreground text-center pt-4">Full swipe functionality coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Friends' Recent Posts</CardTitle>
              <CardDescription>See what your connections are sharing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {friendsPosts.length > 0 ? (
                friendsPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No posts from friends yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="world" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Worldwide Activity</CardTitle>
              <CardDescription>Trending posts and content based on your interests (personalization coming soon!).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {worldPosts.length > 0 ? (
                worldPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No world posts to display right now.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
