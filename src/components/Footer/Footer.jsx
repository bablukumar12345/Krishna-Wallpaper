import { Link } from 'react-router-dom';
import { services } from '../../data/servicesData';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/images/logo/logo.webp" alt="Krishna Wallpaper" width="40" height="40" />
            <span>Krishna Wallpaper</span>
          </Link>
          <p>
            Premium home décor solutions — wallpapers, panelling, blinds,
            curtains and flooring — designed, supplied and installed across
            Noida &amp; NCR.
          </p>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.25.06 2.1.25 2.85.55.78.3 1.44.7 2.1 1.36.66.66 1.06 1.32 1.36 2.1.3.75.49 1.6.55 2.85.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.25-.25 2.1-.55 2.85-.3.78-.7 1.44-1.36 2.1-.66.66-1.32 1.06-2.1 1.36-.75.3-1.6.49-2.85.55-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.25-.06-2.1-.25-2.85-.55-.78-.3-1.44-.7-2.1-1.36-.66-.66-1.06-1.32-1.36-2.1-.3-.75-.49-1.6-.55-2.85C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.25.25-2.1.55-2.85.3-.78.7-1.44 1.36-2.1.66-.66 1.32-1.06 2.1-1.36.75-.3 1.6-.49 2.85-.55C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-1.02.05-1.57.22-1.94.36-.49.19-.83.42-1.2.79-.37.37-.6.71-.79 1.2-.14.37-.31.92-.36 1.94C2.88 9.4 2.88 9.77 2.88 12.92s0 3.52.07 4.76c.05 1.02.22 1.57.36 1.94.19.49.42.83.79 1.2.37.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c1.02-.05 1.57-.22 1.94-.36.49-.19.83-.42 1.2-.79.37-.37.6-.71.79-1.2.14-.37.31-.92.36-1.94.07-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.05-1.02-.22-1.57-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.79c-.37-.14-.92-.31-1.94-.36C15.52 4 15.15 4 12 4zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.7-1.98a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14.5 21v-7.6h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.28C16.9 4.19 15.98 4.1 14.9 4.1c-2.24 0-3.77 1.37-3.77 3.87v2.42H8.5v3h2.63V21h3.37z"/>
              </svg>
            </a>
            <a href="https://wa.me/919955197472" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                <path d="M16.02 2.667c-7.36 0-13.33 5.97-13.33 13.33 0 2.35.62 4.55 1.7 6.46L2.67 29.33l6.99-1.83a13.26 13.26 0 0 0 6.36 1.62h.01c7.36 0 13.33-5.97 13.33-13.33 0-3.56-1.39-6.9-3.9-9.42a13.24 13.24 0 0 0-9.43-3.91zm0 24.4h-.01a11.06 11.06 0 0 1-5.64-1.54l-.4-.24-4.15 1.09 1.11-4.05-.26-.42a11.04 11.04 0 0 1-1.7-5.9c0-6.11 4.97-11.08 11.08-11.08 2.96 0 5.74 1.15 7.84 3.25a11.02 11.02 0 0 1 3.24 7.85c0 6.11-4.97 11.04-11.11 11.04zm6.08-8.29c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.31-.2.22-.39.25-.72.08-.33-.17-1.4-.52-2.66-1.65-.98-.88-1.65-1.96-1.84-2.29-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.17-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57l-.64-.01c-.22 0-.58.08-.88.42-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.17.22 2.32 3.55 5.63 4.98.79.34 1.4.54 1.88.7.79.25 1.51.21 2.08.13.63-.1 1.96-.8 2.24-1.58.28-.77.28-1.44.2-1.58-.08-.14-.3-.22-.63-.39z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/quotation">Get a Quotation</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Krishna Wallpaper. All rights reserved.</p>
          <p>Crafted with care for beautiful homes.</p>
        </div>
      </div>
    </footer>
  );
}