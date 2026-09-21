import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="page-enter not-found">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1>This room isn't decorated yet.</h1>
        <p>The page you're looking for may have moved. Let's get you back home.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/services" className="btn btn-outline">Browse Services</Link>
        </div>
      </div>
    </div>
  );
}
