
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Edit3, Linkedin, Github, ExternalLink, Mail, Phone } from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";
import PostCard from '@/components/feed/post-card';
import type { Post } from '@/components/feed/post-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder data
const userProfile = {
  name: "Jane Professional",
  headline: "Senior Product Manager | AI & SaaS Expert",
  avatarUrl: "https://placehold.co/200x200.png", // Using a square placeholder
  bannerUrl: "https://placehold.co/1200x300.png",
  bannerHint: "abstract background",
  location: "San Francisco, CA",
  summary: "Dynamic and results-oriented Senior Product Manager with 10+ years of experience in driving product strategy, vision, and execution for AI and SaaS solutions. Proven ability to lead cross-functional teams and deliver innovative products that meet market demands and exceed customer expectations. Passionate about leveraging technology to solve complex problems.",
  contact: {
    email: "jane.pro@example.com",
    phone: "+1 123-456-7890",
    linkedin: "linkedin.com/in/janeprofessional",
    github: "github.com/janeprofessional",
    website: "janeprofessional.com"
  },
  experience: [
    { id: "1", title: "Senior Product Manager", company: "Innovatech Solutions", period: "Jan 2020 - Present", description: "Led product strategy for AI-powered analytics platform, resulting in 40% user growth. Managed a team of 5 product managers and collaborated with engineering, design, and marketing teams." },
    { id: "2", title: "Product Manager", company: "TechForward Inc.", period: "Jun 2016 - Dec 2019", description: "Developed and launched three major SaaS products, contributing to $5M in ARR. Conducted market research and competitive analysis to identify new product opportunities." },
  ],
  education: [
    { id: "1", institution: "Stanford University", degree: "MBA, Business Administration", period: "2014 - 2016" },
    { id: "2", institution: "University of California, Berkeley", degree: "B.S., Computer Science", period: "2010 - 2014" },
  ],
  skills: ["Product Management", "AI/ML", "SaaS", "Agile Methodologies", "Roadmap Planning", "User Research", "Data Analysis", "Leadership"],
  posts: [
    { id: "p1", user: { name: "Jane Professional", avatarUrl: "https://placehold.co/40x40.png", headline: "Senior Product Manager" }, timestamp: "3h ago", content: "Reflecting on the future of AI in product development. The possibilities are endless! #AI #ProductManagement", likes: 150, bookmarks: 30, comments: 20, shares: 10, views: 300 },
    { id: "p2", user: { name: "Jane Professional", avatarUrl: "https://placehold.co/40x40.png", headline: "Senior Product Manager" }, timestamp: "2d ago", content: "Shared some thoughts on leading remote teams effectively. What are your best practices? #RemoteWork #Leadership", likes: 90, bookmarks: 15, comments: 12, shares: 5, views: 220, image: "https://placehold.co/600x300.png", imageHint: "team collaboration" },
  ] as Post[]
};

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default function MyPage() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-48 md:h-64 bg-muted">
          {userProfile.bannerUrl && (
            <Image src={userProfile.bannerUrl} alt={`${userProfile.name}'s banner`} layout="fill" objectFit="cover" data-ai-hint={userProfile.bannerHint} />
          )}
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm">
              <Edit3 className="h-4 w-4 mr-2" /> Edit Page
            </Button>
          </div>
        </div>
        
        {/* Profile Info Section: Centered Avatar, Name, Headline, Buttons */}
        <div className="relative flex flex-col items-center p-6 -mt-20 md:-mt-24">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card bg-card ring-2 ring-primary shadow-lg rounded-none">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person face" className="object-cover h-full w-full" />
            <AvatarFallback className="text-4xl h-full w-full flex items-center justify-center rounded-none">{getInitials(userProfile.name)}</AvatarFallback>
          </Avatar>
          
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-foreground font-headline">{userProfile.name}</h1>
            <p className="text-lg text-primary">{userProfile.headline}</p>
            <p className="text-sm text-muted-foreground">{userProfile.location}</p>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Button className="bg-primary hover:bg-primary/90">Connect</Button>
            <Button variant="outline">Message</Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="edit">Edit Page</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><Briefcase className="mr-2 h-5 w-5 text-primary" /> Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground whitespace-pre-line">{userProfile.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><GraduationCap className="mr-2 h-5 w-5 text-primary" /> Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.period}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><Award className="mr-2 h-5 w-5 text-primary" /> Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {userProfile.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 text-sm bg-accent/20 text-accent-foreground rounded-full">{skill}</span>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {userProfile.contact.email && <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" /> {userProfile.contact.email}</p>}
                  {userProfile.contact.phone && <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" /> {userProfile.contact.phone}</p>}
                  {userProfile.contact.linkedin && <a href={`https://${userProfile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Linkedin className="mr-2 h-4 w-4" /> {userProfile.contact.linkedin}</a>}
                  {userProfile.contact.github && <a href={`https://${userProfile.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Github className="mr-2 h-4 w-4" /> {userProfile.contact.github}</a>}
                  {userProfile.contact.website && <a href={`https://${userProfile.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><ExternalLink className="mr-2 h-4 w-4" /> {userProfile.contact.website}</a>}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">My Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {userProfile.posts.length > 0 ? (
                    userProfile.posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="text-sm text-muted-foreground">No posts yet.</p>
                )}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Briefcase className="mr-2 h-5 w-5 text-primary" /> Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {userProfile.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
                  <div className="absolute -left-[calc(0.5rem-1px)] top-1 h-4 w-4 rounded-full bg-primary border-2 border-card"></div>
                  <h3 className="font-semibold text-foreground">{exp.title} at {exp.company}</h3>
                  <p className="text-xs text-muted-foreground">{exp.period}</p>
                  <p className="mt-1 text-sm text-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
    
