import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "nextjs-14-features",
    title: "Next.js 14の新機能を徹底解説",
    description:
      "App Routerの最新機能とパフォーマンス改善について詳しく解説します。Server ComponentsとClient Componentsの使い分けや、新しいキャッシュ戦略についても触れています。",
    excerpt:
      "Next.js 14では、App Routerが安定版となり、多くの新機能が追加されました。特にパフォーマンス面での改善が顕著で...",
    tags: ["Next.js", "React", "Performance", "App Router"],
    url: "https://zenn.dev/yjn279/articles/nextjs14-features",
    publishedAt: "2024-01-15",
    readTime: "8分",
    views: "1,234",
    likes: "89",
    platform: "Zenn",
    featured: true,
  },
  {
    id: "typescript-api-design",
    title: "TypeScriptで型安全なAPI設計",
    description:
      "tRPCを使った型安全なフルスタック開発の実践的な手法を紹介します。エンドツーエンドの型安全性を実現する方法を詳しく解説。",
    excerpt:
      "モダンなWebアプリケーション開発において、フロントエンドとバックエンド間の型安全性は重要な課題です...",
    tags: ["TypeScript", "tRPC", "API", "Type Safety"],
    url: "https://qiita.com/yjn279/items/typescript-api-design",
    publishedAt: "2023-12-20",
    readTime: "12分",
    views: "2,156",
    likes: "156",
    platform: "Qiita",
    featured: true,
  },
  {
    id: "react-performance",
    title: "Reactのパフォーマンス最適化テクニック",
    description:
      "メモ化とレンダリング最適化の実践的手法について解説します。useMemo、useCallback、React.memoの効果的な使い方を学びましょう。",
    excerpt:
      "Reactアプリケーションのパフォーマンス最適化は、ユーザー体験向上において重要な要素です...",
    tags: ["React", "Performance", "Optimization", "Hooks"],
    url: "https://zenn.dev/yjn279/articles/react-performance",
    publishedAt: "2023-11-10",
    readTime: "10分",
    views: "3,421",
    likes: "234",
    platform: "Zenn",
    featured: true,
  },
  {
    id: "tailwind-patterns",
    title: "Tailwind CSSの設計パターンとベストプラクティス",
    description:
      "Tailwind CSSを使った効率的なスタイリング手法と、保守性の高いCSS設計について解説します。",
    excerpt:
      "Tailwind CSSは、ユーティリティファーストのCSSフレームワークとして人気を集めています...",
    tags: ["Tailwind CSS", "CSS", "Design System", "Frontend"],
    url: "https://zenn.dev/yjn279/articles/tailwind-patterns",
    publishedAt: "2023-10-05",
    readTime: "7分",
    views: "1,876",
    likes: "98",
    platform: "Zenn",
    featured: false,
  },
  {
    id: "vercel-deployment",
    title: "Vercelでのデプロイ最適化とCI/CD構築",
    description:
      "Vercelを使った効率的なデプロイメント戦略と、GitHub Actionsとの連携によるCI/CDパイプラインの構築方法を紹介。",
    excerpt:
      "モダンなWebアプリケーション開発において、デプロイメントの自動化は必須の要素となっています...",
    tags: ["Vercel", "CI/CD", "GitHub Actions", "DevOps"],
    url: "https://qiita.com/yjn279/items/vercel-deployment",
    publishedAt: "2023-09-18",
    readTime: "9分",
    views: "1,543",
    likes: "76",
    platform: "Qiita",
    featured: false,
  },
  {
    id: "graphql-vs-rest",
    title: "GraphQLとREST APIの比較と選択指針",
    description:
      "GraphQLとREST APIの特徴を比較し、プロジェクトに適したAPI設計の選択方法について解説します。",
    excerpt:
      "API設計において、GraphQLとREST APIのどちらを選択するかは重要な決定です...",
    tags: ["GraphQL", "REST API", "API Design", "Backend"],
    url: "https://zenn.dev/yjn279/articles/graphql-vs-rest",
    publishedAt: "2023-08-22",
    readTime: "11分",
    views: "2,987",
    likes: "187",
    platform: "Zenn",
    featured: false,
  },
  {
    id: "react-server-components",
    title: "React Server Componentsの実践的活用法",
    description:
      "React Server Componentsの概念と実装方法、パフォーマンス向上への効果について詳しく解説します。",
    excerpt:
      "React Server Componentsは、Reactアプリケーションのパフォーマンスを大幅に改善する新しい機能です...",
    tags: ["React", "Server Components", "SSR", "Performance"],
    url: "https://zenn.dev/yjn279/articles/react-server-components",
    publishedAt: "2023-07-14",
    readTime: "13分",
    views: "4,123",
    likes: "298",
    platform: "Zenn",
    featured: false,
  },
  {
    id: "webassembly-javascript",
    title: "WebAssemblyとJavaScriptの連携パターン",
    description:
      "WebAssemblyを使ったパフォーマンス最適化と、JavaScriptとの効果的な連携方法について解説します。",
    excerpt:
      "WebAssemblyは、Webブラウザ上でネイティブレベルのパフォーマンスを実現する技術です...",
    tags: ["WebAssembly", "JavaScript", "Performance", "Browser"],
    url: "https://qiita.com/yjn279/items/webassembly-javascript",
    publishedAt: "2023-06-30",
    readTime: "15分",
    views: "1,234",
    likes: "67",
    platform: "Qiita",
    featured: false,
  },
];

export const getFeaturedArticles = (): Article[] =>
  articles.filter((article) => article.featured);

export const getOtherArticles = (): Article[] =>
  articles.filter((article) => !article.featured);