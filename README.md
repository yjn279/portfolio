# ✈️ Flight YJN279 - Portfolio

> Welcome on board flight YJN279. The captain in command of this website is NAKAMURA Yuji and my co-pilot is ~~GitHub~~ Cursor. We are now ready for departure.

YJN279のポートフォリオサイトです。フルスタックWebエンジニアとして、モダンな技術スタックでユーザー体験を向上させるプロダクト開発に取り組んでいます。

## 🚀 デモ

[https://portfolio.yjn279.dev](https://portfolio.yjn279.dev) *(仮想URL)*

## 📋 機能

- **プロジェクト紹介**: 開発プロジェクトの詳細とデモリンク
- **技術記事**: Zenn・Qiitaで公開している技術記事の一覧  
- **経歴**: フルスタックエンジニアとしての職歴・経験
- **プロフィール**: スキルセット・連絡先情報
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

### フロントエンド
- **React 19** - UIライブラリ
- **React Router v7** - ルーティング
- **TypeScript** - 型安全性
- **Tailwind CSS v4** - スタイリング
- **Radix UI** - アクセシブルなコンポーネント
- **Lucide React** - アイコンライブラリ

### バックエンド・インフラ
- **Cloudflare Workers** - エッジコンピューティング
- **Vite** - 高速ビルドツール
- **Wrangler** - Cloudflareデプロイメント

### 開発ツール
- **Volta** - Node.jsバージョン管理
- **pnpm** - パッケージマネージャー
- **ESLint** - 静的解析
- **TypeScript** - 型チェック

## 🏃‍♂️ クイックスタート

### 前提条件

- Node.js 24.1.0 (Voltaで管理)
- pnpm 10.11.0

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yjn279/portfolio.git
cd portfolio

# 依存関係をインストール
pnpm install
```

### 開発サーバー起動

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:5173 を開く
```

### ビルド・デプロイ

```bash
# プロダクションビルド
pnpm build

# プレビュー
pnpm preview

# Cloudflare Workersにデプロイ
pnpm deploy
```

## 📁 プロジェクト構造

```
portfolio/
├── app/
│   ├── components/ui/          # 再利用可能なUIコンポーネント
│   ├── routes/                 # ページコンポーネント
│   │   ├── home.tsx           # ホームページ
│   │   ├── projects.tsx       # プロジェクト一覧
│   │   ├── articles.tsx       # 記事一覧
│   │   └── profile.tsx        # プロフィール
│   ├── lib/                   # ユーティリティ関数
│   ├── app.css               # グローバルスタイル
│   └── root.tsx              # アプリケーションルート
├── public/                    # 静的ファイル
├── workers/                   # Cloudflare Workers設定
├── package.json
├── vite.config.ts            # Vite設定
├── wrangler.jsonc            # Cloudflare Workers設定
└── tsconfig.json             # TypeScript設定
```

## 🎨 デザインシステム

### テーマ
- **航空**をテーマにしたUI/UX
- **Flight YJN279**のブランディング
- シンプルで洗練されたデザイン

### カラーパレット
- **プライマリー**: Blue 600 (`#2563eb`)
- **背景**: Sky-Blue グラデーション
- **テキスト**: Gray 900/600

### コンポーネント
- [Radix UI](https://www.radix-ui.com/)ベースのアクセシブルコンポーネント
- [shadcn/ui](https://ui.shadcn.com/)スタイルのデザインシステム

## 📜 利用可能なスクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm preview` | ビルド結果をプレビュー |
| `pnpm deploy` | Cloudflare Workersにデプロイ |
| `pnpm typecheck` | TypeScript型チェック |
| `pnpm cf-typegen` | Cloudflare Workers型定義生成 |

## 🌐 デプロイメント

このプロジェクトは[Cloudflare Workers](https://workers.cloudflare.com/)にデプロイされます。

### 自動デプロイ
- `main`ブランチにプッシュすると自動デプロイ
- プレビューデプロイも利用可能

### 手動デプロイ
```bash
pnpm deploy
```

## 👨‍💻 著者

**NAKAMURA Yuji (@yjn279)**
- Portfolio: [https://portfolio.yjn279.dev](https://portfolio.yjn279.dev)
- GitHub: [@yjn279](https://github.com/yjn279)
- Zenn: [@yjn279](https://zenn.dev/yjn279)

## 📝 ライセンス

このプロジェクトは個人ポートフォリオサイトです。

---

**Thank you for boarding Flight YJN279! 🛫**
