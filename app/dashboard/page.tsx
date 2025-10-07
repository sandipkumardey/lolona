import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Iridescence from "@/components/iridescence";
import DashboardWidget from "@/components/dashboard-widget";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";
import LockScroll from "@/components/lock-scroll";

export default async function DashboardPage() {
  const hasEnv = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env is not configured, skip auth to allow page development.
  if (!hasEnv) {
    return (
      <main className="h-[100dvh] w-full bg-background text-foreground overflow-hidden">
        <LockScroll />
        {/* Full-width hero with iridescence background */}
        <section className="relative w-full h-[100dvh]">
          <Iridescence className="absolute inset-0 w-full h-full" color={[0.85,0.06,0.06]} speed={0.35} amplitude={0.06} mouseReact={false} />
          <div className="relative z-10 flex h-full w-full justify-center px-6 text-center items-center md:items-start md:pt-24">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold font-serif">Dashboard</h1>
              <p className="mt-2 text-sm md:text-base text-foreground/80">Supabase env not configured. Development placeholder.</p>
            </div>
          </div>
        </section>
        <DashboardWidget />
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Not logged in – redirect to login
    redirect("/login");
  }

  return (
    <main className="h-[100dvh] w-full bg-background text-foreground overflow-hidden">
      <LockScroll />
      {/* Full-width hero with iridescence background */}
      <section className="relative w-full h-[100dvh]">
        <Iridescence className="absolute inset-0 w-full h-full" color={[0.85,0.06,0.06]} speed={0.35} amplitude={0.06} mouseReact={false} />
        {/* Top-right account actions */}
        <div className="absolute top-4 right-4 z-20">
          <form action={signOut}>
            <Button size="sm" className="rounded-full bg-[#7A0A0A] text-[#EFE5D6] hover:bg-[#650808]">Sign out</Button>
          </form>
        </div>
        <div className="relative z-10 flex h-full w-full justify-center px-6 text-center items-center md:items-start md:pt-24">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold font-serif">Dashboard</h1>
            <p className="mt-2 text-sm md:text-base text-foreground/80">Welcome back, <span className="font-medium">{user?.email}</span>.</p>
          </div>
        </div>
      </section>
      <DashboardWidget />
    </main>
  );
}
