import { Boxes, Edit2, LoaderCircle, Sparkles, Trash2 } from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminCategoriesPage({ categories, loading, onCreate, onEdit, onDelete }) {
  return (
    <section className="admin-table-section">
      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading categories…</div>
      ) : categories.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>No categories yet</strong>
          <p>Create your first category to organize your workspace.</p>
          <button className="admin-button admin-button--primary" onClick={onCreate}><Boxes size={16} /> Add category</button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td><strong>{cat.categoryName}</strong></td>
                  <td className="admin-table__desc-cell"><span>{cat.description}</span></td>
                  <td className="admin-table__date">{formatAdminDate(cat.createdAt)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-icon-button" aria-label="Edit category" title="Edit" onClick={() => onEdit(cat)}><Edit2 size={16} /></button>
                      <button className="admin-icon-button admin-icon-button--danger" aria-label="Delete category" title="Delete" onClick={() => onDelete(cat)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminCategoriesPage;
