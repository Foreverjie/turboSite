import {
  integer,
  index,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'

import { authUsers } from 'drizzle-orm/supabase'

export const usersTable = pgTable('user_with_meta_data', {
  id: serial('id').primaryKey().unique(),
  user_id: uuid('user_id')
    .references(() => authUsers.id)
    .notNull()
    .unique(),
  user_meta_data: jsonb('user_meta_data'),
})

// RSS subscription sources table
export const rssSubsTable = pgTable('rss_subs', {
  id: serial('id').primaryKey().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Feed basic information
  title: text('title').notNull(),
  feedUrl: text('feed_url').notNull().unique(), // RSS subscription URL
  homePageUrl: text('home_page_url'), // Website homepage
  description: text('description'),
  language: text('language'),
  
  // Feed metadata
  version: text('version'), // JSON Feed version
  icon: text('icon'), // Feed icon
  favicon: text('favicon'), // Website favicon
  
  // Fetch configuration
  isActive: integer('is_active').notNull().default(1), // Whether enabled
  fetchInterval: integer('fetch_interval').notNull().default(3600), // Fetch interval in seconds
  lastFetchAt: timestamp('last_fetch_at'), // Last fetch time
  lastFetchStatus: text('last_fetch_status'), // Last fetch status
  
  // User association
  userId: uuid('user_id')
    .references(() => authUsers.id)
    .notNull(),
})

// RSS items table
export const rssItemsTable = pgTable('rss_items', {
  id: serial('id').primaryKey().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  
  // Item basic information
  itemId: text('item_id').notNull(), // Original item ID
  title: text('title').notNull(),
  url: text('url').notNull(),
  contentHtml: text('content_html'),
  contentText: text('content_text'),
  summary: text('summary'),
  
  // Time information
  datePublished: timestamp('date_published'),
  dateModified: timestamp('date_modified'),
  
  // Author information (JSON array)
  authors: jsonb('authors').$type<{ name: string; url?: string; avatar?: string }[]>(), // [{ name: string, url?: string, avatar?: string }]
  
  // Attachment information (JSON array)
  attachments: jsonb('attachments').$type<{ url: string; mime_type: string; title?: string; size_in_bytes?: number; duration_in_seconds?: number }[]>(), // [{ url: string, mime_type: string, title?: string, size_in_bytes?: number, duration_in_seconds?: number }]
  
  // Tags and categories (JSON array)
  tags: jsonb('tags').$type<string[]>(), // string[]

  // External links
  externalUrl: text('external_url'),
  bannerImage: text('banner_image'),
  
  // Associated subscription source
  rssSubId: integer('rss_sub_id')
    .references(() => rssSubsTable.id, { onDelete: 'cascade' })
    .notNull(),
  
  // User interactions
  isRead: integer('is_read').notNull().default(0), // Whether read
  isFavorite: integer('is_favorite').notNull().default(0), // Whether favorited
  
  // Unique constraint: item ID should be unique within the same subscription source
}, (table) => ({
  // Create composite unique index: subscription source ID + item ID
  uniqueItemPerSub: unique().on(table.rssSubId, table.itemId),
  // Create indexes to optimize queries
  rssSubIdIdx: index('rss_items_rss_sub_id_idx').on(table.rssSubId),
  datePublishedIdx: index('rss_items_date_published_idx').on(table.datePublished),
  isReadIdx: index('rss_items_is_read_idx').on(table.isRead),
  isFavoriteIdx: index('rss_items_is_favorite_idx').on(table.isFavorite),
}))

// User subscription relationship table (many-to-many relationship)
export const userRssSubsTable = pgTable('user_rss_subs', {
  id: serial('id').primaryKey().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  
  userId: uuid('user_id')
    .references(() => authUsers.id, { onDelete: 'cascade' })
    .notNull(),
  
  rssSubId: integer('rss_sub_id')
    .references(() => rssSubsTable.id, { onDelete: 'cascade' })
    .notNull(),
  
  // User personalization settings
  customTitle: text('custom_title'), // User custom title
  categoryId: integer('category_id'), // Category ID (reserved)
  notificationEnabled: integer('notification_enabled').notNull().default(1),
  
}, (table) => ({
  // Ensure the same user cannot subscribe to the same source repeatedly
  uniqueUserSub: unique().on(table.userId, table.rssSubId),
  userIdIdx: index('user_rss_subs_user_id_idx').on(table.userId),
  rssSubIdIdx: index('user_rss_subs_rss_sub_id_idx').on(table.rssSubId),
}))
