import { Edit2, LoaderCircle, Newspaper, Sparkles, Trash2 } from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminBlogsPage({ blogs, loading, onCreate, onEdit, onDelete }) {
  return (
    <section className="admin-table-section">
      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading blogs…</div>
      ) : blogs.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>No blog posts yet</strong>
          <p>Create your first blog post to start sharing insights with your audience.</p>
          <button className="admin-button admin-button--primary" onClick={onCreate}><Newspaper size={16} /> Write a blog post</button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className="admin-table__title-cell">
                      {blog.imageUrl && <img src={blog.imageUrl} alt="" className="admin-table__thumb" />}
                      <strong>{blog.title}</strong>
                    </div>
                  </td>
                  <td>{blog.author}</td>
                  <td>
                    <div className="admin-tags">
                      {(blog.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="admin-tag">{tag}</span>
                      ))}
                      {blog.tags?.length > 3 && <span className="admin-tag admin-tag--more">+{blog.tags.length - 3}</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${blog.published ? 'admin-badge--published' : 'admin-badge--draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="admin-table__date">{formatAdminDate(blog.createdAt)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-icon-button" aria-label="Edit blog" title="Edit" onClick={() => onEdit(blog)}><Edit2 size={16} /></button>
                      <button className="admin-icon-button admin-icon-button--danger" aria-label="Delete blog" title="Delete" onClick={() => onDelete(blog)}><Trash2 size={16} /></button>
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

export default AdminBlogsPage;

