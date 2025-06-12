
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const DEFAULT_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://placehold.co/400x400.png",
};

export default function UserAvatar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Indicate component has mounted on the client

    // This code runs only on the client, after hydration
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse mockUser from localStorage", e);
        setCurrentUser(DEFAULT_USER); // Fallback to default
      }
    } else {
      setCurrentUser(DEFAULT_USER); // Fallback if no user in localStorage
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Render a placeholder on the server and initial client render to avoid hydration mismatch
  if (!hasMounted) {
    return <div className="h-[400px] w-[400px]" />; // Placeholder with correct dimensions
  }

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    setCurrentUser(DEFAULT_USER); // Reset to default user on logout
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full">
           <Avatar className="h-[400px] w-[400px] cursor-pointer"> {/* Increased size */}
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
            <AvatarFallback className="text-9xl">{getInitials(currentUser.name)}</AvatarFallback> {/* Adjusted fallback text size */}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="font-medium">{currentUser.name}</div>
          <div className="text-xs text-muted-foreground">{currentUser.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
