import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Logo Section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/assets/logo-footer.png" alt="Logo" className="footer__logo-image" />
            </div>
          </div>
          
          {/* Navigation Columns */}
          <div className="footer__links">
            <div className="footer__column">
              <h3 className="footer__title">Contact</h3>
              <nav className="footer__nav">
                <a href="mailto:info@bees-platform.be" className="footer__link">
                  info@bees-platform.be <span className="footer__arrow">↗</span>
                </a>
                <a href="https://www.biodynimkers.be" target="_blank" rel="noopener noreferrer" className="footer__link">
                  www.biodynimkers.be <span className="footer__arrow">↗</span>
                </a>
              </nav>
            </div>
            
            <div className="footer__column">
              <h3 className="footer__title">Blijf op de hoogte</h3>
              <nav className="footer__nav">
                <Link href="/platform" className="footer__link">
                  Platform <span className="footer__arrow">↗</span>
                </Link>
                <Link href="/auth/register" className="footer__link">
                  Registreren <span className="footer__arrow">↗</span>
                </Link>
                <Link href="/auth/login" className="footer__link">
                  Inloggen <span className="footer__arrow">↗</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} BEES Platform. Alle rechten voorbehouden.</p>
          <div className="footer__legal">
            <Link href="#">Privacy</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
