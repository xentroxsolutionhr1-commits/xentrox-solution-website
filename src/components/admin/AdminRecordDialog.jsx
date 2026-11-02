import { useEffect, useRef, useState } from 'react';
import { Boxes, Check, ImagePlus, LoaderCircle, Plus, Trash2, Users, X } from 'lucide-react';
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
    () => modal?.type === 'portfolio' && modal.record?.imageUrl ? adminAssetUrl(modal.record.imageUrl) : '',
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

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      {modal && (
        <form ref={dialogRef} tabIndex="-1" className="admin-modal" onSubmit={onSave}>
          <div className="admin-modal__header"><span className="admin-modal__icon">{modal.type === 'user' ? <Users size={19} /> : <Boxes size={19} />}</span><button type="button" className="admin-icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button></div>
          <span className="admin-eyebrow admin-eyebrow--dark">{modal.record ? 'EDIT DETAILS' : 'NEW ADDITION'}</span>
          <h2>{modal.record ? 'Edit' : 'Add'} {modal.type === 'user' ? 'team member' : modal.type === 'portfolio' ? 'portfolio project' : 'category'}</h2>
          <p className="admin-modal__description">{modal.type === 'user' ? 'Set up workspace access and permissions.' : modal.type === 'portfolio' ? 'Add project details, a cover image, and its technology stack.' : 'Add a category to organize your workspace.'}</p>
          {modal.type === 'user' ? (
            <>
              <label className="admin-field"><span>Full name</span><input name="name" defaultValue={modal.record?.name ?? ''} maxLength="120" placeholder="e.g. Alex Morgan" required /></label>
              <label className="admin-field"><span>Email address</span><input name="email" type="email" defaultValue={modal.record?.email ?? ''} maxLength="254" placeholder="alex@company.com" required /></label>
              <label className="admin-field"><span>Password {modal.record && <small>(leave blank to keep current)</small>}</span><input name="password" type="password" minLength="8" maxLength="72" autoComplete="new-password" placeholder={modal.record ? 'No change' : 'At least 8 characters'} required={!modal.record} /></label>
              <label className="admin-field"><span>Role</span><select name="role" defaultValue={modal.record?.role ?? 'USER'} required><option value="USER">User</option><option value="ADMIN">Admin</option><option value="SUPER_ADMIN">Super admin</option></select></label>
            </>
          ) : modal.type === 'portfolio' ? (
            <>
              <label className="admin-field"><span>Project name</span><input name="projectName" defaultValue={modal.record?.projectName ?? ''} maxLength="180" placeholder="e.g. GreenRoots Organics" required /></label>
              <label className="admin-field"><span>Project description</span><textarea name="projectDescription" defaultValue={modal.record?.projectDescription ?? ''} maxLength="4000" rows="3" placeholder="What did you build and what impact did it have?" required /></label>
              <label className="admin-field"><span>Category</span><select name="categoryId" defaultValue={modal.record?.categoryId ?? ''} required><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.categoryName}</option>)}</select></label>
              <div className="admin-field">
                <span>Technology stack <small>Select one or more, or add your own</small></span>
                <div className="admin-tech-picker">
                  {[...new Set([...suggestedTechnologies, ...selectedTechnologies])].map((technology) => {
                    const selected = selectedTechnologies.includes(technology);
                    return (
                      <button
                        key={technology}
                        type="button"
                        className={`admin-tech-option ${selected ? 'admin-tech-option--selected' : ''}`}
                        aria-pressed={selected}
                        onClick={() => setSelectedTechnologies((current) => selected
                          ? current.filter((value) => value !== technology)
                          : [...current, technology])}
                      >
                        {selected && <Check size={12} />}{technology}
                      </button>
                    );
                  })}
                </div>
                {selectedTechnologies.map((technology) => <input key={technology} type="hidden" name="projectTechStack" value={technology} />)}
                <div className="admin-tech-custom">
                  <input
                    value={customTechnology}
                    maxLength="80"
                    placeholder="Add another technology"
                    onChange={(event) => setCustomTechnology(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        const value = customTechnology.trim();
                        if (value && !selectedTechnologies.includes(value)) {
                          setSelectedTechnologies((current) => [...current, value]);
                        }
                        setCustomTechnology('');
                      }
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Add technology"
                    onClick={() => {
                      const value = customTechnology.trim();
                      if (value && !selectedTechnologies.includes(value)) {
                        setSelectedTechnologies((current) => [...current, value]);
                      }
                      setCustomTechnology('');
                    }}
                  ><Plus size={16} /></button>
                </div>
                {selectedTechnologies.length === 0 && <small className="admin-field-hint">Choose at least one technology.</small>}
              </div>
              <label className="admin-field"><span>Project image <small>PNG or JPEG, up to 5 MB</small></span><input className="admin-image-input" type="file" name="image" accept="image/png,image/jpeg" required={!modal.record} onChange={(event) => { if (previewObjectUrl.current) URL.revokeObjectURL(previewObjectUrl.current); const file = event.target.files?.[0]; previewObjectUrl.current = file ? URL.createObjectURL(file) : ''; setPreviewUrl(file ? previewObjectUrl.current : (modal.record?.imageUrl ? adminAssetUrl(modal.record.imageUrl) : '')); }} /></label>
              {previewUrl && <div className="admin-image-preview"><img src={previewUrl} alt="Project image preview" /><span><ImagePlus size={14} /> Image preview</span></div>}
            </>
          ) : (
            <>
              <label className="admin-field"><span>Category name</span><input name="categoryName" defaultValue={modal.record?.categoryName ?? ''} maxLength="150" placeholder="e.g. Web development" required /></label>
              <label className="admin-field"><span>Description</span><textarea name="description" defaultValue={modal.record?.description ?? ''} maxLength="2000" rows="4" placeholder="A short description of this category…" required /></label>
            </>
          )}
          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          <div className="admin-modal__actions"><button type="button" className="admin-button admin-button--secondary" onClick={onClose} disabled={busy}>Cancel</button><button type="submit" className="admin-button admin-button--primary" disabled={busy || (modal.type === 'portfolio' && selectedTechnologies.length === 0) || (modal.type === 'portfolio' && categories.length === 0)}>{busy ? <LoaderCircle className="admin-spin" size={17} /> : <Check size={16} />}{modal.record ? 'Save changes' : `Create ${modal.type === 'user' ? 'user' : modal.type === 'portfolio' ? 'project' : 'category'}`}</button></div>
        </form>
      )}
      {deleteTarget && (
        <div ref={dialogRef} tabIndex="-1" className="admin-modal admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
          <span className="admin-confirm-modal__icon"><Trash2 size={20} /></span><button className="admin-icon-button admin-confirm-modal__close" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
          <h2 id="admin-delete-title">Delete {deleteTarget.type}?</h2>
          <p>This will permanently remove <strong>{deleteTarget.type === 'user' ? deleteTarget.record.name : deleteTarget.record.categoryName}</strong>. This action cannot be undone.</p>
          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          <div className="admin-modal__actions"><button className="admin-button admin-button--secondary" onClick={onClose} disabled={busy}>Keep it</button><button className="admin-button admin-button--delete" onClick={onDelete} disabled={busy}>{busy ? <LoaderCircle className="admin-spin" size={17} /> : <Trash2 size={16} />} Delete {deleteTarget.type}</button></div>
        </div>
      )}
    </div>
  );
}

export default AdminRecordDialog;
