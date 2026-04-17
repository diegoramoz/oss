import type { Route } from "next";
import Link from "next/link";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto max-w-prose px-[4lvw] py-8 lg:px-0">
			<nav className="mb-8 flex gap-4 text-sm">
				<Link className="underline underline-offset-4" href={"/" as Route}>
					Home
				</Link>
				<Link className="underline underline-offset-4" href={"/blog" as Route}>
					Blog
				</Link>
			</nav>
			{children}
		</div>
	);
}
