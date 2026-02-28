import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
