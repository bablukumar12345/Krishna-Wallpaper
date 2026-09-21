import { useEffect, useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductCard from '../../components/ProductCard/ProductCard';
import Lightbox from '../../components/Lightbox/Lightbox';
import { getProductById, getServiceBySlug } from '../../data/servicesData';
import './ProductDetail.css';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    setActiveImage(product?.image);
  }, [product]);

  if (!product) return <Navigate to="/services" replace />;

  const service = getServiceBySlug(product.service);
  const category = service?.categories.find((c) => c.slug === product.category);
  const related = category?.products.filter((p) => p.id !== product.id).slice(0, 4) || [];

  const handleGetQuotation = () => {
    navigate('/quotation', {
      state: {
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          url: `${window.location.origin}/product/${product.id}`,
        },
      },
    });
  };

  return (
    <div className="page-enter product-detail">
      <SEO
        title={product.name}
        description={product.description}
        image={product.image}
      />
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: service?.name || 'Services', to: `/services/${product.service}` },
            { label: category?.name || product.categoryName, to: `/services/${product.service}?category=${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="product-detail__layout">
          {/* ---------------- Gallery ---------------- */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image glass-panel">
              <img src={activeImage} alt={product.name} />
            </div>
            <div className="product-detail__thumbs">
              {product.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  className={`product-detail__thumb ${activeImage === thumb ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(thumb)}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                >
                  <img src={thumb} alt="" loading="lazy" />
                </button>
              ))}
            </div>

            {product.service === 'customized-wallpapers' && (
              <div className="product-detail__gallery-heading">
                <span className="eyebrow">{service?.name}</span>
                <h1>{product.name}</h1>
                <p className="product-detail__category">{category?.name} collection</p>
                <p className="product-detail__gallery-desc">{product.description}</p>
              </div>
            )}
          </div>

          {/* ---------------- Info ---------------- */}
          <div className="product-detail__info">
            {product.service !== 'customized-wallpapers' && (
              <>
                <span className="eyebrow">{service?.name}</span>
                <h1>{product.name}</h1>
                <p className="product-detail__category">{category?.name} collection</p>
                <p className="product-detail__desc">{product.description}</p>
              </>
            )}

            <div className="product-detail__actions">
              <button className="btn btn-brass btn-block" onClick={handleGetQuotation}>
                Get Quotation
              </button>
            </div>

            <div className="product-detail__note glass-panel">
              <strong>Pricing on request.</strong>
              <p>Prices depend on room size, material and finish. Request a quotation and our team replies within 24 hours.</p>
            </div>

            <Link to={`/services/${product.service}?category=${product.category}`} className="product-detail__back">
              ← Back to {category?.name}
            </Link>
          </div>
        </div>

        {/* ---------------- Related ---------------- */}
        {related.length > 0 && (
          <section className="product-detail__related">
            <div className="section-heading">
              <span className="eyebrow">You may also like</span>
              <h2>More from {category?.name}</h2>
            </div>
            <div className="grid grid-4 stagger">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt="Paper quality close-up"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}