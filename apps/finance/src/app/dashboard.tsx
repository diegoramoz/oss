"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@oss/ui/components/card";
import { Skeleton } from "@oss/ui/components/skeleton";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Invoice } from "@/app/scan/invoice-table";
import { orpc } from "@/utils/orpc";

function StatCard({
	title,
	value,
	sub,
}: {
	title: string;
	value: string;
	sub?: string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-normal text-muted-foreground text-sm">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="font-semibold text-2xl">{value}</p>
				{sub && <p className="mt-1 text-muted-foreground text-xs">{sub}</p>}
			</CardContent>
		</Card>
	);
}

function StatCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-4 w-24" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-7 w-32" />
			</CardContent>
		</Card>
	);
}

export function Dashboard() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchInvoices = useCallback(async () => {
		try {
			const data = await orpc.invoice.list();
			setInvoices(
				data.map((inv) => ({
					nanoId: inv.nanoId,
					merchant: inv.merchant,
					date:
						typeof inv.date === "string" ? inv.date : inv.date.toISOString(),
					amount: inv.amount,
					currency: inv.currency,
					category: inv.category,
					description: inv.description,
					tax: inv.tax,
				}))
			);
		} catch {
			toast.error("Failed to load invoices");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchInvoices();
	}, [fetchInvoices]);

	const totalSpend = invoices.reduce(
		(sum, inv) => sum + (Number.parseFloat(inv.amount) || 0),
		0
	);
	const totalTax = invoices.reduce(
		(sum, inv) => sum + (Number.parseFloat(inv.tax) || 0),
		0
	);

	const byCategory = invoices.reduce<Record<string, number>>((acc, inv) => {
		const cat = inv.category || "Uncategorized";
		acc[cat] = (acc[cat] ?? 0) + (Number.parseFloat(inv.amount) || 0);
		return acc;
	}, {});

	const topCategories = Object.entries(byCategory)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5);

	const recentInvoices = [...invoices]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	const primaryCurrency = invoices[0]?.currency ?? "USD";

	const fmt = (amount: number) =>
		new Intl.NumberFormat(undefined, {
			style: "currency",
			currency: primaryCurrency,
			minimumFractionDigits: 2,
		}).format(amount);

	return (
		<div className="space-y-8">
			{/* Stat cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{loading ? (
					<>
						<StatCardSkeleton />
						<StatCardSkeleton />
						<StatCardSkeleton />
					</>
				) : (
					<>
						<StatCard
							sub="all time"
							title="Total Invoices"
							value={String(invoices.length)}
						/>
						<StatCard
							sub={primaryCurrency}
							title="Total Spend"
							value={fmt(totalSpend)}
						/>
						<StatCard
							sub={primaryCurrency}
							title="Total Tax"
							value={fmt(totalTax)}
						/>
					</>
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Spend by category */}
				<Card>
					<CardHeader>
						<CardTitle>Spend by Category</CardTitle>
					</CardHeader>
					<CardContent>
						{loading && (
							<div className="space-y-3">
								{Array.from({ length: 4 }).map((_, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
									<Skeleton className="h-5 w-full" key={i} />
								))}
							</div>
						)}
						{!loading && topCategories.length === 0 && (
							<p className="text-muted-foreground text-sm">No data yet.</p>
						)}
						{!loading && topCategories.length > 0 && (
							<ul className="space-y-3">
								{topCategories.map(([cat, amount]) => {
									const pct = totalSpend > 0 ? (amount / totalSpend) * 100 : 0;
									return (
										<li key={cat}>
											<div className="mb-1 flex justify-between text-sm">
												<span>{cat}</span>
												<span className="font-medium">{fmt(amount)}</span>
											</div>
											<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full rounded-full bg-foreground"
													style={{ width: `${pct}%` }}
												/>
											</div>
										</li>
									);
								})}
							</ul>
						)}
					</CardContent>
				</Card>

				{/* Recent invoices */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Invoices</CardTitle>
					</CardHeader>
					<CardContent>
						{loading && (
							<div className="space-y-3">
								{Array.from({ length: 4 }).map((_, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
									<Skeleton className="h-5 w-full" key={i} />
								))}
							</div>
						)}
						{!loading && recentInvoices.length === 0 && (
							<p className="text-muted-foreground text-sm">No invoices yet.</p>
						)}
						{!loading && recentInvoices.length > 0 && (
							<ul className="divide-y">
								{recentInvoices.map((inv) => (
									<li
										className="flex items-center justify-between py-2.5"
										key={inv.nanoId}
									>
										<div>
											<p className="font-medium text-sm">{inv.merchant}</p>
											<p className="text-muted-foreground text-xs">
												{new Date(inv.date).toLocaleDateString()} ·{" "}
												{inv.category}
											</p>
										</div>
										<span className="font-medium text-sm">
											{fmt(Number.parseFloat(inv.amount) || 0)}
										</span>
									</li>
								))}
							</ul>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
