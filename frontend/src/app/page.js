import Link from "next/link";

const SERVICES = [
  {
    tag: "DESIGN",
    title: "Website designing",
    desc: "A new site built from a blank sheet — structured, fast, and built around what your customers actually came to do.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="14" rx="1" />
        <path d="M3 8.5h18" />
        <circle cx="6" cy="6.25" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    tag: "DIAGNOSTIC",
    title: "Website health check",
    desc: "A full inspection of speed, broken links, mobile behavior, and security — with a plain-language report of what to fix first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h4l2 6 4-14 2 8h6" />
      </svg>
    ),
  },
  {
    tag: "GROWTH",
    title: "SEO optimization",
    desc: "Get found for the searches that actually bring customers — on-page fixes, structure, and content that search engines can read.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="6" />
        <path d="M15 15l6 6" />
      </svg>
    ),
  },
  {
    tag: "VISUAL",
    title: "Graphic designing",
    desc: "Banners, social creatives, and print-ready artwork that stay consistent with how the rest of your brand looks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-.9.7-1.5 1.5-1.5H16a4 4 0 0 0 4-4c0-4.4-3.6-8-8-8Z" />
        <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="10.5" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    tag: "IDENTITY",
    title: "Logo designing",
    desc: "A mark that still reads clearly at 32 pixels — with the source files and versions you need for every platform.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 3 6.5V12c0 5.2 3.8 8.7 9 10 5.2-1.3 9-4.8 9-10V6.5L12 2Z" />
      </svg>
    ),
  },
  {
    tag: "MAINTENANCE",
    title: "Updating your website",
    desc: "New pages, content changes, plugin and security updates — ongoing upkeep so the site stays current without you touching code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18 3v4h-4M6 21v-4h4" />
      </svg>
    ),
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Submit a request",
    desc: "Tell us what you need — a new build, a fix, or a review — in a couple of sentences.",
  },
  {
    step: "02",
    title: "We scope it",
    desc: "You'll hear back with what's involved, what we need from you, and a timeline.",
  },
  {
    step: "03",
    title: "Build & review",
    desc: "We work in the open — track progress and leave notes right on the request.",
  },
  {
    step: "04",
    title: "Ship & monitor",
    desc: "It goes live, and we keep an eye on health and performance after launch.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-line bg-paper-raised px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-ink-soft">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-blueprint" />
              ACCEPTING NEW REQUESTS
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Websites, diagnosed
              <br />
              and built right.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Elventex is a small studio that designs, builds, and maintains
              websites — plus the SEO and graphics work that goes with them.
              One request, tracked start to finish.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="border border-ink bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint"
              >
                Start a request
              </Link>
              <a
                href="#services"
                className="border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint"
              >
                See services
              </a>
            </div>
          </div>

          {/* Blueprint-style illustration */}
          <div className="relative mx-auto w-full max-w-md">
            <svg viewBox="0 0 400 320" className="w-full text-blueprint">
              <rect
                x="20"
                y="20"
                width="360"
                height="280"
                rx="4"
                fill="var(--paper-raised)"
                stroke="var(--line)"
              />
              <rect x="20" y="20" width="360" height="34" rx="4" fill="none" stroke="var(--line)" />
              <circle cx="38" cy="37" r="3.5" fill="var(--line)" />
              <circle cx="50" cy="37" r="3.5" fill="var(--line)" />
              <circle cx="62" cy="37" r="3.5" fill="var(--line)" />

              <rect x="44" y="78" width="180" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="44" y="102" width="130" height="8" rx="1.5" fill="var(--line)" />
              <rect x="44" y="118" width="150" height="8" rx="1.5" fill="var(--line)" />

              <rect x="44" y="146" width="100" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="156" y="146" width="100" height="32" rx="2" fill="none" stroke="var(--line)" />

              {/* dimension line */}
              <line x1="44" y1="196" x2="256" y2="196" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="44" y1="191" x2="44" y2="201" stroke="currentColor" strokeWidth="1" />
              <line x1="256" y1="191" x2="256" y2="201" stroke="currentColor" strokeWidth="1" />
              <text
                x="150"
                y="214"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="currentColor"
              >
                1200px
              </text>

              <rect x="280" y="78" width="76" height="180" rx="2" fill="none" stroke="var(--line)" />
              <rect x="290" y="90" width="56" height="10" rx="1.5" fill="var(--line)" />
              <rect x="290" y="106" width="40" height="8" rx="1.5" fill="var(--line)" />

              <circle cx="318" cy="150" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M312 150l4 4 8-8" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <text
                x="318"
                y="184"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8"
                fill="currentColor"
              >
                HEALTH: OK
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="scroll-mt-16 border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 max-w-lg">
            <p className="mb-2 font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
              [ SERVICES ]
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
              Everything a website needs, in one place.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-paper p-7">
                <div className="mb-4 flex h-9 w-9 items-center justify-center border border-line text-blueprint">
                  {s.icon}
                </div>
                <p className="mb-1.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wide text-ink-soft">
                  {s.tag}
                </p>
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section id="work" className="scroll-mt-16 border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 max-w-lg">
            <p className="mb-2 font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
              [ PROCESS ]
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
              How a request moves.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative pl-0">
                <p className="mb-3 font-[family-name:var(--font-mono)] text-xs text-blueprint-dim">
                  {p.step}
                </p>
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-base font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-line lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact / CTA ---------- */}
      <section id="contact" className="scroll-mt-16 blueprint-grid">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <p className="mb-2 font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
            [ CONTACT ]
          </p>
          <h2 className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
            Have something that needs building or fixing?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Sign in, submit a request, and track it from a dashboard —
            no back-and-forth over email.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint"
            >
              Start a request
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}