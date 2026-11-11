import { BriefcaseBusiness, Edit2, LoaderCircle, Sparkles, Trash2 } from 'lucide-react';
import { adminAssetUrl, formatAdminDate } from './adminApi.js';

function AdminPortfolioPage({ projects, loading, onCreate, onEdit, onDelete }) {
  return (
    <section className="admin-table-section">
      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading portfolio…</div>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>No portfolio projects yet</strong>
          <p>Add your first project to showcase your work.</p>
          <button className="admin-button admin-button--primary" onClick={onCreate}><BriefcaseBusiness size={16} /> Add project</button>
        </div>
      ) : (
        <div className="admin-portfolio-grid">
          {projects.map((project) => (
            <article key={project.id} className="admin-portfolio-card">
              {project.imageUrl && (
                <div className="admin-portfolio-card__image">
                  <img src={adminAssetUrl(project.imageUrl)} alt={project.projectName} />
                </div>
              )}
              <div className="admin-portfolio-card__body">
                <h4>{project.projectName}</h4>
                <p>{project.projectDescription?.slice(0, 120)}{project.projectDescription?.length > 120 ? '…' : ''}</p>
                <div className="admin-tags">
                  {(project.projectTechStack || []).slice(0, 4).map((tech) => (
                    <span key={tech} className="admin-tag">{tech}</span>
                  ))}
                  {project.projectTechStack?.length > 4 && <span className="admin-tag admin-tag--more">+{project.projectTechStack.length - 4}</span>}
                </div>
                <div className="admin-portfolio-card__meta">
                  <span>{project.categoryId?.categoryName || 'Uncategorized'}</span>
                  <span>{formatAdminDate(project.createdAt)}</span>
                </div>
              </div>
              <div className="admin-portfolio-card__actions">
                <button className="admin-icon-button" aria-label="Edit project" title="Edit" onClick={() => onEdit(project)}><Edit2 size={16} /></button>
                <button className="admin-icon-button admin-icon-button--danger" aria-label="Delete project" title="Delete" onClick={() => onDelete(project)}><Trash2 size={16} /></button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminPortfolioPage;
