"use client";

import Link from "next/link";
import { useState } from "react";
import { NavMenu } from "./NavMenu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md border border-slate-200 p-2 text-slate-700 md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

        <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
          ACME<span className="text-emerald-600">Store</span>
        </Link>

        <div className="ml-4 hidden md:block">
          <NavMenu />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <input
            id="header-search"
            type="search"
            placeholder="Search products..."
            className="hidden h-10 w-56 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-emerald-500 focus:ring md:block lg:w-72"
          />
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            aria-label="Open cart"
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-72 border-r border-slate-200 bg-white p-5 shadow-xl md:hidden">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-base font-bold">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-emerald-500 focus:ring"
              />
            </div>

            <NavMenu mobile onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
    </header>
  );
}
