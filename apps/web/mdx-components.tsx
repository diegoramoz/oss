import type { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import Link from "next/link";

const components: MDXComponents = {
	Image: ({ className, ...props }) => (
		<NextImage
			className={`mb-6${className ? ` ${className}` : ""}`}
			{...props}
		/>
	),
	h1: ({ children }) => (
		<h1 className="mb-3 font-bold text-3xl leading-tight">{children}</h1>
	),
	h2: ({ children }) => (
		<h2 className="mb-3 font-bold text-2xl leading-tight">{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className="mb-3 font-bold text-xl leading-tight">{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className="mb-3 font-bold text-lg leading-tight">{children}</h4>
	),
	p: ({ children }) => <p className="mb-6">{children}</p>,
	strong: ({ children }) => <strong className="font-bold">{children}</strong>,
	em: ({ children }) => <em className="italic">{children}</em>,
	blockquote: ({ children }) => (
		<blockquote className="my-6 border-border border-l-2 pl-5 text-muted-foreground italic">
			{children}
		</blockquote>
	),
	code: ({ children, className, ...props }) => {
		if (className?.startsWith("language-")) {
			return (
				<code className={className} {...props}>
					{children}
				</code>
			);
		}
		return (
			<code className="font-mono text-sm" {...props}>
				{children}
			</code>
		);
	},
	pre: ({ children, className, ...props }) => (
		<pre
			className={`mb-6 overflow-x-auto rounded-lg p-4 text-sm${className ? ` ${className}` : ""}`}
			{...props}
		>
			{children}
		</pre>
	),
	ul: ({ children }) => <ul className="mb-6 list-disc pl-6">{children}</ul>,
	ol: ({ children }) => <ol className="mb-6 list-decimal pl-6">{children}</ol>,
	li: ({ children }) => <li className="mb-1.5">{children}</li>,
	hr: () => <hr className="my-10 border-border border-t" />,
	a: ({ href, children, ...props }) => {
		if (href?.startsWith("/")) {
			return (
				<Link className="underline underline-offset-2" href={href} {...props}>
					{children}
				</Link>
			);
		}
		return (
			<a
				className="underline underline-offset-4"
				href={href}
				rel="noopener noreferrer"
				target="_blank"
				{...props}
			>
				{children}
			</a>
		);
	},
};

export function useMDXComponents(): MDXComponents {
	return components;
}
