import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card glass-panel"
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="product-card__image" />
      </div>
      <div className="product-card__body">
        <h4>{product.name}</h4>
        <p>{product.categoryName}</p>
        <span className="btn btn-outline btn-block product-card__btn">
          View Details
        </span>
      </div>
    </Link>
  );
}
