import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request);
}

// Routes under src/app/(lab)/ live outside the [locale] segment and must not
// be redirected to a locale-prefixed URL. Add new lab route names to this
// pattern (must stay a static string literal for Next.js to parse it).
export const config = {
  matcher: ["/((?!api|_next|_vercel|usogui-games|.*\\..*).*)"],
};
