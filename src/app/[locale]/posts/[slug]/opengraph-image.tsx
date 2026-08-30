import { OgImage, ogImageContentType, ogImageSize } from "@/components/og-image";
import { getPost } from "@/lib/posts";
import { ImageResponse } from "next/og";

export const alt = "Post image";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);

  return new ImageResponse(<OgImage title={post?.title ?? "Posts"} subtitle={post?.date} />, size);
}
