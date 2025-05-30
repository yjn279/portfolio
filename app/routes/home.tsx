import { FloatingContactButton } from "@/components/FloatingContactButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
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
  const { isMobileMenuOpen, toggleMobileMenu, scrollToSection } =
    useMobileMenu();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onScrollToSection={scrollToSection}
      />

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
