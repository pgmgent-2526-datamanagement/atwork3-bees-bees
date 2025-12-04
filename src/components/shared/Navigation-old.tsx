"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Over Ons" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="header__container">
      <div className="logo">
        <Link href="/" className="logo__link">
          <Image
            src="/assets/logo.png"
            alt="Bees Logo"
            width={120}
            height={40}
            className="logo__image"
          />
        </Link>
      </div>
      <nav className="navigation">
        <ul className="navigation__list">
          {navItems.map((item) => (
            <li key={item.href} className="navigation__item">
              <Link
                href={item.href}
                className={`navigation__link ${
                  pathname === item.href ? "navigation__link--active" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {session?.user ? (
            <li className="navigation__item navigation__item--profile">
              <button
                className="profile-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Profiel menu"
              >
                <div className="avatar"></div>
              </button>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <Link
                    href={`/account/${session.user.id}`}
                    className="profile-dropdown__item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Overzicht
                  </Link>
                  <Link
                    href={`/account/${session.user.id}/apiaries`}
                    className="profile-dropdown__item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Bijenstanden
                  </Link>
                  <Link
                    href={`/account/${session.user.id}/hives`}
                    className="profile-dropdown__item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Kasten
                  </Link>
                  <Link
                    href={`/account/${session.user.id}/observations`}
                    className="profile-dropdown__item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Observaties
                  </Link>
                  <button
                    className="profile-dropdown__item profile-dropdown__item--logout"
                    onClick={handleLogout}
                  >
                    Uitloggen
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="navigation__item">
              <Link
                href="/auth/login"
                className={`navigation__link ${
                  pathname === "/auth/login" ? "navigation__link--active" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
