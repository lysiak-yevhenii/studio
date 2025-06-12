
"use client";

import { useState, useEffect } from 'react';
import { Home, Users, Globe, UserCircle, Bell, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavLink from './sidebar-nav-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/connections", label: "Network", icon: Users },
  { href: "/world", label: "World", icon: Globe },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

const collapsedHiddenLeft = "-left-[36px]"; 
const expandedHiddenLeft = "-left-[204px]"; 
const visibleLeft = "left-2";

export default function FloatingVerticalNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isActive = isHovering || isPinned;

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsExpanded(!isExpanded);
  };

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  const currentLeftPositionClass = hasMounted
    ? (isActive ? visibleLeft : (isExpanded ? expandedHiddenLeft : collapsedHiddenLeft))
    : collapsedHiddenLeft;

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 bg-card border shadow-xl rounded-lg p-2 flex flex-col items-center transition-all duration-300 ease-in-out",
        isExpanded ? "w-56 items-stretch" : "w-14 items-center",
        currentLeftPositionClass
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handlePinToggle}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleExpand}
        className="mb-2 self-center"
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <PanelLeftOpen className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
      </Button>
      <Separator className={cn("mb-2", isExpanded ? "w-full" : "w-8/12")} />
      <nav className="flex flex-col space-y-1 w-full">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isExpanded={isExpanded}
          />
        ))}
      </nav>
    </div>
  );
}
