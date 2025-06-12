import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, UserPlus, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Placeholder notifications
const notifications = [
  { id: "1", type: "new_connection", user: { name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png" }, message: "accepted your connection request.", time: "2h ago", read: false, icon: UserPlus, href: "/profile/alice" },
  { id: "2", type: "like", user: { name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png" }, message: "liked your post: 'Amazing conference...'", time: "5h ago", read: false, icon: ThumbsUp, href: "/post/xyz" },
  { id: "3", type: "comment", user: { name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png" }, message: "commented on your article: 'UX Trends 2024'", time: "1d ago", read: true, icon: MessageCircle, href: "/article/abc" },
  { id: "4", type: "mention", user: { name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png" }, message: "mentioned you in a post.", time: "3d ago", read: true, icon: UserPlus, href: "/post/def" },
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle className="text-2xl font-headline flex items-center">
                    <Bell className="mr-3 h-7 w-7 text-primary" />
                    Notifications
                </CardTitle>
                <CardDescription>Recent activity related to your profile and network.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Mark all as read</Button>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <ul className="divide-y divide-border">
              {notifications.map(notification => {
                const Icon = notification.icon;
                return (
                <li key={notification.id} className={`p-4 hover:bg-muted/50 ${!notification.read ? 'bg-primary/5' : ''}`}>
                  <Link href={notification.href || "#"} className="flex items-start space-x-3 group">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src={notification.user.avatarUrl} alt={notification.user.name} data-ai-hint="person face" />
                      <AvatarFallback>{getInitials(notification.user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground group-hover:text-primary">{notification.user.name}</span>
                        <span className="text-muted-foreground"> {notification.message}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <Icon className={`h-5 w-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                  </Link>
                </li>
              )})}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">You have no new notifications.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
