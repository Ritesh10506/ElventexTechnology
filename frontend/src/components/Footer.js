import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-ink">
              <span className="text-blueprint">[</span> ELVENTEX{" "}
              <span className="text-blueprint">]</span>
            </p>
            <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink-soft">
              Websites, SEO, and design — built and kept running.
            </p>
            <div className="mt-4 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-ink-soft">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-blueprint" />
              SYSTEMS: ONLINE
            </div>
          </div>

          {/* Site links */}
          <div>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-blueprint">
              [ SITE ]
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <a href="/#services" className="transition-colors hover:text-blueprint">
                  Services
                </a>
              </li>
              <li>
                <a href="/#work" className="transition-colors hover:text-blueprint">
                  Process
                </a>
              </li>
              <li>
                <a href="/#contact" className="transition-colors hover:text-blueprint">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Account links */}
          <div>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-blueprint">
              [ ACCOUNT ]
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/login" className="transition-colors hover:text-blueprint">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-blueprint">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-blueprint">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Elventex Technology. All rights reserved.</p>
          <p className="font-[family-name:var(--font-mono)]">WEB &amp; SOFTWARE STUDIO</p>
        </div>
      </div>
    </footer>
  );
}