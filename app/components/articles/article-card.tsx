import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { UiArticle } from "@/types/article.types";
import { ExternalLink, Heart } from "lucide-react";

interface ArticleCardProps {
  article: UiArticle;
  description?: string;
  createdAtLabel?: string;
  loading?: boolean;
  error?: boolean;
}

export function ArticleCard({
  article,
  description,
  createdAtLabel,
  loading,
  error,
}: ArticleCardProps) {
  return (
    <Card className="border-0 shadow-none bg-transparent p-0">
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
              window.open(article.url, "_blank", "noopener,noreferrer");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                window.open(article.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <ExternalLink className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </button>
        </CardTitle>
        <div className="mt-2 text-gray-600 text-sm min-h-[2em] line-clamp-2">
          {loading && <span>Loading...</span>}
          {error && <span className="text-red-400">取得失敗</span>}
          {!loading && !error && (description || article.description)}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Badge
              className={`font-medium px-3 py-1 text-xs ${article.platform === "Zenn" ? "bg-blue-500 text-white" : article.platform === "Qiita" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}
            >
              {article.platform}
            </Badge>
            <span className="flex items-center gap-1 text-red-500 text-sm">
              <Heart className="h-4 w-4 fill-current" />
              <span className="font-semibold">
                {article.likes ?? article.liked_count}
              </span>
            </span>
          </span>
          {createdAtLabel && <span>{createdAtLabel}</span>}
        </div>
      </CardHeader>
    </Card>
  );
}
