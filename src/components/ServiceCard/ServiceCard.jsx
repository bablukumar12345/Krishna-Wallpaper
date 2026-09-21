import { Link } from 'react-router-dom';
import './ServiceCard.css';

export default function ServiceCard({ service }) {
  const productCount = service.categories.reduce((sum, c) => sum + c.products.length, 0);

  return (
    <Link to={`/services/${service.slug}`} className="service-card glass-panel">
      <div className="service-card__image-wrap">
        <img
          src={service.thumbnail}
          alt={service.name}
          loading="lazy"
          className="service-card__image"
        />
        <span className="service-card__count">{productCount}+ designs</span>
      </div>
      <div className="service-card__body">
        <h3>{service.name}</h3>
        <p>{service.tagline}</p>
        <span className="service-card__cta">Explore collection →</span>
      </div>
    </Link>
  );
}
