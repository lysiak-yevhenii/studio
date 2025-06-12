
"use client";

import Link from 'next/link';
import { Briefcase, Home, Users, UserCircle, Bell, Search as SearchIcon, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/auth/user-avatar';
// NavLink is kept for potential future use or for other parts of the header if needed
// import NavLink from './nav-link'; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

// These navItems are now primarily managed by FloatingVerticalNav for desktop
// and still used here for the mobile Sheet menu.
const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/connections", label: "Network", icon: Users },
  { href: "/world", label: "World", icon: Globe },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Briefcase className="h-7 w-7 text-primary group-hover:animate-pulse" />
          <span className="text-2xl font-headline font-bold text-primary">ProNetwork</span>
        </Link>

        {/* Desktop Search Bar - Centered */}
        <div className="hidden md:flex flex-grow max-w-xl items-center relative mx-auto">
          <Input type="search" placeholder="Search..." className="pl-10 h-9 rounded-full bg-background focus:bg-card" />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Desktop Navigation - Items moved to FloatingVerticalNav, UserAvatar remains */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))} */}
          <UserAvatar />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
           <Button variant="ghost" size="icon" className="mr-2" asChild>
             <Link href="/search"><SearchIcon className="h-5 w-5" /></Link>
           </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-4">
              <div className="flex flex-col space-y-2">
                <div className="mb-4">
                  <UserAvatar />
                </div>
                
                {/* Mobile search can be integrated here if desired or link to search page */}
                {/* <div className="relative mb-2">
                  <Input type="search" placeholder="Search..." className="pl-10 h-9 rounded-full bg-background focus:bg-card" />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div> */}

                {mobileNavItems.map((item) => (
                   <Button key={item.href} variant="ghost" className="justify-start text-base py-3 h-auto" asChild>
                    <Link href={item.href} className="flex items-center space-x-3 w-full">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
