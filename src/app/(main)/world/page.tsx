
import PostCard from "@/components/feed/post-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Users } from "lucide-react";

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
        </CardHeader>
      </Card>

      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Friends Feed
          </TabsTrigger>
          <TabsTrigger value="world" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> World Feed
          </TabsTrigger>
        </TabsList>

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
