"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send } from "lucide-react";

export default function CreatePostForm() {
  const [postContent, setPostContent] = useState('');

  // Placeholder user
  const currentUser = {
    name: "John Doe",
    avatarUrl: "https://placehold.co/40x40.png",
  };
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    // Handle post submission logic here
    console.log("New post:", postContent);
    setPostContent('');
    // Typically, you'd show a toast notification here
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[80px] flex-grow resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-2"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <ImagePlus className="h-5 w-5 mr-1" /> Add Image/Video
            </Button>
            {/* Add more formatting buttons here if needed */}
          </div>
          <Button type="submit" onClick={handleSubmit} disabled={!postContent.trim()} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2"/>
            Post
          </Button>
        </CardFooter>
    </Card>
  );
}
