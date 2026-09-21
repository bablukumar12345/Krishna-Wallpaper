import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { services } from '../../data/servicesData';
import './Services.css';

export default function Services() {
  return (
    <div className="page-enter services-page">
      <SEO
        title="All Services"
        description="Browse every Krishna Wallpaper service — wallpapers, PVC panels, zebra blinds, curtains and flooring."
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
        <div className="section-heading services-page__heading">
          <span className="eyebrow">Our Catalogue</span>
          <h1>All Services</h1>
          <p>Pick a service to browse categories and hundreds of ready-to-quote designs.</p>
        </div>
        <div className="grid grid-2 stagger">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
