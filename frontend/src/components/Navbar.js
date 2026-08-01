"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("access_token")));
    setChecked(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-ink"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-blueprint">[</span>
          ELVENTEX
          <span className="text-blueprint">]</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-blueprint"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Status indicator + CTA (desktop) */}
        <div className="hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-ink-soft">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-blueprint" />
            SYSTEMS: ONLINE
          </div>

          {!checked ? null : loggedIn ? (
            <Link
              href="/dashboard"
              className="border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint"
            >
              Get started
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-9 w-9 items-center justify-center border border-line md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink transition-transform ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="flex flex-col px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-line py-3 text-sm text-ink-soft"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-2 py-3 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-ink-soft">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-blueprint" />
              SYSTEMS: ONLINE
            </div>

            {!checked ? null : loggedIn ? (
              <Link
                href="/dashboard"
                className="mt-2 border border-ink bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="mt-2 border border-ink bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}