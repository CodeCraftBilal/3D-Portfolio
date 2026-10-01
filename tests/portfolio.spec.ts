import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("room loads and every section opens with working back navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (/THREE\.Clock|PCFSoftShadowMap/.test(message.text()))
      errors.push(message.text());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /A little space/ }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".room-loading")).toHaveCount(0);
  const sections = [
    ["About", "A little about me."],
    ["Projects", "Built with intention."],
    ["Skills", "My everyday toolkit."],
    ["Journey", "The journey so far."],
    ["Résumé", "My story, on paper."],
    ["Contact", "Let’s build something."],
  ];
  for (const [name, title] of sections) {
    await page
      .getByRole("button", { name: `Open ${name}`, exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Back to the room" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("information stays open while orbiting and switching room objects", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".room-loading")).toHaveCount(0);
  await page.getByRole("button", { name: "Open About", exact: true }).click();
  const panel = page.getByRole("dialog");
  await expect(panel).toHaveAttribute("aria-modal", "false");
  await expect(page.locator("dialog:modal")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Switch to evening lighting" })
    .click();
  await expect(page.locator(".portfolio-app")).toHaveAttribute(
    "data-theme",
    "night",
  );
  await expect(panel).toBeVisible();

  const canvas = page.locator("canvas");
  await canvas.click({ position: { x: 12, y: 24 } });
  await expect(panel).toBeVisible();
  const marker = page.locator("#hotspot-journey");
  const beforeDrag = await marker.getAttribute("style");
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("The room canvas has no bounds");
  await page.mouse.move(bounds.x + 12, bounds.y + 24);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 100, bounds.y + 45, { steps: 16 });
  await page.mouse.up();
  await expect.poll(() => marker.getAttribute("style")).not.toBe(beforeDrag);
  await expect(
    panel.getByRole("heading", { name: "A little about me." }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Explore My projects", exact: true })
    .click();
  await expect(
    panel.getByRole("heading", { name: "Built with intention." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Explore My toolkit", exact: true })
    .click();
  await expect(
    panel.getByRole("heading", { name: "My everyday toolkit." }),
  ).toBeVisible();
  if (!isMobile) {
    await page.getByRole("button", { name: "Open About", exact: true }).click();
    await expect(
      panel.getByRole("heading", { name: "A little about me." }),
    ).toBeVisible();
  }
  await page
    .getByRole("button", { name: "Selected work 03", exact: true })
    .click();
  await expect(
    panel.getByRole("heading", { name: "Built with intention." }),
  ).toBeVisible();
  await page.keyboard.press("4");
  await expect(
    panel.getByRole("heading", { name: "The journey so far." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
});

test("supplied project banners load in the room panel and classic view", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Open Projects", exact: true })
    .click();
  for (const view of [
    page.getByRole("dialog"),
    page.locator(".classic-portfolio"),
  ]) {
    for (const project of ["EcoStudent", "SecureShare", "NexaPlan"]) {
      const banner = view.getByRole("img", {
        name: `${project} project banner`,
        exact: true,
      });
      await banner.scrollIntoViewIfNeeded();
      await expect(banner).toHaveAttribute(
        "src",
        new RegExp(`${project}\\.jfif`),
      );
      await expect
        .poll(() =>
          banner.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    await expect(view.locator(".project-art")).toHaveCount(0);
    if (await page.getByRole("dialog").isVisible()) {
      await page.keyboard.press("Escape");
      await page
        .getByRole("button", { name: "Prefer a classic view?" })
        .click();
    }
  }
});

test("object markers, project links, details, and Escape work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".room-loading")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Explore My projects", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "EcoStudent", exact: true }),
  ).toBeVisible();
  await dialog.locator("summary").first().click();
  await expect(
    dialog.getByText(
      "Real-time messaging with Socket.IO and AI-powered product recommendations.",
    ),
  ).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "View EcoStudent source on GitHub" }),
  ).toHaveAttribute("href", "https://github.com/CodeCraftBilal/EcoStudent");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page
    .getByRole("button", { name: "Switch to evening lighting" })
    .click();
  await expect(page.locator(".portfolio-app")).toHaveAttribute(
    "data-theme",
    "night",
  );
  await page.getByRole("button", { name: "Reset room view" }).click();
});

test("résumé is a real PDF and contact form composes an email", async ({
  page,
  request,
}) => {
  const pdf = await request.get("/resume/M-Bilal-Khan-Resume.pdf");
  expect(pdf.ok()).toBeTruthy();
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.goto("/");
  await page.getByRole("button", { name: "Open Contact", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("link", { name: "bilalkhan751150@gmail.com" }),
  ).toHaveAttribute("href", "mailto:bilalkhan751150@gmail.com");
  await dialog.getByLabel("Your name").fill("Alex Example");
  await dialog
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await dialog
    .getByLabel("What’s on your mind?")
    .fill("I would like to discuss a mobile application project.");
  await dialog
    .getByRole("button", { name: "Let’s start a conversation" })
    .click();
  await expect(
    dialog.getByRole("status").filter({ hasText: "Your email draft is ready" }),
  ).toBeVisible();
});

test("classic view is complete and does not overflow the viewport", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Prefer a classic view?" }).click();
  await expect(page.locator(".classic-portfolio")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "EcoStudent", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "SecureShare", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "NexaPlan", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Back to the 3D room" }).click();
  await expect(page.locator(".room-layout")).toBeVisible();
});

test("essential content works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".classic-portfolio")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "EcoStudent", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download résumé", exact: true }),
  ).toHaveAttribute("href", "/resume/M-Bilal-Khan-Resume.pdf");
  await context.close();
});

test("room and contact dialog have no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".room-loading")).toHaveCount(0);
  const room = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    room.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
  await page.getByRole("button", { name: "Open Contact", exact: true }).click();
  const contact = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    contact.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});

test("WebGL failure keeps a working HTML portfolio", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (...args: Parameters<typeof original>) {
        if (String(args[0]).includes("webgl")) return null;
        return Reflect.apply(original, this, args);
      },
    });
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "There’s more than one way in." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore my portfolio" }).click();
  await expect(page.locator(".classic-portfolio")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "EcoStudent", exact: true }),
  ).toBeVisible();
});

test("missing GLB uses geometry fallback and keeps section navigation", async ({
  page,
}) => {
  await page.route("**/models/laptop.glb", (route) =>
    route.fulfill({ status: 404, body: "Missing test asset" }),
  );
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".room-loading")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Explore My projects", exact: true })
    .click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "EcoStudent", exact: true }),
  ).toBeVisible();
});

test("keyboard focus returns after inspecting a section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Open Skills",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "My everyday toolkit." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("4");
  await expect(
    page.getByRole("heading", { name: "The journey so far." }),
  ).toBeVisible();
});
