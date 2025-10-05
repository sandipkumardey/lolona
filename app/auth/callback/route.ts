import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // Prepare a mutable response so we can set cookies during the exchange
  let response = NextResponse.redirect(new URL("/dashboard", request.url));

  if (!code) {
    // No code present; fall back to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Mirror middleware behavior: set cookies on the redirect response
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    await supabase.auth.exchangeCodeForSession(code);

    // On success, send user to dashboard (response already configured above)
    return response;
  } catch (e) {
    // If exchange fails, go back to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
