import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, MessageSquare, CheckCircle, XCircle, Users } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  mutualConnections?: number;
}

interface ConnectionCardProps {
  connection: Connection;
  type: "suggestion" | "invitation" | "connected";
}

export default function ConnectionCard({ connection, type }: ConnectionCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <CardHeader className="p-4 text-center items-center">
        <Avatar className="h-20 w-20 mb-3 border-2 border-primary/50">
          <AvatarImage src={connection.avatarUrl} alt={connection.name} data-ai-hint="person face" />
          <AvatarFallback className="text-2xl">{getInitials(connection.name)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-semibold">{connection.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground h-8 line-clamp-2">{connection.headline}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-center flex-grow">
        {connection.mutualConnections && connection.mutualConnections > 0 && (
            <div className="text-xs text-muted-foreground inline-flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {connection.mutualConnections} mutual connections
            </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        {type === "suggestion" && (
          <Button className="w-full bg-primary hover:bg-primary/90">
            <UserPlus className="h-4 w-4 mr-2" /> Connect
          </Button>
        )}
        {type === "invitation" && (
          <div className="w-full grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:border-destructive hover:text-destructive">
                <XCircle className="h-4 w-4 mr-2" /> Decline
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <CheckCircle className="h-4 w-4 mr-2" /> Accept
            </Button>
          </div>
        )}
        {type === "connected" && (
          <Button variant="outline" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" /> Message
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
