
"use client";

import { useState, useEffect } from 'react';
import { Home, Users, Globe, UserCircle, Bell, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavLink from './sidebar-nav-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Define navItems here or import from a shared location if they differ
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/connections", label: "Network", icon: Users },
  { href: "/world", label: "World", icon: Globe },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

const collapsedHiddenRightValue = "-right-[44px]"; // w-14 (56px) - 12px visible tab = 44px hidden
const expandedHiddenRightValue = "-right-[212px]";   // w-56 (224px) - 12px visible tab = 212px hidden
const visibleRight = "right-2";

export default function FloatingVerticalNavRight() {
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

  const currentRightPositionClass = hasMounted
    ? (isActive ? visibleRight : (isExpanded ? expandedHiddenRightValue : collapsedHiddenRightValue))
    : collapsedHiddenRightValue;

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 bg-card border shadow-xl rounded-xl p-1 flex flex-col items-center transition-all duration-300 ease-in-out",
        isExpanded ? "w-56 items-stretch" : "w-14 items-center",
        currentRightPositionClass
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
        {isExpanded ? <PanelRightOpen className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
      </Button>
      <Separator className={cn("mb-1", isExpanded ? "w-full" : "w-10/12")} />
      <nav className="flex flex-col space-y-0.5 w-full">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isExpanded={isExpanded}
            tooltipSide="left" // Tooltips should appear on the left for a right-side menu
          />
        ))}
      </nav>
    </div>
  );
}
