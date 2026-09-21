import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getServiceBySlug } from '../../data/servicesData';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const service = getServiceBySlug(serviceSlug);

  const initialCategory = searchParams.get('category') || service?.categories[0]?.slug;
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setSearchParams({ category: activeCategory }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const category = useMemo(
    () => service?.categories.find((c) => c.slug === activeCategory) || service?.categories[0],
    [service, activeCategory]
  );

  if (!service) return <Navigate to="/services" replace />;

  // WPC Panel: no "Browse by Category" picker — just the first 16 designs
  // pooled across all its categories, shown directly.
  const isWpcPanel = service.slug === 'wpc-panel';
  const wpcProducts = isWpcPanel
    ? service.categories.flatMap((c) => c.products).slice(0, 16)
    : [];

  return (
    <div className="page-enter service-detail">
      <SEO
        title={service.name}
        description={
          isWpcPanel
            ? `${service.tagline} Browse ${wpcProducts.length}+ designs.`
            : `${service.tagline} Browse ${service.categories.length} categories and ${category.products.length}+ designs in ${category.name}.`
        }
      />

      {/* ---------------- Banner ---------------- */}
      <section className="service-detail__banner">
        <img src={service.banner} alt={service.name} className="service-detail__banner-img" />
        <div className="service-detail__banner-scrim"></div>
        <div className="container service-detail__banner-content">
          <h1>{service.name}</h1>
          <p>{service.tagline}</p>
        </div>
      </section>

      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: service.name },
          ]}
        />

        {!isWpcPanel && (
          <CategoryDropdown
            categories={service.categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        <div className="service-detail__meta">
          <h2>{isWpcPanel ? service.name : category.name}</h2>
        </div>

        <div className="grid grid-4 stagger service-detail__grid">
          {(isWpcPanel ? wpcProducts : category.products).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="service-detail__quote-cta glass-panel">
          <div>
            <h3>Can't decide? Talk to a designer.</h3>
            <p>Share your favourites with us and request a personalised quotation.</p>
          </div>
          <Link to="/quotation" className="btn btn-brass">Get Quotation</Link>
        </div>
      </div>
    </div>
  );
}
