import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCart();

  return (
    <div className="page-enter cart-page">
      <SEO title="Your Cart" description="Review the products you're interested in and request a quotation from Krishna Wallpaper." />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

        <div className="section-heading cart-page__heading">
          <span className="eyebrow">Your Selections</span>
          <h1>Cart</h1>
          <p>Add every design you're considering, then request one combined quotation.</p>
        </div>

        {items.length === 0 ? (
          <div className="cart-page__empty glass-panel">
            <img src="/images/placeholders/empty-cart.svg" alt="" width="120" height="120" />
            <h3>Your cart is empty</h3>
            <p>Browse our services and add designs you love.</p>
            <Link to="/services" className="btn btn-brass">Browse Services</Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items">
              {items.map((item) => (
                <div key={item.id} className="cart-item glass-panel">
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <p>{item.categoryName}</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                    Remove
                  </button>
                </div>
              ))}
              <button className="cart-page__clear" onClick={clearCart}>Clear cart</button>
            </div>

            <aside className="cart-page__summary glass-panel">
              <h3>Summary</h3>
              <p className="cart-page__summary-count">{items.length} product{items.length > 1 ? 's' : ''} selected</p>
              <p className="cart-page__summary-note">
                Pricing is confirmed after an on-site or photo-based assessment.
                Submit these products for a personalised quotation.
              </p>
              <Link to="/quotation" className="btn btn-brass btn-block">Get Quotation</Link>
              <Link to="/services" className="btn btn-outline btn-block cart-page__continue">Continue Browsing</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
