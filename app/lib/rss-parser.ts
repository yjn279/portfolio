// RSS Parser for Zenn and Note feeds
// This is designed to work in Cloudflare Workers environment

import type { Article } from "@/types";

interface RSSItem {
  title?: string | null;
  link?: string | null;
  description?: string | null;
  pubDate?: string | null;
  guid?: string | null;
  content?: string | null;
}

interface ParsedRSS {
  title?: string | null;
  description?: string | null;
  link?: string | null;
  items: RSSItem[];
}

// Simple XML parser for RSS feeds
export class RSSParser {
  private extractTextContent(xml: string, tagName: string): string | null {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, "is");
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
  }

  private extractAllItems(xml: string): RSSItem[] {
    const itemRegex = /<item[^>]*>(.*?)<\/item>/gis;
    const items: RSSItem[] = [];
    let match: RegExpExecArray | null = itemRegex.exec(xml);

    while (match !== null) {
      const itemXml = match[1];

      const item: RSSItem = {
        title: this.extractTextContent(itemXml, "title"),
        link: this.extractTextContent(itemXml, "link"),
        description: this.extractTextContent(itemXml, "description"),
        pubDate: this.extractTextContent(itemXml, "pubDate"),
        guid: this.extractTextContent(itemXml, "guid"),
        content:
          this.extractTextContent(itemXml, "content:encoded") ||
          this.extractTextContent(itemXml, "content"),
      };

      items.push(item);
      match = itemRegex.exec(xml);
    }

    return items;
  }

  private parseRSS(xmlString: string): ParsedRSS {
    const channelMatch = xmlString.match(/<channel[^>]*>(.*?)<\/channel>/is);
    const channelXml = channelMatch ? channelMatch[1] : xmlString;

    return {
      title: this.extractTextContent(channelXml, "title"),
      description: this.extractTextContent(channelXml, "description"),
      link: this.extractTextContent(channelXml, "link"),
      items: this.extractAllItems(channelXml),
    };
  }

  private formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  }

  private estimateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.length / 5; // Rough estimate for Japanese text
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes}分`;
  }

  private extractDescription(content: string, maxLength = 200): string {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  }

  async fetchZennArticles(username: string): Promise<Article[]> {
    try {
      const rssUrl = `https://zenn.dev/${username}/feed`;
      const response = await fetch(rssUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch Zenn RSS: ${response.status}`);
      }

      const xmlText = await response.text();
      const parsed = this.parseRSS(xmlText);

      return parsed.items.map((item, index) => ({
        id: `zenn-${item.guid || index}`,
        title: item.title || "Untitled",
        description: this.extractDescription(
          item.description || item.content || "",
        ),
        excerpt: this.extractDescription(
          item.content || item.description || "",
          100,
        ),
        tags: [], // RSS doesn't typically include tags, would need to parse from content
        url: item.link || "",
        publishedAt: this.formatDate(item.pubDate || ""),
        readTime: this.estimateReadingTime(
          item.content || item.description || "",
        ),
        views: "N/A", // Not available in RSS
        likes: "N/A", // Not available in RSS
        platform: "Zenn",
        featured: false,
      }));
    } catch (error) {
      console.error("Error fetching Zenn RSS:", error);
      throw error;
    }
  }

  async fetchNoteArticles(username: string): Promise<Article[]> {
    try {
      const rssUrl = `https://note.com/${username}/rss`;
      const response = await fetch(rssUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch Note RSS: ${response.status}`);
      }

      const xmlText = await response.text();
      const parsed = this.parseRSS(xmlText);

      return parsed.items.map((item, index) => ({
        id: `note-${item.guid || index}`,
        title: item.title || "Untitled",
        description: this.extractDescription(
          item.description || item.content || "",
        ),
        excerpt: this.extractDescription(
          item.content || item.description || "",
          100,
        ),
        tags: [], // RSS doesn't typically include tags
        url: item.link || "",
        publishedAt: this.formatDate(item.pubDate || ""),
        readTime: this.estimateReadingTime(
          item.content || item.description || "",
        ),
        views: "N/A", // Not available in RSS
        likes: "N/A", // Not available in RSS
        platform: "Note",
        featured: false,
      }));
    } catch (error) {
      console.error("Error fetching Note RSS:", error);
      throw error;
    }
  }
}

export const rssParser = new RSSParser();
