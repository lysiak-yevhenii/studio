
"use client";

import { useState, useEffect } from 'react';
import { Home, Users, Globe, PanelLeftOpen, PanelRightOpen, Eye } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavLink from './sidebar-nav-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/connections", label: "Network", icon: Users },
  { href: "/world", label: "World", icon: Globe },
  { href: "/world-eye", label: "World Eye", icon: Eye },
];

const collapsedHiddenLeftValue = "-left-[44px]";
const expandedHiddenLeftValue = "-left-[212px]";
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
  // isFlaming is true only on the client after mount, and if other conditions are met
  const isFlaming = hasMounted && !isExpanded && !isActive; 

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };
  
  // currentLeftPositionClass depends on hasMounted to avoid hydration issues for positioning
  const currentLeftPositionClass = hasMounted
    ? (isActive ? visibleLeft : (isExpanded ? expandedHiddenLeftValue : collapsedHiddenLeftValue))
    : collapsedHiddenLeftValue;

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 border shadow-xl rounded-xl p-1 flex flex-col items-center transition-all duration-300 ease-in-out",
        // Default background and border, rendered on server and initial client
        "bg-card border-border", 
        isExpanded ? "w-56 items-stretch" : "w-14 items-center",
        currentLeftPositionClass,
        // Conditionally add flaming classes only on client after mount if isFlaming is true
        // The `is-flaming` class is a marker for CSS overrides in globals.css
        // The Tailwind bg/animate classes apply the gradient directly
        isFlaming && 'is-flaming bg-rainbow-gradient bg-400 animate-rainbow-shift'
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handlePinToggle} 
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleExpand} 
        className="mb-1 self-center" 
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <PanelLeftOpen className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
      </Button>
      <Separator 
        className={cn(
          "mb-1", 
          // Default background for separator
          "bg-border", 
          isExpanded ? "w-full" : "w-10/12", 
          // Conditionally add flame-nav-separator class for CSS override
          isFlaming && "flame-nav-separator"
        )} 
      />
      <nav className="flex flex-col space-y-0.5 w-full">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.label}
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
