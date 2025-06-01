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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Heart,
  SortDesc,
} from "lucide-react";
import { useState } from "react";
import { data, useLoaderData } from "react-router";
import type { Route } from "./+types/articles";

// Zenn API response types
interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  liked_count: number;
  bookmarked_count: number;
  comments_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  published_at: string;
  body_updated_at: string;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  publication?: {
    id: number;
    name: string;
    display_name: string;
    avatar_small_url: string;
  } | null;
}

interface ZennApiResponse {
  articles: ZennArticle[];
  next_page: string | null;
  total_count: number | null;
}

type SortOption = "latest" | "likes";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const response = await fetch(
      "https://zenn.dev/api/articles?username=yuji207",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const zennData: ZennApiResponse = await response.json();
    return data({ articles: zennData.articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return data({ articles: [] });
  }
}

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
  const { articles } = useLoaderData<typeof loader>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // Sort articles based on selected option
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "likes") {
      return b.liked_count - a.liked_count;
    }
    // Default: sort by update date (latest first)
    return new Date(b.body_updated_at).getTime() - new Date(a.body_updated_at).getTime();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        showBackButton={true}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

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

      {/* Articles Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Articles ({articles.length})
            </h2>
            <div className="flex items-center gap-2">
              <SortDesc className="h-4 w-4 text-gray-500" />
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="並び順" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">更新日順</SelectItem>
                  <SelectItem value="likes">いいね順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      Zenn
                    </Badge>
                    <a
                      href={`https://zenn.dev${article.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <a
                      href={`https://zenn.dev${article.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.body_updated_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.liked_count}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">記事が見つかりませんでした。</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              最新の技術記事やブログ投稿をお見逃しなく。
              Zennでフォローして、新しい記事の通知を受け取りましょう。
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <a
                href="https://zenn.dev/yuji207"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Follow on Zenn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
