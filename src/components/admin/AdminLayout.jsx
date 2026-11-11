import { useEffect, useRef, useState } from 'react';
import {
  Boxes, Briefcase, BriefcaseBusiness, ChevronDown, ChevronRight,
  CircleDollarSign, LayoutDashboard, Mail, Menu, Newspaper, Plus, Users,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar.jsx';
import { adminAssetUrl, adminInitials } from './adminApi.js';

const pageDetails = {
  overview:   { label: 'Overview',    description: "Here's what's happening across your workspace.", icon: LayoutDashboard },
  users:      { label: 'Users',       description: 'Manage workspace access, roles, and people.',    icon: Users,           createIcon: Plus },
  categories: { label: 'Categories',  description: 'Organize the programs and areas your team works with.', icon: Boxes, createIcon: Plus },
  portfolio:  { label: 'Portfolio',   description: 'Manage your featured work and project imagery.', icon: BriefcaseBusiness, createIcon: Plus },
  careers:    { label: 'Careers',     description: 'Manage open positions, recruitment, and job listings.', icon: Briefcase, createIcon: Plus },
  enquiries:  { label: 'Enquiries',   description: 'View and manage incoming enquiries from visitors.', icon: Mail },
  blogs:      { label: 'Blogs',       description: 'Write, edit, and manage your blog posts.',       icon: Newspaper,       createIcon: Plus },
  pricing:    { label: 'Pricing',     description: 'Update the prices shown on the public pricing page.', icon: CircleDollarSign },
};

function AdminLayout({
  activePage, user, counts, mobileOpen, error, notice,
  onNavigate, onOpenNavigation, onCloseNavigation,
  onLogout, onDismissError, onCreate, children,
}) {
  const page = pageDetails[activePage] ?? pageDetails.overview;
  const PageIcon = page.icon;
  const CreateIcon = page.createIcon;
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileImage = user.avatarUrl || user.imageUrl;

  useEffect(() => {
    if (!profileOpen) return undefined;
    const handlePointerDown = (e) => { if (!profileMenuRef.current?.contains(e.target)) setProfileOpen(false); };
    const handleKeyDown = (e) => { if (e.key === 'Escape') setProfileOpen(false); };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileOpen]);

  return (
    <div className="admin-shell">
      <AdminSidebar
        user={user}
        counts={counts}
        mobileOpen={mobileOpen}
        onNavigate={onNavigate}
        onClose={onCloseNavigation}
        onLogout={onLogout}
      />
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-mobile-menu admin-icon-button" aria-label="Open navigation" onClick={onOpenNavigation}><Menu size={19} /></button>
          <div className="admin-breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{page.label}</strong></div>
          <div className="admin-topbar__right">
            <span className="admin-topbar__divider" />
            <div className="admin-profile-menu" ref={profileMenuRef}>
              <button
                className="admin-user-chip"
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="dialog"
                aria-label="Open profile menu"
              >
                <span className="admin-avatar">
                  {profileImage ? <img src={adminAssetUrl(profileImage)} alt="" /> : adminInitials(user.name)}
                </span>
                <span className="admin-user-chip__copy"><strong>{user.name}</strong><small>Super admin</small></span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="admin-profile-popover" role="dialog" aria-label="User profile">
                  <div className="admin-profile-popover__identity">
                    <span className="admin-avatar admin-profile-popover__avatar">
                      {profileImage ? <img src={adminAssetUrl(profileImage)} alt="" /> : adminInitials(user.name)}
                    </span>
                    <span className="admin-profile-popover__details">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </span>
                  </div>
                  <button className="admin-profile-popover__logout" type="button" onClick={onLogout}>Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <h1>
                {activePage === 'overview' ? `Good to see you, ${user.name.split(' ')[0]}` : page.label}
                <span className="admin-heading-period">{activePage === 'overview' ? '.' : ''}</span>
              </h1>
              <p>{page.description}</p>
            </div>
            <div className="admin-heading-actions">
              {CreateIcon && activePage !== 'overview' && (
                <button className="admin-button admin-button--primary admin-create-button" onClick={onCreate}>
                  <CreateIcon size={17} /> Add {activePage === 'users' ? 'user' : activePage === 'categories' ? 'category' : activePage === 'blogs' ? 'blog' : activePage === 'careers' ? 'position' : 'project'}
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="admin-alert admin-alert--error admin-inline-alert" role="alert">
              <span>{error}</span><button aria-label="Dismiss error" onClick={onDismissError}>×</button>
            </div>
          )}
          {notice && <div className="admin-alert admin-alert--success admin-inline-alert" role="status">{notice}</div>}
          {children}
          <footer className="admin-content-footer">
            <span>Made for people who make things better.</span>
            <span>© {new Date().getFullYear()} XentroX Solutions</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
