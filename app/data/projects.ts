import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Next.js製のフルスタックECサイト",
    longDescription:
      "モダンなECサイトプラットフォームで、ユーザー認証、商品管理、決済処理、注文管理などの機能を包括的に実装。レスポンシブデザインとSEO最適化も考慮。",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    github: "https://github.com/yjn279/ecommerce",
    demo: "https://ecommerce-demo.vercel.app",
    slides: "https://slides.com/yjn279/ecommerce",
    status: "完成",
    duration: "3ヶ月",
    team: "個人開発",
    featured: true,
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "リアルタイム同期機能付きタスク管理アプリ",
    longDescription:
      "Firebaseを活用したリアルタイムタスク管理アプリケーション。ドラッグ&ドロップ、リアルタイム更新、チーム招待機能を実装。",
    tags: ["React", "Firebase", "Material-UI", "Redux", "WebSocket"],
    github: "https://github.com/yjn279/task-manager",
    demo: "https://task-manager-demo.vercel.app",
    slides: null,
    status: "完成",
    duration: "2ヶ月",
    team: "個人開発",
    featured: true,
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "気象データ可視化ダッシュボード",
    longDescription:
      "OpenWeatherMap APIを使用した気象データ可視化ダッシュボード。D3.jsによるインタラクティブなグラフとマップ表示機能。",
    tags: ["Vue.js", "D3.js", "Express.js", "Chart.js", "OpenWeatherMap API"],
    github: "https://github.com/yjn279/weather-dashboard",
    demo: "https://weather-dashboard-demo.vercel.app",
    slides: "https://slides.com/yjn279/weather",
    status: "完成",
    duration: "1ヶ月",
    team: "個人開発",
    featured: false,
  },
  {
    id: "blog-cms-platform",
    title: "Blog CMS Platform",
    description: "ヘッドレスCMSを活用したブログプラットフォーム",
    longDescription:
      "Contentful CMSとNext.jsを組み合わせたブログプラットフォーム。マークダウンエディタ、タグ管理、SEO最適化機能を実装。",
    tags: ["Next.js", "Contentful", "GraphQL", "Markdown", "Vercel"],
    github: "https://github.com/yjn279/blog-cms",
    demo: "https://blog-cms-demo.vercel.app",
    slides: null,
    status: "完成",
    duration: "1.5ヶ月",
    team: "個人開発",
    featured: false,
  },
  {
    id: "chat-application",
    title: "Real-time Chat Application",
    description: "Socket.ioを使用したリアルタイムチャットアプリケーション",
    longDescription:
      "Node.js、Socket.io、Reactを使用したリアルタイムチャットアプリ。プライベートメッセージ、グループチャット、ファイル共有機能を実装。",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    github: "https://github.com/yjn279/chat-app",
    demo: "https://chat-app-demo.herokuapp.com",
    slides: null,
    status: "開発中",
    duration: "進行中",
    team: "個人開発",
    featured: false,
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "React Router v7とCloudflareを使用したポートフォリオサイト",
    longDescription:
      "このサイト自体！React Router v7、shadcn/ui、Tailwind CSS v4を使用。航空機テーマのデザインとアニメーションを実装。",
    tags: [
      "React Router v7",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare",
      "shadcn/ui",
    ],
    github: "https://github.com/yjn279/portfolio",
    demo: "https://yjn279.pages.dev",
    slides: null,
    status: "完成",
    duration: "1週間",
    team: "個人開発",
    featured: true,
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((project) => project.featured);

export const getOtherProjects = (): Project[] =>
  projects.filter((project) => !project.featured);
