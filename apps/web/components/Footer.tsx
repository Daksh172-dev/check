import Link from "next/link";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/deals", label: "Deals" }
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support" }
  ]
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <section>
          <h2 className="text-lg font-extrabold text-slate-900">ACME Store</h2>
          <p className="mt-2 text-sm text-slate-600">Built for fast, modern eCommerce storefronts.</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Shop</h3>
          <ul className="mt-3 space-y-2">
            {footerLinks.shop.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-700 hover:text-slate-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Company</h3>
          <ul className="mt-3 space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-700 hover:text-slate-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="border-t border-slate-100 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ACME Store. All rights reserved.
      </div>
    </footer>
  );
}
