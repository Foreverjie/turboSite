CREATE TABLE "user_with_meta_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"user_meta_data" jsonb,
	CONSTRAINT "user_with_meta_data_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "user_with_meta_data" ADD CONSTRAINT "user_with_meta_data_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;