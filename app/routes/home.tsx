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
  ArrowRight,
  Building,
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Plane,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Next.js製のフルスタックECサイト",
      tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
      github: "https://github.com/yjn279/ecommerce",
      demo: "https://ecommerce-demo.vercel.app",
      slides: "https://slides.com/yjn279/ecommerce",
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description: "リアルタイム同期機能付きタスク管理アプリ",
      tags: ["React", "Firebase", "Material-UI"],
      github: "https://github.com/yjn279/task-manager",
      demo: "https://task-manager-demo.vercel.app",
      slides: null,
    },
    {
      id: "weather-dashboard",
      title: "Weather Dashboard",
      description: "気象データ可視化ダッシュボード",
      tags: ["Vue.js", "D3.js", "Express.js"],
      github: "https://github.com/yjn279/weather-dashboard",
      demo: "https://weather-dashboard-demo.vercel.app",
      slides: "https://slides.com/yjn279/weather",
    },
  ];

  const articles = [
    {
      id: "nextjs-14-features",
      title: "Next.js 14の新機能を徹底解説",
      description: "App Routerの最新機能とパフォーマンス改善について",
      tags: ["Next.js", "React", "Performance"],
      url: "https://zenn.dev/yjn279/articles/nextjs14-features",
      publishedAt: "2024-01-15",
    },
    {
      id: "typescript-api-design",
      title: "TypeScriptで型安全なAPI設計",
      description: "tRPCを使った型安全なフルスタック開発",
      tags: ["TypeScript", "tRPC", "API"],
      url: "https://qiita.com/yjn279/items/typescript-api-design",
      publishedAt: "2023-12-20",
    },
    {
      id: "react-performance",
      title: "Reactのパフォーマンス最適化テクニック",
      description: "メモ化とレンダリング最適化の実践的手法",
      tags: ["React", "Performance", "Optimization"],
      url: "https://zenn.dev/yjn279/articles/react-performance",
      publishedAt: "2023-11-10",
    },
  ];

  const experiences = [
    {
      id: "tech-startup-inc",
      company: "Tech Startup Inc.",
      position: "Senior Full Stack Engineer",
      period: "2022 - Present",
      description:
        "React/Next.jsとNode.jsを使用したWebアプリケーション開発をリード",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
    },
    {
      id: "digital-agency-co",
      company: "Digital Agency Co.",
      position: "Frontend Engineer",
      period: "2020 - 2022",
      description: "企業向けWebサイトとECサイトの開発・保守",
      technologies: ["Vue.js", "Nuxt.js", "JavaScript", "SCSS"],
    },
    {
      id: "web-solutions-ltd",
      company: "Web Solutions Ltd.",
      position: "Junior Developer",
      period: "2019 - 2020",
      description: "HTML/CSS/JavaScriptを使用したWebサイト制作",
      technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Flight YJN279
                </h1>
                <p className="text-sm text-gray-600">Web Engineer Portfolio</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#connecting-flights"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
              <a
                href="#briefing-room"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Articles
              </a>
              <a
                href="#flight-log"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#connecting-flights" 
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a 
                  href="#briefing-room" 
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Articles
                </a>
                <a 
                  href="#flight-log" 
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Experience
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="h-4 w-4" />
            Now Boarding - Ready for New Opportunities
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome aboard
            <br />
            <span className="text-blue-600">
              Flight{" "}
              <Link
                to="/profile"
                className="underline hover:text-blue-700 transition-colors"
              >
                YJN279
              </Link>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hello world. Welcome on board flight YJN279. The captain in command
            of this website is NAKAMURA Yuji and my co-pilot is{" "}
            <span className="line-through">GitHub</span> Cursor. We are now
            ready for departure. Please let me know if you need any assistance,
            and I hope that you enjoy the flight with me 😉
          </p>

          {/* Scroll Down Animation */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600">Scroll down to explore</p>
            <div className="animate-bounce">
              <ChevronDown className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Connecting Flights Section (Projects) */}
      <section id="connecting-flights" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connecting Flights
            </h2>
            <p className="text-gray-600">ポートフォリオ・開発プロジェクト</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {projects.slice(0, 3).map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
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

      {/* Briefing Room Section (Articles) */}
      <section id="briefing-room" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Briefing Room
            </h2>
            <p className="text-gray-600">技術記事・ブログ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {articles.slice(0, 3).map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <a
                          href={article.url}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {article.publishedAt}
                        </span>
                      </div>
                    </div>
                    <a
                      href={article.url}
                      className="self-end p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/articles">
              <Button variant="outline" size="lg" className="group">
                すべての記事を見る
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flight Log Section (Experience) - Timeline Design */}
      <section id="flight-log" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flight Log
            </h2>
            <p className="text-gray-600">経歴・職歴</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

              <div className="space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative flex items-start gap-4 md:gap-6">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Building className="h-4 w-4 md:h-8 md:w-8 text-white" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 min-w-0">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {exp.position}
                              </h3>
                              <p className="text-blue-600 font-semibold text-lg">
                                {exp.company}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-sm font-medium px-3 py-1"
                            >
                              {exp.period}
                            </Badge>
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready for Takeoff
            </h2>
            <p className="text-gray-600 mb-8">
              新しいプロジェクトやチームでの挑戦をお待ちしています。
              お気軽にお声がけください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Contact YJN279
              </Button>
              <Link to="/profile">
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  プロフィールを見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Flight YJN279</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2025 YJN279 All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Button
          size="sm"
          className="md:size-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Mail className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Contact YJN279</span>
          <span className="sm:hidden">Contact</span>
          Contact YJN279
        </Button>
      </div>
    </div>
  );
}
