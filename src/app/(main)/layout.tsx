import SiteHeader from "@/layout/SiteHeader";
import SiteFooter from "@/layout/SiteFooter";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container-page flex-1 pt-6 pb-14 md:pt-10 md:pb-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
