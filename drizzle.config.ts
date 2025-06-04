import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './database/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: '983e75d8-74e8-45df-92ad-3ae75211a151',
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
}); 
