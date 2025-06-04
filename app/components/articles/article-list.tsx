import type { UiArticle } from "@/types/article.types";
import { ArticleCard } from "./article-card";

interface ArticleListProps {
  articles: UiArticle[];
  descriptions: Record<string, string>;
  noteDates: Record<string, string>;
  loadingDesc: Record<string, boolean>;
  errorDesc: Record<string, boolean>;
  formatJapaneseDate: (dateString: string) => string;
  getCreatedAt: (article: UiArticle) => string;
}

export function ArticleList({
  articles,
  descriptions,
  noteDates,
  loadingDesc,
  errorDesc,
  formatJapaneseDate,
  getCreatedAt,
}: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-blue-100 bg-white hover:border-blue-300 hover:-translate-y-1 overflow-hidden outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
        >
          <ArticleCard
            article={article}
            description={descriptions[article.id]}
            createdAtLabel={`作成日: ${formatJapaneseDate(getCreatedAt(article))}`}
            loading={loadingDesc[article.id]}
            error={errorDesc[article.id]}
          />
        </a>
      ))}
    </div>
  );
}
