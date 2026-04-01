CREATE TYPE "public"."expiry_month" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');--> statement-breakpoint
CREATE TABLE "address" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "address_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"nano_id" varchar(11) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"credit_card_id" bigint NOT NULL,
	"line1" varchar(200) NOT NULL,
	"line2" varchar(200),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"country" varchar(100) NOT NULL,
	CONSTRAINT "address_nano_id_unique" UNIQUE("nano_id")
);
--> statement-breakpoint
ALTER TABLE "credit_card" ALTER COLUMN "expiry_month" SET DATA TYPE "public"."expiry_month" USING "expiry_month"::"public"."expiry_month";--> statement-breakpoint
ALTER TABLE "credit_card" ALTER COLUMN "expiry_year" SET DATA TYPE varchar(4);--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_credit_card_id_credit_card_id_fk" FOREIGN KEY ("credit_card_id") REFERENCES "public"."credit_card"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "address_nano_id_idx" ON "address" USING btree ("nano_id");--> statement-breakpoint
CREATE INDEX "address_credit_card_id_idx" ON "address" USING btree ("credit_card_id");