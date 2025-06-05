INSERT INTO projects (
  title,
  description,
  url,
  tags
) VALUES (
  "E-Commerce Platform",
  "Next.js製のフルスタックECサイト",
  "https://ecommerce-demo.vercel.app",
  '["Next.js","TypeScript","Prisma","Stripe","PostgreSQL","Tailwind CSS"]'
), (
  "Task Management App",
  "リアルタイム同期機能付きタスク管理アプリ",
  "https://task-manager-demo.vercel.app",
  '["React","Firebase","Material-UI","Redux","WebSocket"]'
), (
  "Weather Dashboard",
  "気象データ可視化ダッシュボード",
  "https://weather-dashboard-demo.vercel.app",
  '["Vue.js","D3.js","Express.js","Chart.js","OpenWeatherMap API"]'
), (
  "Blog CMS Platform",
  "ヘッドレスCMSを活用したブログプラットフォーム",
  "https://blog-cms-demo.vercel.app",
  '["Next.js","Contentful","GraphQL","Markdown","Vercel"]'
), (
  "Real-time Chat Application",
  "Socket.ioを使用したリアルタイムチャットアプリケーション",
  "https://chat-app-demo.herokuapp.com",
  '["React","Node.js","Socket.io","MongoDB","Express"]'
), (
  "Portfolio Website",
  "React Router v7とCloudflareを使用したポートフォリオサイト",
  "https://yjn279.pages.dev",
  '["React Router v7","TypeScript","Tailwind CSS","Cloudflare","shadcn/ui"]'
);

INSERT INTO project_links (project_id, url, media) VALUES
  (1, "https://github.com/yjn279/ecommerce", "GitHub"),
  (1, "https://ecommerce-demo.vercel.app", "Note"),
  (1, "https://slides.com/yjn279/ecommerce", "SpeakerDeck"),
  (2, "https://github.com/yjn279/task-manager", "GitHub"),
  (2, "https://task-manager-demo.vercel.app", "Note"),
  (3, "https://github.com/yjn279/weather-dashboard", "GitHub"),
  (3, "https://weather-dashboard-demo.vercel.app", "Note"),
  (3, "https://slides.com/yjn279/weather", "SpeakerDeck"),
  (4, "https://github.com/yjn279/blog-cms", "GitHub"),
  (4, "https://blog-cms-demo.vercel.app", "Note"),
  (5, "https://github.com/yjn279/chat-app", "GitHub"),
  (5, "https://chat-app-demo.herokuapp.com", "Note"),
  (6, "https://github.com/yjn279/portfolio", "GitHub"),
  (6, "https://yjn279.pages.dev", "Note");
