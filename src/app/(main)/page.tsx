
import CreatePostForm from "@/components/feed/create-post-form";
import PostCard from "@/components/feed/post-card";
// import AiConnectionSuggestions from "@/components/connections/ai-connection-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Placeholder data for posts - now attributed to "Test User"
const posts = [
  {
    id: "1",
    user: { name: "Test User", avatarUrl: "https://placehold.co/40x40.png", headline: "ProNetwork User" },
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
    user: { name: "Test User", avatarUrl: "https://placehold.co/40x40.png", headline: "ProNetwork User" },
    timestamp: "5h ago",
    content: "Just attended an amazing conference on sustainable development. Learned so much! #Sustainability #Development #Conference",
    likes: 85,
    comments: 5,
    shares: 2,
  },
  {
    id: "3",
    user: { name: "Test User", avatarUrl: "https://placehold.co/40x40.png", headline: "ProNetwork User" },
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
    <div className="w-full">
      {/* Main content: Create Post and Feed, centered with a max-width */}
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <CreatePostForm />
        <Separator />
        <h2 className="text-xl font-semibold text-foreground">My Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
