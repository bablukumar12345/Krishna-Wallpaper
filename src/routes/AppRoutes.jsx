import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

// Lazy-loaded pages keep the initial bundle small — each route's code
// (and CSS) is fetched only when the user navigates to it.
const Home = lazy(() => import('../pages/Home/Home'));
const Services = lazy(() => import('../pages/Services/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail/ServiceDetail'));
const ProductDetail = lazy(() => import('../pages/ProductDetail/ProductDetail'));
const Quotation = lazy(() => import('../pages/Quotation/Quotation'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
