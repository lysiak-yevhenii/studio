
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

const collapsedHiddenLeftValue = "-left-[44px]"; // w-14 (56px) - 12px (p-1 * 2) = 44px for the icon part. Visible part 12px.
const expandedHiddenLeftValue = "-left-[212px]"; // w-56 (224px) - 12px = 212px. Visible part 12px.
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
    e.stopPropagation(); // Prevent pin toggle when clicking expand
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
        "flame-nav fixed top-1/2 -translate-y-1/2 z-40 border shadow-xl rounded-xl p-1 flex flex-col items-center transition-all duration-300 ease-in-out",
        "bg-rainbow-gradient bg-400 animate-rainbow-shift", // Added gradient and animation
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
        className="mb-1 self-center" 
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <PanelLeftOpen className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
      </Button>
      <Separator className={cn("mb-1 flame-nav-separator", isExpanded ? "w-full" : "w-10/12")} /> {/* Added flame-nav-separator */}
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
