import { useState, useEffect } from "react";
import type { Article, ApiError } from "@/types";
import { fetchAllArticles, fetchArticlesByPlatform } from "@/lib/api";

interface UseArticlesState {
  articles: Article[];
  loading: boolean;
  errors: ApiError[];
  refetch: () => Promise<void>;
}

interface UseArticlesOptions {
  platform?: "Zenn" | "Qiita" | "Note";
  autoFetch?: boolean;
}

/**
 * 記事一覧を取得・管理するカスタムフック
 */
export function useArticles(options: UseArticlesOptions = {}): UseArticlesState {
  const { platform, autoFetch = true } = options;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ApiError[]>([]);

  const fetchArticles = async () => {
    setLoading(true);
    setErrors([]);
    
    try {
      if (platform) {
        // 特定のプラットフォームのみ取得
        const articleList = await fetchArticlesByPlatform(platform);
        setArticles(articleList);
      } else {
        // 全プラットフォームから取得
        const { articles: articleList, errors: apiErrors } = await fetchAllArticles();
        setArticles(articleList);
        setErrors(apiErrors);
      }
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : "記事の取得に失敗しました",
        platform: platform || "Zenn" // fallback
      };
      setErrors([apiError]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchArticles();
    }
  }, [platform, autoFetch]);

  return {
    articles,
    loading,
    errors,
    refetch: fetchArticles
  };
}

/**
 * 記事をフィルタリングするヘルパー関数
 */
export function filterArticles(
  articles: Article[],
  filters: {
    platform?: string;
    tags?: string[];
    featured?: boolean;
  }
): Article[] {
  return articles.filter((article) => {
    if (filters.platform && article.platform !== filters.platform) {
      return false;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        article.tags.some(articleTag => 
          articleTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    if (filters.featured !== undefined && article.featured !== filters.featured) {
      return false;
    }
    
    return true;
  });
}

/**
 * 記事を検索するヘルパー関数
 */
export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query.trim()) {
    return articles;
  }
  
  const lowerQuery = query.toLowerCase();
  return articles.filter((article) => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}