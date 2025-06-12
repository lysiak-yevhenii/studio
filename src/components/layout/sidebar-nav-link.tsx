
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isExpanded: boolean;
}

export default function SidebarNavLink({ href, label, icon: Icon, isExpanded }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/" && pathname.startsWith("/?")) || (href !== "/" && pathname.startsWith(href));

  const linkContent = (
    <>
      <Icon className={cn(
        "h-5 w-5 shrink-0", 
        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-primary"
      )} />
      <span className={cn(
        "ml-3 text-sm font-medium truncate",
        isActive ? "text-foreground" : "text-foreground group-hover:text-primary",
        isExpanded ? "opacity-100 visible" : "opacity-0 invisible w-0"
      )}
      style={{ transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out' }}
      >
        {label}
      </span>
    </>
  );

  if (!isExpanded) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start px-3 py-2 h-10",
                 isActive ? "bg-background shadow-sm" : "",
                "group"
              )}
            >
              <Link href={href} className="flex items-center">
                {linkContent}
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "w-full justify-start px-3 py-2 h-10",
        isActive ? "bg-background shadow-sm" : "",
        "group"
      )}
    >
      <Link href={href} className="flex items-center">
        {linkContent}
      </Link>
    </Button>
  );
}
