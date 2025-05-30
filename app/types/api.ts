// API response types for different platforms

export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published: boolean;
  slug_: string;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  reading_time: number;
  publication: {
    id: number;
    name: string;
    display_name: string;
    avatar_small_url: string;
  } | null;
}

export interface QiitaArticle {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: {
    created_at: string;
    description: string;
    name: string;
    private: boolean;
    updated_at: string;
    url_name: string;
  } | null;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags: Array<{
    name: string;
    versions: string[];
  }>;
  title: string;
  updated_at: string;
  url: string;
  user: {
    description: string;
    facebook_id: string;
    followees_count: number;
    followers_count: number;
    github_login_name: string;
    id: string;
    items_count: number;
    linkedin_id: string;
    location: string;
    name: string;
    organization: string;
    permanent_id: number;
    profile_image_url: string;
    team_only: boolean;
    twitter_screen_name: string;
    website_url: string;
  };
  page_views_count: number;
}

export interface NoteArticle {
  id: string;
  name: string;
  description: string;
  eyecatch: string;
  publish_at: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  hashtags: Array<{
    name: string;
  }>;
  user: {
    id: string;
    name: string;
    nickname: string;
    profile_image_url: string;
  };
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  platform: "zenn" | "qiita" | "note";
}

// Unified response type
export interface ApiResponse<T> {
  data: T[];
  error?: ApiError;
  hasMore?: boolean;
  nextPage?: string | number;
}
