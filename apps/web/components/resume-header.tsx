import Image from "next/image";
import Link from "next/link";

export default function ResumeHeader() {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl">Diego Ramos</h1>
				<Image
					alt="Logo"
					className="size-7"
					height={512}
					src="/logo.png"
					width={512}
				/>
			</div>
			<p className="mb-4">Full-Stack Engineer</p>
			<div className="flex justify-between gap-4">
				<div className="flex gap-4">
					<Link
						className="underline"
						href="https://github.com/diegoramoz"
						target="_blank"
					>
						GitHub
					</Link>
					<Link
						className="underline"
						href="https://linkedin.com/in/ramoz"
						target="_blank"
					>
						LinkedIn
					</Link>
					<Link
						className="underline"
						href="https://youtube.com/@diegoramozdev"
						target="_blank"
					>
						YouTube
					</Link>
					<Link
						className="underline"
						href="https://x.com/zdiegoramos"
						target="_blank"
					>
						X
					</Link>
				</div>
				<Link
					className="underline"
					href="mailto:diego@ramoz.dev"
					target="_blank"
				>
					Contact Me
				</Link>
			</div>
		</div>
	);
}
