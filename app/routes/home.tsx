import { FloatingContactButton } from "@/components/floating-contact-button";
import { Footer } from "@/components/layout/Footer";
import { ArticlesSection } from "@/components/sections/articles-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Flight YJN279 - Web Engineer Portfolio" },
    {
      name: "description",
      content:
        "YJN279のポートフォリオサイト。フルスタックWebエンジニアとして、モダンな技術スタックでユーザー体験を向上させるプロダクト開発に取り組んでいます。",
    },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <HeroSection />
      <ProjectsSection />
      <ArticlesSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
