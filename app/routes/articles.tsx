import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFeaturedArticles, getOtherArticles } from "@/data/articles";
import { useArticles, filterArticles } from "@/hooks/useArticles";
import type { Article, ApiError } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Heart,
  Plane,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import { useState, useMemo } from "react";
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

function ErrorDisplay({ errors, onRetry }: { errors: ApiError[]; onRetry: () => void }) {
  if (errors.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <h3 className="font-medium text-red-800">記事の取得エラー</h3>
      </div>
      <div className="space-y-1 mb-3">
        {errors.map((error, index) => (
          <p key={index} className="text-sm text-red-700">
            {error.platform}: {error.message}
          </p>
        ))}
      </div>
      <Button
        onClick={onRetry}
        size="sm"
        variant="outline"
        className="border-red-300 text-red-700 hover:bg-red-100"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        再試行
      </Button>
    </div>
  );
}

export default function Articles() {
  const [showApiArticles, setShowApiArticles] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  
  // 静的記事データ
  const staticFeaturedArticles = getFeaturedArticles();
  const staticOtherArticles = getOtherArticles();
  
  // API記事データ
  const { articles: apiArticles, loading, errors, refetch } = useArticles({
    autoFetch: showApiArticles
  });
  
  // 記事の統合とフィルタリング
  const { featuredArticles, otherArticles } = useMemo(() => {
    let allArticles = showApiArticles ? apiArticles : [...staticFeaturedArticles, ...staticOtherArticles];
    
    // プラットフォームフィルタリング
    if (selectedPlatform !== "all") {
      allArticles = filterArticles(allArticles, { platform: selectedPlatform });
    }
    
    // 注目記事と通常記事に分離
    const featured = allArticles.filter(article => article.featured);
    const other = allArticles.filter(article => !article.featured);
    
    return { featuredArticles: featured, otherArticles: other };
  }, [showApiArticles, apiArticles, staticFeaturedArticles, staticOtherArticles, selectedPlatform]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Zenn":
        return "bg-blue-100 text-blue-800";
      case "Qiita":
        return "bg-green-100 text-green-800";
      case "Note":
        return "bg-purple-100 text-purple-800";
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Web開発、React、TypeScript、パフォーマンス最適化などの技術情報を発信しています。
            実践的な知見と経験を共有し、開発者コミュニティに貢献することを目指しています。
          </p>

          {/* Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                {/* Article Source Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">記事ソース:</span>
                  <div className="flex bg-white rounded-lg p-1 border">
                    <button
                      onClick={() => setShowApiArticles(false)}
                      className={`px-3 py-2 text-sm rounded transition-colors ${
                        !showApiArticles
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      静的記事
                    </button>
                    <button
                      onClick={() => {
                        setShowApiArticles(true);
                        if (apiArticles.length === 0) refetch();
                      }}
                      className={`px-3 py-2 text-sm rounded transition-colors ${
                        showApiArticles
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      API記事
                      {loading && <RefreshCw className="ml-2 h-3 w-3 animate-spin inline" />}
                    </button>
                  </div>
                </div>

                {/* Platform Filter */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">プラットフォーム:</span>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="all">すべて</option>
                    <option value="Zenn">Zenn</option>
                    <option value="Qiita">Qiita</option>
                    <option value="Note">Note</option>
                  </select>
                </div>

                {/* Refresh Button for API articles */}
                {showApiArticles && (
                  <Button
                    onClick={refetch}
                    size="sm"
                    variant="outline"
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    更新
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {showApiArticles && errors.length > 0 && (
        <section className="px-4">
          <div className="container mx-auto">
            <ErrorDisplay errors={errors} onRetry={refetch} />
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {showApiArticles ? "注目記事" : "Featured Articles"}
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
      )}

      {/* Other Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {showApiArticles ? "その他の記事" : "Other Articles"}
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
      )}

      {/* No Articles Message */}
      {showApiArticles && featuredArticles.length === 0 && otherArticles.length === 0 && !loading && (
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">記事が見つかりません</h3>
              <p className="text-gray-500 mb-4">
                選択したプラットフォームに記事がないか、APIエラーが発生している可能性があります。
              </p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                再読み込み
              </Button>
            </div>
          </div>
        </section>
      )}

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

      <Footer />
    </div>
  );
}
