import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  return [
    { slug: ["about-us"] },
    { slug: ["services"] },
    { slug: ["pricing"] },
    { slug: ["portfolio"] },
    { slug: ["team"] },
    { slug: ["blog"] },
    { slug: ["contact-us"] },
    { slug: ["services", "accounting"] },
    { slug: ["services", "analytics"] },
    { slug: ["services", "audit"] },
    { slug: ["services", "financial-services"] },
    { slug: ["services", "seo-optimization"] },
    { slug: ["services", "tax-advisory"] },
    { slug: ["portfolio", "accountant-consultation"] },
    { slug: ["portfolio", "digital-transformation"] },
    { slug: ["portfolio", "planning"] },
    { slug: ["portfolio", "production-management"] },
    { slug: ["portfolio", "success-secret"] },
    { slug: ["portfolio", "tax-accounting"] },
    { slug: ["team", "arlene-mccoy"] },
    { slug: ["team", "boyce-cowan"] },
    { slug: ["team", "esther-howard"] },
    { slug: ["team", "guy-hawkins"] },
    { slug: ["team", "jenny-wilson"] },
    { slug: ["team", "ted-webb"] },
    { slug: ["blog", "10-best-code-languages-for-begginers"] },
    { slug: ["blog", "the-importance-of-budgeting-for-small-businesses"] },
    { slug: ["blog", "the-pros-and-cons-of-hiring-an-in-house-accountant"] },
    { slug: ["blog", "understanding-business-valuation-what-you-need-to-know"] },
    { slug: ["blog", "which-card-is-better-to-have-debit-or-credit"] },
    { slug: ["blog", "why-you-should-have-adaptive-mobile-design-and-how-it-help"] },
  ];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug;
  const relativePath = slugParts.join("/");

  // Try relativePath.html
  let filePath = path.join(process.cwd(), "public", `${relativePath}.html`);
  if (!fs.existsSync(filePath)) {
    // Try relativePath/index.html
    filePath = path.join(process.cwd(), "public", relativePath, "index.html");
  }
  if (!fs.existsSync(filePath)) {
    // Try relativePath directly (in case URL includes .html)
    filePath = path.join(process.cwd(), "public", relativePath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const html = fs.readFileSync(filePath, "utf-8");
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  return new Response("Not Found", { status: 404 });
}
