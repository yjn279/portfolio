import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { articles } from "@/data/articles";
import type { Article } from "@/types";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a
                href={article.url}
                className="hover:text-blue-600 transition-colors"
              >
                {article.title}
              </a>
            </h3>
            <p className="text-gray-600 mb-3 text-sm">{article.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {article.publishedAt}
              </span>
            </div>
          </div>
          <a
            href={article.url}
            className="self-end p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export function ArticlesSection() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section id="briefing-room" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Briefing Room
          </h2>
          <p className="text-gray-600">技術記事・ブログ</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/articles">
            <Button variant="outline" size="lg" className="group">
              すべての記事を見る
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}