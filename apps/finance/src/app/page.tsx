import { Dashboard } from "@/app/dashboard";
import "@/utils/orpc.server";
import { orpc } from "@/utils/orpc";

export default async function Page() {
	const data = await orpc.invoice.list();
	const invoices = data.map((inv) => ({
		nanoId: inv.nanoId,
		merchant: inv.merchant,
		date: typeof inv.date === "string" ? inv.date : inv.date.toISOString(),
		amount: inv.amount,
		currency: inv.currency,
		category: inv.category,
		description: inv.description,
		tax: inv.tax,
	}));

	return (
		<main className="mx-auto max-w-5xl px-4 py-8">
			<div className="mb-6">
				<h1 className="font-bold text-2xl">Dashboard</h1>
				<p className="mt-1 text-muted-foreground text-sm">
					Overview of your recorded expenses
				</p>
			</div>

			<Dashboard initialInvoices={invoices} />
		</main>
	);
}
