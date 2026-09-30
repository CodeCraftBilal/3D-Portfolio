import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir(".tmp/previews", { recursive: true });
const browser = await chromium.launch({
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error")
    console.log("CONSOLE", message.text().slice(0, 500));
});
await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 120000,
});
await page
  .locator(".room-loading")
  .waitFor({ state: "hidden", timeout: 60000 });
await page.waitForTimeout(2200);
await page.screenshot({ path: ".tmp/previews/desktop.png", fullPage: true });
console.log("PAGE_ERRORS", JSON.stringify(errors));
console.log("CANVAS", await page.locator("canvas").count());
console.log(
  "MODELS",
  await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((r) => r.name.includes(".glb"))
      .map((r) => ({ url: r.name, bytes: r.transferSize })),
  ),
);
await page.getByRole("button", { name: "Open Projects", exact: true }).click();
await page.waitForTimeout(1800);
await page.screenshot({ path: ".tmp/previews/projects.png", fullPage: true });
await page.keyboard.press("Escape");
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(2000);
await page.screenshot({ path: ".tmp/previews/mobile.png", fullPage: true });
await browser.close();
