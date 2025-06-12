
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function WorldEyePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Eye className="mr-3 h-7 w-7 text-primary" />
            World Eye
          </CardTitle>
          <CardDescription>A glimpse into global perspectives and trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Content for World Eye will be added here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
