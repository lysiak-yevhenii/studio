
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function AiConnectionSuggestions() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Feature Temporarily Disabled</AlertTitle>
      <AlertDescription>
        AI-powered connection suggestions are currently unavailable. We're working on bringing them back soon!
      </AlertDescription>
    </Alert>
  );
}
