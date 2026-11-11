import { useEffect, useRef, useState } from 'react';
import { Boxes, Check, ImagePlus, LoaderCircle, Newspaper, Plus, Trash2, Users, X } from 'lucide-react';
import { adminAssetUrl } from './adminApi.js';

const suggestedTechnologies = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Spring Boot',
  'Java', 'Python', 'Tailwind CSS', 'Figma', 'WordPress', 'Shopify',
  'PostgreSQL', 'MySQL', 'MongoDB', 'AWS',
];

function AdminRecordDialog({ modal, deleteTarget, categories = [], busy, error, onSave, onDelete, onClose }) {
  const dialogRef = useRef(null);
  const previewObjectUrl = useRef('');
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    () => modal?.type === 'portfolio' ? modal.record?.projectTechStack ?? [] : [],
  );
  const [customTechnology, setCustomTechnology] = useState('');
  const [previewUrl, setPreviewUrl] = useState(
    () => {
      if (modal?.type === 'portfolio' && modal.record?.imageUrl) return adminAssetUrl(modal.record.imageUrl);
      if (modal?.type === 'blog' && modal.record?.imageUrl) return adminAssetUrl(modal.record.imageUrl);
      return '';
    },
  );

  useEffect(() => () => {
    if (previewObjectUrl.current) URL.revokeObjectURL(previewObjectUrl.current);
    previewObjectUrl.current = '';
  }, []);

  useEffect(() => {
    if (!modal && !deleteTarget) return undefined;
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !busy) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [busy, deleteTarget, modal, onClose]);

  if (!modal && !deleteTarget) return null;

  const handleImageChange = (event) => {
    if (previewObjectUrl.current) URL.revokeObjectURL(previewObjectUrl.current);
    const file = event.target.files?.[0];
    previewObjectUrl.current = file ? URL.createObjectURL(file) : '';
    const fallback = modal?.record?.imageUrl ? adminAssetUrl(modal.record.imageUrl) : '';
    setPreviewUrl(file ? previewObjectUrl.current : fallback);
  };

  const getModalTitle = () => {
    if (!modal) return '';
    const prefix = modal.record ? 'Edit' : 'Create';
    const typeNames = {
      user: 'User',
      portfolio: 'Portfolio Project',
      blog: 'Blog Post',
      category: 'Category',
      career: 'Career Position',
    };
    return `${prefix} ${typeNames[modal.type] || modal.type}`;
  };

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      {modal && (
        <form
          ref={dialogRef}
          tabIndex="-1"
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
          onSubmit={onSave}
        >
          <div className="admin-modal__header">
            <h2 id="admin-modal-title">{getModalTitle()}</h2>
            <button className="admin-icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
          </div>

          {/* ----- USER FORM ----- */}
          {modal.type === 'user' && (
            <>
              <label className="admin-field"><span>Full name</span><input name="name" defaultValue={modal.record?.name ?? ''} maxLength="120" placeholder="Jane Doe" required /></label>
              <label className="admin-field"><span>Email address</span><input name="email" type="email" defaultValue={modal.record?.email ?? ''} placeholder="jane@company.com" required /></label>
              <label className="admin-field"><span>Password {modal.record ? '(leave blank to keep)' : ''}</span><input name="password" type="password" minLength={modal.record ? undefined : 8} maxLength="72" placeholder={modal.record ? 'Leave blank to keep current' : 'At least 8 characters'} required={!modal.record} /></label>
              <label className="admin-field">
                <span>Role</span>
                <select name="role" defaultValue={modal.record?.role ?? 'USER'}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </label>
            </>
          )}

          {/* ----- PORTFOLIO FORM ----- */}
          {modal.type === 'portfolio' && (
            <>
              <label className="admin-field"><span>Project name</span><input name="projectName" defaultValue={modal.record?.projectName ?? ''} maxLength="200" placeholder="e.g. E-commerce platform" required /></label>
              <label className="admin-field"><span>Description</span><textarea name="projectDescription" defaultValue={modal.record?.projectDescription ?? ''} maxLength="3000" rows="3" placeholder="A brief description of the project…" required /></label>
              <label className="admin-field">
                <span>Category</span>
                <select name="categoryId" defaultValue={modal.record?.categoryId?._id || modal.record?.categoryId || (categories[0]?.id || '')} required>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                  ))}
                </select>
              </label>
              <div className="admin-field">
                <span>Technologies</span>
                <div className="admin-tech-grid">
                  {suggestedTechnologies.map((tech) => {
                    const active = selectedTechnologies.includes(tech);
                    return (
                      <button
                        key={tech} type="button"
                        className={`admin-tech-chip ${active ? 'admin-tech-chip--active' : ''}`}
                        onClick={() => setSelectedTechnologies((curr) => active ? curr.filter((t) => t !== tech) : [...curr, tech])}
                      >{active && <Check size={13} />}{tech}</button>
                    );
                  })}
                </div>
                {selectedTechnologies.map((t) => <input key={t} type="hidden" name="projectTechStack" value={t} />)}
                <div className="admin-tech-custom">
                  <input value={customTechnology} maxLength="80" placeholder="Add another technology" onChange={(e) => setCustomTechnology(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const v = customTechnology.trim(); if (v && !selectedTechnologies.includes(v)) setSelectedTechnologies((c) => [...c, v]); setCustomTechnology(''); } }} />
                  <button type="button" aria-label="Add technology" onClick={() => { const v = customTechnology.trim(); if (v && !selectedTechnologies.includes(v)) setSelectedTechnologies((c) => [...c, v]); setCustomTechnology(''); }}><Plus size={16} /></button>
                </div>
                {selectedTechnologies.length === 0 && <small className="admin-field-hint">Choose at least one technology.</small>}
              </div>
              <label className="admin-field"><span>Project image <small>PNG, JPEG, or WebP, up to 5 MB</small></span><input className="admin-image-input" type="file" name="image" accept="image/png,image/jpeg,image/webp" required={!modal.record} onChange={handleImageChange} /></label>
              {previewUrl && <div className="admin-image-preview"><img src={previewUrl} alt="Project image preview" /><span><ImagePlus size={14} /> Image preview</span></div>}
            </>
          )}

          {/* ----- BLOG FORM ----- */}
          {modal.type === 'blog' && (
            <>
              <label className="admin-field"><span>Title</span><input name="title" defaultValue={modal.record?.title ?? ''} maxLength="300" placeholder="Blog post title" required /></label>
              <label className="admin-field"><span>Author</span><input name="author" defaultValue={modal.record?.author ?? ''} maxLength="120" placeholder="Author name" required /></label>
              <label className="admin-field"><span>Content</span><textarea name="content" defaultValue={modal.record?.content ?? ''} rows="6" placeholder="Write your blog post content here…" required /></label>
              <label className="admin-field"><span>Tags <small>comma-separated</small></span><input name="tags" defaultValue={(modal.record?.tags || []).join(', ')} maxLength="500" placeholder="e.g. React, Web Development, Tutorial" /></label>
              <label className="admin-field">
                <span>Status</span>
                <select name="published" defaultValue={modal.record?.published !== false ? 'true' : 'false'}>
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </label>
              <label className="admin-field"><span>Cover image <small>PNG, JPEG, or WebP, up to 5 MB</small></span><input className="admin-image-input" type="file" name="image" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} /></label>
              {previewUrl && <div className="admin-image-preview"><img src={previewUrl} alt="Blog image preview" /><span><ImagePlus size={14} /> Image preview</span></div>}
            </>
          )}

          {/* ----- CAREER FORM ----- */}
          {modal.type === 'career' && (
            <>
              <label className="admin-field">
                <span>Position Title</span>
                <input name="title" defaultValue={modal.record?.title ?? ''} maxLength="150" placeholder="e.g. Senior Frontend Developer" required />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="admin-field">
                  <span>Category</span>
                  <select name="category" defaultValue={modal.record?.category ?? 'Development'}>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Cloud">Cloud & Infrastructure</option>
                    <option value="Sales">Sales & BD</option>
                    <option value="Management">Management</option>
                  </select>
                </label>
                <label className="admin-field">
                  <span>Employment Type</span>
                  <select name="type" defaultValue={modal.record?.type ?? 'Full Time'}>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level</option>
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="admin-field">
                  <span>Work Location</span>
                  <input name="location" defaultValue={modal.record?.location ?? 'Hybrid / Remote'} maxLength="80" placeholder="e.g. Remote, Hybrid, or On-site" required />
                </label>
                <label className="admin-field">
                  <span>Status</span>
                  <select name="active" defaultValue={modal.record?.active !== false ? 'true' : 'false'}>
                    <option value="true">Active (Accepting Applications)</option>
                    <option value="false">Closed (Hidden from Public)</option>
                  </select>
                </label>
              </div>
              <label className="admin-field">
                <span>Description & Responsibilities</span>
                <textarea name="description" defaultValue={modal.record?.description ?? ''} maxLength="3000" rows="4" placeholder="Overview of the role, expectations, and day-to-day responsibilities…" required />
              </label>
              <label className="admin-field">
                <span>Required Skills <small>comma-separated</small></span>
                <input name="skills" defaultValue={(modal.record?.skills || []).join(', ')} maxLength="500" placeholder="e.g. React, TypeScript, Tailwind CSS, Git" />
              </label>
            </>
          )}

          {/* ----- CATEGORY FORM ----- */}
          {modal.type === 'category' && (
            <>
              <label className="admin-field"><span>Category name</span><input name="categoryName" defaultValue={modal.record?.categoryName ?? ''} maxLength="150" placeholder="e.g. Web development" required /></label>
              <label className="admin-field"><span>Description</span><textarea name="description" defaultValue={modal.record?.description ?? ''} maxLength="2000" rows="4" placeholder="A short description of this category…" required /></label>
            </>
          )}

          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          <div className="admin-modal__actions">
            <button type="button" className="admin-button admin-button--secondary" onClick={onClose} disabled={busy}>Cancel</button>
            <button
              type="submit"
              className="admin-button admin-button--primary"
              disabled={busy || (modal.type === 'portfolio' && selectedTechnologies.length === 0)}
            >
              {busy ? <LoaderCircle className="admin-spin" size={17} /> : <Check size={16} />}
              {modal.record ? 'Save changes' : 'Create record'}
            </button>
          </div>
        </form>
      )}

      {deleteTarget && (
        <div ref={dialogRef} tabIndex="-1" className="admin-modal admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
          <span className="admin-confirm-modal__icon"><Trash2 size={20} /></span>
          <button className="admin-icon-button admin-confirm-modal__close" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
          <h2 id="admin-delete-title">Delete {deleteTarget.type}?</h2>
          <p>
            This will permanently remove{' '}
            <strong>
              {deleteTarget.record.name ||
                deleteTarget.record.categoryName ||
                deleteTarget.record.projectName ||
                deleteTarget.record.title ||
                'this record'}
            </strong>
            . This action cannot be undone.
          </p>
          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          <div className="admin-modal__actions">
            <button className="admin-button admin-button--secondary" onClick={onClose} disabled={busy}>Keep it</button>
            <button className="admin-button admin-button--delete" onClick={onDelete} disabled={busy}>
              {busy ? <LoaderCircle className="admin-spin" size={17} /> : <Trash2 size={16} />} Delete {deleteTarget.type}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRecordDialog;
