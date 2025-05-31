import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useArticles } from "@/hooks/useArticles";
import { RSSParser } from "@/lib/rss-parser";
import type { QiitaArticle, RSSItem } from "@/types/api";
import { Calendar, Clock, ExternalLink, Eye, Heart, Loader2 } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  platform: string;
  tags: string[];
  views?: number;
  likes?: number;
  readTime?: string;
}

function ArticleCard({ 
  title, 
  description, 
  url, 
  publishedAt, 
  platform, 
  tags, 
  views, 
  likes, 
  readTime 
}: ArticleCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Zenn":
        return "bg-blue-100 text-blue-800";
      case "Qiita":
        return "bg-green-100 text-green-800";
      case "Note":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant="secondary"
                className={getPlatformColor(platform)}
              >
                {platform}
              </Badge>
              <span className="text-sm text-gray-500">
                {publishedAt}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {title}
              </a>
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readTime}</span>
                  </div>
                )}
                {views !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{views}</span>
                  </div>
                )}
                {likes !== undefined && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{likes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:self-start"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function QiitaArticleItem({ article }: { article: QiitaArticle }) {
  const tags = article.tags.map(tag => tag.name);
  const publishedAt = RSSParser.formatDate(article.created_at);
  const description = RSSParser.extractPlainText(article.body);

  return (
    <ArticleCard
      title={article.title}
      description={description}
      url={article.url}
      publishedAt={publishedAt}
      platform="Qiita"
      tags={tags}
      views={article.page_views_count}
      likes={article.likes_count}
      readTime="5分"
    />
  );
}

function RSSArticleItem({ article, platform }: { article: RSSItem; platform: string }) {
  const publishedAt = RSSParser.formatDate(article.pubDate);
  const description = RSSParser.extractPlainText(article.description || article.content || "");
  
  // Extract tags from content or use empty array
  const tags: string[] = [];

  return (
    <ArticleCard
      title={article.title}
      description={description}
      url={article.link}
      publishedAt={publishedAt}
      platform={platform}
      tags={tags}
      readTime="5分"
    />
  );
}

export function ArticlesList() {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">記事を読み込み中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-2">記事の取得でエラーが発生しました</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!articles) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">記事データがありません</p>
      </div>
    );
  }

  const allArticles: React.ReactNode[] = [];

  // Add Qiita articles
  if (articles.qiita) {
    articles.qiita.forEach(article => {
      allArticles.push(
        <QiitaArticleItem key={`qiita-${article.id}`} article={article} />
      );
    });
  }

  // Add Zenn articles
  if (articles.zenn) {
    articles.zenn.forEach((article, index) => {
      allArticles.push(
        <RSSArticleItem 
          key={`zenn-${article.guid || index}`} 
          article={article} 
          platform="Zenn" 
        />
      );
    });
  }

  // Add Note articles
  if (articles.note) {
    articles.note.forEach((article, index) => {
      allArticles.push(
        <RSSArticleItem 
          key={`note-${article.guid || index}`} 
          article={article} 
          platform="Note" 
        />
      );
    });
  }

  if (allArticles.length === 0 && articles.errors.length > 0) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-600 mb-4">記事の取得で問題が発生しました</p>
        <div className="space-y-2">
          {articles.errors.map((error, index) => (
            <p key={index} className="text-sm text-gray-600">
              {error.platform}: {error.error}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          最新記事（API取得）
        </h2>
        <p className="text-gray-600">
          Qiita、Zenn、Noteから最新の記事を取得しています
        </p>
      </div>
      
      {articles.errors.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-medium mb-2">一部の記事取得でエラーが発生しました:</p>
          <ul className="text-sm text-amber-700 space-y-1">
            {articles.errors.map((error, index) => (
              <li key={index}>• {error.platform}: {error.error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-4">
        {allArticles}
      </div>
    </div>
  );
}