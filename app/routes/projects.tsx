import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFeaturedProjects, getOtherProjects } from "@/data/projects";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Plane,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/projects";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Projects - Flight YJN279" },
    {
      name: "description",
      content:
        "YJN279の開発プロジェクト一覧。フルスタックWebエンジニアとして手がけたプロダクトやアプリケーションをご紹介します。",
    },
  ];
}

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featuredProjects = getFeaturedProjects();
  const otherProjects = getOtherProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        showBackButton={true}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Plane className="h-4 w-4" />
            Connecting Flights
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Development Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            フルスタックWebエンジニアとして手がけたプロダクトやアプリケーションをご紹介します。
            モダンな技術スタックを活用し、ユーザー体験を重視した開発を心がけています。
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={project.demo}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
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
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.longDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.team}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={project.demo}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
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
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.team}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready for Your Next Project?
            </h2>
            <p className="text-gray-600 mb-8">
              新しいプロジェクトのご相談やコラボレーションをお待ちしています。
              お気軽にお声がけください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact YJN279
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
