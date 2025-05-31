import type { RSSFeed, RSSItem } from "@/types/api";

export class RSSParser {
  static async parseRSS(xmlContent: string): Promise<RSSFeed> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, "text/xml");
    
    // Check for parsing errors
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
      throw new Error(`XML parsing error: ${parserError.textContent}`);
    }

    const channel = doc.querySelector("channel");
    if (!channel) {
      throw new Error("Invalid RSS feed: no channel element found");
    }

    const title = channel.querySelector("title")?.textContent || "";
    const description = channel.querySelector("description")?.textContent || "";
    const link = channel.querySelector("link")?.textContent || "";

    const items: RSSItem[] = [];
    const itemElements = channel.querySelectorAll("item");

    for (const item of itemElements) {
      const itemTitle = item.querySelector("title")?.textContent || "";
      const itemLink = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const itemDescription = item.querySelector("description")?.textContent || "";
      const content = item.querySelector("content\\:encoded")?.textContent || 
                    item.querySelector("content")?.textContent || "";
      const guid = item.querySelector("guid")?.textContent || "";

      if (itemTitle && itemLink) {
        items.push({
          title: itemTitle,
          link: itemLink,
          pubDate,
          description: itemDescription,
          content,
          guid
        });
      }
    }

    return {
      title,
      description,
      link,
      items
    };
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    } catch {
      return dateString;
    }
  }

  static extractPlainText(html: string): string {
    // Basic HTML tag removal for description
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-zA-Z0-9#]+;/g, " ")
      .trim()
      .substring(0, 200);
  }
}