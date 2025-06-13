
import PostCard from "@/components/feed/post-card";
import type { Post } from "@/components/feed/post-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Globe, Users, Shuffle, ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";

// Placeholder data for mix feed posts
const mixFeedPosts: Post[] = [
  {
    id: "mf1",
    user: { name: "Random User One", avatarUrl: "https://placehold.co/40x40.png", headline: "Explorer of Ideas" },
    timestamp: "10m ago",
    content: "Just discovered this amazing new song! What's everyone listening to? #music #discovery",
    likes: 15,
    bookmarks: 2,
    comments: 2,
    shares: 1,
    views: 50,
    image: "https://placehold.co/600x380.png",
    imageHint: "music headphones"
  }
];

// Placeholder data for friends' posts
const friendsPosts: Post[] = [
  {
    id: "fp1",
    user: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png", headline: "Project Manager at Constructify" },
    timestamp: "1h ago",
    content: "Just finished a major project! So proud of the team. #construction #teamwork",
    likes: 75,
    bookmarks: 12,
    comments: 10,
    shares: 3,
    views: 150,
    image: "https://placehold.co/600x400.png",
    imageHint: "construction site"
  },
  {
    id: "fp2",
    user: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png", headline: "Marketing Lead at AdSolutions" },
    timestamp: "3h ago",
    content: "New marketing campaign launched today! Excited to see the results. #marketing #campaign",
    likes: 110,
    bookmarks: 20,
    comments: 22,
    shares: 9,
    views: 200,
  },
];

// Placeholder data for world posts
const worldPosts: Post[] = [
  {
    id: "wp1",
    user: { name: "Elon Musketeer", avatarUrl: "https://placehold.co/40x40.png", headline: "Innovator at XSpace" },
    timestamp: "30m ago",
    content: "Thinking about colonizing Mars... again. What are your thoughts? #space #innovation #mars",
    likes: 1050,
    bookmarks: 200,
    comments: 300,
    shares: 50,
    views: 5000,
    image: "https://placehold.co/600x400.png",
    imageHint: "mars landscape"
  },
  {
    id: "wp2",
    user: { name: "Chef Ramsey Gordon", avatarUrl: "https://placehold.co/40x40.png", headline: "Culinary Genius" },
    timestamp: "2h ago",
    content: "Just created the most amazing soufflé. Perfection! #food #cooking #masterchef",
    likes: 500,
    bookmarks: 80,
    comments: 80,
    shares: 20,
    views: 1200,
    image: "https://placehold.co/600x350.png",
    imageHint: "gourmet food"
  },
   {
    id: "wp3",
    user: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png", headline: "Software Engineer at TechCorp" },
    timestamp: "4h ago",
    content: "Excited to share my latest project on AI-driven networking! #AI #Networking #Innovation. Check out the details on my profile.",
    likes: 120,
    bookmarks: 22,
    comments: 15,
    shares: 7,
    views: 450,
    image: "https://placehold.co/600x400.png",
    imageHint: "tech project"
  },
  {
    id: "wp4",
    user: { name: "Travel Enthusiast", avatarUrl: "https://placehold.co/40x40.png", headline: "World Nomad" },
    timestamp: "5h ago",
    content: "Just booked a trip to Bali! Any recommendations? #travel #bali #adventure",
    likes: 300,
    bookmarks: 50,
    comments: 40,
    shares: 10,
    views: 800,
    image: "https://placehold.co/600x420.png",
    imageHint: "bali beach"
  },
  {
    id: "wp5",
    user: { name: "Fitness Guru", avatarUrl: "https://placehold.co/40x40.png", headline: "Health & Wellness Coach" },
    timestamp: "6h ago",
    content: "Morning workout done! Feeling energized. #fitness #healthylifestyle #motivation",
    likes: 180,
    bookmarks: 30,
    comments: 25,
    shares: 8,
    views: 600,
  },
  {
    id: "wp6",
    user: { name: "Book Worm", avatarUrl: "https://placehold.co/40x40.png", headline: "Avid Reader" },
    timestamp: "7h ago",
    content: "Just finished an amazing fantasy novel. Can't wait for the sequel! #books #reading #fantasy",
    likes: 90,
    bookmarks: 18,
    comments: 12,
    shares: 3,
    views: 350,
    image: "https://placehold.co/600x330.png",
    imageHint: "open book"
  },
  {
    id: "wp7",
    user: { name: "Gamer Pro", avatarUrl: "https://placehold.co/40x40.png", headline: "eSports Champion" },
    timestamp: "8h ago",
    content: "New high score! Who wants to challenge me? #gaming #esports #highscore",
    likes: 450,
    bookmarks: 70,
    comments: 60,
    shares: 15,
    views: 1500,
  }
];


export default function WorldPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="mix-feed" className="w-full">
        
        {/* Floating Navigation Block */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-xl p-1">
          <TabsList className="grid grid-cols-3">
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
        </div>

        {/* Tab Content - remains in normal flow */}
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
