import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`texto ampliado a 200% em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const overflow = await page
      .locator(".dashboard")
      .evaluate((root) =>
        [...root.querySelectorAll("*")]
          .filter(
            (el) =>
              el.clientWidth > 0 &&
              el.scrollWidth > el.clientWidth + 3 &&
              getComputedStyle(el).overflowX === "visible",
          )
          .map((el) => el.className),
      );
    expect(overflow).toEqual([]);
  });
}

test("dashboard, canais, FAQ, chat e briefing funcionam sem serviços externos", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Nexo/);
  await page.getByLabel("Período do dashboard").selectOption("Outubro");
  await expect(page.locator(".metric").first()).toContainText("112.400");
  await page
    .getByRole("button", { name: "Agentes de IA", exact: true })
    .click();
  await expect(page.locator(".demo-agents")).toContainText("Nina");
  await page.getByRole("button", { name: "Conversas", exact: true }).click();
  await page.getByRole("button", { name: "Experimentar conversa" }).click();
  await page
    .getByRole("button", { name: "Como está meu caixa?", exact: true })
    .click();
  await expect(page.locator(".message.bot")).toContainText("R$ 128.450");
  await page.getByLabel("Sua pergunta").fill("Quais canais posso integrar?");
  await page.getByRole("button", { name: "Enviar pergunta" }).click();
  await expect(page.locator(".message.bot").last()).toContainText("Instagram");
  await page.keyboard.press("Escape");
  await expect(page.locator(".chat-dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Experimentar conversa" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Instagram", exact: true }).click();
  await expect(page.locator(".channel-detail")).toContainText(
    "Do primeiro direct",
  );
  await page
    .getByText("A IA toma decisões financeiras por mim?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "revisão e autorização",
  );
  await page
    .getByRole("button", { name: "Conhecer a Nexo", exact: true })
    .click();
  await page.getByLabel("Como podemos chamar você?").fill("Pessoa Teste");
  await page.getByLabel("Qual é a sua empresa?").fill("Empresa Exemplo");
  await page
    .getByLabel("Por onde você quer começar?")
    .selectOption("Conectar toda a operação");
  await page.getByRole("button", { name: "Preparar meu briefing" }).click();
  await expect(page.locator(".brief-success")).toContainText(
    "Nenhuma solicitação foi enviada",
  );
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar meu briefing" }).click();
  expect((await downloaded).suggestedFilename()).toBe("meu-briefing-nexo.txt");
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout sem transbordamento em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 761) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .locator(".main-nav")
        .getByRole("link", { name: "Integrações" })
        .click();
      await expect(page.locator(".main-nav")).not.toBeVisible();
    }
  });
}

for (const colorScheme of ["light", "dark"]) {
  test(`acessibilidade automática: ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await page.goto("/");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page
      .getByRole("button", { name: "Conhecer a Nexo", exact: true })
      .click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}

test("a rolagem apresenta cada agente e a seleção manual mantém o contexto", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  for (const [index, name] of ["Lia", "Leo", "Nina"].entries()) {
    await page
      .locator(`[data-step="${index}"]`)
      .evaluate((el) =>
        el.scrollIntoView({ block: "center", behavior: "instant" }),
      );
    await expect(page.locator(".phone-heading b")).toHaveText(name);
  }
  await page.getByRole("button", { name: "Ver Lia em ação" }).click();
  await page
    .locator('[data-step="2"]')
    .evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "instant" }),
    );
  await expect(page.locator(".phone-heading b")).toHaveText("Lia");
});

test("movimento reduzido mantém fotografias, conteúdo e troca manual dos agentes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Ver Nina em ação" }).click();
  await expect(page.locator(".phone-heading b")).toHaveText("Nina");
  await expect(page.locator(".phone")).toBeInViewport();
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await page.evaluate(async () => {
    document
      .querySelectorAll("img[loading=lazy]")
      .forEach((el) => (el.loading = "eager"));
    await Promise.all([...document.images].map((i) => i.decode()));
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((i) => i.complete && i.naturalWidth > 0),
      ),
  ).toBe(true);
});
