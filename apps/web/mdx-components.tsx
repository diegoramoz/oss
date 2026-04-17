import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
	a: ({ href, children, ...props }) => {
		if (href?.startsWith("/")) {
			return (
				<Link href={href} {...props}>
					{children}
				</Link>
			);
		}
		return (
			<a href={href} rel="noopener noreferrer" target="_blank" {...props}>
				{children}
			</a>
		);
	},
};

export function useMDXComponents(): MDXComponents {
	return components;
}
