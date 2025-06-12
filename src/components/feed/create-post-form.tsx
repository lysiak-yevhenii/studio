
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send } from "lucide-react";

const DEFAULT_USER_DETAILS = {
  name: "John Doe",
  avatarUrl: "https://placehold.co/40x40.png",
};

export default function CreatePostForm() {
  const [postContent, setPostContent] = useState('');
  const [currentUserDetails, setCurrentUserDetails] = useState(DEFAULT_USER_DETAILS);

  useEffect(() => {
    // This code runs only on the client, after hydration
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUserDetails({
          name: parsedUser.name || DEFAULT_USER_DETAILS.name,
          avatarUrl: parsedUser.avatarUrl || DEFAULT_USER_DETAILS.avatarUrl,
        });
      } catch (e) {
        console.error("Failed to parse mockUser from localStorage for CreatePostForm", e);
        setCurrentUserDetails(DEFAULT_USER_DETAILS); // Fallback to default
      }
    } else {
      setCurrentUserDetails(DEFAULT_USER_DETAILS); // Fallback if no user
    }
  }, []);
  
  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    // Handle post submission logic here
    console.log("New post by", currentUserDetails.name, ":", postContent);
    setPostContent('');
    // Typically, you'd show a toast notification here
  };
  
  const currentUserName = currentUserDetails.name;
  const currentUserFirstName = currentUserName.split(' ')[0] || "User";

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUserDetails.avatarUrl} alt={currentUserName} data-ai-hint="person face" />
              <AvatarFallback>{getInitials(currentUserName)}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder={`What's on your mind, ${currentUserFirstName}?`}
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
          </div>
          <Button type="submit" onClick={handleSubmit} disabled={!postContent.trim()} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2"/>
            Post
          </Button>
        </CardFooter>
    </Card>
  );
}
