import type { UiArticle } from "@/types/article.types";
import { useCallback, useEffect, useState } from "react";

export function useArticles(articles: UiArticle[]) {
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [noteDates, setNoteDates] = useState<Record<string, string>>({});
  const [loadingDesc, setLoadingDesc] = useState<Record<string, boolean>>({});
  const [errorDesc, setErrorDesc] = useState<Record<string, boolean>>({});

  // Microlink description取得
  const fetchDescription = useCallback(
    async (id: string, url: string, platform: string) => {
      setLoadingDesc((prev) => ({ ...prev, [id]: true }));
      setErrorDesc((prev) => ({ ...prev, [id]: false }));
      try {
        const res = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(url)}`,
        );
        const data = (await res.json()) as {
          data?: { description?: string; date?: string };
        };
        const desc = data?.data?.description || "";
        setDescriptions((prev) => ({ ...prev, [id]: desc }));
        if (platform === "Note" && data?.data?.date) {
          setNoteDates((prev) => ({ ...prev, [id]: data.data?.date || "" }));
        }
      } catch (e) {
        setErrorDesc((prev) => ({ ...prev, [id]: true }));
      } finally {
        setLoadingDesc((prev) => ({ ...prev, [id]: false }));
      }
    },
    [],
  );

  useEffect(() => {
    for (const article of articles) {
      if (
        !descriptions[article.id] &&
        !loadingDesc[article.id] &&
        !errorDesc[article.id]
      ) {
        fetchDescription(article.id, article.url, article.platform ?? "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, descriptions, loadingDesc, errorDesc, fetchDescription]);

  // Note記事はMicrolinkのdateをcreatedAtに使う
  const getCreatedAt = (article: UiArticle) => {
    if (article.platform === "Note" && noteDates[article.id]) {
      return noteDates[article.id];
    }
    return article.created_at || article.publishedAt || article.updated_at;
  };

  // YYYY年M月D日形式
  const formatJapaneseDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return {
    descriptions,
    noteDates,
    loadingDesc,
    errorDesc,
    getCreatedAt,
    formatJapaneseDate,
  };
}
