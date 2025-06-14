
"use client";

import { useState, useEffect } from 'react';
import PostCard from "@/components/feed/post-card";
import type { Post } from "@/components/feed/post-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Users, Shuffle, LayoutGrid } from "lucide-react";
import CreatePostForm from "@/components/feed/create-post-form";

// Placeholder data for My Feed posts (posts by "Test User")
const myPosts: Post[] = [
  {
    id: "myPost1",
    user: { name: "Test User", avatarUrl: "https://placehold.co/40x40.png", headline: "ProNetwork User" },
    timestamp: "10m ago",
    content: "Just created my first post in 'My Feed'! #NewFeature",
    likes: 5,
    bookmarks: 2,
    comments: 0,
    shares: 0,
    views: 10,
    image: "https://placehold.co/600x300.png",
    imageHint: "celebration new"
  },
  {
    id: "myPost2",
    user: { name: "Test User", avatarUrl: "https://placehold.co/40x40.png", headline: "ProNetwork User" },
    timestamp: "1h ago",
    content: "Thinking about what to share next with my network. Any ideas?",
    likes: 12,
    bookmarks: 3,
    comments: 2,
    shares: 1,
    views: 30
  },
];

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
];

type FeedTabValue = 'my-feed' | 'mix-feed' | 'friends' | 'world';

export default function WorldPage() {
  const [activeTab, setActiveTab] = useState<FeedTabValue>('mix-feed');
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  const handleMyFeedDirectClick = () => {
    if (activeTab === 'my-feed') {
      // "My Feed" is already active, toggle the form.
      setShowCreatePostForm(prevShow => !prevShow);
    } else {
      // "My Feed" is not active. Switching to it.
      // Form should NOT show on this first switch.
      setShowCreatePostForm(false);
      setActiveTab('my-feed'); // This will trigger handleTabChange via Tabs onValueChange
    }
  };

  const handleTabChange = (value: string) => {
    const newTab = value as FeedTabValue;

    // If switching to any tab other than "My Feed", hide the form.
    // Form visibility for "My Feed" itself is handled by handleMyFeedDirectClick.
    if (newTab !== 'my-feed') {
      setShowCreatePostForm(false);
    }
    setActiveTab(newTab);
  };
  
  return (
    <div className="space-y-6">
      {showCreatePostForm && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl p-4">
          <CreatePostForm />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-xl p-1">
            <TabsList className="grid grid-cols-4">
                <TabsTrigger 
                  value="my-feed" 
                  className="flex items-center gap-2"
                  onClick={handleMyFeedDirectClick} // Handles direct clicks on "My Feed"
                >
                    <LayoutGrid className="h-4 w-4"/> 
                    My Feed
                </TabsTrigger>
                <TabsTrigger value="mix-feed" className="flex items-center gap-2">
                    <Shuffle className="h-4 w-4" /> Mix
                </TabsTrigger>
                <TabsTrigger value="friends" className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Friends
                </TabsTrigger>
                <TabsTrigger value="world" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> World
                </TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="my-feed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Posts & Creations</CardTitle>
              <CardDescription>
                Your personal posts and creations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-16">
              {myPosts.length > 0 ? (
                myPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">You haven't posted anything yet. Create your first post!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mix-feed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mix Feed</CardTitle>
              <CardDescription>Discover interesting posts from the community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-16">
              {mixFeedPosts.length > 0 ? (
                mixFeedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No posts in the mix feed right now.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Friends' Recent Posts</CardTitle>
              <CardDescription>See what your connections are sharing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-16">
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
              <CardDescription>Trending posts and content (personalization coming soon!).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-16">
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
