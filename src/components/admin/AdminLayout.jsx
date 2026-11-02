import { Boxes, BriefcaseBusiness, ChevronDown, ChevronRight, LayoutDashboard, Menu, Plus, Users } from 'lucide-react';
import AdminSidebar from './AdminSidebar.jsx';
import { adminInitials } from './adminApi.js';

const pageDetails = {
  overview: { label: 'Overview', description: 'Here’s what’s happening across your workspace.', icon: LayoutDashboard },
  users: { label: 'Users', description: 'Manage workspace access, roles, and people.', icon: Users, createIcon: Plus },
  categories: { label: 'Categories', description: 'Organize the programs and areas your team works with.', icon: Boxes, createIcon: Plus },
  portfolio: { label: 'Portfolio', description: 'Manage your featured work, project imagery, and technology stack.', icon: BriefcaseBusiness, createIcon: Plus },
};

function AdminLayout({
  activePage,
  user,
  userCount,
  portfolioCount,
  mobileOpen,
  error,
  notice,
  onNavigate,
  onOpenNavigation,
  onCloseNavigation,
  onLogout,
  onDismissError,
  onCreate,
  children,
}) {
  const page = pageDetails[activePage] ?? pageDetails.overview;
  const PageIcon = page.icon;
  const CreateIcon = page.createIcon;

  return (
    <div className="admin-shell">
      <AdminSidebar
        user={user}
        userCount={userCount}
        portfolioCount={portfolioCount}
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
            <span className="admin-topbar__status"><i /> All systems operational</span>
            <span className="admin-topbar__divider" />
            <button className="admin-user-chip" onClick={onLogout} title="Sign out">
              <span className="admin-avatar">{adminInitials(user.name)}</span>
              <span className="admin-user-chip__copy"><strong>{user.name}</strong><small>Super admin</small></span>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <div className="admin-eyebrow admin-eyebrow--dark"><PageIcon size={13} /> ADMINISTRATION</div>
              <h1>{activePage === 'overview' ? `Good to see you, ${user.name.split(' ')[0]}` : page.label}<span className="admin-heading-period">{activePage === 'overview' ? '.' : ''}</span></h1>
              <p>{page.description}</p>
            </div>
            <div className="admin-heading-actions">
              <span className="admin-date-pill"><span /> {new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}</span>
              {activePage !== 'overview' && (
                <button className="admin-button admin-button--primary admin-create-button" onClick={onCreate}>
                  <CreateIcon size={17} /> Add {activePage === 'users' ? 'user' : activePage === 'categories' ? 'category' : 'project'}
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
          <footer className="admin-content-footer"><span>Made for people who make things better.</span><span>© {new Date().getFullYear()} XentroX Solutions</span></footer>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
