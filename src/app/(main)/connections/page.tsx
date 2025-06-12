import AiConnectionSuggestions from "@/components/connections/ai-connection-suggestions";
import ConnectionCard from "@/components/connections/connection-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Brain } from "lucide-react";

// Placeholder data for current connections
const currentConnections = [
  { id: "1", name: "Alice Wonderland", headline: "Software Engineer at TechCorp", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 12 },
  { id: "2", name: "Bob The Builder", headline: "Project Manager at Constructify", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 5 },
  { id: "3", name: "Charlie Brown", headline: "UX Designer at CreativeMinds", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 8 },
  { id: "4", name: "Diana Prince", headline: "Marketing Lead at AdSolutions", avatarUrl: "https://placehold.co/80x80.png", mutualConnections: 20 },
];

export default function ConnectionsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Users className="mr-3 h-7 w-7 text-primary" />
            Manage Your Network
          </CardTitle>
          <CardDescription>Grow and manage your professional connections.</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Brain className="h-4 w-4" /> AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="my-network" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> My Network
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Invitations
            <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">3</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Connection Suggestions</CardTitle>
              <CardDescription>AI-powered recommendations to expand your network.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiConnectionSuggestions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-network" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Connections ({currentConnections.length})</CardTitle>
              <CardDescription>People you are currently connected with.</CardDescription>
            </CardHeader>
            <CardContent>
              {currentConnections.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentConnections.map(conn => (
                    <ConnectionCard key={conn.id} connection={conn} type="connected" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You haven't made any connections yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invitations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations (3)</CardTitle>
              <CardDescription>Review connection requests you've received.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for invitations. Use ConnectionCard with type="invitation" */}
               <p className="text-sm text-muted-foreground">Feature coming soon. You have 3 pending invitations.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
