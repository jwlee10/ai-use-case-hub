import { BookOpen, Video, FileText, MessageSquare, Clock, Award, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/learning-lab-hero.jpg";

const sessions = [
  {
    number: 1,
    title: "Core AI Concepts",
    duration: "2 hours",
    xp: "200 XP",
    topics: [
      "Foundational AI principles",
      "Overview of AI tools & resources at Applied",
      "Practical applications and AI use cases",
    ],
    note: "This is an introductory session for those who are not familiar with AI or Copilot. You may skip Session 1 if you are already proficient in AI-101-A / AI-101-B (GenAI Fundamentals) and AI-102 (Prompt Engineering).",
  },
  {
    number: 2,
    title: "AI-Assisted Coding",
    duration: "2 hours",
    xp: "200 XP",
    topics: [
      "Guided setup and tool walkthrough",
      "Hands-on activities to complete one end-to-end use case",
    ],
    note: "Recommended for those with intermediate AI experience, including attendees of Session 1 or those who have completed AI-101-A / AI-101-B and AI-102. No prior coding experience is needed.",
  },
];

const resourceLinks = [
  {
    icon: Video,
    title: "Past Recordings",
    description: "You will not receive XP by watching a past recording.",
    href: "#",
  },
  {
    icon: FileText,
    title: "Session 1: Core AI Concepts Slide Deck",
    description: "Download the presentation slides",
    href: "#",
  },
  {
    icon: FileText,
    title: "Session 2: AI-Assisted Coding Slide Deck",
    description: "Download the presentation slides",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Session 1: Core AI Concepts Feedback Form",
    description: "Share your feedback",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Session 2: AI-Assisted Coding Feedback Form",
    description: "Share your feedback",
    href: "#",
  },
];

const LearningLab = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Learning Lab
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              A hands-on crash course to help SPG employees build practical AI skills.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-3 py-6 space-y-8">
        {/* Hero Section */}
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-5 space-y-3">
              <h2 className="text-lg font-bold text-foreground">About SPG AI Learning Lab</h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                <span className="font-semibold text-foreground">AI Learning Lab</span> is a hands-on crash course designed to help SPG employees build practical AI skills. This two-session series covers core AI fundamentals and AI-assisted coding, with real examples and guided activities you can immediately apply at work!
              </p>
              <div className="flex items-start gap-3 rounded-md border border-primary/20 bg-primary/5 p-3">
                <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  By attending these sessions (either in-person or virtually), you will automatically receive{" "}
                  <span className="font-bold text-foreground">PATHWAY credit (XP)</span> that will be applied toward fulfilling the{" "}
                  <span className="font-bold text-foreground">mandatory SPG requirement of 4 hours (400XP) of AI training</span>. Each session is 2 hours — completion of one session earns 200XP, and completion of both sessions earns 400XP.
                </p>
              </div>
            </div>
            <div className="hidden lg:block w-64 shrink-0">
              <img
                src={heroImage}
                alt="AI Learning Lab workshop session"
                className="h-full w-full object-cover"
                width={1280}
                height={720}
              />
            </div>
          </div>
        </Card>

        {/* Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => (
              <Card key={session.number} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold">
                      Session {session.number}: {session.title}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      {session.xp}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {session.duration}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <ul className="space-y-1.5">
                    {session.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground/80 italic font-body leading-relaxed border-l-2 border-primary/30 pl-3">
                    {session.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Resources & Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resourceLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="rounded-md bg-primary/10 p-2 shrink-0">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{link.description}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 mt-0.5 ml-auto" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground font-body">
              If you have any questions about AI Learning Lab, please reach out to{" "}
              <a href="mailto:SPG_AI_Productivity@amat.com" className="text-primary hover:underline font-medium">
                SPG_AI_Productivity@amat.com
              </a>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LearningLab;
