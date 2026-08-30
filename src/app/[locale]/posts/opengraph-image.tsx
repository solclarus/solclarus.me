import { OgImage, ogImageContentType, ogImageSize } from "@/components/og-image";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

export const alt = "Posts";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "posts" });

  return new ImageResponse(<OgImage title={t("title")} subtitle={t("description")} />, size);
}
