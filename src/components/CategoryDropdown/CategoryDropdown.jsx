import './CategoryDropdown.css';

export default function CategoryDropdown({ categories, activeCategory, onChange }) {
  const visibleCategories = categories.slice(0, 4);

  return (
    <div className="category-dropdown">
      <label>Browse by category</label>

      <div className="category-dropdown__cards">
        {visibleCategories.map((cat) => {
          const cardImage = cat.categoryImage;
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              className={`category-dropdown__card ${isActive ? 'is-active' : ''}`}
              onClick={() => onChange(cat.slug)}
              aria-pressed={isActive}
            >
              <span className="category-dropdown__card-image">
                {cardImage && <img src={cardImage} alt={cat.name} loading="lazy" />}
              </span>
              <span className="category-dropdown__card-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
