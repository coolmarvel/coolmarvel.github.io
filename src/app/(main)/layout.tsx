import SiteHeader from "@/layout/SiteHeader";
import SiteFooter from "@/layout/SiteFooter";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container-page flex-1 pt-8 pb-16 md:pt-12 md:pb-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
