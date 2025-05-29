import type { Route } from "./+types/articles";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  BookOpen,
} from "lucide-react"
import { Link } from "react-router"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Articles - Flight YJN279" },
    { name: "description", content: "YJN279の技術記事・ブログ一覧。Web開発、React、TypeScript、パフォーマンス最適化などの技術情報を発信しています。" },
  ];
}

export default function Articles() {
  const articles = [
    {
      title: "Next.js 14の新機能を徹底解説",
      description: "App Routerの最新機能とパフォーマンス改善について詳しく解説します。Server ComponentsとClient Componentsの使い分けや、新しいキャッシュ戦略についても触れています。",
      excerpt: "Next.js 14では、App Routerが安定版となり、多くの新機能が追加されました。特にパフォーマンス面での改善が顕著で...",
      tags: ["Next.js", "React", "Performance", "App Router"],
      url: "https://zenn.dev/yjn279/articles/nextjs14-features",
      publishedAt: "2024-01-15",
      readTime: "8分",
      views: "1,234",
      likes: "89",
      platform: "Zenn",
      featured: true,
    },
    {
      title: "TypeScriptで型安全なAPI設計",
      description: "tRPCを使った型安全なフルスタック開発の実践的な手法を紹介します。エンドツーエンドの型安全性を実現する方法を詳しく解説。",
      excerpt: "モダンなWebアプリケーション開発において、フロントエンドとバックエンド間の型安全性は重要な課題です...",
      tags: ["TypeScript", "tRPC", "API", "Type Safety"],
      url: "https://qiita.com/yjn279/items/typescript-api-design",
      publishedAt: "2023-12-20",
      readTime: "12分",
      views: "2,156",
      likes: "156",
      platform: "Qiita",
      featured: true,
    },
    {
      title: "Reactのパフォーマンス最適化テクニック",
      description: "メモ化とレンダリング最適化の実践的手法について解説します。useMemo、useCallback、React.memoの効果的な使い方を学びましょう。",
      excerpt: "Reactアプリケーションのパフォーマンス最適化は、ユーザー体験向上において重要な要素です...",
      tags: ["React", "Performance", "Optimization", "Hooks"],
      url: "https://zenn.dev/yjn279/articles/react-performance",
      publishedAt: "2023-11-10",
      readTime: "10分",
      views: "3,421",
      likes: "234",
      platform: "Zenn",
      featured: true,
    },
    {
      title: "Tailwind CSSの設計パターンとベストプラクティス",
      description: "Tailwind CSSを使った効率的なスタイリング手法と、保守性の高いCSS設計について解説します。",
      excerpt: "Tailwind CSSは、ユーティリティファーストのCSSフレームワークとして人気を集めています...",
      tags: ["Tailwind CSS", "CSS", "Design System", "Frontend"],
      url: "https://zenn.dev/yjn279/articles/tailwind-patterns",
      publishedAt: "2023-10-05",
      readTime: "7分",
      views: "1,876",
      likes: "98",
      platform: "Zenn",
      featured: false,
    },
    {
      title: "Vercelでのデプロイ最適化とCI/CD構築",
      description: "Vercelを使った効率的なデプロイメント戦略と、GitHub Actionsとの連携によるCI/CDパイプラインの構築方法を紹介。",
      excerpt: "モダンなWebアプリケーション開発において、デプロイメントの自動化は必須の要素となっています...",
      tags: ["Vercel", "CI/CD", "GitHub Actions", "DevOps"],
      url: "https://qiita.com/yjn279/items/vercel-deployment",
      publishedAt: "2023-09-18",
      readTime: "9分",
      views: "1,543",
      likes: "76",
      platform: "Qiita",
      featured: false,
    },
    {
      title: "GraphQLとREST APIの比較と選択指針",
      description: "GraphQLとREST APIの特徴を比較し、プロジェクトに適したAPI設計の選択方法について解説します。",
      excerpt: "API設計において、GraphQLとREST APIのどちらを選択するかは重要な決定です...",
      tags: ["GraphQL", "REST API", "API Design", "Backend"],
      url: "https://zenn.dev/yjn279/articles/graphql-vs-rest",
      publishedAt: "2023-08-22",
      readTime: "11分",
      views: "2,987",
      likes: "187",
      platform: "Zenn",
      featured: false,
    },
    {
      title: "React Server Componentsの実践的活用法",
      description: "React Server Componentsの概念と実装方法、パフォーマンス向上への効果について詳しく解説します。",
      excerpt: "React Server Componentsは、Reactアプリケーションのパフォーマンスを大幅に改善する新しい機能です...",
      tags: ["React", "Server Components", "SSR", "Performance"],
      url: "https://zenn.dev/yjn279/articles/react-server-components",
      publishedAt: "2023-07-14",
      readTime: "13分",
      views: "4,123",
      likes: "298",
      platform: "Zenn",
      featured: false,
    },
    {
      title: "WebAssemblyとJavaScriptの連携パターン",
      description: "WebAssemblyを使ったパフォーマンス最適化と、JavaScriptとの効果的な連携方法について解説します。",
      excerpt: "WebAssemblyは、Webブラウザ上でネイティブレベルのパフォーマンスを実現する技術です...",
      tags: ["WebAssembly", "JavaScript", "Performance", "Browser"],
      url: "https://qiita.com/yjn279/items/webassembly-javascript",
      publishedAt: "2023-06-30",
      readTime: "15分",
      views: "1,234",
      likes: "67",
      platform: "Qiita",
      featured: false,
    },
  ]

  const featuredArticles = articles.filter(article => article.featured)
  const otherArticles = articles.filter(article => !article.featured)

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Zenn":
        return "bg-blue-100 text-blue-800"
      case "Qiita":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <BookOpen className="h-4 w-4" />
            Briefing Room
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Technical Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Web開発、React、TypeScript、パフォーマンス最適化などの技術情報を発信しています。
            実践的な知見と経験を共有し、開発者コミュニティに貢献することを目指しています。
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className={getPlatformColor(article.platform)}>
                      {article.platform}
                    </Badge>
                    <a href={article.url} className="p-1 hover:bg-gray-100 rounded">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardTitle className="text-xl">
                    <a href={article.url} className="hover:text-blue-600 transition-colors">
                      {article.title}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-base">{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 italic">"{article.excerpt}"</p>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{article.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Articles */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Other Articles</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {otherArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className={getPlatformColor(article.platform)}>
                          {article.platform}
                        </Badge>
                        <span className="text-sm text-gray-500">{article.publishedAt}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <a href={article.url} className="hover:text-blue-600 transition-colors">
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-3">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a href={article.url} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              最新の技術記事やブログ投稿をお見逃しなく。
              ZennやQiitaでフォローして、新しい記事の通知を受け取りましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Follow on Zenn
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                Follow on Qiita
              </Button>
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
