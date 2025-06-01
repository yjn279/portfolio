import { articleApiClient } from "@/lib/api-clients";
import { rssParser } from "@/lib/rss-parser";
import { json } from "react-router";
import type { Route } from "./+types/api.articles";

// User IDs from the issue
const USER_IDS = {
  zenn: "yuji0207",
  qiita: "yjn279",
  note: "yjn279",
} as const;

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const platform = url.searchParams.get("platform") as
    | "zenn"
    | "qiita"
    | "note"
    | null;
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const useRss = url.searchParams.get("rss") === "true";

  try {
    if (platform === "qiita") {
      // Use Qiita API
      const result = await articleApiClient.fetchQiitaArticles(page);
      return json(result);
    }

    if (platform === "zenn" && useRss) {
      // Use RSS for Zenn
      try {
        const articles = await rssParser.fetchZennArticles(USER_IDS.zenn);
        return json({
          data: articles,
          hasMore: false,
        });
      } catch (error) {
        return json({
          data: [],
          error: {
            message:
              error instanceof Error
                ? error.message
                : "Failed to fetch Zenn RSS",
            status: 500,
            platform: "zenn",
          },
        });
      }
    }

    if (platform === "note" && useRss) {
      // Use RSS for Note
      try {
        const articles = await rssParser.fetchNoteArticles(USER_IDS.note);
        return json({
          data: articles,
          hasMore: false,
        });
      } catch (error) {
        return json({
          data: [],
          error: {
            message:
              error instanceof Error
                ? error.message
                : "Failed to fetch Note RSS",
            status: 500,
            platform: "note",
          },
        });
      }
    }

    if (!platform) {
      // Fetch all platforms
      const results = await articleApiClient.fetchAllArticles();

      // Try to get RSS data for Zenn and Note if requested
      if (useRss) {
        try {
          const [zennArticles, noteArticles] = await Promise.allSettled([
            rssParser.fetchZennArticles(USER_IDS.zenn),
            rssParser.fetchNoteArticles(USER_IDS.note),
          ]);

          if (zennArticles.status === "fulfilled") {
            results.zenn = { data: zennArticles.value, hasMore: false };
          }
          if (noteArticles.status === "fulfilled") {
            results.note = { data: noteArticles.value, hasMore: false };
          }
        } catch (error) {
          console.error("Error fetching RSS feeds:", error);
        }
      }

      return json(results);
    }

    // Platform not supported without RSS
    return json({
      data: [],
      error: {
        message: `Platform ${platform} not supported without RSS`,
        status: 501,
        platform,
      },
    });
  } catch (error) {
    return json(
      {
        data: [],
        error: {
          message:
            error instanceof Error ? error.message : "Internal server error",
          status: 500,
          platform: platform || "unknown",
        },
      },
      { status: 500 },
    );
  }
}
