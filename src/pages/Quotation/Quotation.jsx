import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { submitQuotation } from '../../utils/googleSheets';
import './Quotation.css';

const WHATSAPP_NUMBER = '919955197472'; // 9955197472 with India country code
const initialForm = { name: '', phone: '', address: '', message: '' };

export default function Quotation() {
  const location = useLocation();
  // Present only when this page was opened via a product's "Get Quotation"
  // button (ProductDetail.jsx passes it through navigate state).
  const product = location.state?.product || null;

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) next.phone = 'Please enter a valid phone number.';
    if (!form.address.trim()) next.address = 'Please enter your address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Builds the WhatsApp message as a clean list — name, phone, address,
  // message — plus the product being asked about, when there is one.
  function buildWhatsAppMessage(data) {
    const lines = [
      'New Quotation Request',
      '',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Address: ${data.address}`,
      `Message: ${data.message || '—'}`,
    ];
    if (product) {
      lines.push('', `Product: ${product.name}`, `Product Link: ${product.url}`);
    }
    return lines.join('\n');
  }

  function openWhatsAppWithRequest(data) {
    const text = encodeURIComponent(buildWhatsAppMessage(data));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: 'loading', message: '' });
    const result = await submitQuotation(product ? { ...form, product: product.name, productUrl: product.url } : form);

    // Every valid submission also opens WhatsApp with the same details
    // pre-filled, so the request reaches us instantly either way.
    openWhatsAppWithRequest(form);

    if (result.ok) {
      setStatus({ state: 'success', message: result.message });
      setForm(initialForm);
    } else {
      setStatus({ state: 'error', message: result.message });
    }
  };

  return (
    <div className="page-enter quotation-page">
      <SEO title="Get a Quotation" description="Request a personalised quotation for your Krishna Wallpaper project — wallpapers, panels, blinds, curtains or flooring." />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Get Quotation' }]} />

        <div className="quotation-page__layout">
          {/* ---------------- Form ---------------- */}
          <div className="quotation-page__form-wrap glass-panel">
            <span className="eyebrow">Request a Quote</span>
            <h1>Tell us about your space</h1>
            <p className="quotation-page__intro">
              Share your details and we'll get back within 24 hours with pricing
              and next steps. You can also call or WhatsApp us directly.
            </p>

            {status.state === 'success' ? (
              <div className="quotation-page__success">
                <h3>Thank you!</h3>
                <p>{status.message}</p>
                <Link to="/" className="btn btn-brass">Back to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {product && (
                  <div className="quotation-page__product-context glass-panel">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div>
                      <span className="quotation-page__product-context-label">Regarding this design</span>
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name" name="name" type="text" value={form.name}
                    onChange={handleChange} placeholder="Your name" required
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone" name="phone" type="tel" value={form.phone}
                    onChange={handleChange} placeholder="+91 XXXXX XXXXX" required
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address" name="address" type="text" value={form.address}
                    onChange={handleChange} placeholder="Flat / house no., area, city"
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message" rows="4" value={form.message}
                    onChange={handleChange} placeholder="Room size, preferred colours, timeline…"
                  />
                </div>

                {status.state === 'error' && <p className="form-error form-error--banner">{status.message}</p>}

                <button type="submit" className="btn btn-brass btn-block" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? 'Sending…' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>

          {/* ---------------- Direct contact ---------------- */}
          <aside className="quotation-page__side-panel glass-panel">
            <h3>Need help right away?</h3>
            <p className="quotation-page__empty-note">
              Browse our <Link to="/services">catalogue</Link> for design ideas, then fill in
              the form with your requirements — or reach out to us directly.
            </p>
            <div className="quotation-page__direct">
              <p>Prefer to talk now?</p>
              <a href="tel:+919955197472" className="btn btn-outline btn-block">Call +91 99551 97472</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
