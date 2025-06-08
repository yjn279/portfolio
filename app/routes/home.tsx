import { FloatingContactButton } from "@/components/floating-contact-button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ArticlesSection } from "@/components/sections/articles-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Flight YJN279 - Web Engineer Portfolio" },
    {
      name: "description",
      content:
        "Welcome aboard Flight YJN279. NAKAMURA Yujiのポートフォリオサイトです。フルスタックWebエンジニアとしてのプロジェクト、技術記事、経歴をご紹介します。",
    },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onScrollToSection={scrollToSection}
      />

      <HeroSection icon={<Clock className="h-4 w-4" />} />
      <ProjectsSection />
      <ArticlesSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
