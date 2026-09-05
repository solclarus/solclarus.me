import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Routes under src/app/lab/ live outside the [locale] segment and must not
// be redirected to a locale-prefixed URL.
const isLabRoute = (pathname: string) => pathname === "/lab" || pathname.startsWith("/lab/");

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const { pathname } = request.nextUrl;

  if (isLabRoute(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

// Only static exclusions (framework internals, the Sentry tunnel route, and
// any path with a file extension) live here — matcher must stay a static
// string literal for Next.js to parse it. Lab routes are excluded above.
export const config = {
  matcher: ["/((?!api|_next|_vercel|monitoring|.*\\..*).*)"],
};
