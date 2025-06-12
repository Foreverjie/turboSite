CREATE TABLE "rss_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" text,
	"link" text NOT NULL,
	"publication_date" timestamp NOT NULL,
	"description" text,
	"source_feed_url" text NOT NULL,
	CONSTRAINT "rss_items_id_unique" UNIQUE("id"),
	CONSTRAINT "rss_items_link_unique" UNIQUE("link")
);
