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
  BadgeCheck,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Filter,
  Heart,
  MapPin,
  Plane,
  SortDesc,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

// Qiita API response types
interface QiitaTag {
  name: string;
  versions: string[];
}

interface QiitaUser {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string;
  id: string;
  items_count: number;
  linkedin_id: string;
  location: string;
  name: string;
  organization: string;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string;
}

interface QiitaArticle {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group?: null | object;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stock_count: number;
  tags: QiitaTag[];
  title: string;
  updated_at: string;
  url: string;
  user: QiitaUser;
  page_views_count?: number;
}

// Note API response types (updated based on user feedback)
interface NoteContent {
  id: number;
  type: string;
  status: string;
  name: string;
  description?: string;
  likeCount: number; // Updated: correct field name
  user: {
    urlname: string;
    nickname: string;
  };
  publish_at?: string;
  updated_at: string;
  note_url: string;
}

interface NoteApiResponse {
  data: {
    contents: NoteContent[];
  };
}

// Microlink API response type
interface MicrolinkApiResponse {
  data?: {
    description?: string;
  };
}

// Unified article interface
interface UnifiedArticle {
  id: string;
  title: string;
  url: string;
  liked_count: number;
  updated_at: string;
  platform: "Zenn" | "Qiita" | "Note";
  created_at?: string;
}

type SortOption = "latest" | "likes";
type PlatformType = "Zenn" | "Qiita" | "Note";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Fetch from all APIs in parallel
    const [zennResponse, qiitaResponse, noteResponse] = await Promise.all([
      fetch("https://zenn.dev/api/articles?username=yuji207"),
      fetch("https://qiita.com/api/v2/users/yjn279/items?per_page=100"),
      fetch("https://note.com/api/v2/creators/yjn279/contents?kind=note"),
    ]);

    const unifiedArticles: UnifiedArticle[] = [];

    // Process Zenn articles
    if (zennResponse.ok) {
      const zennData: ZennApiResponse = await zennResponse.json();
      const zennArticles: UnifiedArticle[] = zennData.articles.map(
        (article) => ({
          id: `zenn-${article.id}`,
          title: article.title,
          url: `https://zenn.dev${article.path}`,
          liked_count: article.liked_count,
          updated_at: article.body_updated_at,
          platform: "Zenn" as const,
          created_at: article.published_at,
        }),
      );
      unifiedArticles.push(...zennArticles);
    }

    // Process Qiita articles
    if (qiitaResponse.ok) {
      const qiitaData: QiitaArticle[] = await qiitaResponse.json();
      const qiitaArticles: UnifiedArticle[] = qiitaData.map((article) => ({
        id: `qiita-${article.id}`,
        title: article.title,
        url: article.url,
        liked_count: article.likes_count,
        updated_at: article.updated_at,
        platform: "Qiita" as const,
        created_at: article.created_at,
      }));
      unifiedArticles.push(...qiitaArticles);
    }

    // Process Note articles (updated field access)
    if (noteResponse.ok) {
      const noteData: NoteApiResponse = await noteResponse.json();
      const noteArticles: UnifiedArticle[] = noteData.data.contents.map(
        (content) => ({
          id: `note-${content.id}`,
          title: content.name,
          url: content.note_url,
          liked_count: content.likeCount, // Updated: correct field name
          updated_at: content.updated_at,
          platform: "Note" as const,
          created_at: content.publish_at || content.updated_at,
        }),
      );
      unifiedArticles.push(...noteArticles);
    }

    return data({ articles: unifiedArticles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return data({ articles: [] });
  }
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Briefing Room - Flight YJN279" },
    {
      name: "description",
      content:
        "Flight YJN279 のブリーフィングルーム。技術記事、思考の記録、開発の知見をお届けします。",
    },
  ];
}

export default function Articles() {
  const { articles } = useLoaderData<typeof loader>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(
    [],
  );

  // Filter articles based on selected platforms
  const filteredArticles = articles.filter((article) => {
    // 何も選択されていない場合は全て表示
    if (selectedPlatforms.length === 0) return true;
    return selectedPlatforms.includes(article.platform);
  });

  // Sort articles based on selected option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "likes") {
      return b.liked_count - a.liked_count;
    }
    // Default: sort by update date (latest first)
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const getPlatformColor = (platform: "Zenn" | "Qiita" | "Note") => {
    switch (platform) {
      case "Zenn":
        return "bg-blue-500 text-white";
      case "Qiita":
        return "bg-green-500 text-white";
      case "Note":
        return "bg-amber-500 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  const getPlatformStats = () => {
    const stats = {
      Zenn: articles.filter((a) => a.platform === "Zenn").length,
      Qiita: articles.filter((a) => a.platform === "Qiita").length,
      Note: articles.filter((a) => a.platform === "Note").length,
    };
    return stats;
  };

  const platformStats = getPlatformStats();

  const togglePlatform = (platform: PlatformType) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      }
      return [...prev, platform];
    });
  };

  const getFilterBadgeStyle = (platform: PlatformType) => {
    const isSelected = selectedPlatforms.includes(platform);

    switch (platform) {
      case "Zenn":
        return isSelected
          ? "bg-blue-500 text-white cursor-pointer transition-colors hover:bg-blue-600"
          : "bg-blue-50 text-blue-600 border border-blue-200 cursor-pointer transition-colors hover:bg-blue-100";
      case "Qiita":
        return isSelected
          ? "bg-green-500 text-white cursor-pointer transition-colors hover:bg-green-600"
          : "bg-green-50 text-green-600 border border-green-200 cursor-pointer transition-colors hover:bg-green-100";
      case "Note":
        return isSelected
          ? "bg-amber-500 text-white cursor-pointer transition-colors hover:bg-amber-600"
          : "bg-amber-50 text-amber-600 border border-amber-200 cursor-pointer transition-colors hover:bg-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200 cursor-pointer transition-colors hover:bg-gray-100";
    }
  };

  // Microlink description cache
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [loadingDesc, setLoadingDesc] = useState<Record<string, boolean>>({});
  const [errorDesc, setErrorDesc] = useState<Record<string, boolean>>({});

  // Fetch description for a given article URL
  const fetchDescription = useCallback(async (id: string, url: string) => {
    setLoadingDesc((prev) => ({ ...prev, [id]: true }));
    setErrorDesc((prev) => ({ ...prev, [id]: false }));
    try {
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}`,
      );
      const data: MicrolinkApiResponse = await res.json();
      const desc = data?.data?.description || "";
      setDescriptions((prev) => ({ ...prev, [id]: desc }));
    } catch (e) {
      setErrorDesc((prev) => ({ ...prev, [id]: true }));
    } finally {
      setLoadingDesc((prev) => ({ ...prev, [id]: false }));
    }
  }, []);

  // Prefetch descriptions for visible articles
  useEffect(() => {
    for (const article of sortedArticles) {
      if (
        !descriptions[article.id] &&
        !loadingDesc[article.id] &&
        !errorDesc[article.id]
      ) {
        fetchDescription(article.id, article.url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedArticles, descriptions, loadingDesc, errorDesc, fetchDescription]);

  // Helper to get created date for any article
  const getCreatedAt = (article: UnifiedArticle) =>
    article.created_at || article.updated_at;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <Header
        showBackButton={true}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section - Flight Briefing Style */}
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-blue-600">
            <Plane className="h-32 w-32 rotate-45" />
          </div>
          <div className="absolute bottom-10 right-10 text-blue-600">
            <Plane className="h-24 w-24 -rotate-12" />
          </div>
          <div className="absolute top-1/2 left-1/4 text-blue-600">
            <Plane className="h-16 w-16 rotate-12" />
          </div>
        </div>

        <div className="relative container mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <BookOpen className="h-4 w-4" />
            <span className="tracking-wide">BRIEFING ROOM</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            Knowledge
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            技術記事、思考の記録、開発の知見を共有するブリーフィングルーム
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Flight Control Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              Article Archives
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Platform Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Filter by:
                </span>
                <Badge
                  className={getFilterBadgeStyle("Zenn")}
                  onClick={() => togglePlatform("Zenn")}
                >
                  {selectedPlatforms.includes("Zenn") && (
                    <BadgeCheck className="h-3 w-3 mr-1" />
                  )}
                  Zenn
                </Badge>
                <Badge
                  className={getFilterBadgeStyle("Qiita")}
                  onClick={() => togglePlatform("Qiita")}
                >
                  {selectedPlatforms.includes("Qiita") && (
                    <BadgeCheck className="h-3 w-3 mr-1" />
                  )}
                  Qiita
                </Badge>
                <Badge
                  className={getFilterBadgeStyle("Note")}
                  onClick={() => togglePlatform("Note")}
                >
                  {selectedPlatforms.includes("Note") && (
                    <BadgeCheck className="h-3 w-3 mr-1" />
                  )}
                  Note
                </Badge>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <SortDesc className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Sort by:
                </span>
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[140px] text-sm border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="並び順" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="likes">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Boarding Pass Style Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article, index) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-blue-100 bg-white hover:border-blue-300 hover:-translate-y-1 overflow-hidden outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border-0 shadow-none bg-transparent p-0">
                  {/* ヘッダー（右側の外部リンクアイコンは削除） */}
                  <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2"></CardHeader>
                  {/* 記事タイトル・description・いいね数＋日付 */}
                  <CardHeader className="pt-0 pb-3">
                    <CardTitle className="text-lg leading-tight text-gray-900 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      <span className="hover:underline decoration-2 underline-offset-2 decoration-blue-400">
                        {article.title}
                      </span>
                      <button
                        type="button"
                        aria-label="Open in new tab"
                        className="focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(
                            article.url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(
                              article.url,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      </button>
                    </CardTitle>
                    {/* Description from Microlink */}
                    <div className="mt-2 text-gray-600 text-sm min-h-[2em]">
                      {loadingDesc[article.id] && <span>Loading...</span>}
                      {errorDesc[article.id] && (
                        <span className="text-red-400">取得失敗</span>
                      )}
                      {!loadingDesc[article.id] &&
                        !errorDesc[article.id] &&
                        descriptions[article.id]}
                    </div>
                    {/* Like count (いいね数) + Created/Updated at */}
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Badge
                          className={`${getPlatformColor(article.platform)} font-medium px-3 py-1 text-xs`}
                        >
                          {article.platform}
                        </Badge>
                        <span className="flex items-center gap-1 text-red-500 text-sm">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="font-semibold">
                            {article.liked_count}
                          </span>
                        </span>
                      </span>
                      <span>
                        Created at {formatDate(getCreatedAt(article))}
                      </span>
                      <span>
                        Updated at {formatDate(article.updated_at)}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="h-12 w-12 text-blue-600" />
              </div>
              <p className="text-gray-500 text-lg">
                No flights scheduled at this time
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Please check back later for updates
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Final Boarding Call */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Plane className="h-8 w-8" />
              <h2 className="text-4xl font-bold">Final Boarding Call</h2>
            </div>
            <p className="text-xl text-blue-100 mb-12">
              最新のフライト情報や技術記事をお見逃しなく。お好みのプラットフォームでフォローして、新しい知見の旅にご参加ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 font-semibold"
                asChild
              >
                <a
                  href="https://zenn.dev/yuji207"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Board Zenn Flight
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 font-semibold"
                asChild
              >
                <a
                  href="https://qiita.com/yjn279"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Board Qiita Flight
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 font-semibold"
                asChild
              >
                <a
                  href="https://note.com/yjn279"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Board Note Flight
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
