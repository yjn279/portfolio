import { env } from "cloudflare:workers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getFeaturedProjects,
  getOtherProjects,
  projects,
} from "@/data/projects";
import type { Project } from "@/types";
import { drizzle } from "drizzle-orm/d1";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Github,
  Plane,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import * as schema from "../../database/schema";
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

export async function loader({ request }: Route.LoaderArgs) {
  const db = drizzle(env.DB);
  const projectsResult = await db.select().from(schema.projects).all();
  const linksResult = await db.select().from(schema.projectLinks).all();

  // projectIdごとにリンクをグループ化
  const linksByProject: Record<string, { url: string; media: string }[]> = {};
  for (const link of linksResult) {
    const pid = String(link.projectId);
    if (!linksByProject[pid]) linksByProject[pid] = [];
    linksByProject[pid].push({ url: link.url, media: link.media });
  }

  // DBの値をUI用Project型+linksにマッピング
  return projectsResult.map((row) => ({
    id: String(row.id),
    title: row.title,
    description: row.description,
    longDescription: row.description,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
    links: linksByProject[String(row.id)] || [],
  }));
}

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const projects = useLoaderData() as Array<
    Project & { links: { url: string; media: string }[] }
  >;

  // media名→アイコンコンポーネント
  const mediaIcon = {
    GitHub: Github,
    Note: ExternalLink,
    SpeakerDeck: Plane,
    Qiita: ExternalLink,
    Zenn: ExternalLink,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        title="Flight YJN279"
        subtitle="Projects - Connecting Flights"
      />

      <HeroSection
        icon={<Plane className="h-4 w-4" />}
        badgeText="Connecting Flights"
        title="Development Projects"
        description={
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            フルスタックWebエンジニアとして手がけたプロダクトやアプリケーションをご紹介します。
            モダンな技術スタックを活用し、ユーザー体験を重視した開発を心がけています。
          </p>
        }
        bottomText={
          <span className="text-muted-foreground">Explore projects below</span>
        }
        showScrollChevron={true}
      />

      {/* Projects 3列グリッド表示 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.longDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.links.map((link) => {
                      const Icon =
                        mediaIcon[link.media as keyof typeof mediaIcon] ||
                        ExternalLink;
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          className="p-1 hover:bg-gray-100 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
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
