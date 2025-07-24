CREATE TABLE "rss_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"item_id" text NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"content_html" text,
	"content_text" text,
	"summary" text,
	"date_published" timestamp,
	"date_modified" timestamp,
	"authors" jsonb,
	"attachments" jsonb,
	"tags" jsonb,
	"external_url" text,
	"banner_image" text,
	"rss_sub_id" integer NOT NULL,
	"is_read" integer DEFAULT 0 NOT NULL,
	"is_favorite" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "rss_items_id_unique" UNIQUE("id"),
	CONSTRAINT "rss_items_rss_sub_id_item_id_unique" UNIQUE("rss_sub_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "rss_subs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"feed_url" text NOT NULL,
	"home_page_url" text,
	"description" text,
	"language" text,
	"version" text,
	"icon" text,
	"favicon" text,
	"is_active" integer DEFAULT 1 NOT NULL,
	"fetch_interval" integer DEFAULT 3600 NOT NULL,
	"last_fetch_at" timestamp,
	"last_fetch_status" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "rss_subs_id_unique" UNIQUE("id"),
	CONSTRAINT "rss_subs_feed_url_unique" UNIQUE("feed_url")
);
--> statement-breakpoint
CREATE TABLE "user_rss_subs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"rss_sub_id" integer NOT NULL,
	"custom_title" text,
	"category_id" integer,
	"notification_enabled" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "user_rss_subs_id_unique" UNIQUE("id"),
	CONSTRAINT "user_rss_subs_user_id_rss_sub_id_unique" UNIQUE("user_id","rss_sub_id")
);
--> statement-breakpoint
CREATE TABLE "user_with_meta_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"user_meta_data" jsonb,
	CONSTRAINT "user_with_meta_data_id_unique" UNIQUE("id"),
	CONSTRAINT "user_with_meta_data_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "rss_items" ADD CONSTRAINT "rss_items_rss_sub_id_rss_subs_id_fk" FOREIGN KEY ("rss_sub_id") REFERENCES "public"."rss_subs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_subs" ADD CONSTRAINT "rss_subs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_rss_subs" ADD CONSTRAINT "user_rss_subs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_rss_subs" ADD CONSTRAINT "user_rss_subs_rss_sub_id_rss_subs_id_fk" FOREIGN KEY ("rss_sub_id") REFERENCES "public"."rss_subs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_with_meta_data" ADD CONSTRAINT "user_with_meta_data_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rss_items_rss_sub_id_idx" ON "rss_items" USING btree ("rss_sub_id");--> statement-breakpoint
CREATE INDEX "rss_items_date_published_idx" ON "rss_items" USING btree ("date_published");--> statement-breakpoint
CREATE INDEX "rss_items_is_read_idx" ON "rss_items" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "rss_items_is_favorite_idx" ON "rss_items" USING btree ("is_favorite");--> statement-breakpoint
CREATE INDEX "user_rss_subs_user_id_idx" ON "user_rss_subs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_rss_subs_rss_sub_id_idx" ON "user_rss_subs" USING btree ("rss_sub_id");