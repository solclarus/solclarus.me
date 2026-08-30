import { expect, test } from "@playwright/test";

test.use({ locale: "ja-JP" });

test("redirects the root path to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ja$/);
});

for (const locale of ["ja", "en"]) {
  test(`navigates from home to works and posts (${locale})`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toBeVisible();

    await page.getByRole("button", { name: /Open navigation/i }).click();
    await page.getByRole("link", { name: "Works" }).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/works$`));
    await expect(page.locator("h1")).toBeVisible();

    await page.goto(`/${locale}/posts`);
    await expect(page.locator("h1")).toBeVisible();
  });
}
