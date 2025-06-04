// 記事データの型定義（API/DB/ローカル共通）
export interface Article {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  tags: string[];
  url: string;
  publishedAt: string;
  readTime?: string;
  views?: string;
  likes?: string;
  platform?: string;
  featured?: boolean;
}

// APIから取得する記事の型（例: Zenn, Qiita, Note）
export interface ApiArticle {
  id: string;
  title: string;
  url: string;
  liked_count: number;
  updated_at: string;
  platform: "Zenn" | "Qiita" | "Note";
  created_at?: string;
}

// UI表示用の拡張型（descriptionやcreated_atをMicrolink等で補完する場合）
export interface UiArticle extends ApiArticle {
  description?: string;
  created_at?: string;
  tags?: string[];
  likes?: string | number;
  publishedAt?: string;
}
