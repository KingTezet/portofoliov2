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
  /** Shown in homepage Selected Work (first 4, array order). */
  featured?: boolean;
  /** Shown in homepage More Work (array order). */
  supporting?: boolean;
  services?: string;
  productType?: string;
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

export const curatedProjects: ProjectEntry[] = [
  // ===== Selected Work (homepage, in this order) =====
  {
    id: "tahungoding",
    slug: "tahungoding-core-web",
    title: "Tahungoding — Community & SME Portal",
    category: "Frontend Engineering",
    services: "Organization Portal",
    productType: "SME Member Management Hub",
    context: "Tahungoding · Head & Mentor, UI/UX Division",
    summary:
      "An organization profile portal and member hub for 100+ SMEs, with a 95+ Lighthouse performance score.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    thumbnail_url: "/images/projects/tahungoding.webp",
    demo_url: "https://tahungoding.id",
    featured: true,
    caseStudy: {
      overview: "An organization profile portal and member hub serving 100+ SMEs (UMKM).",
      challenge: "Members and the team relied on three separate internal tools for what should have been one place.",
      role: "Head & Mentor of the UI/UX Division. Shipped the portal and coordinated a 15-person team in Linear.",
      built: [
        "Shipped the portal with Next.js and Supabase.",
        "Consolidated three internal tools into a single member hub.",
        "Documented technical decisions through asynchronous ADRs.",
      ],
      outcome: [
        "95+ Lighthouse performance score.",
        "One portal serving 100+ active SME members.",
        "Team sprint cycle reduced from 14 to 10 days.",
      ],
    },
  },
  {
    id: "siperta",
    slug: "siperta",
    title: "SIPERTA — Land & Asset Information System",
    category: "GovTech · Web Mapping",
    services: "GIS & Web Development",
    productType: "Land & Asset Information System",
    context: "Government of West Bandung Regency",
    summary:
      "A land information system for the West Bandung Regency government, with web-mapped spatial data, SHP uploads, Excel imports, and cross-agency search.",
    tags: ["Laravel", "PHP", "JavaScript", "OpenLayers / Leaflet", "PostgreSQL / MySQL", "Tailwind CSS"],
    thumbnail_url: "/images/projects/siperta.webp",
    featured: true,
    caseStudy: {
      overview: "A land information system (Sistem Informasi Pertanahan) for the Government of West Bandung Regency.",
      challenge: "Staff needed to load and view spatial asset data in the browser and find records held by several local agencies (OPD).",
      role: "Built the web-mapping views, file uploads, imports, and search features.",
      built: [
        "Web-mapping visualization of spatial data in the browser.",
        "SHP file upload for spatial asset data.",
        "Global search across records from several local government agencies (OPD).",
        "Excel import for existing records.",
      ],
    },
  },
  {
    id: "arsis",
    slug: "arsis",
    title: "ARSIS — Construction Project Monitoring",
    category: "Internal Tools",
    services: "Web Development & Management System",
    productType: "Construction Monitoring Platform",
    context: "PT Adipati Rekayasa Sistem",
    summary:
      "A construction project management platform that replaced manual Excel recaps with automated digital reports, S-Curve tracking, budgets (RAB), and daily logs.",
    tags: ["Laravel", "PHP", "JavaScript", "MySQL", "Bootstrap / Tailwind CSS"],
    thumbnail_url: "/images/projects/arsis.webp",
    featured: true,
    caseStudy: {
      overview: "A construction project management platform for PT Adipati Rekayasa Sistem.",
      challenge: "Project progress was recapped manually in Excel.",
      role: "Built the web application.",
      built: [
        "Automated digital progress reports replacing the manual Excel recap.",
        "S-Curve progress tracking.",
        "Budget plan (RAB) tracking.",
        "Daily project logs.",
      ],
    },
  },
  {
    id: "vr-geonusa",
    slug: "vr-geonusa",
    title: "VR GeoNusa — Interactive 3D Geometry Learning",
    category: "WebXR · 3D",
    services: "WebXR & 3D Development",
    productType: "Interactive 3D Learning Platform",
    context: "Hibah Fundamental BIMA 2026",
    summary:
      "An interactive WebXR platform for learning geometry through Indonesian cultural heritage — 360° tours of Borobudur and Prambanan.",
    tags: ["WebXR (A-Frame)", "Three.js", "Blender", "GLTF / GLB", "JavaScript", "HTML5"],
    thumbnail_url: "/images/projects/vr-geonusa.webp",
    featured: true,
    caseStudy: {
      overview:
        "An interactive 3D WebXR platform for learning geometry through Nusantara cultural heritage, set in Candi Borobudur and Prambanan.",
      challenge: "Photogrammetry assets of the temples had to run smoothly in the browsers of school devices.",
      role: "Built the WebXR and 3D web experience.",
      built: [
        "360° temple tours where students discover geometric solids in the architecture.",
        "Mesh decimation and texture compression for photogrammetry assets.",
        "GLTF / GLB asset pipeline from Blender to the browser.",
      ],
    },
  },

  // ===== Supporting work (homepage "More Work", in this order) =====
  {
    id: "chogo",
    slug: "chogo-coffee-superapp",
    title: "Chogo Coffee — F&B Operations Platform",
    category: "Product Engineering",
    services: "Full-Stack Web Development",
    productType: "F&B Operations & POS System",
    context: "Chogo Coffee · Contract, Remote",
    summary:
      "An all-in-one F&B operations platform for POS, attendance, payroll, and loyalty. Processed 500+ transactions in its first month.",
    tags: ["Next.js (App Router)", "React", "TypeScript", "Supabase (PostgreSQL)", "Tailwind CSS", "Vercel"],
    thumbnail_url: "/images/projects/chogo.webp",
    demo_url: "https://www.chogocoffee.com",
    supporting: true,
    caseStudy: {
      overview: "An all-in-one operations platform covering POS, attendance, payroll, and loyalty.",
      challenge:
        "Daily operations were spread across separate tools and manual work: daily reconciliation took about 4 hours, and payroll reporting took several days.",
      role: "Product Engineer & Growth Lead. Built the Next.js App Router interface and Supabase data layer for the platform.",
      built: [
        "Built the customer-facing self-service ordering flow.",
        "Connected the frontend to the Supabase data layer.",
        "Automated daily financial reconciliation using database triggers.",
        "Delivered a one-click dashboard report for payroll operations.",
      ],
      outcome: [
        "500+ transactions processed in the first month.",
        "Daily reconciliation reduced from 4 hours to under 30 minutes via database triggers.",
      ],
    },
  },
  {
    id: "kedai-karuhun",
    slug: "kedai-karuhun",
    title: "Kedai Karuhun — Online Grocery Ordering",
    category: "E-commerce · Local Business",
    services: "E-commerce & Web Development",
    productType: "Online Grocery Platform",
    context: "Local SME · kedai-karuhun.my.id",
    summary:
      "An online ordering app for fresh fruit and vegetables delivered to the door, with a dynamic catalog and self-service checkout.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    thumbnail_url: "/images/projects/kedai-karuhun.webp",
    demo_url: "https://kedai-karuhun.my.id",
    supporting: true,
    caseStudy: {
      overview: "An online ordering app for fresh fruit and vegetables, delivered straight to customers' homes.",
      challenge: "Customers could only order face to face.",
      role: "Built the customer-facing ordering app.",
      built: ["Dynamic product catalog.", "Self-service ordering flow replacing in-person transactions."],
    },
  },
  {
    id: "nata-virtual-office",
    slug: "nata-virtual-office",
    title: "NATA Virtual Office — AI Agent Workspace",
    category: "AI & Automation",
    services: "AI & Web Application Development",
    productType: "Virtual Agent Workspace Platform",
    context: "Personal product",
    summary:
      "A 2D virtual office simulation for multi-agent AI, with a luxury beach-villa aesthetic and real-time status tracking.",
    tags: ["Next.js", "React", "TypeScript", "Canvas API / Phaser", "Socket.io", "Tailwind CSS"],
    thumbnail_url: "/images/projects/nata-virtual-office.webp",
    supporting: true,
    caseStudy: {
      overview:
        "A 2D virtual office workspace where multiple AI agents work in department rooms, with a luxury beach-villa aesthetic.",
      role: "Designed and built the product.",
      built: ["2D office world rendered on canvas.", "Real-time agent status tracking.", "Task queue and live activity feed."],
    },
  },
  {
    id: "nata-focus-os",
    slug: "nata-focus-os",
    title: "NATA Focus OS — Digital Productivity OS",
    category: "Product Engineering",
    services: "Product & Web Development",
    productType: "Digital Productivity OS",
    context: "Personal product",
    summary:
      "A digital productivity workspace for daily habit tracking, weekly planning, and managing digital products.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Meta Ads API"],
    thumbnail_url: "/images/projects/nata.webp",
    supporting: true,
    caseStudy: {
      overview: "A digital productivity workspace for habits, money, focus, and goals.",
      role: "Designed and built the product.",
      built: ["Daily habit tracker.", "Weekly planner.", "Digital product management."],
    },
  },
  {
    id: "frontend-90",
    slug: "frontend-90",
    title: "Frontend 90 — Developer Learning Workspace",
    category: "EdTech",
    services: "EdTech & Web Application",
    productType: "Developer Learning Workspace",
    context: "Personal product",
    summary:
      "A dashboard for a 90-day frontend engineering roadmap that tracks curriculum and skill progress.",
    tags: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    thumbnail_url: "/images/projects/frontend-learning.webp",
    supporting: true,
    caseStudy: {
      overview: "A learning workspace for a 90-day Frontend Engineer roadmap.",
      role: "Designed and built the product.",
      built: ["Curriculum dashboard for the 90-day roadmap.", "Daily sessions, checklists, and weekly milestones.", "Skill progress tracking and reports."],
    },
  },
  {
    id: "kopi-tobi",
    slug: "kopi-tobi",
    title: "Kopi Tobi — Coffee Shop Company Profile",
    category: "Company Profile",
    services: "Company Profile",
    productType: "Coffee Shop",
    context: "Kopi Tobi · Sumedang",
    summary:
      "A company profile site for a Sumedang coffee shop, covering the menu, space, services, testimonials, and location with opening hours.",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
    thumbnail_url: "/images/projects/kopi-tobi.webp",
    supporting: true,
  },
];

/** Removed from the portfolio; hide matching Supabase rows too. */
const hiddenSlugs = new Set(["archival-ai-knowledge-base", "affligen-ai-generator"]);

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
      // Local covers in /public win over DB thumbnails.
      thumbnail_url: p.thumbnail_url?.startsWith("/") || isPlaceholder(row.thumbnail_url) ? p.thumbnail_url : row.thumbnail_url,
      demo_url: row.demo_url || p.demo_url,
      repo_url: row.repo_url || p.repo_url,
    };
  });

  const known = new Set(curatedProjects.map((p) => p.slug));
  const extra: ProjectEntry[] = db
    .filter((r) => !known.has(r.slug) && !hiddenSlugs.has(r.slug))
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
