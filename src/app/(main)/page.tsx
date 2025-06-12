
import CreatePostForm from "@/components/feed/create-post-form";
import PostCard from "@/components/feed/post-card";
// import AiConnectionSuggestions from "@/components/connections/ai-connection-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Placeholder data for posts
const posts = [
  {
    id: "1",
    user: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png", headline: "Software Engineer at TechCorp" },
    timestamp: "2h ago",
    content: "Excited to share my latest project on AI-driven networking! #AI #Networking #Innovation. Check out the details on my profile.",
    likes: 120,
    comments: 15,
    shares: 7,
    image: "https://placehold.co/600x400.png",
    imageHint: "tech project"
  },
  {
    id: "2",
    user: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png", headline: "Project Manager at Constructify" },
    timestamp: "5h ago",
    content: "Just attended an amazing conference on sustainable development. Learned so much! #Sustainability #Development #Conference",
    likes: 85,
    comments: 5,
    shares: 2,
  },
  {
    id: "3",
    user: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png", headline: "UX Designer at CreativeMinds" },
    timestamp: "1d ago",
    content: "Exploring new design trends for 2024. What are your favorite resources for inspiration? #UXDesign #Trends #Inspiration",
    likes: 230,
    comments: 42,
    shares: 11,
    image: "https://placehold.co/600x300.png",
    imageHint: "design trends"
  },
];

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main content: Create Post and Feed */}
      <div className="md:col-span-2 space-y-6">
        <CreatePostForm />
        <Separator />
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Sidebar: Connection Suggestions */}
      <aside className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Smart Connection Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <AiConnectionSuggestions /> */}
            <p className="text-sm text-muted-foreground">AI connection suggestions are temporarily disabled.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">People You May Know</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for "People You May Know" */}
            <p className="text-sm text-muted-foreground">Feature coming soon.</p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
