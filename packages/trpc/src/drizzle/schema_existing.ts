import {
  jsonb,
  pgTable,
  serial,
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
