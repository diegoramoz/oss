CREATE TABLE "bug" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bug_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"nano_id" varchar(11) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "bug_nano_id_unique" UNIQUE("nano_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "bug_nano_id_idx" ON "bug" USING btree ("nano_id");