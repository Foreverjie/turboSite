import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  // schema: './schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:postgres@120.79.158.31:5432/miniflux?sslmode=disable',
  },
})
