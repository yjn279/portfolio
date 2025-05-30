import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useArticles } from "@/hooks/useArticles";
import type { Article } from "@/types";
import {
  AlertCircle,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Heart,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface ArticlesListProps {
  platform?: "zenn" | "qiita" | "note";
  showLoadMore?: boolean;
  showRefresh?: boolean;
}

export function ArticlesList({
  platform,
  showLoadMore = true,
  showRefresh = true,
}: ArticlesListProps) {
  const { articles, loading, error, hasMore, fetchMore, refresh } =
    useArticles(platform);

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

  const handleLoadMore = async () => {
    await fetchMore();
  };

  const handleRefresh = async () => {
    await refresh();
  };

  if (loading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>記事を読み込み中...</span>
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          記事の取得に失敗しました
        </h3>
        <p className="text-gray-600 mb-4 max-w-md">{error}</p>
        {showRefresh && (
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            再試行
          </Button>
        )}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-4">
          <ExternalLink className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          記事が見つかりませんでした
        </h3>
        <p className="text-gray-600">
          {platform
            ? `${platform}に記事がないか、APIエラーが発生しています。`
            : "記事がないか、APIエラーが発生しています。"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control buttons */}
      {showRefresh && (
        <div className="flex justify-end">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            更新
          </Button>
        </div>
      )}

      {/* Articles grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge
                  variant="secondary"
                  className={getPlatformColor(article.platform || "")}
                >
                  {article.platform}
                </Badge>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <CardTitle className="text-xl">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
                {article.excerpt && (
                  <p className="text-sm text-gray-600 italic">
                    "{article.excerpt}"
                  </p>
                )}
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
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.publishedAt}</span>
                    </div>
                    {article.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {article.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                    )}
                    {article.likes && (
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load more button */}
      {showLoadMore && hasMore && (
        <div className="flex justify-center pt-6">
          <Button onClick={handleLoadMore} variant="outline" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                読み込み中...
              </>
            ) : (
              "さらに読み込む"
            )}
          </Button>
        </div>
      )}

      {/* Error message for additional loads */}
      {error && articles.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
