
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

const collapsedHiddenLeft = "-left-[40px]"; // Adjusted for p-1 (w-14 - p-1*2 = 56px - 8px = 48px. 48-8 visible = 40px hidden)
const expandedHiddenLeft = "-left-[216px]"; // Adjusted for p-1 (w-56 - p-1*2 = 224px - 8px = 216px. 216-0 visible = 216px hidden, needs to leave a bit visible)
// Let's refine hidden calculation:
// Collapsed: w-14 (56px). Padding p-1 (4px each side) = total padding 8px. Visible part, say 16px. Hidden = 56 - 16 = 40px. So -left-[40px]
// Expanded: w-56 (224px). Padding p-1 (4px each side) = total padding 8px. Visible part, say 16px. Hidden = 224 - 16 = 208px. So -left-[208px]

const finalCollapsedHiddenLeft = "-left-[calc(theme(spacing.14)-16px)]"; // w-14 is 56px. 56-16 = 40px.
const finalExpandedHiddenLeft = "-left-[calc(theme(spacing.56)-16px)]";   // w-56 is 224px. 224-16 = 208px.
// Using fixed values based on p-1 (4px) and assuming we want ~12px visible tab (16px total incl padding).
// Collapsed: 56px (w-14) - 12px = 44px hidden. So -left-[44px]
// Expanded: 224px (w-56) - 12px = 212px hidden. So -left-[212px]

const targetVisibleWidth = "12px";
const finalFinalCollapsedHiddenLeft = `-left-[calc(theme(spacing.14)-${targetVisibleWidth})]`; // 56px - 12px = 44px
const finalFinalExpandedHiddenLeft = `-left-[calc(theme(spacing.56)-${targetVisibleWidth})]`;   // 224px - 12px = 212px


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
        "fixed top-1/2 -translate-y-1/2 z-40 bg-card border shadow-xl rounded-xl p-1 flex flex-col items-center transition-all duration-300 ease-in-out",
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
        className="mb-1 self-center" // Reduced margin-bottom due to p-1
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <PanelLeftOpen className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
      </Button>
      <Separator className={cn("mb-1", isExpanded ? "w-full" : "w-10/12")} /> {/* Adjusted width for p-1 */}
      <nav className="flex flex-col space-y-0.5 w-full"> {/* Reduced space-y due to p-1 */}
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
