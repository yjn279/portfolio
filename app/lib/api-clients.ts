import type { Article } from "@/types";
import type {
  ApiError,
  ApiResponse,
  NoteArticle,
  QiitaItem,
  ZennArticle,
} from "@/types/api";

// Constants
const ZENN_API_BASE = "https://zenn.dev/api";
const QIITA_API_BASE = "https://qiita.com/api/v2";
const NOTE_API_BASE = "https://note.com/api/v2";

// User IDs from the issue
const USER_IDS = {
  zenn: "yuji0207",
  qiita: "yjn279",
  note: "yjn279",
} as const;

// Helper function to estimate reading time
function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.length / 5; // Rough estimate for Japanese text
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes}分`;
}

// Helper function to format numbers
function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// Zenn API Client
export class ZennApiClient {
  private baseUrl = ZENN_API_BASE;
  private username = USER_IDS.zenn;

  async fetchArticles(page = 1, perPage = 20): Promise<ApiResponse<Article>> {
    try {
      // Zenn doesn't have a public API, so we'll use RSS or scraping approach
      // For now, we'll return a simulated response indicating the limitation
      const error: ApiError = {
        message:
          "Zenn does not provide a public API. Consider using RSS feed or web scraping.",
        status: 501,
        platform: "zenn",
      };

      return {
        data: [],
        error,
        hasMore: false,
      };
    } catch (error) {
      const apiError: ApiError = {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
        platform: "zenn",
      };

      return {
        data: [],
        error: apiError,
      };
    }
  }

  // Alternative: RSS feed approach for Zenn
  async fetchArticlesFromRSS(): Promise<ApiResponse<Article>> {
    try {
      const rssUrl = `https://zenn.dev/${this.username}/feed`;

      // Note: This would need to be implemented with a CORS proxy or server-side
      const error: ApiError = {
        message:
          "RSS parsing requires server-side implementation due to CORS restrictions",
        status: 501,
        platform: "zenn",
      };

      return {
        data: [],
        error,
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : "RSS fetch failed",
        status: 500,
        platform: "zenn",
      };

      return {
        data: [],
        error: apiError,
      };
    }
  }
}

// Qiita API Client
export class QiitaApiClient {
  private baseUrl = QIITA_API_BASE;
  private username = USER_IDS.qiita;

  async fetchArticles(page = 1, perPage = 20): Promise<ApiResponse<Article>> {
    try {
      const url = `${this.baseUrl}/users/${this.username}/items?page=${page}&per_page=${perPage}`;

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error: ApiError = {
          message: `Qiita API error: ${response.status} ${response.statusText}`,
          status: response.status,
          platform: "qiita",
        };

        return {
          data: [],
          error,
        };
      }

      const qiitaArticles: QiitaItem[] = await response.json();

      const articles: Article[] = qiitaArticles.map((article) => ({
        id: `qiita-${article.id}`,
        title: article.title,
        description: `${article.body.substring(0, 200)}...`,
        excerpt: `${article.body.substring(0, 100)}...`,
        tags: article.tags.map((tag) => tag.name),
        url: article.url,
        publishedAt: formatDate(article.created_at),
        readTime: estimateReadingTime(article.body),
        views: formatCount(article.page_views_count || 0),
        likes: formatCount(article.likes_count),
        platform: "Qiita",
        featured: false,
      }));

      return {
        data: articles,
        hasMore: qiitaArticles.length === perPage,
      };
    } catch (error) {
      const apiError: ApiError = {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
        platform: "qiita",
      };

      return {
        data: [],
        error: apiError,
      };
    }
  }
}

// Note API Client
export class NoteApiClient {
  private baseUrl = NOTE_API_BASE;
  private username = USER_IDS.note;

  async fetchArticles(page = 1, perPage = 20): Promise<ApiResponse<Article>> {
    try {
      // Note's API is also not publicly available in the same way
      // We would need to use their RSS feed or implement server-side scraping
      const error: ApiError = {
        message:
          "Note does not provide a public API. Consider using RSS feed or web scraping.",
        status: 501,
        platform: "note",
      };

      return {
        data: [],
        error,
        hasMore: false,
      };
    } catch (error) {
      const apiError: ApiError = {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
        platform: "note",
      };

      return {
        data: [],
        error: apiError,
      };
    }
  }

  // Alternative: RSS feed approach for Note
  async fetchArticlesFromRSS(): Promise<ApiResponse<Article>> {
    try {
      const rssUrl = `https://note.com/${this.username}/rss`;

      // Note: This would need to be implemented with a CORS proxy or server-side
      const error: ApiError = {
        message:
          "RSS parsing requires server-side implementation due to CORS restrictions",
        status: 501,
        platform: "note",
      };

      return {
        data: [],
        error,
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : "RSS fetch failed",
        status: 500,
        platform: "note",
      };

      return {
        data: [],
        error: apiError,
      };
    }
  }
}

// Combined API Client
export class ArticleApiClient {
  private zennClient = new ZennApiClient();
  private qiitaClient = new QiitaApiClient();
  private noteClient = new NoteApiClient();

  // Check if we're running in browser
  private get isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  // Use API route when in browser, direct API when server-side
  private async fetchFromApiRoute(
    platform?: string,
    page = 1,
    useRss = false,
  ): Promise<
    | ApiResponse<Article>
    | {
        zenn: ApiResponse<Article>;
        qiita: ApiResponse<Article>;
        note: ApiResponse<Article>;
      }
  > {
    if (!this.isBrowser) {
      // Server-side: use direct API calls
      if (platform === "qiita") {
        return this.qiitaClient.fetchArticles(page);
      }
      if (platform === "zenn") {
        return this.zennClient.fetchArticles(page);
      }
      if (platform === "note") {
        return this.noteClient.fetchArticles(page);
      }

      return this.fetchAllArticlesDirect();
    }

    // Browser: use API route
    const params = new URLSearchParams();
    if (platform) params.set("platform", platform);
    params.set("page", page.toString());
    if (useRss) params.set("rss", "true");

    const response = await fetch(`/api/articles?${params}`);
    return response.json();
  }

  private async fetchAllArticlesDirect(): Promise<{
    zenn: ApiResponse<Article>;
    qiita: ApiResponse<Article>;
    note: ApiResponse<Article>;
  }> {
    const [zennResult, qiitaResult, noteResult] = await Promise.allSettled([
      this.zennClient.fetchArticles(),
      this.qiitaClient.fetchArticles(),
      this.noteClient.fetchArticles(),
    ]);

    return {
      zenn:
        zennResult.status === "fulfilled"
          ? zennResult.value
          : {
              data: [],
              error: {
                message: "Failed to fetch Zenn articles",
                status: 500,
                platform: "zenn",
              },
            },
      qiita:
        qiitaResult.status === "fulfilled"
          ? qiitaResult.value
          : {
              data: [],
              error: {
                message: "Failed to fetch Qiita articles",
                status: 500,
                platform: "qiita",
              },
            },
      note:
        noteResult.status === "fulfilled"
          ? noteResult.value
          : {
              data: [],
              error: {
                message: "Failed to fetch Note articles",
                status: 500,
                platform: "note",
              },
            },
    };
  }

  async fetchAllArticles(useRss = false): Promise<{
    zenn: ApiResponse<Article>;
    qiita: ApiResponse<Article>;
    note: ApiResponse<Article>;
  }> {
    return this.fetchFromApiRoute(undefined, 1, useRss);
  }

  async fetchQiitaArticles(
    page = 1,
    perPage = 20,
  ): Promise<ApiResponse<Article>> {
    return this.fetchFromApiRoute("qiita", page);
  }

  async fetchZennArticles(
    page = 1,
    perPage = 20,
    useRss = true,
  ): Promise<ApiResponse<Article>> {
    return this.fetchFromApiRoute("zenn", page, useRss);
  }

  async fetchNoteArticles(
    page = 1,
    perPage = 20,
    useRss = true,
  ): Promise<ApiResponse<Article>> {
    return this.fetchFromApiRoute("note", page, useRss);
  }
}

// Export singleton instance
export const articleApiClient = new ArticleApiClient();
