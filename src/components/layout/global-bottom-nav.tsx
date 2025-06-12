
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Settings, HelpCircle } from "lucide-react";

export default function GlobalBottomNav() {
  // For now, these tabs don't switch any content, they are placeholders.
  // They would typically either navigate or control some on-page state.
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Tabs defaultValue="action1">
        <TabsList className="grid grid-cols-3 bg-card border border-border rounded-xl shadow-xl p-1">
          <TabsTrigger value="action1" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Action 1
          </TabsTrigger>
          <TabsTrigger value="action2" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Action 2
          </TabsTrigger>
          <TabsTrigger value="action3" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Action 3
          </TabsTrigger>
        </TabsList>
        {/* No TabsContent needed if these are just for navigation/actions */}
      </Tabs>
    </div>
  );
}
