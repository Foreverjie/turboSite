import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
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

export const rssItemsTable = pgTable('rss_items', {
  id: serial('id').primaryKey().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  title: text('title'),
  link: text('link').notNull().unique(),
  publicationDate: timestamp('publication_date').notNull(),
  description: text('description'),
  // .references(() => rssFeedsTable.url, { onDelete: 'cascade' }
  sourceFeedUrl: text('source_feed_url').notNull(),
})
