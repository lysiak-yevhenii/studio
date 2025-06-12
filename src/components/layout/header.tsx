
"use client";

import Link from 'next/link';
import { Briefcase, Home, Users, UserCircle, Bell, Search as SearchIcon, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/auth/user-avatar';
import NavLink from './nav-link';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const navItems = [
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
        <div className="hidden md:flex flex-grow max-w-xl items-center relative">
          <Input type="search" placeholder="Search..." className="pl-10 h-9 rounded-full bg-background focus:bg-card" />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
          <UserAvatar />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-7 w-7 text-primary" />
                  <span className="text-xl font-headline font-bold text-primary">ProNetwork</span>
                </Link>
                <div className="relative">
                  <Input type="search" placeholder="Search..." className="pl-10 h-9 rounded-full bg-background focus:bg-card" />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {navItems.map((item) => (
                   <Button key={item.href} variant="ghost" className="justify-start" asChild>
                    <Link href={item.href} className="flex items-center space-x-2 w-full">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
                <UserAvatar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
