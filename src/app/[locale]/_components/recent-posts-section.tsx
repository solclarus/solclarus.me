import { ViewAllLink } from "@/components/view-all-link";
import { Link } from "@/i18n/routing";
import type { Post } from "@/lib/posts";

type Props = {
  title: string;
  viewAllLabel: string;
  posts: Post[];
};

export function RecentPostsSection({ title, viewAllLabel, posts }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <ViewAllLink href="/posts" label={viewAllLabel} />
      </div>
      <div className="divide-y divide-border/50">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <article className="py-3 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <time className="shrink-0 text-sm text-muted-foreground">{post.date}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
