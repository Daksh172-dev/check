import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" }
];

type NavMenuProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function NavMenu({ mobile = false, onNavigate }: NavMenuProps) {
  return (
    <nav aria-label="Primary navigation">
      <ul className={mobile ? "space-y-4" : "hidden items-center gap-6 md:flex"}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
