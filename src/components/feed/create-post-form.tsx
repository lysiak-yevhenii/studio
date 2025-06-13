
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send } from "lucide-react";

const DEFAULT_USER_DETAILS = {
  name: "John Doe",
  // avatarUrl is no longer needed here
};

export default function CreatePostForm() {
  const [postContent, setPostContent] = useState('');
  const [currentUserName, setCurrentUserName] = useState(DEFAULT_USER_DETAILS.name);

  useEffect(() => {
    // This code runs only on the client, after hydration
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUserName(parsedUser.name || DEFAULT_USER_DETAILS.name);
      } catch (e) {
        console.error("Failed to parse mockUser from localStorage for CreatePostForm", e);
        setCurrentUserName(DEFAULT_USER_DETAILS.name); // Fallback to default
      }
    } else {
      setCurrentUserName(DEFAULT_USER_DETAILS.name); // Fallback if no user
    }
  }, []);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    // Handle post submission logic here
    console.log("New post by", currentUserName, ":", postContent);
    setPostContent('');
    // Typically, you'd show a toast notification here
  };
  
  const currentUserFirstName = currentUserName.split(' ')[0] || "User";

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={`What's on your mind, ${currentUserFirstName}?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[80px] w-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-2"
          />
        </form>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <ImagePlus className="h-5 w-5 mr-1" /> Add Image/Video
            </Button>
          </div>
          <Button type="submit" onClick={handleSubmit} disabled={!postContent.trim()} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2"/>
            Post
          </Button>
        </CardFooter>
    </Card>
  );
}
