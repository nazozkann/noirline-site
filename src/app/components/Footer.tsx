// components/Footer.tsx
"use client";
import Link from "next/link";

export default function Footer() {
  const navItems = [
    {
      title: "Story",
      desc: "Stories worth reading.",
      href: "/story",
    },
    {
      title: "New",
      desc: "Four jackets. And what else.",
      href: "/new",
    },
    {
      title: "Collection",
      desc: "Where rebellion lives.",
      href: "/collection",
    },
    {
      title: "Cities",
      desc: "No comebacks.",
      href: "/cities",
    },
  ];

  return (
    <footer className="bg-[#f5f5f5] text-[#2c2c2c] pt-16 pb-8">
      <div className="w-full px-4">
        {/* Hero Statement */}
        <h2 className="font-ppneue font-[600] text-3xl md:text-4xl lg:text-5xl text-left">
          [Not for followers. For originals.]
        </h2>

        {/* Slogan */}
        <p className="mt-40 text-left opacity-70 font-ppneue">
          [We don't spam. We speak when needed.]
        </p>

        {/* Newsletter */}
        <div className="mt-8 flex flex-col sm:flex-row items-end justify-left gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-auto max-w-sm placeholder-[#2c2c2c]/50 focus:outline-none focus:border-[#fafafa] px-4 py-2 transition-opacity border-l-2 border-r-0 border-t-0 border-b-2 border-[#5a5f73]"
          />
          <button className="inline-flex items-center font-pp-neue-montreal uppercase tracking-wide relative group">
            <span className="group-hover:underline">Join the Line</span>
          </button>
        </div>

        {/* Nav Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
          {navItems.map(({ title, desc, href }) => (
            <div key={title}>
              <Link href={href}>
                <a className="inline-block text-lg font-pp-neue-montreal mb-2 relative group  before:content-[''] after:content-[''] before:absolute before:top-0 before:left-0 after:absolute after:top-0 after:right-0  before:opacity-0 after:opacity-0  hover:before:content-['['] hover:after:content-['\005D']  hover:before:opacity-100 hover:after:opacity-100  hover:before:-translate-x-1 hover:after:translate-x-1 hover:px-2   before:transition-all after:transition-all">
                  {title}
                </a>
                <p className="text-sm opacity-70">{desc}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Separator & Microfooter */}
        <div className="border-t border-[#5a5f73]/20 mt-16 pt-6">
          <p className="text-right text-sm opacity-70 font-space-grotesk">
            © 2025 Noirline. Designed to defy trends.
          </p>
        </div>
      </div>
    </footer>
  );
}
