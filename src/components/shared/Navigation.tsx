"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { User, MapPin, Box, Eye, LogOut, Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/vision", label: "Visie" },
    { href: "/platform", label: "Platform" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav__container">
          <Link href="/" className="nav__logo">
            <img src="/assets/logo.png" alt="Logo" className="nav__logo-image" />
            <span className="nav__logo-text">Biodynamische Imkers</span>
          </Link>

          <div className="nav__menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link ${
                  pathname === item.href ? "nav__link--active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            {session?.user ? (
              <div className="nav__dropdown" ref={dropdownRef}>
                <button
                  className="nav__avatar"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="User menu"
                >
                  <span className="nav__avatar-circle"></span>
                </button>

                {isDropdownOpen && (
                  <div className="nav__dropdown-menu">
                    <Link
                      href="/account"
                      className="nav__dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>Overzicht</span>
                    </Link>
                    <Link
                      href="/apiaries"
                      className="nav__dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <MapPin size={16} />
                      <span>Bijenstanden</span>
                    </Link>
                    <Link
                      href="/hives"
                      className="nav__dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Box size={16} />
                      <span>Kasten</span>
                    </Link>
                    <Link
                      href="/observations"
                      className="nav__dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Eye size={16} />
                      <span>Observaties</span>
                    </Link>
                    <div className="nav__dropdown-divider"></div>
                    <button
                      onClick={handleLogout}
                      className="nav__dropdown-item nav__dropdown-item--danger"
                    >
                      <LogOut size={16} />
                      <span>Uitloggen</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="nav__link">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
