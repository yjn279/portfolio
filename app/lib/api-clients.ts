import type { ArticleApiResponse, QiitaArticle, RSSItem, ArticleApiError } from "@/types/api";
import { RSSParser } from "./rss-parser";

export class ArticleApiClient {
  private static readonly QIITA_API_BASE = "https://qiita.com/api/v2";
  private static readonly ZENN_RSS_URL = "https://zenn.dev/yuji0207/feed";
  private static readonly NOTE_RSS_URL = "https://note.com/yjn279/rss";

  static async fetchAllArticles(): Promise<ArticleApiResponse> {
    const errors: ArticleApiError[] = [];
    let qiita: QiitaArticle[] | null = null;
    let zenn: RSSItem[] | null = null;
    let note: RSSItem[] | null = null;

    // Fetch Qiita articles
    try {
      qiita = await this.fetchQiitaArticles("yjn279");
    } catch (error) {
      errors.push({
        platform: "qiita",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error
      });
    }

    // Fetch Zenn articles via RSS
    try {
      zenn = await this.fetchZennArticles();
    } catch (error) {
      errors.push({
        platform: "zenn",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error
      });
    }

    // Fetch Note articles via RSS
    try {
      note = await this.fetchNoteArticles();
    } catch (error) {
      errors.push({
        platform: "note",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error
      });
    }

    return {
      qiita,
      zenn,
      note,
      errors
    };
  }

  private static async fetchQiitaArticles(userId: string): Promise<QiitaArticle[]> {
    const response = await fetch(`${this.QIITA_API_BASE}/users/${userId}/items?page=1&per_page=20`, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Flight-YJN279-Portfolio"
      }
    });

    if (!response.ok) {
      throw new Error(`Qiita API error: ${response.status} ${response.statusText}`);
    }

    const articles: QiitaArticle[] = await response.json();
    return articles;
  }

  private static async fetchZennArticles(): Promise<RSSItem[]> {
    const response = await fetch(this.ZENN_RSS_URL, {
      headers: {
        "User-Agent": "Flight-YJN279-Portfolio"
      }
    });

    if (!response.ok) {
      throw new Error(`Zenn RSS error: ${response.status} ${response.statusText}`);
    }

    const xmlContent = await response.text();
    const feed = await RSSParser.parseRSS(xmlContent);
    return feed.items;
  }

  private static async fetchNoteArticles(): Promise<RSSItem[]> {
    const response = await fetch(this.NOTE_RSS_URL, {
      headers: {
        "User-Agent": "Flight-YJN279-Portfolio"
      }
    });

    if (!response.ok) {
      throw new Error(`Note RSS error: ${response.status} ${response.statusText}`);
    }

    const xmlContent = await response.text();
    const feed = await RSSParser.parseRSS(xmlContent);
    return feed.items;
  }
}