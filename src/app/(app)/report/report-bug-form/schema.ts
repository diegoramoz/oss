import { insertBugSchema } from "@/server/db/schema";

export const reportBugSchema = insertBugSchema.pick({
  title: true,
  description: true,
});
