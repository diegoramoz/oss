import { AppSidebar } from "@/components/nav/app-sidebar";
import { Wireframe } from "@/components/ui/wireframe";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wireframe
      config={{
        corners: {
          topLeft: "navbar",
          bottomLeft: "navbar",
        },
      }}
    >
      <AppSidebar />
      <div className="px-4 pt-4">{children}</div>
    </Wireframe>
  );
}
