"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function NavLink({ href, label, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "flex flex-col items-center px-3 py-1 h-auto text-xs font-medium rounded-none hover:bg-accent/10",
        isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      <Link href={href}>
        <Icon className={cn("h-5 w-5 mb-0.5", isActive ? "text-primary" : "")} />
        <span>{label}</span>
      </Link>
    </Button>
  );
}
