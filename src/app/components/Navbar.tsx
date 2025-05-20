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
        <Link href="/cities" className="hover:text-accent transition">
          <div>Cities</div>
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
        <div className="absolute z-20 top-16 left-0 w-full bg-[#f5f5f5] text-[#2c2c2c] flex flex-col items-center space-y-8 py-4 font-ppneue text-2xl md:hidden">
          <Link href="/story" onClick={() => setIsOpen(false)}>
            Story
          </Link>
          <Link href="/new" onClick={() => setIsOpen(false)}>
            New
          </Link>
          <Link href="/collection" onClick={() => setIsOpen(false)}>
            Collection
          </Link>
          <Link href="/cities" onClick={() => setIsOpen(false)}>
            <div>Cities</div>
          </Link>
        </div>
      )}
    </nav>
  );
}
