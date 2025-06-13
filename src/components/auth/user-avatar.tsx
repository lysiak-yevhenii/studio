
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserCircle, LogOut, Home, Users, Globe, Eye, LucideIcon } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, MouseEvent } from 'react';
import { cn } from "@/lib/utils";

const DEFAULT_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://placehold.co/100x100.png",
};

interface RadialNavItem {
  href?: string;
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon: LucideIcon;
  id: string;
}

const mainNavItemsConfig: Omit<RadialNavItem, 'id'>[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/connections", label: "Network", icon: Users },
  { href: "/world", label: "World", icon: Globe },
  { href: "/world-eye", label: "World Eye", icon: Eye },
];

export default function UserAvatar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [hasMounted, setHasMounted] = useState(false);
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true); 

    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse mockUser from localStorage", e);
        setCurrentUser(DEFAULT_USER);
      }
    } else {
      setCurrentUser(DEFAULT_USER);
    }
  }, []);

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  };

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem('mockUser');
    setCurrentUser(DEFAULT_USER); 
    setIsRadialMenuOpen(false);
    router.push('/login');
  };

  const handleProfileClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsRadialMenuOpen(false);
    router.push('/profile');
  }

  const handleNavClick = (href?: string) => {
    if (href) {
      setIsRadialMenuOpen(false);
      // Navigation will be handled by Link component
    }
  }
  
  const profileItem: Omit<RadialNavItem, 'id'> = { href: "/profile", label: "Profile", icon: UserCircle};
  const logoutItem: Omit<RadialNavItem, 'id'> = { action: handleLogout, label: "Log out", icon: LogOut };

  const radialNavItems: RadialNavItem[] = [
    ...mainNavItemsConfig.map((item, index) => ({...item, id: `nav-${index}`})),
    {...profileItem, id: "profile"},
    {...logoutItem, id: "logout"},
  ];

  const toggleRadialMenu = () => {
    setIsRadialMenuOpen(!isRadialMenuOpen);
  };

  if (!hasMounted) {
    return <div className="h-[100px] w-[100px]" />; 
  }

  const numItems = radialNavItems.length;
  const radius = 85; // Distance from center of main avatar to center of small items
  const itemSize = 48; // Diameter of small items
  const itemRadius = itemSize / 2;
  const mainAvatarCenter = 50; // Center of the 100x100 main avatar

  // Arc from West (180deg) to North (270deg), counter-clockwise
  const startAngleRad = Math.PI; // 180 degrees
  const endAngleRad = Math.PI * 1.5; // 270 degrees
  const angleSpreadRad = endAngleRad - startAngleRad; // Should be PI/2 (90 degrees)
  const angleStep = numItems > 1 ? angleSpreadRad / (numItems - 1) : 0;


  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative"> {/* Container for absolute positioning of radial items */}
        <button 
          onClick={toggleRadialMenu}
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
          aria-expanded={isRadialMenuOpen}
          aria-label="Toggle user menu"
        >
          <Avatar className="h-[100px] w-[100px] cursor-pointer border-4 border-card shadow-lg">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
            <AvatarFallback className="text-4xl">{getInitials(currentUser.name)}</AvatarFallback>
          </Avatar>
        </button>

        {isRadialMenuOpen && (
          <div className="absolute bottom-0 right-0 w-[calc(100px+170px)] h-[calc(100px+170px)] pointer-events-none">
            {radialNavItems.map((item, index) => {
              const angle = startAngleRad + index * angleStep;
              const x = mainAvatarCenter + radius * Math.cos(angle) - itemRadius;
              const y = mainAvatarCenter + radius * Math.sin(angle) - itemRadius;
              const Icon = item.icon;

              const itemContent = (
                <div
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${itemSize}px`,
                    height: `${itemSize}px`,
                  }}
                  className={cn(
                    "absolute bg-card rounded-full flex items-center justify-center shadow-lg border-2 border-primary cursor-pointer hover:bg-muted pointer-events-auto",
                    "transition-all duration-300 ease-in-out",
                    isRadialMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  )}
                  // style for staggered animation if desired:
                  // transitionDelay: `${index * 50}ms` 
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              );

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    {item.href ? (
                      <Link href={item.href} onClick={(e) => {
                        if(item.label === "Profile") {
                           e.preventDefault(); // prevent default Link nav
                           handleProfileClick(e as unknown as MouseEvent<HTMLAnchorElement>); // Call router push
                        } else {
                           handleNavClick(item.href); // For other nav links
                        }
                      }}>
                        {itemContent}
                      </Link>
                    ) : (
                      <button onClick={(e) => {item.action?.(e);}} aria-label={item.label}>
                        {itemContent}
                      </button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="bg-popover text-popover-foreground">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
