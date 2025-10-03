import Iridescence from "@/components/iridescence";
import DashboardWidget from "@/components/dashboard-widget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lolona – Demo",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <main className="min-h-[100dvh] w-full bg-background text-foreground overflow-hidden">
      <section className="relative w-full h-[100dvh]">
        <Iridescence
          className="absolute inset-0 w-full h-full"
          color={[0.85, 0.06, 0.06]}
          speed={0.35}
          amplitude={0.06}
          mouseReact={false}
        />
        <div className="relative z-10 flex h-full w-full justify-center px-6 text-center items-center md:items-start md:pt-24">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold font-serif">Dashboard Demo</h1>
            <p className="mt-2 text-sm md:text-base text-foreground/80">This is a demo. No login required.</p>
          </div>
        </div>
      </section>
      <DashboardWidget />
    </main>
  );
}
