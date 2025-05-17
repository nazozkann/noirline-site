"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-primary text-secondary px-4 md:px-4 py-4 flex items-end justify-between">
      <Link href="/" className="text-2xl font-archivo font-black">
        NOIRline
      </Link>

      <div className="hidden md:flex space-x-8 font-ppneue font-medium text-xl">
        <Link href="/story" className="hover:text-accent transition mr-10">
          Story
        </Link>
        <Link href="/new" className="hover:text-accent transition mr-10">
          New
        </Link>
        <Link href="/collection" className="hover:text-accent transition mr-10">
          Collection
        </Link>
        <Link href="/contact" className="hover:text-accent transition">
          <div>
            New York <span className="font-light">7:30 p.m.</span>
          </div>
        </Link>
      </div>
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-primary text-secondary flex flex-col items-center space-y-4 py-4 font-ppneue md:hidden">
          <Link href="/about" onClick={() => setIsOpen(false)}>
            Story
          </Link>
          <Link href="/collections" onClick={() => setIsOpen(false)}>
            Collection
          </Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <div>
              New York <span className="font-light">7:30 p.m.</span>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
