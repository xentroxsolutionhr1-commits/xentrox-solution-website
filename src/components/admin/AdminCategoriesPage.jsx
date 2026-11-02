import { useMemo, useState } from 'react';
import { BookOpen, Boxes, Ellipsis, LoaderCircle, Plus, Search, Trash2 } from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminCategoriesPage({ categories, loading, onCreate, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((category) => `${category.categoryName} ${category.description}`.toLowerCase().includes(query));
  }, [categories, search]);

  return (
    <section className="admin-categories">
      <div className="admin-category-intro">
        <span className="admin-category-intro__icon"><Boxes size={20} /></span>
        <div><strong>Your workspace, thoughtfully organized.</strong><p>Categories help keep your programs and services easy to discover.</p></div>
        <span className="admin-category-intro__total"><strong>{categories.length}</strong> total</span>
      </div>
      <label className="admin-search admin-category-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories…" /></label>
      {loading ? <div className="admin-panel admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading categories…</div> : filteredCategories.length === 0 ? (
        <div className="admin-panel admin-empty"><span><Boxes size={22} /></span><strong>{categories.length ? 'No matching categories' : 'No categories yet'}</strong><p>{categories.length ? 'Try adjusting your search.' : 'Create your first category to organize your workspace.'}</p>{!categories.length && <button className="admin-button admin-button--primary" onClick={onCreate}><Plus size={16} /> Create a category</button>}</div>
      ) : (
        <div className="admin-category-grid">{filteredCategories.map((category, index) => (
          <article className="admin-category-card" key={category.id}>
            <div className="admin-category-card__top"><span className={`admin-category-card__icon admin-category-card__icon--${index % 4}`}><BookOpen size={19} /></span><div className="admin-row-actions"><button className="admin-icon-button" aria-label={`Edit ${category.categoryName}`} onClick={() => onEdit(category)}><Ellipsis size={18} /></button><button className="admin-icon-button admin-icon-button--danger" aria-label={`Delete ${category.categoryName}`} onClick={() => onDelete(category)}><Trash2 size={15} /></button></div></div>
            <h3>{category.categoryName}</h3><p>{category.description}</p>
            <div className="admin-category-card__footer"><span><span className="admin-live-dot" /> Active</span><span>Added {formatAdminDate(category.createdAt)}</span></div>
          </article>
        ))}</div>
      )}
    </section>
  );
}

export default AdminCategoriesPage;
