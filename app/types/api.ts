export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  page_views_count: number;
  tags: Array<{
    name: string;
    versions: string[];
  }>;
  user: {
    id: string;
    name: string;
    profile_image_url: string;
  };
  body: string;
}

export interface QiitaApiResponse {
  articles: QiitaArticle[];
  total_count?: number;
}

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  guid?: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  items: RSSItem[];
}

export interface ArticleApiError {
  platform: 'qiita' | 'zenn' | 'note';
  error: string;
  details?: any;
}

export interface ArticleApiResponse {
  qiita: QiitaArticle[] | null;
  zenn: RSSItem[] | null;
  note: RSSItem[] | null;
  errors: ArticleApiError[];
}