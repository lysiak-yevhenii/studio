"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must not exceed 50 characters."),
  headline: z.string().max(100, "Headline must not exceed 100 characters.").optional(),
  location: z.string().max(50, "Location must not exceed 50 characters.").optional(),
  summary: z.string().max(2000, "Summary must not exceed 2000 characters.").optional(),
  // Add more fields as needed for experience, education, skills
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can be fetched or passed as a prop
const defaultValues: Partial<ProfileFormValues> = {
  name: "Jane Professional",
  headline: "Senior Product Manager | AI & SaaS Expert",
  location: "San Francisco, CA",
  summary: "Dynamic and results-oriented Senior Product Manager...",
};

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    console.log(data);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
        <CardDescription>Make changes to your professional information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="Your professional headline (e.g., Software Engineer at XYZ)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself and your professional background."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>A brief overview of your career and aspirations.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more sections for Experience, Education, Skills here later */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">Update Profile</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
