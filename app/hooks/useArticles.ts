import { useState, useEffect } from "react";
import type { Article } from "@/types";
import type { ApiResponse } from "@/types/api";
import { articleApiClient } from "@/lib/api-clients";

interface UseArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

interface UseArticlesResult extends UseArticlesState {
  fetchMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useArticles(platform?: 'zenn' | 'qiita' | 'note'): UseArticlesResult {
  const [state, setState] = useState<UseArticlesState>({
    articles: [],
    loading: true,
    error: null,
    hasMore: false
  });

  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = async (page = 1, append = false) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      let response: ApiResponse<Article>;

      if (platform === 'qiita') {
        response = await articleApiClient.fetchQiitaArticles(page);
      } else if (platform === 'zenn') {
        response = await articleApiClient.fetchZennArticles(page, 20, true); // Use RSS
      } else if (platform === 'note') {
        response = await articleApiClient.fetchNoteArticles(page, 20, true); // Use RSS
      } else {
        // Fetch all platforms - for now just use Qiita as it's the only working one
        response = await articleApiClient.fetchQiitaArticles(page);
      }

      if (response.error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error!.message
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        articles: append ? [...prev.articles, ...response.data] : response.data,
        loading: false,
        hasMore: response.hasMore || false
      }));

      setCurrentPage(page);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "記事の取得に失敗しました"
      }));
    }
  };

  const fetchMore = async () => {
    if (state.hasMore && !state.loading) {
      await fetchArticles(currentPage + 1, true);
    }
  };

  const refresh = async () => {
    setCurrentPage(1);
    await fetchArticles(1, false);
  };

  useEffect(() => {
    fetchArticles(1, false);
  }, [platform]);

  return {
    ...state,
    fetchMore,
    refresh
  };
}

// Hook for fetching articles from all platforms
export function useAllPlatformArticles() {
  const [state, setState] = useState<{
    zenn: Article[];
    qiita: Article[];
    note: Article[];
    loading: boolean;
    errors: { [key: string]: string };
  }>({
    zenn: [],
    qiita: [],
    note: [],
    loading: true,
    errors: {}
  });

  const fetchAllArticles = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const results = await articleApiClient.fetchAllArticles();
      const errors: { [key: string]: string } = {};

      if (results.zenn.error) {
        errors.zenn = results.zenn.error.message;
      }
      if (results.qiita.error) {
        errors.qiita = results.qiita.error.message;
      }
      if (results.note.error) {
        errors.note = results.note.error.message;
      }

      setState({
        zenn: results.zenn.data,
        qiita: results.qiita.data,
        note: results.note.data,
        loading: false,
        errors
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        errors: {
          general: error instanceof Error ? error.message : "記事の取得に失敗しました"
        }
      }));
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return {
    ...state,
    refresh: fetchAllArticles
  };
}