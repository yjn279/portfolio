import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * プロジェクトテーブル
 */
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  tags: text('tags', { mode: 'json' }).notNull(), // JSON配列でタグ管理
  created: text('created').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updated: text('updated').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const projectLinks = sqliteTable('project_links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull(),
  media: text('media', { enum: ['GitHub', 'Note', 'SpeakerDeck', 'Qiita', 'Zenn'] }).notNull(),
  projectId: integer('project_id').notNull().references(() => projects.id),
  created: text('created').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updated: text('updated').notNull().default(sql`(CURRENT_TIMESTAMP)`),
}); 
