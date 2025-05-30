import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArticlesList } from "@/components/sections/ArticlesList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFeaturedArticles, getOtherArticles } from "@/data/articles";
import type { Article } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Heart,
  Plane,
} from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/articles";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Articles - Flight YJN279" },
    {
      name: "description",
      content:
        "YJN279の技術記事・ブログ一覧。Web開発、React、TypeScript、パフォーマンス最適化などの技術情報を発信しています。",
    },
  ];
}

export default function Articles() {
  const featuredArticles = getFeaturedArticles();
  const otherArticles = getOtherArticles();

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Zenn":
        return "bg-blue-100 text-blue-800";
      case "Qiita":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header showBackButton={true} />

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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={getPlatformColor(article.platform)}
                    >
                      {article.platform}
                    </Badge>
                    <a
                      href={article.url}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardTitle className="text-xl">
                    <a
                      href={article.url}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 italic">
                      "{article.excerpt}"
                    </p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Other Articles
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {otherArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant="secondary"
                          className={getPlatformColor(article.platform)}
                        >
                          {article.platform}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {article.publishedAt}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <a
                          href={article.url}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {article.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
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
                    <a
                      href={article.url}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:self-start"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Articles from APIs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              最新記事（API取得）
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zenn、Qiita、Noteから最新の記事を自動取得して表示しています。
              現在はQiitaのAPIのみ利用可能です。
            </p>
          </div>
          
          {/* Qiita Articles */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Qiita</Badge>
              記事一覧
            </h3>
            <ArticlesList platform="qiita" showLoadMore={true} showRefresh={true} />
          </div>

          <Separator className="my-8" />
          
          {/* Zenn Articles */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">Zenn</Badge>
              記事一覧（RSSフィード）
            </h3>
            <ArticlesList platform="zenn" showLoadMore={false} showRefresh={true} />
          </div>

          <Separator className="my-8" />
          
          {/* Note Articles */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800">Note</Badge>
              記事一覧（RSSフィード）
            </h3>
            <ArticlesList platform="note" showLoadMore={false} showRefresh={true} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              最新の技術記事やブログ投稿をお見逃しなく。
              ZennやQiitaでフォローして、新しい記事の通知を受け取りましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a 
                  href="https://zenn.dev/yuji0207" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Follow on Zenn
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a 
                  href="https://qiita.com/yjn279" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Follow on Qiita
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
