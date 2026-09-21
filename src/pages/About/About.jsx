import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './About.css';

const milestones = [
  { year: '2016', text: 'Started as a wallpaper supply business serving Noida apartments.' },
  { year: '2019', text: 'Expanded into PVC panelling, blinds and curtain tailoring.' },
  { year: '2022', text: 'Added flooring, becoming a full finishing studio.' },
  { year: 'Today', text: 'Serving homes and offices across Noida, Greater Noida and NCR.' },
];

export default function About() {
  return (
    <div className="page-enter about-page">
      <SEO title="About Us" description="Learn about Krishna Wallpaper — a finishing studio for wallpapers, panelling, blinds, curtains and flooring across Noida & NCR." />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

        <section className="about-hero">
          <div className="about-hero__text">
            <span className="eyebrow">Our Story</span>
            <h1>A finishing studio built around your home, not a catalogue.</h1>
            <p>
              Krishna Wallpaper started with a simple idea: the last 10% of any
              renovation — the walls, windows and floors — is what people
              actually live with every day. We focus entirely on that layer,
              so it gets the attention it deserves.
            </p>
          </div>
          <div className="about-hero__image">
            <img src="/images/about/a.webp" alt="Krishna Wallpaper showroom" />
          </div>
        </section>

        <section className="about-timeline section">
          <div className="section-heading">
            <span className="eyebrow">Milestones</span>
            <h2>How we got here</h2>
          </div>
          <div className="about-timeline__list stagger">
            {milestones.map((m) => (
              <div key={m.year} className="about-timeline__item glass-panel">
                <span className="about-timeline__year">{m.year}</span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-values section">
          <div className="grid grid-3 stagger">
            <div className="about-values__card glass-panel">
              <h3>Craft</h3>
              <p>Every install is measured, cut and finished by trained crews — not outsourced day labour.</p>
            </div>
            <div className="about-values__card glass-panel">
              <h3>Clarity</h3>
              <p>One quotation, one timeline, no surprise line items once work begins.</p>
            </div>
            <div className="about-values__card glass-panel">
              <h3>Care</h3>
              <p>We treat your home like a client relationship that should last well beyond the install date.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
