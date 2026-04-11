"use client";

import { Navigation } from "@oss/ui/components/nav/navigation";
import { useRouter } from "next/navigation";
import { USER_NAV_ROUTES } from "@/components/nav";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
	const router = useRouter();
	const { data: session } = authClient.useSession();

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<Navigation
			routes={USER_NAV_ROUTES}
			userMenuProps={{
				user: session?.user
					? {
							name: session.user.name,
							email: session.user.email,
							image: session.user.image,
						}
					: null,
				onSignOut: handleSignOut,
			}}
		/>
	);
}
