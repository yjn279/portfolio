export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github: string;
  demo: string;
  slides?: string | null;
  status?: string;
  duration?: string;
  team?: string;
  featured?: boolean;
}

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

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location?: string;
  description: string;
  achievements?: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface Interest {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
}

export interface SkillCategory {
  frontend: string[];
  backend: string[];
  database: string[];
  cloud: string[];
  tools: string[];
}

// API関連の型定義
export interface ZennArticleResponse {
  articles: ZennArticle[];
  next_page?: number | null;
}

export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  path: string;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: boolean;
  published_at_time_ago: string;
  reading_time: number;
  source_repo_updated_at?: string | null;
  pinned: boolean;
  comments_count: number;
  liked_count: number;
  body_updated_at?: string | null;
  post_type: "Article";
  publication?: {
    id: number;
    name: string;
    avatar_small_url: string;
    pro: boolean;
  } | null;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  tags: Array<{
    id: number;
    name: string;
    taggings_count: number;
  }>;
}

export interface QiitaItem {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: {
    id: number;
    name: string;
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

export interface ApiError {
  message: string;
  status?: number;
  platform: "Zenn" | "Qiita" | "Note";
}
