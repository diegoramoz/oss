import { env } from "@oss/env/server";

if (env.NODE_ENV !== "development") {
	throw new Error("Seed script can only run in development environment");
}

import { faker } from "@faker-js/faker";
import { db } from "@oss/db";
import { insertInvoiceSchema, invoice as invoiceTable } from "@oss/db/schema";

const INVOICE_MERCHANTS = [
	{ name: "AWS", category: "Cloud Infrastructure" },
	{ name: "Vercel", category: "Cloud Infrastructure" },
	{ name: "Cloudflare", category: "Cloud Infrastructure" },
	{ name: "GitHub", category: "Software" },
	{ name: "Linear", category: "Project Management" },
	{ name: "Notion", category: "Productivity" },
	{ name: "Figma", category: "Design Tools" },
	{ name: "Stripe", category: "Payment Processing" },
	{ name: "Anthropic", category: "AI / ML" },
	{ name: "OpenAI", category: "AI / ML" },
	{ name: "DataDog", category: "Monitoring" },
	{ name: "Neon", category: "Database" },
	{ name: "PlanetScale", category: "Database" },
	{ name: "Twilio", category: "Communications" },
	{ name: "SendGrid", category: "Communications" },
];

const invoiceRowSchema = insertInvoiceSchema.omit({
	nanoId: true,
	createdAt: true,
	updatedAt: true,
});

async function seed() {
	console.log("Seeding invoices...");

	const rows = Array.from({ length: 30 }, () => {
		const merchant = faker.helpers.arrayElement(INVOICE_MERCHANTS);
		const amount = faker.finance.amount({ min: 20, max: 2000, dec: 2 });
		const taxRate = faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 });
		const tax = (Number.parseFloat(amount) * taxRate).toFixed(2);

		return invoiceRowSchema.parse({
			merchant: merchant.name,
			date: faker.date.between({
				from: new Date("2026-01-01"),
				to: new Date("2026-04-09"),
			}),
			amount,
			currency: "USD",
			category: merchant.category,
			description: faker.lorem.sentence({ min: 6, max: 14 }),
			tax,
		});
	});

	await db.insert(invoiceTable).values(rows);

	console.log("Done. 30 invoices seeded.");
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
