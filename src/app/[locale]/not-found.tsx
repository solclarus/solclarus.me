import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">{t("title")}</h2>
      <p className="mb-8 text-muted-foreground">{t("description")}</p>
      <Button asChild>
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </div>
  );
}
