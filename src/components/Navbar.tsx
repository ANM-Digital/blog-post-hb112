// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-semibold text-blue-600">
          <Link href="/">MyApp</Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 ${
                  pathname === href ? "font-semibold text-blue-600" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-2 space-y-2 px-2 pb-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 ${
                  pathname === href ? "font-semibold bg-blue-100 text-blue-600" : ""
                }`}
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
