import { FloatingContactButton } from "@/components/floating-contact-button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import React from "react";
import { Outlet } from "react-router";

export default function Layout() {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      <main>
        <Outlet />
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  );
}
