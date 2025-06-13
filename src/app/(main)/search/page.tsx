
"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Users, FileText, Briefcase, AvatarFallback, AvatarImage, Avatar } from "lucide-react";
import ConnectionCard from '@/components/connections/connection-card';
import PostCard from '@/components/feed/post-card';
import type { Post } from '@/components/feed/post-card';


// Placeholder search results
const peopleResults = [
  { id: "p1", name: "Samuel Green", headline: "AI Researcher at DeepMind", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 15 },
  { id: "p2", name: "Samantha Blue", headline: "Marketing Director at ProNetwork", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 25 },
];
const postResults: Post[] = [
    { id: "post1", user: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png", headline: "Software Engineer"}, timestamp: "2h ago", content: "Discussing the impact of search algorithms on professional networking. #Search #AI", likes: 50, bookmarks: 8, comments: 5, shares: 2, views: 120 },
];
const companyResults = [
    {id: "c1", name: "ProNetwork Inc.", industry: "Technology", avatarUrl: "https://placehold.co/80x80.png", description: "The leading professional networking platform."},
    {id: "c2", name: "Searchify Ltd.", industry: "Software", avatarUrl: "https://placehold.co/80x80.png", description: "Advanced search solutions for enterprises."},
];


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("people");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here, for now it's just for display
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
              <SearchIcon className="mr-3 h-7 w-7 text-primary" />
              Search ProNetwork
          </CardTitle>
          <CardDescription>Find professionals, posts, companies, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow h-10 text-base"
            />
            <Button type="submit" className="h-10 bg-primary hover:bg-primary/90">
                <SearchIcon className="h-5 w-5 mr-2 md:hidden" />
                <span className="hidden md:inline">Search</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchTerm && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="people" className="flex items-center gap-1"><Users className="h-4 w-4" /> People</TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-1"><FileText className="h-4 w-4" /> Posts</TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="mt-4">
            <h3 className="text-xl font-semibold mb-4">People matching "{searchTerm}"</h3>
            {peopleResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {peopleResults.map(person => <ConnectionCard key={person.id} connection={person} type="suggestion" />)}
              </div>
            ) : (
              <p className="text-muted-foreground">No people found.</p>
            )}
          </TabsContent>

          <TabsContent value="posts" className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Posts matching "{searchTerm}"</h3>
            {postResults.length > 0 ? (
              <div className="space-y-4">
                {postResults.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            ) : (
              <p className="text-muted-foreground">No posts found.</p>
            )}
          </TabsContent>

          <TabsContent value="companies" className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Companies matching "{searchTerm}"</h3>
             {companyResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyResults.map(company => (
                        <Card key={company.id}>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={company.avatarUrl} alt={company.name} data-ai-hint="company logo"/>
                                    <AvatarFallback>{company.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{company.name}</CardTitle>
                                    <CardDescription className="text-xs">{company.industry}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">{company.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">View Company</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
              <p className="text-muted-foreground">No companies found.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
       {!searchTerm && <p className="text-center text-muted-foreground mt-8">Enter a search term to see results.</p>}
    </div>
  );
}
