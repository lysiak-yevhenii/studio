
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavLinkProps {
  href?: string;
  label: string;
  icon: LucideIcon;
  isExpanded: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipSide?: "left" | "right" | "top" | "bottom";
}

export default function SidebarNavLink({ href, label, icon: Icon, isExpanded, onClick, tooltipSide = "right" }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = href ? (pathname === href || (href === "/" && pathname.startsWith("/?")) || (href !== "/" && pathname.startsWith(href))) : false;

  const content = (
    <>
      <Icon className={cn(
        "h-5 w-5 shrink-0",
        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
      )} />
      <span className={cn(
        "ml-3 text-sm font-medium truncate",
        isActive ? "text-foreground" : "text-foreground group-hover:text-foreground",
        isExpanded ? "opacity-100 visible" : "opacity-0 invisible w-0"
      )}
      style={{ transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out' }}
      >
        {label}
      </span>
    </>
  );

  const buttonClasses = cn(
    "w-full justify-start px-3 py-2 h-10",
    isActive && href ? "bg-background shadow-sm" : "hover:bg-muted",
    "group flex items-center" 
  );

  const renderButton = () => {
    if (href && !onClick) {
      return (
        <Button
          variant="ghost"
          asChild
          className={buttonClasses}
        >
          <Link href={href}>
            {content}
          </Link>
        </Button>
      );
    }
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        className={buttonClasses}
        aria-label={label}
      >
        {content}
      </Button>
    );
  };

  if (!isExpanded) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {renderButton()}
          </TooltipTrigger>
          <TooltipContent side={tooltipSide} className="ml-2">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return renderButton();
}
