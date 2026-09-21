import { Link } from 'react-router-dom';
import './Breadcrumb.css';

/** items: [{ label: 'Home', to: '/' }, { label: 'Wallpapers' }] — last item has no `to`. */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
           {i < items.length - 1 && <span className="breadcrumb__sep" aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
