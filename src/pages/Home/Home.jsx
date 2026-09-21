import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { services } from '../../data/servicesData';
import './Home.css';

const whyUs = [
  { title: 'In-home consultation', text: 'We visit your space, take measurements and suggest finishes suited to your light and layout.' },
  { title: 'Premium materials', text: 'Every wallpaper, panel and fabric is sourced from vetted manufacturers for lasting quality.' },
  { title: 'Expert installation', text: 'Our trained crews install cleanly and quickly, with a tidy finish every time.' },
  { title: 'Transparent quotes', text: 'No hidden costs — you approve a clear quotation before any work begins.' },
];

export default function Home() {
  return (
    <div className="page-enter">
      <SEO
        title="Premium Home Décor in Noida"
        description="Krishna Wallpaper designs and installs wallpapers, PVC panels, zebra blinds, curtains and flooring across Noida & NCR."
      />

      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero/main_h1.webp" alt="" aria-hidden="true" />
        </div>
        <div className="hero__scrim"></div>
        <div className="container hero__content fade-in-up">
          <span className="eyebrow">Premium Interior Finishing Experts</span>
          <h1>Transform Walls. Transform Spaces.</h1>
          <p>
            Customized wallpapers, WPC wall panels and blinds —
            Premium design, supply & expert installation.
          </p>
          <div className="hero__actions">
            <Link to="/services" className="btn btn-brass">Explore Services</Link>
            <a href="tel:+919955197472" className="btn btn-outline hero__btn-outline">Call Now</a>
          </div>
          <div className="hero__stats">
            <div><strong>4</strong><span>Service categories</span></div>
            <div><strong>6000+</strong><span>Curated designs</span></div>
          </div>
        </div>
      </section>

      {/* ---------------- Services grid ---------------- */}
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">What we do</span>
          <h2>Four specialities, one finishing studio</h2>
          <p>Every service below opens into a full catalogue of categories and designs.</p>
        </div>
        <div className="grid grid-2 stagger">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="section why-us">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why Krishna Wallpaper</span>
            <h2>Craft, measured twice</h2>
          </div>
          <div className="grid grid-4 stagger">
            {whyUs.map((item) => (
              <div key={item.title} className="why-us__card glass-panel">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA banner ---------------- */}
      <section className="cta-banner">
        <div className="container cta-banner__inner glass-panel-dark">
          <div>
            <h2>Ready to redesign a room?</h2>
            <p>Share a few photos and measurements — we'll send a tailored quotation.</p>
          </div>
          <Link to="/quotation" className="btn btn-brass">Get Your Quotation</Link>
        </div>
      </section>
    </div>
  );
}