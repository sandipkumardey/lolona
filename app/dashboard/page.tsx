import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Iridescence from "@/components/iridescence";

export default async function DashboardPage() {
  const hasEnv = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env is not configured, skip auth to allow page development.
  if (!hasEnv) {
    return (
      <main className="min-h-screen w-full bg-background text-foreground">
        {/* Full-width hero with iridescence background */}
        <section className="relative w-full min-h-screen">
          <Iridescence className="absolute inset-0 w-full h-full" color={[0.85,0.06,0.06]} speed={0.35} amplitude={0.06} mouseReact={false} />
          <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-16 text-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold font-serif">Dashboard</h1>
              <p className="mt-2 text-sm md:text-base text-foreground/80">Supabase env not configured. Development placeholder.</p>
            </div>
          </div>
        </section>
        <div className="px-6 py-10">
          <div className="mx-auto max-w-5xl">
            {/* Additional page content goes here */}
          </div>
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Not logged in – redirect to landing (or /login when implemented)
    redirect("/");
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Full-width hero with iridescence background */}
      <section className="relative w-full min-h-screen">
        <Iridescence className="absolute inset-0 w-full h-full" color={[0.85,0.06,0.06]} speed={0.35} amplitude={0.06} mouseReact={false} />
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-16 text-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold font-serif">Dashboard</h1>
            <p className="mt-2 text-sm md:text-base text-foreground/80">You are logged in as <span className="font-medium">{user?.email}</span>.</p>
          </div>
        </div>
      </section>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {/* Additional page content goes here */}
        </div>
      </div>
    </main>
  );
}
