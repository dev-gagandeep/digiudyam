import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin/login") return NextResponse.next();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-du-route", path);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (url && key) {
    let response = NextResponse.next({ request: { headers: requestHeaders } });
    const supabase = createServerClient(url, key, { cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: requestHeaders } });
        values.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    } });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return response;
  }
  const login = new URL(path.startsWith("/admin") ? "/admin/login" : "/login", request.url);
  login.searchParams.set("next", path);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/portal/:path*", "/admin/:path*"] };
