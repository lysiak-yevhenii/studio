
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
  // isFlaming: true when collapsed (not expanded) AND not active (not hovered or pinned) AND mounted
  const isFlaming = hasMounted && !isExpanded && !isActive;

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };
  
  const currentLeftPositionClass = hasMounted
    ? (isActive ? visibleLeft : (isExpanded ? expandedHiddenLeftValue : collapsedHiddenLeftValue))
    : collapsedHiddenLeftValue;

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 shadow-xl rounded-xl p-1 flex flex-col items-center transition-all duration-300 ease-in-out",
        "border-2", 
        isExpanded ? "w-56 items-stretch" : "w-14 items-center",
        currentLeftPositionClass,
        // Default state styles (applied when not flaming)
        !isFlaming && "bg-card border-border",
        // Conditional styling for "flaming" state - now primarily driven by the .is-flaming class from globals.css
        isFlaming && 'is-flaming'
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handlePinToggle}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleExpand} 
        className={cn(
            "mb-1 self-center",
             isExpanded ? "w-auto px-2" : "w-10 h-10",
             isFlaming ? "hover:bg-white/20" : "" // Keep this direct hover style for the button itself
        )}
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <PanelLeftOpen className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
      </Button>
      <Separator 
        className={cn(
          "mb-1", 
          isExpanded ? "w-full" : "w-10/12", 
          isFlaming ? "flame-nav-separator" : "bg-border" // flame-nav-separator is styled in globals.css
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
            isFlaming={isFlaming} // Pass isFlaming to SidebarNavLink
          />
        ))}
      </nav>
    </div>
  );
}
