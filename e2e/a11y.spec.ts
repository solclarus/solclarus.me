import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  "/ja",
  "/en",
  "/ja/works",
  "/ja/posts",
  "/ja/posts/hello-world",
  "/lab/usogui-games",
];

// axe computes color-contrast from raw foreground/background colors and doesn't
// account for `mix-blend-mode`. The strategy bars on /lab/usogui-games intentionally
// use `mix-blend-difference` so the label stays legible against any bar color,
// which axe can't verify and flags as a false positive.
const KNOWN_FALSE_POSITIVES: Record<string, string[]> = {
  "/lab/usogui-games": ["color-contrast"],
};

for (const path of PAGES) {
  test(`has no automatically detectable a11y violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(KNOWN_FALSE_POSITIVES[path] ?? [])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
