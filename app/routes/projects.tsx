import type { Route } from "./+types/projects";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  Github,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Star,
  Users,
} from "lucide-react"
import { Link } from "react-router"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects - Flight YJN279" },
    { name: "description", content: "YJN279の開発プロジェクト一覧。フルスタックWebエンジニアとして手がけたプロダクトやアプリケーションをご紹介します。" },
  ];
}

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Next.js製のフルスタックECサイト。Stripe決済、在庫管理、管理者ダッシュボードを実装。",
      longDescription: "モダンなECサイトプラットフォームで、ユーザー認証、商品管理、決済処理、注文管理などの機能を包括的に実装。レスポンシブデザインとSEO最適化も考慮。",
      tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/yjn279/ecommerce",
      demo: "https://ecommerce-demo.vercel.app",
      slides: "https://slides.com/yjn279/ecommerce",
      status: "完成",
      duration: "3ヶ月",
      team: "個人開発",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "リアルタイム同期機能付きタスク管理アプリ。チーム協働とプロジェクト管理に最適。",
      longDescription: "Firebaseを活用したリアルタイムタスク管理アプリケーション。ドラッグ&ドロップ、リアルタイム更新、チーム招待機能を実装。",
      tags: ["React", "Firebase", "Material-UI", "Redux", "WebSocket"],
      github: "https://github.com/yjn279/task-manager",
      demo: "https://task-manager-demo.vercel.app",
      slides: null,
      status: "完成",
      duration: "2ヶ月",
      team: "個人開発",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "気象データ可視化ダッシュボード。インタラクティブなチャートとマップ表示。",
      longDescription: "OpenWeatherMap APIを使用した気象データ可視化ダッシュボード。D3.jsによるインタラクティブなグラフとマップ表示機能。",
      tags: ["Vue.js", "D3.js", "Express.js", "Chart.js", "OpenWeatherMap API"],
      github: "https://github.com/yjn279/weather-dashboard",
      demo: "https://weather-dashboard-demo.vercel.app",
      slides: "https://slides.com/yjn279/weather",
      status: "完成",
      duration: "1ヶ月",
      team: "個人開発",
      featured: false,
    },
    {
      title: "Blog CMS Platform",
      description: "ヘッドレスCMSを活用したブログプラットフォーム。マークダウンエディタ搭載。",
      longDescription: "Contentful CMSとNext.jsを組み合わせたブログプラットフォーム。マークダウンエディタ、タグ管理、SEO最適化機能を実装。",
      tags: ["Next.js", "Contentful", "GraphQL", "Markdown", "Vercel"],
      github: "https://github.com/yjn279/blog-cms",
      demo: "https://blog-cms-demo.vercel.app",
      slides: null,
      status: "完成",
      duration: "1.5ヶ月",
      team: "個人開発",
      featured: false,
    },
    {
      title: "Real-time Chat Application",
      description: "Socket.ioを使用したリアルタイムチャットアプリケーション。",
      longDescription: "Node.js、Socket.io、Reactを使用したリアルタイムチャットアプリ。プライベートメッセージ、グループチャット、ファイル共有機能を実装。",
      tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com/yjn279/chat-app",
      demo: "https://chat-app-demo.herokuapp.com",
      slides: null,
      status: "開発中",
      duration: "進行中",
      team: "個人開発",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "React Router v7とCloudflareを使用したポートフォリオサイト。",
      longDescription: "このサイト自体！React Router v7、shadcn/ui、Tailwind CSS v4を使用。航空機テーマのデザインとアニメーションを実装。",
      tags: ["React Router v7", "TypeScript", "Tailwind CSS", "Cloudflare", "shadcn/ui"],
      github: "https://github.com/yjn279/portfolio",
      demo: "https://yjn279.pages.dev",
      slides: null,
      status: "完成",
      duration: "1週間",
      team: "個人開発",
      featured: true,
    },
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Flight YJN279</h1>
                <p className="text-sm text-gray-600">Web Engineer Portfolio</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <a href={project.github} className="p-1 hover:bg-gray-100 rounded">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href={project.demo} className="p-1 hover:bg-gray-100 rounded">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      {project.slides && (
                        <a href={project.slides} className="p-1 hover:bg-gray-100 rounded">
                          <Plane className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.longDescription}</CardDescription>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                    <div className="flex gap-2">
                      <a href={project.github} className="p-1 hover:bg-gray-100 rounded">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href={project.demo} className="p-1 hover:bg-gray-100 rounded">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      {project.slides && (
                        <a href={project.slides} className="p-1 hover:bg-gray-100 rounded">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for Your Next Project?</h2>
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
    </div>
  )
} 
