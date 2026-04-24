#!/usr/bin/env tsx
/**
 * SPS Documentation Generator
 *
 * Reads pricing from src/lib/pricing.ts (single source of truth) and regenerates:
 *   - Scale_Performance_Studio_Creative_Production_v8.docx (internal service guide)
 *   - Scale_Performance_Studio_SOP_Client_v2.docx          (client-facing SOP)
 *   - pricing-rubric.md                                    (internal Claude/Emre cheat-sheet)
 *
 * After running this, convert the DOCX files to PDF with LibreOffice if needed:
 *   soffice --headless --convert-to pdf Scale_Performance_Studio_*_v*.docx
 *
 * Usage: `npm run build:docs` (from sps-website root)
 */

import fs from "node:fs";
import path from "node:path";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, BorderStyle, WidthType, ShadingType,
  LevelFormat, Footer, PageNumber,
} from "docx";

// Read from the adapter (which reads from shared/) so the generator
// uses the same display strings the website renders.
import {
  packages,
  creditCostSections,
  comparisonRows,
  topUps,
  addOns,
  mediaBuyingTiers,
  mediaBuyingIncludes,
  mediaBuyingRequirements,
  faqs,
} from "../src/lib/pricing";

/* ───────────── Output paths ───────────── */

const WORKSPACE_ROOT = path.resolve(__dirname, "../..");
const DOC_V8 = path.join(WORKSPACE_ROOT, "Scale_Performance_Studio_Creative_Production_v8.docx");
const DOC_SOP = path.join(WORKSPACE_ROOT, "Scale_Performance_Studio_SOP_Client_v2.docx");
const RUBRIC = path.join(WORKSPACE_ROOT, "pricing-rubric.md");

/* ───────────── Styling constants ───────────── */

const brandGreen = "2E7F06";
const ink = "1A1A1A";
const inkDim = "555555";
const border = { style: BorderStyle.SINGLE, size: 4, color: "D5D5D5" };
const thinBorders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: "F2F7EE", type: ShadingType.CLEAR };

/* ───────────── Helpers ───────────── */

const h1 = (text: string) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 180 }, children: [new TextRun({ text, bold: true, size: 36, color: ink, font: "Arial" })] });
const h2 = (text: string) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 120 }, children: [new TextRun({ text, bold: true, size: 28, color: ink, font: "Arial" })] });
const h3 = (text: string) => new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 240, after: 80 }, children: [new TextRun({ text, bold: true, size: 24, color: brandGreen, font: "Arial" })] });
const p = (text: string, opts: any = {}) => new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 22, color: ink, font: "Arial", ...opts })] });
const pDim = (text: string) => new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 20, color: inkDim, font: "Arial", italics: true })] });
const bullet = (text: string) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text, size: 22, color: ink, font: "Arial" })] });
const sectionLabel = (num: number) => new Paragraph({ spacing: { before: 480, after: 0 }, children: [new TextRun({ text: `SECTION ${num.toString().padStart(2, "0")}`, bold: true, size: 18, color: brandGreen, font: "Arial" })] });

const cell = (
  text: string,
  { bold = false, shading = null as any, size = 20, color = ink, colSpan = 1 } = {}
) =>
  new TableCell({
    borders: thinBorders,
    shading: shading || undefined,
    columnSpan: colSpan,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold, size, color, font: "Arial" })] })],
  });

/* ───────────── Dynamic tables from SSOT ───────────── */

function creditStructureTable() {
  const hdr = new TableRow({ tableHeader: true, children: [
    cell("CREATIVE TYPE", { bold: true, shading: headerShading, size: 18, color: brandGreen }),
    cell("CREDITS", { bold: true, shading: headerShading, size: 18, color: brandGreen }),
  ]});
  const subHeaderRow = (title: string) => new TableRow({ children: [
    new TableCell({
      columnSpan: 2,
      borders: thinBorders,
      shading: { fill: "FAFAFA", type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 18, color: inkDim, font: "Arial" })] })],
    }),
  ]});
  const dataRow = (label: string, desc: string, credits: string) =>
    new TableRow({ children: [
      new TableCell({ borders: thinBorders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [
        new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, color: ink, font: "Arial" })] }),
        new Paragraph({ children: [new TextRun({ text: desc, size: 18, color: inkDim, font: "Arial" })] }),
      ]}),
      cell(credits, { bold: true, color: brandGreen }),
    ]});

  const rows = [hdr];
  for (const section of creditCostSections) {
    rows.push(subHeaderRow(section.title));
    for (const item of section.items) rows.push(dataRow(item.label, item.desc, item.credits));
  }
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [6360, 3000], rows });
}

function packagesHeaderTable() {
  const headers = packages.map((pkg) => cell(
    pkg.popular ? `${pkg.name.toUpperCase()}  ★` : pkg.name.toUpperCase(),
    { bold: true, shading: headerShading, color: brandGreen }
  ));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: packages.map(() => Math.floor(9360 / packages.length)),
    rows: [
      new TableRow({ children: headers }),
      new TableRow({ children: packages.map((pkg) => cell(pkg.credits)) }),
      new TableRow({ children: packages.map((pkg) => cell(pkg.price, { bold: true, size: 24 })) }),
      new TableRow({ children: packages.map((pkg) => cell(pkg.priceLabel, { size: 16, color: inkDim })) }),
    ],
  });
}

function packageComparisonTable() {
  const hdrRow = new TableRow({ tableHeader: true, children: [
    cell("FEATURE", { bold: true, shading: headerShading, color: brandGreen }),
    ...packages.map((pkg) => cell(pkg.name.toUpperCase(), { bold: true, shading: headerShading, color: brandGreen })),
  ]});
  const rows = comparisonRows.map((row) => new TableRow({ children: [
    cell(row.label, { bold: true }),
    ...row.values.map((v) => cell(typeof v === "boolean" ? (v ? "✓" : "—") : v)),
  ]}));
  const colWidths = [2160, ...packages.map(() => Math.floor(7200 / packages.length))];
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: colWidths, rows: [hdrRow, ...rows] });
}

function mediaBuyingTable() {
  const hdr = new TableRow({ tableHeader: true, children: [
    cell("MONTHLY AD SPEND", { bold: true, shading: headerShading, color: brandGreen }),
    cell("MANAGEMENT FEE", { bold: true, shading: headerShading, color: brandGreen }),
  ]});
  const rows = mediaBuyingTiers.map((t) => new TableRow({ children: [cell(t.spend), cell(t.fee, { bold: true, color: brandGreen })] }));
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [5360, 4000], rows: [hdr, ...rows] });
}

function topUpsTable() {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: topUps.map(() => Math.floor(9360 / topUps.length)),
    rows: [
      new TableRow({ children: topUps.map((t) => cell(`${t.credits} CREDITS`, { bold: true, shading: headerShading })) }),
      new TableRow({ children: topUps.map((t) => cell(t.price, { bold: true, size: 24, color: brandGreen })) }),
    ],
  });
}

function addOnsTable() {
  const hdr = new TableRow({ tableHeader: true, children: [
    cell("ADD-ON", { bold: true, shading: headerShading, color: brandGreen }),
    cell("COST", { bold: true, shading: headerShading, color: brandGreen }),
    cell("DESCRIPTION", { bold: true, shading: headerShading, color: brandGreen }),
  ]});
  const rows = addOns.map((a) => new TableRow({ children: [cell(a.name, { bold: true }), cell(a.price, { bold: true, color: brandGreen }), cell(a.description)] }));
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [2600, 2000, 4760], rows: [hdr, ...rows] });
}

function turnaroundTable() {
  const hdr = new TableRow({ tableHeader: true, children: [
    cell("SUBSCRIPTION", { bold: true, shading: headerShading, color: brandGreen }),
    cell("STANDARD TURNAROUND", { bold: true, shading: headerShading, color: brandGreen }),
    cell("PRIORITY LEVEL", { bold: true, shading: headerShading, color: brandGreen }),
  ]});
  const turnaroundRow = comparisonRows.find((r) => r.label === "Turnaround");
  const priorities = ["Standard", "Standard", "Standard", "High priority", "Priority delivery"];
  const rows = packages.map((pkg, i) => new TableRow({ children: [
    cell(pkg.name, { bold: true }),
    cell(String(turnaroundRow?.values[i] ?? "—")),
    cell(priorities[i]),
  ]}));
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3120, 3120, 3120], rows: [hdr, ...rows.reverse()] });
}

function buildFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Scale Performance Studio  ·  Confidential  ·  Page ", size: 16, color: inkDim, font: "Arial" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: inkDim, font: "Arial" }),
      ],
    })],
  });
}

function docShell(children: any[], title: string) {
  return new Document({
    creator: "Scale Performance Studio",
    title,
    numbering: { config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
    }]},
    styles: { default: { document: { run: { font: "Arial", size: 22, color: ink } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
      footers: { default: buildFooter() },
      children,
    }],
  });
}

/* ───────────── v8 — internal service guide ───────────── */

function buildCreativeProductionV8() {
  const growth = packages.find((p) => p.name === "Growth")!;
  const growthCreditNum = parseInt(growth.credits);
  // Mix example: 60 statics @ 0.5cr = 30 + 10 UGC @ 3cr = 30 + 4 mini @ 5cr = 20 → 80 credits
  const mixExample = "Example: 60 statics + 10 UGC videos + 4 mini commercials = 80 credits.";

  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "SCALE PERFORMANCE STUDIO", bold: true, size: 24, color: brandGreen, font: "Arial" })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "Creative Production", bold: true, size: 56, color: ink, font: "Arial" })] }),
    pDim("Research-driven performance creatives for e-commerce brands. High-volume ad creative production powered by AI and data, designed for testing and scaling."),
    new Paragraph({ spacing: { before: 240, after: 240 }, children: [new TextRun({ text: "SERVICE GUIDE & PRICING — 2026", bold: true, size: 22, color: brandGreen, font: "Arial" })] }),

    sectionLabel(1), h1("Why We're Different"),
    p("In today's competitive advertising environment, creative is the number-one driver of ad performance. The algorithms on platforms like Meta and TikTok optimise delivery based on engagement — and engagement is driven almost entirely by the quality and relevance of your ad creative."),
    p("Most creative agencies produce ads based on guesswork. We don't. Every creative we produce is backed by deep product research, competitor analysis, audience intelligence, and — when available — your own ads-manager performance data."),
    p("Our approach combines AI-powered research with AI-powered production. Every ad is informed by real data: what your competitors are running, what messaging resonates with your audience, and which angles have the highest probability of converting."),
    h3("PRODUCT RESEARCH"), p("Deep analysis of your product, market position, competitors, and audience before any creative is produced."),
    h3("COMPETITOR INTELLIGENCE"), p("We analyse your competitors' ad strategies, messaging, and creative approaches to find opportunities."),
    h3("PERFORMANCE CREATIVES"), p("Static images and AI video ads optimised for Meta, TikTok, and Google — built on research insights."),
    h3("DATA FEEDBACK LOOP"), p("Share your ads-manager data and we continuously optimise which creatives to produce next."),

    sectionLabel(2), h1("The Creative Credit System"),
    p("We operate on a flexible, credit-based production model. Credits are tied to creative FORMAT, not length — which means pricing is predictable and matches the complexity of what we actually produce for you."),
    h2("Credit Structure"), creditStructureTable(),
    new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: "Winner iterations", bold: true, size: 22, color: ink, font: "Arial" })] }),
    p("When you identify a winning ad, we produce modified versions with different hooks, headlines, or visual tweaks to extend its lifespan and maximise performance — at 50% of the original cost."),
    h2("What credits mean for you"),
    p(`A package of ${growthCreditNum} credits, for example, can be redeemed in multiple ways:`),
    bullet(`${growthCreditNum * 2} static image ads — test a wide range of product images, headlines, and value propositions.`),
    bullet(`${Math.floor(growthCreditNum / 5)} mini commercials — scripted 2–4 scene ads with product, reaction, and call-to-action.`),
    bullet(`${Math.floor(growthCreditNum / 8)} brand stories — full narrative ads with people, music, transitions.`),
    bullet(`A smart mix: ${mixExample}`),
    pDim("Credits are valid for 60 days from the date of purchase."),

    sectionLabel(3), h1("Our Creative Production Process"),
    p("Our streamlined workflow ensures fast and efficient creative production, from briefing to final delivery. Research is built into every step — not bolted on as an afterthought."),
    bullet("01 — Creative briefing: you submit a simple intake form with product details and goals."),
    bullet("02 — Research & analysis: we analyse your product, audience, competitors, and performance data to develop testing angles."),
    bullet("03 — AI-powered production: we generate high-volume static and video creatives using our AI engine, based on research insights."),
    bullet("04 — Quality control: every creative is reviewed, polished, and checked for brand consistency."),
    bullet("05 — Delivery & iteration: creatives are delivered ready to launch. Winners are iterated for scaling."),
    h2("Turnaround times by subscription"), turnaroundTable(),
    h2("Creative intake required"),
    bullet("Product link — URL to your product page"),
    bullet("Target audience — who you are selling to"),
    bullet("Key benefits — top selling points"),
    bullet("Competitor references — ads or brands you admire"),
    bullet("Offer / promotion — active discounts or deals"),
    bullet("Brand assets — logo, colors, fonts (if available)"),

    sectionLabel(4), h1("Creative Production Packages"),
    p("Our packages are designed to be accessible for new brands while scaling seamlessly for established businesses. Research and competitor analysis are included with every package. All recurring packages are billed monthly."),
    packagesHeaderTable(), pDim("★ Growth is the most popular package."),
    h2("Package comparison"), packageComparisonTable(),

    sectionLabel(5), h1("Credit Top-Up Packages"),
    p("Running out of credits before the end of your billing cycle? Our top-up packs let you purchase additional credits at any time, so your creative production never has to stop."),
    topUpsTable(), new Paragraph({ spacing: { before: 240 } }),
    p("Top-up credits are added to your account instantly after purchase and are valid for 60 days. They stack on top of any remaining package credits."),

    sectionLabel(6), h1("Add-On Services"),
    p("Customise your creative production with add-on services. These are available to all package holders."),
    addOnsTable(),

    sectionLabel(7), h1("Media Buying Services"),
    p("Media buying is priced separately from creative production. It's built for brands with proven budgets that want the full loop: campaigns continuously fed by research-backed creative, optimised daily, scaled fast."),
    h2("What's included"), ...mediaBuyingIncludes.map((item) => bullet(item + ".")),
    h2("Management fee"),
    p("The management fee automatically adjusts based on total monthly ad spend."),
    mediaBuyingTable(),
    h2("Requirements"),
    ...mediaBuyingRequirements.map((r) => bullet(`${r.label} — ${r.value}.`)),
    new Paragraph({
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({ text: "Important:", bold: true, size: 22, color: ink, font: "Arial" }),
        new TextRun({ text: " creatives are ", size: 22, color: ink, font: "Arial" }),
        new TextRun({ text: "not", bold: true, italics: true, size: 22, color: ink, font: "Arial" }),
        new TextRun({ text: " included in the media buying fee. You need an active creative package alongside media buying to keep the engine running.", size: 22, color: ink, font: "Arial" }),
      ],
    }),
    pDim("Platforms: Meta (Facebook + Instagram) and TikTok are primary. Snapchat and Pinterest are available as secondary platforms depending on your audience."),

    sectionLabel(8), h1("Frequently Asked Questions"),
    ...faqs.flatMap((faq) => [h3(faq.q), p(faq.a)]),
    h2("Important terms"),
    bullet("Credits are valid for 60 days from the date of purchase."),
    bullet("Maximum 1 revision per creative is included; extra revisions cost 0.5 credits (static) or 50% of original (video)."),
    bullet("Briefings must be complete before production begins."),
    bullet("All creatives are produced for advertising use only."),
    bullet("All creatives remain the property of the client upon delivery."),

    sectionLabel(9), h1("Getting Started"),
    p("Launching your creative production with Scale Performance Studio is simple:"),
    bullet("1. Choose your package — select the monthly credit package that fits your production volume and testing goals."),
    bullet("2. Complete the briefing — fill out our simple intake form with your product details, audience, and goals."),
    bullet("3. Launch your ads — receive research-backed creatives within your subscription's turnaround window, ready to run."),
    new Paragraph({ spacing: { before: 240 } }),
    p("Ready to scale your brand with research-driven, high-performing creatives? Contact us to get started. We will guide you through the onboarding process and have your first batch of creatives ready within days.", { bold: true }),
    pDim("Performance-driven creatives for serious e-commerce brands."),
  ];

  return docShell(children, "SPS Creative Production — Service Guide & Pricing 2026 (v8)");
}

/* ───────────── SOP v2 — client-facing ───────────── */

function buildSopV2() {
  const growth = packages.find((p) => p.name === "Growth")!;
  const growthCreditNum = parseInt(growth.credits);

  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "SCALE PERFORMANCE STUDIO", bold: true, size: 24, color: brandGreen, font: "Arial" })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "How We Work", bold: true, size: 56, color: ink, font: "Arial" })] }),
    pDim("Everything you need to know about working with Scale Performance Studio. Our process, pricing, packages, and how we produce high-performing ad creatives for your brand."),
    new Paragraph({ spacing: { before: 240, after: 240 }, children: [new TextRun({ text: "SERVICE GUIDE & PRICING — 2026", bold: true, size: 22, color: brandGreen, font: "Arial" })] }),

    sectionLabel(1), h1("Why We're Different"),
    p("Creative is the number-one driver of ad performance. Meta and TikTok algorithms optimise delivery based on engagement, and engagement is driven almost entirely by the quality and relevance of your ad creative."),
    p("Most agencies produce ads based on guesswork. We don't. Every creative we produce is backed by deep product research, competitor analysis, audience intelligence, and — when available — your own ads manager performance data."),
    h2("What's included with every package"),
    bullet("Product research — deep analysis of your product, market position, competitors, and audience before any creative is produced."),
    bullet("Competitor intelligence — we analyse competitor ad strategies, messaging, and creative approaches to find opportunities."),
    bullet("Performance creatives — static images and AI video ads optimised for Meta, TikTok, and Google, built on research insights."),
    bullet("Data feedback loop — share your ads manager data and we continuously optimise which creatives to produce next."),

    sectionLabel(2), h1("Our Creative Production Process"),
    p("Our streamlined workflow ensures fast and efficient creative production, from briefing to delivery. Research is built into every step."),
    bullet("1. Creative briefing — you submit a simple intake form with your product details and goals."),
    bullet("2. Research & analysis — we analyse your product, audience, competitors, and performance data to develop testing angles."),
    bullet("3. AI-powered production — we generate a high volume of static and video creatives using our AI engine."),
    bullet("4. Quality control — every creative is reviewed, polished, and checked for brand consistency."),
    bullet("5. Delivery & iteration — creatives are delivered ready to launch. Winners are iterated for scaling."),
    h2("Creative intake required"),
    bullet("Product link — URL to your product page"),
    bullet("Target audience — who you are selling to"),
    bullet("Key benefits — top selling points"),
    bullet("Competitor references — ads or brands you admire"),
    bullet("Offer / promotion — active discounts or deals"),
    bullet("Brand assets — logo, colors, fonts (if available)"),

    sectionLabel(3), h1("The Creative Credit System"),
    p("We operate on a flexible, credit-based production model. Credits are tied to creative FORMAT, not length — pricing is predictable and matches the complexity of what we actually produce."),
    h2("Credit Structure"), creditStructureTable(),
    h2("What credits mean for you"),
    p(`A package of ${growthCreditNum} credits could be redeemed in multiple ways:`),
    bullet(`${growthCreditNum * 2} static image ads — test a wide range of product images, headlines, and value propositions.`),
    bullet(`${Math.floor(growthCreditNum / 5)} mini commercials — scripted 2–4 scene ads with product, reaction, and call-to-action.`),
    bullet(`A smart mix: e.g. 60 statics + 10 UGC videos + 4 mini commercials = 80 credits.`),
    pDim("Credits are valid for 60 days from the date of purchase."),

    sectionLabel(4), h1("Packages & Pricing"),
    p("Our packages are designed to be accessible for new brands while scaling seamlessly for established businesses. Research and competitor analysis are included with every package."),
    packagesHeaderTable(), pDim("★ Growth is the most popular package."),
    h2("Package comparison"), packageComparisonTable(),

    sectionLabel(5), h1("Top-Ups, Add-Ons & Media Buying"),
    h2("Credit top-up packages"),
    p("Need more credits? Purchase additional credits at any time. They stack on top of your remaining package credits and are valid for 60 days."),
    topUpsTable(),
    h2("Add-on services"), addOnsTable(),
    h2("Optional: media buying"),
    p("Media buying is priced separately. Minimum €15k/month ad spend. The management fee scales with your total monthly ad spend:"),
    mediaBuyingTable(),
    pDim("Creatives are NOT included in the media buying fee — you need an active creative package alongside it."),

    sectionLabel(6), h1("Getting Started"),
    p("Launching your creative production with Scale Performance Studio is simple:"),
    bullet("1. Choose your package — select the credit package that fits your production volume and testing goals."),
    bullet("2. Complete the briefing — fill out our intake form with your product details, audience, and goals."),
    bullet("3. Launch your ads — receive your research-backed creatives within your turnaround window, ready to test."),
    new Paragraph({ spacing: { before: 240 } }),
    p("Ready to scale your brand with research-driven, high-performing creatives? Contact us to get started.", { bold: true }),
    h2("Important terms"),
    bullet("Credits are valid for 60 days from the date of purchase."),
    bullet("Maximum 1 revision per creative included."),
    bullet("Briefings must be complete before production begins."),
    bullet("Unused credits expire after 60 days and cannot be refunded."),
    bullet("All creatives remain the property of the client upon delivery."),
  ];

  return docShell(children, "SPS SOP Client — How We Work (v2)");
}

/* ───────────── Rubric (markdown) ───────────── */

function buildRubricMarkdown(): string {
  const today = new Date().toISOString().split("T")[0];
  const videoFormats = creditCostSections.find((s) => s.title === "Video formats")!.items;
  const statics = creditCostSections.find((s) => s.title === "Statics")!.items[0];
  const addonItems = creditCostSections.find((s) => s.title.startsWith("Add-ons"))!.items;
  const iteration = creditCostSections.find((s) => s.title === "Iteration")!.items[0];

  return `# SPS Pricing Rubric — internal cheat-sheet

> **Auto-generated by \`npm run build:docs\` from \`src/lib/pricing.ts\`.** Do not edit this file by hand.
> Last generated: ${today}

Reference om klant-briefings objectief naar een format + credit-prijs te mappen, zonder gut-feel of discussie. Geldt voor Emre én Claude.

---

## Format catalog

| Format | Credits | Wat het is |
|--------|---------|------------|
| **${statics.label}** | ${statics.credits} | ${statics.desc} |
${videoFormats.map((v) => `| **${v.label}** | ${v.credits} | ${v.desc} |`).join("\n")}

## Add-ons (stapelbaar op elke video)

| Add-on | Kost |
|--------|------|
${addonItems.map((a) => `| ${a.label} | ${a.credits} |`).join("\n")}

## Iteratie

| Type | Kost |
|------|------|
| ${iteration.label} | ${iteration.credits} |

---

## Decision tree (gebruik bij elke klant-briefing)

**Stap 1 — Statisch of bewegend?**
- Stilstaand beeld → **Static (1)**
- Video → stap 2

**Stap 2 — Spreekt iemand op camera?**
- Ja, 1 persoon, 1 scene → **Voice-of-customer (3)**
- Ja, meerdere personen/scenes → stap 3 (scene-count regeert)
- Nee → stap 3

**Stap 3 — Hoeveel distinct scenes?**
- 1 scene, alleen product in beweging → **Product shot (2)**
- 2–4 scenes met eenvoudige flow → **Mini commercial (5)**
- 4+ scenes met narratief arc → **Brand story (8)**
- Zeer complex, premium camera/VFX → **Premium cinematic (12)**

**Stap 4 — Premium tools (Kling / Runway / Veo 3 / Higgsfield) nodig?**
- Ja → één tier omhoog, of direct Premium cinematic
- Nee → blijf op base tier

**Stap 5 — Add-ons?** Voice-over, muziek, color grade, extra platform resize → credits erbij tellen.

---

## Quick-recognition patronen

| Wat klant zegt | Format |
|----------------|--------|
| "Ik wil gewoon mijn product mooi in beeld" | Product shot (2) |
| "Iemand die over mijn product praat" / "een UGC video" | Voice-of-customer (3) |
| "Een kort ad'je met product in gebruik + een hook" | Mini commercial (5) |
| "Een echte Meta ad met storytelling, muziek, sfeer" | Brand story (8) |
| "Iets dat eruit ziet als een Apple of Nike commercial" | Premium cinematic (12) |
| "Deze ad werkt goed, kun je er 3 varianten van maken?" | Re-hook a winner (50% × originele format) |

---

## Grijze-gevallen-regels

- **Mini commercial + premium feel gevraagd** → Mini commercial + 50% (premium tools als modifier) = **7.5 credits**
- **UGC-aanvraag maar met 3 verschillende personen in 3 scenes** → **Mini commercial (5)**, niet Voice-of-customer — scene-count is de tripwire
- **Klant weet het niet precies** → altijd naar boven afronden en vooraf duidelijk communiceren. Veiliger over-quote + positieve verrassing bij levering dan onder-charge.
- **Klant wil "live-action UGC met écht mens"** (geen AI-avatar) → nog niet in stack; offerte als custom, of verwijs naar UGC-brokers.

---

## Packages overview

${packages.map((pkg) => `- **${pkg.name}** — ${pkg.credits} @ ${pkg.price} ${pkg.priceLabel}${pkg.popular ? " ⭐" : ""}`).join("\n")}

## Media buying fees (spend-based)

${mediaBuyingTiers.map((t) => `- ${t.spend} → ${t.fee}`).join("\n")}

Minimum €500/day (€15k/month) ad spend. Creatives **not** included — requires active creative package.

---

## Workflow bij elke nieuwe briefing

1. Lees de brief door
2. Pas decision tree toe → bepaal format
3. Noteer eventuele add-ons
4. Quote credit-totaal bevestigen bij klant vóór productie
5. Log asset tegen \`client_id\` (voeding voor cost-tracker in dashboard)
`;
}

/* ───────────── Main ───────────── */

async function main() {
  console.log("→ Generating documents from src/lib/pricing.ts");

  const v8Buffer = await Packer.toBuffer(buildCreativeProductionV8());
  fs.writeFileSync(DOC_V8, v8Buffer);
  console.log(`✓ ${path.basename(DOC_V8)} (${v8Buffer.length} bytes)`);

  const sopBuffer = await Packer.toBuffer(buildSopV2());
  fs.writeFileSync(DOC_SOP, sopBuffer);
  console.log(`✓ ${path.basename(DOC_SOP)} (${sopBuffer.length} bytes)`);

  fs.writeFileSync(RUBRIC, buildRubricMarkdown());
  console.log(`✓ ${path.basename(RUBRIC)}`);

  console.log("\nAll documents regenerated. Convert DOCX → PDF via LibreOffice if needed:");
  console.log(`  soffice --headless --convert-to pdf "${DOC_V8}"`);
  console.log(`  soffice --headless --convert-to pdf "${DOC_SOP}"`);
}

main().catch((err) => { console.error(err); process.exit(1); });
