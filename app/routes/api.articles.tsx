import { json } from "react-router";
import type { Route } from "./+types/api.articles";
import { ArticleApiClient } from "@/lib/api-clients";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const articles = await ArticleApiClient.fetchAllArticles();
    
    return json(articles, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minutes cache
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    
    return json(
      { 
        qiita: null,
        zenn: null,
        note: null,
        errors: [
          {
            platform: "qiita",
            error: "Failed to fetch articles",
            details: error instanceof Error ? error.message : "Unknown error"
          }
        ]
      },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}