"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { suggestConnections, type ConnectionSuggestionsInput, type ConnectionSuggestionsOutput } from "@/ai/flows/connection-suggestions";
import ConnectionCard from "./connection-card"; // Assuming ConnectionCard can display suggested connections

const suggestionsFormSchema = z.object({
  skills: z.string().min(3, "Please enter at least one skill."),
  experience: z.string().min(10, "Please describe your experience briefly."),
  industry: z.string().min(3, "Please enter your industry."),
});

type SuggestionsFormValues = z.infer<typeof suggestionsFormSchema>;

export default function AiConnectionSuggestions() {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SuggestionsFormValues>({
    resolver: zodResolver(suggestionsFormSchema),
    defaultValues: {
      skills: "Product Management, AI, SaaS, Agile",
      experience: "10+ years in product leadership, launching and scaling B2B SaaS products with AI components. Led cross-functional teams.",
      industry: "Technology / Software Development",
    },
  });

  const onSubmit = (data: SuggestionsFormValues) => {
    setError(null);
    setSuggestions(null);
    startTransition(async () => {
      try {
        const result: ConnectionSuggestionsOutput = await suggestConnections(data);
        if (result && result.suggestions) {
          setSuggestions(result.suggestions);
        } else {
          setError("No suggestions received from the AI.");
        }
      } catch (e) {
        console.error("Error fetching suggestions:", e);
        setError("Failed to fetch suggestions. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 rounded-lg">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Skills (comma-separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., JavaScript, Project Management, Marketing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Experience Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="Briefly describe your professional experience" {...field} className="min-h-[80px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Industry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Technology, Healthcare, Finance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Get AI Suggestions
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold text-foreground">Suggested Connections:</h3>
          <div className="grid grid-cols-1 gap-4">
            {suggestions.map((suggestion, index) => {
              // Assuming suggestion is "Name, Title"
              const parts = suggestion.split(',');
              const name = parts[0]?.trim();
              const headline = parts.slice(1).join(',').trim();
              return (
                <ConnectionCard
                  key={index}
                  connection={{
                    id: `suggestion-${index}`,
                    name: name || "Suggested Professional",
                    headline: headline || "Relevant Connection",
                    avatarUrl: `https://placehold.co/80x80.png?text=${name ? name[0] : 'S'}`, // Simple placeholder avatar
                    mutualConnections: 0, // AI suggestions won't have mutual connections count
                  }}
                  type="suggestion"
                />
              );
            })}
          </div>
        </div>
      )}
      {suggestions && suggestions.length === 0 && (
         <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>No Suggestions Found</AlertTitle>
            <AlertDescription>The AI couldn't find any specific suggestions based on your input. Try refining your profile details.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
