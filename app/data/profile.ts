import type {
  Certification,
  Education,
  Experience,
  Interest,
  SkillCategory,
} from "@/types";
import { Award, Camera, Code, Coffee, Music } from "lucide-react";

export const experiences: Experience[] = [
  {
    id: "tech-startup-inc",
    company: "Tech Startup Inc.",
    position: "Senior Full Stack Engineer",
    period: "2022 - Present",
    location: "東京, 日本",
    description:
      "React/Next.jsとNode.jsを使用したWebアプリケーション開発をリード。チーム規模5名のテックリードとして、アーキテクチャ設計からデプロイまでの全工程を担当。",
    achievements: [
      "新規プロダクトの0→1開発を主導し、月間10万PVを達成",
      "レガシーシステムのモダン化により、ページ読み込み速度を70%改善",
      "CI/CDパイプラインの構築により、デプロイ時間を80%短縮",
      "コードレビュー文化の導入により、バグ発生率を50%削減",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    id: "digital-agency-co",
    company: "Digital Agency Co.",
    position: "Frontend Engineer",
    period: "2020 - 2022",
    location: "東京, 日本",
    description:
      "企業向けWebサイトとECサイトの開発・保守を担当。Vue.js/Nuxt.jsを中心とした開発チームで、UI/UX改善とパフォーマンス最適化に注力。",
    achievements: [
      "大手企業のコーポレートサイトリニューアルを担当（月間50万PV）",
      "ECサイトのコンバージョン率を25%向上させるUI改善を実施",
      "Webアクセシビリティ対応により、WCAG 2.1 AA準拠を達成",
      "社内勉強会の企画・運営により、チーム全体のスキル向上に貢献",
    ],
    technologies: [
      "Vue.js",
      "Nuxt.js",
      "JavaScript",
      "SCSS",
      "Figma",
      "Adobe XD",
    ],
  },
  {
    id: "web-solutions-ltd",
    company: "Web Solutions Ltd.",
    position: "Junior Developer",
    period: "2019 - 2020",
    location: "東京, 日本",
    description:
      "HTML/CSS/JavaScriptを使用したWebサイト制作からキャリアをスタート。基礎的なWeb技術を習得し、レスポンシブデザインとクロスブラウザ対応を学習。",
    achievements: [
      "中小企業向けWebサイトを月平均5件制作",
      "WordPressテーマ開発により、制作効率を40%向上",
      "Google PageSpeed Insightsスコア90以上を全案件で達成",
      "社内ツール開発により、作業時間を30%短縮",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "PHP"],
  },
];

export const education: Education[] = [
  {
    id: "tokyo-tech-computer-science",
    school: "東京工業大学",
    degree: "情報工学科 学士",
    period: "2015年4月 - 2019年3月",
    description:
      "コンピュータサイエンスの基礎から応用まで幅広く学習。特にアルゴリズムとデータ構造、ソフトウェア工学に注力。",
    achievements: [
      "卒業研究：機械学習を用いたWebアプリケーションのパフォーマンス最適化",
      "プログラミングコンテスト：ACM-ICPC アジア地区予選出場",
      "GPA: 3.8/4.0",
      "学部長賞受賞",
    ],
  },
];

export const skills: SkillCategory = {
  frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "SCSS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "FastAPI",
    "PHP",
    "Laravel",
  ],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "TypeORM"],
  cloud: [
    "AWS",
    "Vercel",
    "Cloudflare",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
  ],
  tools: ["Git", "GitHub", "Figma", "Adobe XD", "Postman", "VS Code"],
};

export const certifications: Certification[] = [
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2023年8月",
    credentialId: "AWS-SAA-123456",
  },
  {
    id: "gcp-cloud-architect",
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2023年3月",
    credentialId: "GCP-PCA-789012",
  },
  {
    id: "react-developer-meta",
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2022年11月",
    credentialId: "META-REACT-345678",
  },
];

export const interests: Interest[] = [
  {
    id: "open-source-contribution",
    icon: Code,
    name: "オープンソース貢献",
    description: "React、Vue.jsエコシステムへの貢献",
  },
  {
    id: "music-piano",
    icon: Music,
    name: "音楽",
    description: "ピアノ演奏、ジャズ・クラシック鑑賞",
  },
  {
    id: "photography",
    icon: Camera,
    name: "写真",
    description: "風景写真、ストリートフォトグラフィー",
  },
  {
    id: "specialty-coffee",
    icon: Coffee,
    name: "コーヒー",
    description: "スペシャルティコーヒー、ハンドドリップ",
  },
];
