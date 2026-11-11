import { useState } from 'react';
import { Briefcase, CheckCircle2, Edit2, LoaderCircle, MapPin, Search, Sparkles, Trash2, XCircle } from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminCareersPage({ careers, loading, onCreate, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(careers.map((c) => c.category).filter(Boolean))];

  const filtered = careers.filter((c) => {
    const matchCat = filterCategory === 'All' || c.category === filterCategory;
    const matchSearch =
      !search.trim() ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section className="admin-table-section">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search positions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="button"
            className="admin-button admin-button--primary text-xs whitespace-nowrap"
            onClick={onCreate}
          >
            <Briefcase size={14} /> Add Position
          </button>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading careers…</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>{search ? 'No matching positions found' : 'No career postings yet'}</strong>
          <p>
            {search
              ? 'Try adjusting your search keywords.'
              : 'Add your first career opening to display available job opportunities on the website.'}
          </p>
          <button className="admin-button admin-button--primary" onClick={onCreate}>
            <Briefcase size={16} /> Post a Job
          </button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Category</th>
                <th>Type & Location</th>
                <th>Required Skills</th>
                <th>Status</th>
                <th>Posted</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div>
                      <strong className="text-slate-900 block font-semibold">{job.title}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{job.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge--admin">{job.category || 'General'}</span>
                  </td>
                  <td>
                    <div className="text-xs text-slate-700">
                      <span className="font-medium text-slate-800">{job.type}</span>
                      <span className="text-slate-400 mx-1">•</span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <MapPin size={11} /> {job.location}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="admin-tags">
                      {(job.skills || []).slice(0, 3).map((skill) => (
                        <span key={skill} className="admin-tag">{skill}</span>
                      ))}
                      {job.skills?.length > 3 && (
                        <span className="admin-tag admin-tag--more">+{job.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        job.active ? 'admin-badge--published' : 'admin-badge--draft'
                      }`}
                    >
                      {job.active ? (
                        <span className="flex items-center gap-1"><CheckCircle2 size={11} /> Active</span>
                      ) : (
                        <span className="flex items-center gap-1"><XCircle size={11} /> Closed</span>
                      )}
                    </span>
                  </td>
                  <td className="admin-table__date">{formatAdminDate(job.createdAt)}</td>
                  <td>
                    <div className="admin-table__actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="admin-icon-button"
                        aria-label="Edit career"
                        title="Edit position"
                        onClick={() => onEdit(job)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-button admin-icon-button--danger"
                        aria-label="Delete career"
                        title="Delete position"
                        onClick={() => onDelete(job)}
                      >
                        <Trash2 size={16} />
                      </button>
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

export default AdminCareersPage;

