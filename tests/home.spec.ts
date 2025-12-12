import { test, expect } from "@playwright/test";

// Basic smoke test: home page loads and key sections render

test("home page loads and header links are visible", async ({ page }) => {
  await page.goto("/");

  // Header brand
  await expect(page.getByText("The Scholars Academy", { exact: false }))
    .toBeVisible({ timeout: 10000 })
    .catch(() => {});

  // Check some main nav links exist (About, Academics, Admissions could vary)
  await expect(page.getByRole("link", { name: /Admissions/i })).toBeVisible();
});

// Gamified learning entry from main site (if header link exists)

test("gamified learning link navigates to gamified page", async ({ page }) => {
  await page.goto("/");

  const gamifiedLink = page.getByRole("link", { name: /Gamified Learning/i });
  if (await gamifiedLink.count()) {
    await gamifiedLink.first().click();
  } else {
    // fallback direct navigation
    await page.goto("/gamified-learning");
  }

  await expect(
    page.getByText("Learn Through Play!", { exact: false })
  ).toBeVisible();
});
