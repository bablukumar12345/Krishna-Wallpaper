/**
 * servicesData.js
 * ----------------------------------------------------------------------
 * Single source of truth for every service, its categories and products.
 * All image paths point into /public/images/... — no external/online
 * images are used anywhere in the app.
 *
 * Each service's data now lives in its own file under src/data/services/
 * (wallpapers.js, customizedWallpapers.js, wpcPanel.js, blinds.js) —
 * those files list every category/product/image path literally. This
 * file just imports and combines them.
 *
 * The buildProducts/buildCategories helpers below are kept as a fallback
 * for any FUTURE service you add that just lists category name strings
 * instead of fully-written-out products (optional, not required).
 * ----------------------------------------------------------------------
 */

import wallpapers from './services/wallpapers';
import customizedWallpapers from './services/customizedWallpapers';
import wpcPanel from './services/wpcPanel';
import blinds from './services/blinds';

/** Build an array of product objects for one category (fallback helper). */
function buildProducts(serviceSlug, categorySlug, categoryName, count) {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const id = `${serviceSlug}-${categorySlug}-${i}`;
    const folder = `/images/services/${serviceSlug}/${categorySlug}`;
    products.push({
      id,
      name: `${categoryName} Design ${i}`,
      price: null,
      category: categorySlug,
      categoryName,
      service: serviceSlug,
      image: `${folder}/${categorySlug}-${i}.webp`,
      thumbnails: [
        `${folder}/${categorySlug}-${i}.webp`,
        `${folder}/${categorySlug}-${i}-alt1.webp`,
        `${folder}/${categorySlug}-${i}-alt2.webp`,
        `${folder}/${categorySlug}-${i}-alt3.webp`,
      ],
      description:
        `A premium ${categoryName.toLowerCase()} finish from our ${categorySlug.replace(/-/g, ' ')} ` +
        `collection, installed and finished by the Krishna Wallpaper team. Contact us for exact ` +
        `dimensions, material samples and an on-site quotation.`,
    });
  }
  return products;
}

/** Build the category list for a service from a simple name map (fallback helper). */
function buildCategories(serviceSlug, categoryNames, perCategory = 25) {
  return categoryNames.map((categoryName) => {
    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      slug: categorySlug,
      name: categoryName,
      products: buildProducts(serviceSlug, categorySlug, categoryName, perCategory),
    };
  });
}

const rawServices = [wallpapers, customizedWallpapers, blinds, wpcPanel];

export const services = rawServices.map((service) => {
  // Some services (e.g. all 5 currently) already ship fully-built
  // category/product objects written out literally. A future service
  // could instead just list plain category name strings and get its
  // products generated automatically here.
  const categoriesAlreadyBuilt =
    Array.isArray(service.categories) &&
    typeof service.categories[0] === 'object';

  return {
    ...service,
    categories: categoriesAlreadyBuilt
      ? service.categories
      : buildCategories(service.slug, service.categories, 25),
  };
});

/** Flat list of every product across every service — used for search & lookups. */
export const allProducts = services.flatMap((service) =>
  service.categories.flatMap((category) => category.products)
);

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}

export function getCategory(serviceSlug, categorySlug) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return null;
  return service.categories.find((c) => c.slug === categorySlug) || null;
}

export function getProductById(productId) {
  return allProducts.find((p) => p.id === productId) || null;
}

export default services;