import type {
  ApiError,
  Article,
  QiitaItem,
  ZennArticle,
  ZennArticleResponse,
} from "@/types";

// ユーザーIDの設定
const ZENN_USERNAME = "yuji0207";
const QIITA_USER_ID = "yjn279";
const NOTE_USER_ID = "yjn279"; // 現在はAPIが利用不可

// API エンドポイント
const ZENN_API_BASE = "https://zenn.dev/api";
const QIITA_API_BASE = "https://qiita.com/api/v2";

/**
 * Zenn記事を統一フォーマットのArticleに変換
 */
function convertZennToArticle(zennArticle: ZennArticle): Article {
  return {
    id: `zenn-${zennArticle.id}`,
    title: zennArticle.title,
    description: `${zennArticle.emoji} ${zennArticle.article_type === "tech" ? "技術記事" : "アイデア記事"}`,
    tags: zennArticle.tags.map((tag) => tag.name),
    url: `https://zenn.dev${zennArticle.path}`,
    publishedAt: new Date(zennArticle.published_at).toISOString().split("T")[0],
    readTime: `${zennArticle.reading_time}分`,
    views: "-", // Zenn APIでは提供されない
    likes: zennArticle.liked_count.toString(),
    platform: "Zenn",
    featured: zennArticle.pinned,
  };
}

/**
 * Qiita記事を統一フォーマットのArticleに変換
 */
function convertQiitaToArticle(qiitaItem: QiitaItem): Article {
  return {
    id: `qiita-${qiitaItem.id}`,
    title: qiitaItem.title,
    description: `${qiitaItem.body.substring(0, 100)}...`, // 本文の最初の100文字
    tags: qiitaItem.tags.map((tag) => tag.name),
    url: qiitaItem.url,
    publishedAt: new Date(qiitaItem.created_at).toISOString().split("T")[0],
    readTime: "-", // Qiita APIでは提供されない
    views: qiitaItem.page_views_count?.toString() || "-",
    likes: qiitaItem.likes_count.toString(),
    platform: "Qiita",
    featured: false, // Qiitaにはピン機能がない
  };
}

/**
 * Zennから記事一覧を取得
 */
export async function fetchZennArticles(): Promise<Article[]> {
  try {
    const url = `${ZENN_API_BASE}/users/${ZENN_USERNAME}/articles`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Zenn API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: ZennArticleResponse = await response.json();
    return data.articles.map(convertZennToArticle);
  } catch (error) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "Zenn記事の取得に失敗しました",
      status:
        error instanceof Error && "status" in error
          ? Number(error.status)
          : undefined,
      platform: "Zenn",
    };
    console.error("Zenn API error:", apiError);
    throw apiError;
  }
}

/**
 * Qiitaから記事一覧を取得
 */
export async function fetchQiitaArticles(): Promise<Article[]> {
  try {
    const url = `${QIITA_API_BASE}/users/${QIITA_USER_ID}/items`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Qiita API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: QiitaItem[] = await response.json();
    return data.map(convertQiitaToArticle);
  } catch (error) {
    const apiError: ApiError = {
      message:
        error instanceof Error
          ? error.message
          : "Qiita記事の取得に失敗しました",
      status:
        error instanceof Error && "status" in error
          ? Number(error.status)
          : undefined,
      platform: "Qiita",
    };
    console.error("Qiita API error:", apiError);
    throw apiError;
  }
}

/**
 * Note記事取得（現在は未実装）
 * Noteには公開APIがないため、将来的にはRSSフィードやスクレイピングを検討
 */
export async function fetchNoteArticles(): Promise<Article[]> {
  // Note APIは存在しないため、現在は空の配列を返す
  // 将来的にはRSSフィードの解析などを検討
  console.warn(
    "Note API is not available. Consider using RSS feed or manual updates.",
  );
  return [];
}

/**
 * 全プラットフォームから記事を取得
 */
export async function fetchAllArticles(): Promise<{
  articles: Article[];
  errors: ApiError[];
}> {
  const results = await Promise.allSettled([
    fetchZennArticles(),
    fetchQiitaArticles(),
    fetchNoteArticles(),
  ]);

  const articles: Article[] = [];
  const errors: ApiError[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      errors.push(result.reason as ApiError);
    }
  }

  // 公開日順でソート（新しい順）
  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return { articles, errors };
}

/**
 * 特定のプラットフォームの記事のみを取得
 */
export async function fetchArticlesByPlatform(
  platform: "Zenn" | "Qiita" | "Note",
): Promise<Article[]> {
  switch (platform) {
    case "Zenn":
      return fetchZennArticles();
    case "Qiita":
      return fetchQiitaArticles();
    case "Note":
      return fetchNoteArticles();
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}
