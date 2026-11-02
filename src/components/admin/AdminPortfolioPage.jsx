import { useMemo, useState } from 'react';
import { BriefcaseBusiness, Ellipsis, Image, LoaderCircle, Plus, Search, Trash2 } from 'lucide-react';
import { adminAssetUrl, formatAdminDate } from './adminApi.js';

function AdminPortfolioPage({ projects, loading, onCreate, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) => [
      project.projectName,
      project.projectDescription,
      project.category,
      ...(project.projectTechStack ?? []),
    ].join(' ').toLowerCase().includes(query));
  }, [projects, search]);

  return (
    <section className="admin-portfolio">
      <div className="admin-category-intro">
        <span className="admin-category-intro__icon"><BriefcaseBusiness size={20} /></span>
        <div><strong>Showcase the work you’re proud of.</strong><p>Manage project details, imagery, technology, and categories.</p></div>
        <span className="admin-category-intro__total"><strong>{projects.length}</strong> projects</span>
      </div>
      <label className="admin-search admin-category-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects, technologies, or categories…" /></label>
      {loading ? <div className="admin-panel admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading portfolio…</div> : filteredProjects.length === 0 ? (
        <div className="admin-panel admin-empty"><span><BriefcaseBusiness size={22} /></span><strong>{projects.length ? 'No matching projects' : 'Your portfolio is ready for its first project'}</strong><p>{projects.length ? 'Try adjusting your search.' : 'Add a project to start building your showcase.'}</p>{!projects.length && <button className="admin-button admin-button--primary" onClick={onCreate}><Plus size={16} /> Add a project</button>}</div>
      ) : (
        <div className="admin-project-grid">{filteredProjects.map((project) => (
          <article className="admin-project-card" key={project.id}>
            <div className="admin-project-card__image">
              {project.imageUrl
                ? <img src={adminAssetUrl(project.imageUrl)} alt={project.projectName} loading="lazy" />
                : <span><Image size={26} /></span>}
              <span className="admin-project-card__category">{project.category}</span>
            </div>
            <div className="admin-project-card__body">
              <div className="admin-project-card__heading">
                <div><h3>{project.projectName}</h3><span>Added {formatAdminDate(project.createdAt)}</span></div>
                <div className="admin-row-actions">
                  <button className="admin-icon-button" aria-label={`Edit ${project.projectName}`} onClick={() => onEdit(project)}><Ellipsis size={18} /></button>
                  <button className="admin-icon-button admin-icon-button--danger" aria-label={`Delete ${project.projectName}`} onClick={() => onDelete(project)}><Trash2 size={15} /></button>
                </div>
              </div>
              <p>{project.projectDescription}</p>
              <div className="admin-project-card__technologies">
                {(project.projectTechStack ?? []).map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>
          </article>
        ))}</div>
      )}
    </section>
  );
}

export default AdminPortfolioPage;
