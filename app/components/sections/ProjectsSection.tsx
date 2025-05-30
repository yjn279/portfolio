import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { ArrowRight, ExternalLink, Github, Plane } from "lucide-react";
import { Link } from "react-router";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.title}
          <div className="flex gap-2">
            <a href={project.github} className="p-1 hover:bg-gray-100 rounded">
              <Github className="h-4 w-4" />
            </a>
            <a href={project.demo} className="p-1 hover:bg-gray-100 rounded">
              <ExternalLink className="h-4 w-4" />
            </a>
            {project.slides && (
              <a
                href={project.slides}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plane className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="connecting-flights" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Connecting Flights
          </h2>
          <p className="text-gray-600">ポートフォリオ・開発プロジェクト</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects">
            <Button variant="outline" size="lg" className="group">
              すべてのプロジェクトを見る
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
