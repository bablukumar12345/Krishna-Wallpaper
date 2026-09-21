import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Contact.css';

export default function Contact() {
  return (
    <div className="page-enter contact-page">
      <SEO title="Contact Us" description="Get in touch with Krishna Wallpaper by phone, WhatsApp or email, or visit our studio in Sector 63, Noida." />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

        <div className="section-heading contact-page__heading">
          <span className="eyebrow">Talk to us</span>
          <h1>We'd love to hear about your space</h1>
          <p>Call, WhatsApp or drop by our studio — or request a quotation online.</p>
        </div>

        <section className="contact-page__info glass-panel">
          <h3>Get in Touch</h3>
          <ul className="contact-page__info-list">
            <li>
              <span className="contact-page__info-icon">📍</span>
              <span>Sector 63, Noida, Uttar Pradesh</span>
            </li>
            <li>
              <span className="contact-page__info-icon">📞</span>
              <a href="tel:+919955197472">+91 99551 97472</a>
            </li>
            <li>
              <span className="contact-page__info-icon">✉️</span>
              <a href="mailto:hello@krishnawallpaper.com">hello@krishnawallpaper.com</a>
            </li>
          </ul>
        </section>

        <div className="contact-page__grid">
          <a href="tel:+919955197472" className="contact-card glass-panel">
            <span className="contact-card__icon">📞</span>
            <h3>Call Us</h3>
            <p>+91 99551 97472</p>
          </a>
          <a href="https://wa.me/919955197472" target="_blank" rel="noopener noreferrer" className="contact-card glass-panel">
            <span className="contact-card__icon">💬</span>
            <h3>WhatsApp</h3>
            <p>Chat with our team instantly</p>
          </a>
          <a href="mailto:hello@krishnawallpaper.com" className="contact-card glass-panel">
            <span className="contact-card__icon">✉️</span>
            <h3>Email</h3>
            <p>hello@krishnawallpaper.com</p>
          </a>
          <div className="contact-card glass-panel">
            <span className="contact-card__icon">📍</span>
            <h3>Studio</h3>
            <p>Sector 63, Noida, Uttar Pradesh</p>
          </div>
        </div>

        <div className="contact-page__cta glass-panel-dark">
          <div>
            <h2>Ready for a written quotation?</h2>
            <p>Fill in your details and preferred products — we'll respond within 24 hours.</p>
          </div>
          <Link to="/quotation" className="btn btn-brass">Get Quotation</Link>
        </div>
      </div>
    </div>
  );
}
