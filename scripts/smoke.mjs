import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import assert from "node:assert/strict";

const baseUrl =
  process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:4173/Moe-CV/";
const output = new URL("../artifacts/", import.meta.url);
const screenshotPath = (name) => fileURLToPath(new URL(name, output));
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  headless: true,
  args: [
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [],
  broken = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400)
    broken.push(`${response.status()} ${response.url()}`);
});
await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.locator("#scene.ready canvas").waitFor({ timeout: 20000 });
await page.waitForTimeout(1800);
await page.screenshot({ path: screenshotPath("desktop-hero.png") });
assert.equal(await page.title(), "Mohammed Alekhwan | Software Engineer");
assert.equal(await page.locator("h1").count(), 1);

await page.getByRole("button", { name: "Pause motion", exact: true }).click();
const canvas = page.locator("#scene canvas");
const chromeFrame = await canvas.screenshot();
await page.getByRole("button", { name: "Lime material", exact: true }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Lime material", exact: true })
    .getAttribute("aria-pressed"),
  "true",
);
assert.ok(
  !chromeFrame.equals(await canvas.screenshot()),
  "Material must change rendered pixels",
);
await page
  .getByRole("button", { name: "Wireframe material", exact: true })
  .click();
assert.equal(
  await page
    .getByRole("button", { name: "Wireframe material", exact: true })
    .getAttribute("aria-pressed"),
  "true",
);
await page.screenshot({ path: screenshotPath("desktop-wireframe.png") });
await page
  .getByRole("button", { name: "Chrome material", exact: true })
  .click();
await page
  .getByRole("button", { name: "Reset sculpture rotation", exact: true })
  .click();
const resetFrame = await canvas.screenshot();
await page.locator("#scene").focus();
await page.keyboard.press("ArrowRight");
assert.ok(
  !resetFrame.equals(await canvas.screenshot()),
  "Arrow keys must rotate the sculpture",
);
await page
  .getByRole("button", { name: "Reset sculpture rotation", exact: true })
  .click();
const bounds = await canvas.boundingBox();
await page.mouse.move(
  bounds.x + bounds.width / 2,
  bounds.y + bounds.height / 2,
);
await page.mouse.down();
await page.mouse.move(
  bounds.x + bounds.width / 2 + 80,
  bounds.y + bounds.height / 2 + 20,
  { steps: 8 },
);
await page.mouse.up();
assert.ok(
  !resetFrame.equals(await canvas.screenshot()),
  "Dragging must rotate the sculpture",
);
await page
  .getByRole("button", { name: "Reset sculpture rotation", exact: true })
  .click();

const selectedProjects = [
  "Efad Wheelchair System",
  "EFADgrp Website",
  "Mercato Maintenance Website",
  "SaChat",
  "Rasmi Rewards",
];
assert.deepEqual(
  await page.locator(".project-info h3").allTextContents(),
  selectedProjects,
);
for (const [filter, count] of [
  ["Websites", 2],
  ["Systems", 2],
  ["Applications", 1],
]) {
  await page.getByRole("button", { name: filter, exact: true }).click();
  assert.equal(await page.locator(".project-card:visible").count(), count);
}
await page.getByRole("button", { name: /All work/ }).click();
assert.equal(await page.locator(".project-card:visible").count(), 5);
for (const title of selectedProjects) {
  const trigger = page.getByRole("button", {
    name: `Explore ${title} project`,
    exact: true,
  });
  await trigger.click();
  assert.equal(await page.locator("dialog[open]").count(), 1);
  assert.equal(await page.locator("#dialog-title").innerText(), title);
  assert.equal(await page.locator("#dialog-focus li").count(), 3);
  const website = [
    "EFADgrp Website",
    "Mercato Maintenance Website",
    "Rasmi Rewards",
  ].includes(title);
  assert.equal(
    await page.locator("#dialog-gallery img").count(),
    website ? 1 : 0,
  );
  assert.match(
    await page.locator("#dialog-action").getAttribute("href"),
    website ? /^https:/ : /^mailto:/,
  );
  if (website)
    await page.locator("#dialog-gallery img").evaluate((img) => img.decode());
  if (title === "EFADgrp Website")
    await page.screenshot({ path: screenshotPath("project-dialog.png") });
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog[open]").count(), 0);
  assert.equal(
    await trigger.evaluate((el) => document.activeElement === el),
    true,
  );
}
await page.locator(".expertise-item").nth(1).locator("summary").click();
assert.equal(
  await page.locator(".expertise-item").nth(1).getAttribute("open"),
  "",
);
await context.grantPermissions(["clipboard-read", "clipboard-write"]);
await page
  .getByRole("button", { name: "Copy email address", exact: true })
  .click();
assert.equal(
  await page.evaluate(() => navigator.clipboard.readText()),
  "mohammed.alekhwan@outlook.com",
);
assert.match(await page.locator(".toast").innerText(), /Email copied/);
await page.locator(".toast:not(.visible)").waitFor({ state: "attached" });
const pdf = await context.request.get(
  new URL("documents/Mohammed-CV.pdf", baseUrl).href,
);
assert.equal(pdf.status(), 200);
assert.match(pdf.headers()["content-type"], /pdf/);
assert.deepEqual(
  await pdf.body(),
  await fs.readFile(
    new URL("../public/documents/Mohammed-CV.pdf", import.meta.url),
  ),
  "Downloaded CV must match the supplied PDF exactly",
);

const widths = [360, 390, 768, 1024, 1440];
for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(180);
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }));
  assert.ok(
    dimensions.scroll <= dimensions.viewport,
    `Horizontal overflow at ${width}px: ${JSON.stringify(dimensions)}`,
  );
  if (width === 390) {
    await page.screenshot({ path: screenshotPath("mobile-hero.png") });
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    assert.equal(await page.locator("#mobile-nav").isVisible(), true);
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: /About/ })
      .click();
    assert.equal(await page.locator("#mobile-nav").isVisible(), false);
    await page.screenshot({
      path: screenshotPath("mobile-full.png"),
      fullPage: true,
    });
  }
}
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({
  path: screenshotPath("desktop-full.png"),
  fullPage: true,
});
const accessibility = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
if (accessibility.violations.length)
  console.log(
    JSON.stringify(
      accessibility.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      null,
      2,
    ),
  );
assert.equal(
  accessibility.violations.length,
  0,
  "Accessibility violations found",
);

const reduced = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
await reducedPage.locator(".motion-paused").waitFor();
assert.equal(
  await reducedPage
    .getByRole("button", { name: "Enable motion", exact: true })
    .count(),
  1,
);
assert.equal(
  await reducedPage
    .locator("h1")
    .evaluate((el) => getComputedStyle(el).opacity),
  "1",
);
await reducedPage.emulateMedia({ reducedMotion: "no-preference" });
await reducedPage
  .getByRole("button", { name: "Pause motion", exact: true })
  .waitFor();

const fallback = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
await fallback.addInitScript(() => {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === "webgl2" || type === "webgl") return null;
    return original.call(this, type, ...args);
  };
});
const fallbackPage = await fallback.newPage();
await fallbackPage.goto(baseUrl, { waitUntil: "networkidle" });
await fallbackPage
  .getByText("The creative loop — still edition", { exact: true })
  .waitFor();
assert.equal(
  await fallbackPage
    .getByRole("button", { name: "Chrome material", exact: true })
    .isDisabled(),
  true,
);
assert.equal(await fallbackPage.locator("h1").isVisible(), true);
const noJs = await browser.newContext({ javaScriptEnabled: false });
const noJsPage = await noJs.newPage();
await noJsPage.goto(baseUrl);
assert.equal(await noJsPage.locator(".project-card").count(), 5);
assert.equal(await noJsPage.locator("h1").isVisible(), true);
assert.deepEqual(errors, []);
assert.deepEqual(broken, []);
await fs.writeFile(
  new URL("qa-results.json", output),
  JSON.stringify(
    {
      result: "PASS",
      baseUrl,
      widths,
      projects: selectedProjects,
      checks: [
        "static production rendering",
        "WebGL material changes",
        "pointer and keyboard rotation",
        "five selected projects only",
        "all category filters",
        "case studies and live links",
        "dialog Escape and focus restoration",
        "expertise accordion",
        "clipboard",
        "CV download",
        "responsive overflow",
        "mobile navigation",
        "axe WCAG A/AA scan",
        "live reduced motion preference",
        "WebGL fallback",
        "JavaScript-disabled content",
      ],
      pageErrors: errors,
      failedResponses: broken,
    },
    null,
    2,
  ),
);
console.log(
  "PASS: five selected projects, 3D interaction, responsive layouts, accessibility, reduced motion, and WebGL fallback.",
);
await browser.close();
