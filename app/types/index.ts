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
