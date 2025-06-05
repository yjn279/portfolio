import { FloatingContactButton } from "@/components/floating-contact-button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ArticlesSection } from "@/components/sections/articles-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
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
    <div className="min-h-screen">
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
