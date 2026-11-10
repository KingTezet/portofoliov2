// Single source for project copy shown on the site.
// Facts come from public/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf.
// Supabase rows (managed in /admin) override thumbnail + links, and any
// project added in /admin that isn't listed here is shown with its DB copy.

export type CaseStudy = {
  overview: string;
  challenge?: string;
  role: string;
  built: string[];
  outcome?: string[];
};

export type ProjectEntry = {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  context?: string;
  thumbnail_url?: string | null;
  demo_url?: string | null;
  repo_url?: string | null;
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export type DbProject = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_url: string | null;
  tech_stack: string[] | null;
  demo_url?: string | null;
  repo_url?: string | null;
};

const STORAGE = "https://vxzvxauolgqrqahfgkzg.supabase.co/storage/v1/object/public/portfolio-assets/projects";

export const curatedProjects: ProjectEntry[] = [
  {
    id: "chogo",
    slug: "chogo-coffee-superapp",
    title: "Chogo Coffee — F&B Operations Platform",
    category: "Product Engineering",
    context: "Chogo Coffee · Contract, Remote",
    summary:
      "A unified F&B platform for POS, online ordering, attendance, payroll, and loyalty. Its self-service ordering flow processed 500+ transactions in its first month.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Edge Functions"],
    thumbnail_url: `${STORAGE}/1781891100697.png`,
    demo_url: "https://www.chogocoffee.com",
    featured: true,
    caseStudy: {
      overview:
        "An F&B operations platform that brings key business workflows into one system, including POS, online ordering, attendance, payroll, and loyalty.",
      challenge:
        "Daily operations were spread across separate tools and manual work: end-of-day financial closing took about 4 hours, and payroll reporting took several days.",
      role: "Product Engineer & Growth Lead. Built the Next.js App Router interface and Supabase data layer for the platform.",
      built: [
        "Built the customer-facing self-service ordering flow.",
        "Connected the frontend to the Supabase data layer.",
        "Automated daily financial reconciliation using database triggers.",
        "Delivered a one-click dashboard report for payroll operations.",
      ],
      outcome: [
        "500+ transactions processed in the first month of the self-service ordering flow.",
        "Daily financial closing reduced from about 4 hours to under 30 minutes.",
        "Multi-day manual payroll reporting replaced by a one-click dashboard report.",
      ],
    },
  },
  {
    id: "tahungoding",
    slug: "tahungoding-core-web",
    title: "Tahungoding — Community & SME Portal",
    category: "Frontend Engineering",
    context: "Tahungoding · Head & Mentor, UI/UX Division",
    summary:
      "Consolidated three internal tools into one Next.js portal serving 100+ active SME members, with a 95+ Lighthouse performance score.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    thumbnail_url: `${STORAGE}/1781892333309.png`,
    demo_url: "https://tahungoding.id",
    featured: true,
    caseStudy: {
      overview: "The organization's portal for its community and SME members, built with Next.js and Supabase.",
      challenge: "Members and the team relied on three separate internal tools for what should have been one place.",
      role: "Head & Mentor of the UI/UX Division. Shipped the portal and coordinated a 15-person team in Linear.",
      built: [
        "Shipped the portal with Next.js and Supabase.",
        "Consolidated three internal tools into a single portal.",
        "Documented technical decisions through asynchronous ADRs.",
      ],
      outcome: [
        "95+ Lighthouse performance score.",
        "One portal serving 100+ active SME members.",
        "Sprint cycle time reduced from 14 to 10 days.",
      ],
    },
  },
  {
    id: "siperta",
    slug: "siperta",
    title: "SIPERTA — Land & Asset Information System",
    category: "GovTech · Web Mapping",
    context: "Government of West Bandung Regency",
    summary:
      "A land and asset information system with browser-based map layers, SHP uploads, Excel imports, and cross-agency record search.",
    tags: ["Laravel", "Web Mapping", "Spatial Data", "Excel Import"],
    featured: true,
    caseStudy: {
      overview:
        "A land and asset information system used by staff of the West Bandung Regency government to manage spatial asset data.",
      challenge: "Staff needed to load and view spatial asset data in the browser and find records held by several local agencies (OPD).",
      role: "Built the map-layer views, file uploads, imports, and search features.",
      built: [
        "Map-layer views and SHP file upload so staff can load and view spatial asset data in the browser.",
        "Excel import for existing records.",
        "Global search across records from several local government agencies (OPD).",
      ],
    },
  },
  {
    id: "kedai-karuhun",
    slug: "kedai-karuhun",
    title: "Kedai Karuhun — Online Ordering",
    category: "E-commerce · Local Business",
    context: "Local SME · kedai-karuhun.my.id",
    summary:
      "An online ordering experience for a local produce business, letting customers browse the catalog and place orders without visiting the store.",
    tags: ["Next.js", "Supabase", "Vercel"],
    demo_url: "https://kedai-karuhun.my.id",
    featured: true,
    caseStudy: {
      overview: "A customer-facing ordering app for a local vegetable and fruit seller.",
      challenge: "Customers could only order in person.",
      role: "Built the customer-facing ordering app.",
      built: ["Product catalog customers can browse online.", "Online ordering flow from catalog to order."],
    },
  },
  {
    id: "archival",
    slug: "archival-ai-knowledge-base",
    title: "Archival AI — AI Knowledge Base",
    category: "AI & Automation",
    context: "Independent project",
    summary:
      "A document knowledge-base chat with streaming responses and inline citations, helping users trace answers back to their source documents.",
    tags: ["Next.js", "Supabase pgvector", "n8n", "OpenAI API", "Claude API"],
    caseStudy: {
      overview: "A chat interface over a document knowledge base, with answers that cite their sources.",
      challenge: "Finding an answer meant about 15 minutes of manual searching through documents.",
      role: "Independent project — built the interface and the ingestion workflow.",
      built: [
        "Streaming chat interface in Next.js with inline citations.",
        "Ingestion workflow with n8n webhooks and embeddings in Supabase pgvector.",
        "A custom match_documents RPC for retrieval.",
      ],
      outcome: ["Lookup time dropped from about 15 minutes to under 30 seconds."],
    },
  },
  {
    id: "affligen",
    slug: "affligen-ai-generator",
    title: "Affligen — AI Affiliate Content Generator",
    category: "AI & Automation",
    context: "PT Ngulik Teknologi Digital",
    summary:
      "An LLM-powered tool that turns a product image into publish-ready affiliate marketing copy, reducing content preparation from about 15 minutes to under 1 minute per asset.",
    tags: ["LLM APIs", "n8n", "REST APIs", "Webhooks"],
    caseStudy: {
      overview: "A tool that turns a product image into publish-ready marketing copy.",
      challenge: "Preparing content for each product asset took about 15 minutes.",
      role: "Full-Stack & Automation Engineer at PT Ngulik Teknologi Digital.",
      built: ["LLM-powered copy generation from a product image.", "Workflow automation with n8n, REST APIs, and webhooks."],
      outcome: ["Content preparation reduced from about 15 minutes to under 1 minute per asset."],
    },
  },
  {
    id: "arsis",
    slug: "arsis",
    title: "ARSIS — Construction Project Monitoring",
    category: "Internal Tools",
    context: "PT Adipati Rekayasa Sistem",
    summary: "Turned a manually maintained Excel progress report into a web application with S-Curve project progress tracking.",
    tags: ["Laravel", "Reporting", "S-Curve"],
    caseStudy: {
      overview: "A web application for monitoring construction project progress.",
      challenge: "Progress was tracked in a manually maintained Excel report.",
      role: "Built the web application.",
      built: ["Web-based progress reporting to replace the Excel report.", "S-Curve progress tracking."],
    },
  },
];

const isPlaceholder = (url?: string | null) => !url || url.includes("placehold.co");

/** Merge curated copy with live rows from Supabase. Curated order first, then extra DB projects. */
export function mergeProjects(rows: DbProject[] | null | undefined): ProjectEntry[] {
  const db = rows ?? [];
  const bySlug = new Map(db.map((r) => [r.slug, r]));

  const curated = curatedProjects.map((p) => {
    const row = bySlug.get(p.slug);
    if (!row) return p;
    return {
      ...p,
      id: row.id,
      thumbnail_url: isPlaceholder(row.thumbnail_url) ? p.thumbnail_url : row.thumbnail_url,
      demo_url: row.demo_url || p.demo_url,
      repo_url: row.repo_url || p.repo_url,
    };
  });

  const known = new Set(curatedProjects.map((p) => p.slug));
  const extra: ProjectEntry[] = db
    .filter((r) => !known.has(r.slug))
    .map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category,
      summary: r.description,
      tags: r.tech_stack ?? [],
      thumbnail_url: isPlaceholder(r.thumbnail_url) ? null : r.thumbnail_url,
      demo_url: r.demo_url,
      repo_url: r.repo_url,
    }));

  return [...curated, ...extra];
}

export const impactHighlights = [
  { value: "500+", label: "Transactions in the first month of a self-service ordering flow", slug: "chogo-coffee-superapp", project: "Chogo Coffee" },
  { value: "95+", label: "Lighthouse performance score on a Next.js portal", slug: "tahungoding-core-web", project: "Tahungoding" },
  { value: "4h → <30m", label: "Daily financial closing, automated with database triggers", slug: "chogo-coffee-superapp", project: "Chogo Coffee" },
  { value: "100+", label: "Active SME members served by one consolidated portal", slug: "tahungoding-core-web", project: "Tahungoding" },
];
