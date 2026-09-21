import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { services } from '../../data/servicesData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  const closeTimer = useRef(null);

  // Small delay before closing on mouse-out so moving the cursor from the
  // "Services" button down into the dropdown menu doesn't trigger
  // mouseleave and close it prematurely.
  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeDropdownDelayed = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 250);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Close mobile menu on route change (link click)
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className={`navbar glass-panel ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Krishna Wallpaper home">
          <img src="/images/logo/logo.webp" alt="Krishna Wallpaper" width="40" height="40" />
          <span>𝑲𝒓𝒊𝒔𝒉𝒏𝒂 𝑾𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓</span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>

          <div
            className="navbar__dropdown"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdownDelayed}
          >
            <button
              className="navbar__dropdown-toggle"
              onClick={() => setServicesOpen((o) => !o)}
              aria-expanded={servicesOpen}
            >
              Services <span className="chev">▾</span>
            </button>
            {servicesOpen && (
              <div className="navbar__dropdown-menu glass-panel">
                {services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} onClick={closeMenu}>
                    {s.name}
                  </Link>
                ))}
                <Link to="/services" className="navbar__dropdown-viewall" onClick={closeMenu}>
                  View all services →
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

        <div className="navbar__actions">
          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
