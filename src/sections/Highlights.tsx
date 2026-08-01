import Link from "next/link";
import projects from "@/data/projects.json";
import resumeData from "@/data/resume.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ArrowRight } from "lucide-react";

export default function Highlights() {
  const mostRecentRole = [...resumeData.experience].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )[0];

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="space-y-10">
      {/* Most Recent Role */}
      <Card className="border-muted bg-muted/30">
        <CardContent className="p-6 flex items-start gap-4">
          <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/80 mb-1">
              Most Recent Role
            </p>
            <p className="font-medium">
              {mostRecentRole.role} @ {mostRecentRole.company}
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {mostRecentRole.businessImpact}
            </p>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
            >
              View full experience <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Featured Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Work</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
