import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Routes under src/app/(lab)/ live outside the [locale] segment and must not
// be redirected to a locale-prefixed URL. Add new lab route names here when
// a new page is added under (lab)/.
const LAB_ROUTES = ["usogui-games"];

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const { pathname } = request.nextUrl;
  const isLabRoute = LAB_ROUTES.some(
    (route) => pathname === `/${route}` || pathname.startsWith(`/${route}/`),
  );

  if (isLabRoute) {
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
