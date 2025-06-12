
"use client";

import { useState } from 'react';
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

// w-14 is 3.5rem (56px), w-56 is 14rem (224px)
// Visible part when hidden: 20px
const collapsedHiddenLeft = "-left-[36px]"; // 56px - 20px = 36px
const expandedHiddenLeft = "-left-[204px]"; // 224px - 20px = 204px
const visibleLeft = "left-2";

export default function FloatingVerticalNav() {
  const [isExpanded, setIsExpanded] = useState(false); // Controls width (icons vs icons+text)
  const [isHovering, setIsHovering] = useState(false); // Controls hover-based slide
  const [isPinned, setIsPinned] = useState(false); // Controls click-based pinned slide

  const isActive = isHovering || isPinned;

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pinning/unpinning when clicking this button
    setIsExpanded(!isExpanded);
  };

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 bg-card border shadow-xl rounded-lg p-2 flex flex-col items-center transition-all duration-300 ease-in-out",
        isExpanded ? "w-56 items-stretch" : "w-14 items-center",
        isActive ? visibleLeft : (isExpanded ? expandedHiddenLeft : collapsedHiddenLeft)
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
