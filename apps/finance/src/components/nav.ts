import type { NavRoute } from "@oss/ui/hooks/use-nav-routes";
import { HomeIcon, ScanIcon } from "lucide-react";

export const USER_NAV_ROUTES = [
	{
		href: "/",
		name: "Home",
		icon: HomeIcon,
		activePatterns: ["/"],
	},
	{
		href: "/scan",
		name: "Scan",
		icon: ScanIcon,
		activePatterns: ["/scan"],
	},
] as const satisfies readonly NavRoute[];
